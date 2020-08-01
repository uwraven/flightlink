const SerialPort = require('serialport');
const { TRANSPORT } = require('../../API/keys');

const {
    LIST,
    OPEN,
    CLOSE,
    WRITE,
    PARSER
} = TRANSPORT.SERIAL;

function SerialTransport() {

    this.port = null;
    this.parser = null;
    this.id = null;

    let defaultWriteOptions = {
        encoding: "ascii",
    }

    this.init = function(path, parser, options) {
        this.port = new SerialPort(path, {
            autoOpen: false,
            ...options
        });
        switch(parser) {
            case PARSER.BYTE: this.parser = new SerialPort.parsers.ByteLength();
            case PARSER.READLINE: this.parser = new SerialPort.parser.Readline();
            default: {
                // use readline as default for now
                this.parser = new SerialPort.parser.Readline();
            }
            port.pipe(this.parser);
        }

        this.parser.on('data', data => {

            console.log(data);

        });

        this.port.on('error', (err) => {

        })
    }

    this.openPort = function() {
        this.port.open(err => {

        })
    }

    this.writeToPort = function(data, options) {
        this.port.write(data, {defaultWriteOptions, ...options}, (error) => {
            if (error) {
                
            }
        });
    }

    this.closePort = function() {
        this.port.close(err => {

        })
    }

    this.actions = {
        [OPEN]: this.openPort,
        [CLOSE]: this.closePort,
        [WRITE]: this.writeToPort,
    }

}