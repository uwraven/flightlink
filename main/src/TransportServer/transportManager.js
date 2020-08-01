const { TRANSPORT } = require('../API/keys');

function TransportManager() {

    this.synthesizer = null;
    this.transports = {};

    this.handlePacket = function(packet) {
        try {
            actions[packet.type](packet.payload);
        } catch(err) {
            // Type not found
        }
    }

    this.createTransport = function(payload) {
        try {
            createTransport[payload.transport](payload.options)            
        } catch(err) {
            
        }
    }

    this.handleTransportAction = function(payload) {
        let transport = transports[payload.transportId];
        if (transport) transport.handleAction(payload);
    }

    const actions = {
        [TRANSPORT.CREATE]: this.createTransport,
        [TRANSPORT.ACTION]: this.handleTransportAction,
    }

    const createTransport = {
        [TRANSPORT.MQTT.KEY]: (options) => {

        },
        [TRANSPORT.SERIAL.KEY]: (options) => {

        }
    }

}

module.exports = {
    default: TransportManager
}