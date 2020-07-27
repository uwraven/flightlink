const { TRANSPORT } = require('../API/keys');

function TransportManager() {

    this.synthesizer = null;
    this.transports = {};

    this.handlePacket = function(packet) {
        try {
            let type = packet.type.split('.')
            if (type.length > 2) {
                this.handleAction()
            }
            actions[packet.type](packet);
        } catch(err) {
            // Type not found
        }
    }

    this.createTransport = function(packet) {

    }

    this.deleteTransport = function(packet) {

    }

    this.handleTransportAction = function(packet) {

    }

    const actions = {
        [TRANSPORT.CREATE]: this.createTransport,
        [TRANSPORT.DELETE]: this.deleteTransport,
        [TRANSPORT.ACTION]: this.handleAction
    }

}