const SerialPort = require('serialport');
const WebSocket = require('ws');
// const FileSystem = require('fs');

// valid types
const requests = {
    ACTION: "ACTION", // websocket layer actions, e.g. getSerial()
    COMMAND: "COMMAND", // vehicle command codes
    DATA: "DATA" // pass raw data
}

// valid actions
const actions = {
    LISTSERIAL: "LISTSERIAL",
    OPENSERIAL: "OPENSERIAL",
    CLOSESERIAL: "CLOSESERIAL"
}

var openRequests = [];

// Open a websocket server
const server = new WebSocket.Server({
    port: 8080,
    perMessageDeflate: false,
})

// Open an empty serialport connection
var serialport;

// On connection to a client
// Only allow a single connection
server.on("connection", (socket) => {
    console.log("Client has connected: ", socket);

    // close serial ports
    console.log(serialport);
    if (serialport !== undefined) serialport.close();

    socket.onmessage = (data) => onSocketReceive(socket, data);
    socket.onclose = onSocketClose;
});

// Handle incoming messages from client
function onSocketReceive(socket, message) {
    if (message.data instanceof ArrayBuffer) {
        // is an array buffer
        // No protocol for this at the moment
    } else {
        try {
            const packet = JSON.parse(message.data);
            switch(packet.type) {
                case requests.ACTION: commitAction(socket, packet); break;
                case requests.RESPONSE: resolveResponse(socket, packet); break;
                case requests.COMMAND: commitCommand(socket, packet); break;
                case requests.DATA: break;
                default: 
                    returnErrorToClient(socket, `Invalid instruction type, received: ${packet.type}`, null);
                break;
            }
        } catch(err) {
            returnErrorToClient(socket, "Unable to parse JSON", err);
        }
    }
}

// Respond to a request for action
function commitAction(socket, packet) {
    try {
        switch(packet.action) {
            case actions.LISTSERIAL: retrieveSerialPorts(socket, packet); break;
            case actions.OPENSERIAL: openSerialPort(socket, packet); break;
            case actions.CLOSESERIAL: closeSerialPort(socket, packet); break;
            default:
                returnErrorToClient(socket, `Invalid action, received: ${packet.action}`, null);
            break;
        }
    } catch(err) { returnErrorToClient(socket, "Action failed", err) }
}

// Commit a command to serial from client
function commitCommand(socket, packet) {

}

// Forward feedback provided by the vehicle to client
function resolveResponse(socket, packet) {

}

// Wrapper to send error responses to client 
function returnErrorToClient(socket, message, payload, id) {
    const response = {
        status: 500,
        errorMessage: message,
        error: payload,
    }
    if (id) { response["id"] = id };
    socket.send(JSON.stringify(response));
}

// Lifecycle func
function onSocketClose(event) {
    console.log("Socket closed: ", event);
    openRequests = [];
}

// Get serial ports available on host machine
function retrieveSerialPorts(socket, packet) {
    queueRequest(packet);
    if (socket) {
        SerialPort.list().then((results) => completeRequest(socket, packet.id, results))
        .catch((err) => { returnErrorToClient(socket, "Could not retrieve serial ports", err, packet.id)});
    }
}

// Open a serial port and send a response to client on completion
function openSerialPort(socket, packet) {
    console.log("opening port", packet);
    queueRequest(packet);
    const options = (packet.payload.options) || {
        autoOpen: true,

    }
    options.autoOpen = true; // override auto open preference
    serialport = new SerialPort(packet.payload.path, options, (error) => {
        // returnErrorToClient(socket, `Serial port could not be updated, received path: ${packet.payload.path}`, err, packet.id);
        if (error) {
            returnErrorToClient(socket, `Serial port could not be opened, received path: ${packet.payload.path}`, error, packet.id)
        } else {
            serialport.flush();
            serialport.on('data', (data) => receiveSerialData(socket, data));
            completeRequest(socket, packet.id);
        }
    })
}

function closeSerialPort(socket, packet) {
    queueRequest(packet);
    serialport.close((err) => {
        console.log(err);
        if (err) {
            returnErrorToClient(socket, `Serial port could not be closed, path: ${packet.payload.path}`, err, packet.id);
        } else {
            completeRequest(socket, packet.id)
        }
    });
}

// Add request to queue and wait for completion
function queueRequest(packet) {
    if (openRequests.findIndex((obj) => obj.id === packet.id) < 0) {
        openRequests.push(packet.id)
    } else {
        console.warn("Duplicate id found, received: ", packet.id);
    }
}

// Provide response to a client request
function completeRequest(socket, id, payload) {
    openRequests = openRequests.filter(obj => obj.id === id);
    socket.send(JSON.stringify({
        status: 200,
        id: id,
        payload: payload
    }))
}


var parser = {
    headerType: null,
    open: false,
    reading: false,
    bytes: 0,
    bytesRead: 0,
    dataRow: -1,
    dataCache: [],
    properties: {
        rowsOnSend: 1,
        maximumDelayMS: 500
    }
}

// On receive serial data
function receiveSerialData(socket, data) {
    streamParseSerialData(data);
    if (parser.dataRow >= parser.properties.rowsOnSend - 1) {
        socket.send(JSON.stringify({
            type: requests.DATA,
            payload: parser.dataCache
        }));
        parser.dataCache = [];
        parser.dataRow = -1;
    }
}

function streamParseSerialData(byteArr) {
    if (parser.leftover) {
        byteArr.unshift(parser.leftover);
        parser.leftover = null;
    }
    for (let i = 0; i < byteArr.length; i++) {
        var char = byteArr[i];
        if (!parser.open && char === 0x01) parser.open = true;
        else if (parser.open && !parser.reading && parser.bytesRead === 0) {
            // Read the message header contents
            switch (char) {
                case 0x17: parser.headerType = requests.COMMAND; break;
                case 0x18:
                    parser.headerType = requests.DATA; 
                    parser.dataCache.push([]);
                    parser.dataRow++;
                    break;
                // case 0x19: break;
                // case 0x20: break;
                case 0x40: 
                    parser.reading = true; break;
                default: 
                    parser.bytes = char; break;
            }
        }
        else if (parser.open && parser.reading && parser.bytesRead < parser.bytes) {
            // Message header has been read, parse data in groups of 4 bytes
            if (byteArr.length - i >= 4) {
                let fl = byteArrayToFloat32Array(byteArr.slice(i, i + 4))[0];
                parser.dataCache[parser.dataRow].push(fl);
                parser.bytesRead += 1;
                i += 3;
            } else {
                // ByteArr terminates early, capture the unused trailing bytes and unshift them to the next message
                parser.leftover = byteArr.slice(i, -1);
            }
        }
        else if (parser.bytesRead === parser.bytes && !parser.leftover) {
            // All bytes from the message have been read except for terminating sequences
            switch(char) {
                case 0x41: parser.reading = false; break;
                case 0x04: terminateMessage(); break;
                default: break;
            }
        }
    }
}

function terminateMessage() {
    parser.open = false;
    parser.headerType = null;
    parser.bytes = 0;
    parser.bytesRead = 0;
}

function byteArrayToFloat32Array(byteArr) {
    return new Float32Array(new Uint8Array(byteArr).buffer);
}

function byteArrayToString(byteArr) {
    return String.fromCharCode(byteArr);
}