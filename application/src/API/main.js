import globalStruct from './constants';
import socket from './socket';

window.arcc = {
    api: {
        openSocket: socket.openSocket,
        closeSocket: socket.closeSocket,
        sendRequest: socket.sendRequest,
        attachListener: socket.attachListener,
        removeListener: socket.removeListener,
        messageQueue: [],
        keys: globalStruct,
        listeners: {
            data: [],
            action: [],
            ack: []
        }
    },
    storage: {
        receivedData: []
    }
};
