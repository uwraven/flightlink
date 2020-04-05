import globalStruct from './constants';
import socket from './socket';
// const fs = window.require('fs');

window.arcc = {
	api: {
		openSocket: socket.openSocket,
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
