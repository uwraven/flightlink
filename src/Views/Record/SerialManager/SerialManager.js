import React, { Component } from 'react';
import styles from './SerialManager.module.scss';
// import PropTypes from 'prop-types';
import DropdownSelect from '../../../Components/DropdownSelect/DropdownSelect';
import Button from '../../../Components/Button/Button';
import { style } from '../../../utility';
import KeyValue from '../../../Components/KeyValue/KeyValue';

const PS = {
    CLOSED: 0,
    OPENING: 1,
    OPEN: 2,
}

const supportedConnections = [
    'Serial',
];

const supportedProtocols = [
    'Flightlink',
];

class SerialManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPortIndex: -1,
            selectedProtocolIndex: 0,
            selectedConnectionIndex: 0,
            ports: [],
            portStatus: PS.CLOSED
        }
        this.onConnectionSelect = this.onConnectionSelect.bind(this);
        this.onProtocolSelect = this.onProtocolSelect.bind(this);

        this.onPortSelect = this.onPortSelect.bind(this);
        this.openSelectedPort = this.openSelectedPort.bind(this);
        this.closeSelectedPort = this.closeSelectedPort.bind(this);

        this.requests = window.arcc.api.keys.requests;
        this.actions = window.arcc.api.keys.actions;
    }

    componentWillMount() {
        console.log("serial manager mounted");
        // TODO:: Needs redux bru
        // window.arcc.api.sendRequest({
        //     type: this.requests.ACTION,
        //     action: this.actions.LISTSERIAL,
        // }, (response) => {
        //     if (response.status === 200) {
        //         console.log(response.payload);
        //         this.setState({ports: response.payload}, () => {
        //             this.state.ports.map((port, i) => {
        //                 if (port.manufacturer === "Teensyduino") {
        //                     this.setState({selectedPortIndex: i})
        //                 }
        //             })
        //         });
        //     }
        // })
    }

    onConnectionSelect(index) {
        if (index !== this.state.selectedConnectionIndex) this.setState({selectedConnectionIndex: index});
    }

    onProtocolSelect(index) {
        if (index !== this.state.selectedProtocolIndex) this.setState({selectedProtocolIndex: index});
    }

    onPortSelect(index) {
        if (index !== this.state.selectedPortIndex) this.setState({selectedPortIndex: index});
    }

    openSelectedPort() {
        if (this.state.selectedPortIndex >= 0) {
            window.arcc.api.sendRequest({
                type: this.requests.ACTION,
                action: this.actions.OPENSERIAL,
                payload: {
                    path: this.state.ports[this.state.selectedPortIndex].path
                }
            }, (response) => {
                if (response.status === 200) {
                    this.setState({ portStatus: PS.OPEN })
                    this.props.setStatus(true);
                } else if (response.status === 500) {
                    console.log("bad response");
                    console.log(response);
                    this.setState({ portStatus: PS.CLOSED })
                }
            })
            this.setState({portStatus: PS.OPENING})
        }
    }

    closeSelectedPort() {
        console.log("CLOSED");
        if (this.state.selectedPortIndex >= 0) {
            window.arcc.api.sendRequest({
                type: this.requests.ACTION,
                action: this.actions.CLOSESERIAL,
            }, (response) => {
                this.setState({ portStatus: PS.CLOSED })
                this.props.setStatus(false);
            })
        }
    }

    render() {
        const port = this.state.ports[this.state.selectedPortIndex];
        const openButtonEnabled = this.state.selectedPortIndex >= 0 && this.state.portStatus === PS.CLOSED;
        const closeButtonEnabled = this.state.selectedPortIndex >= 0 && this.state.portStatus === PS.OPEN;

        const dropdownsEnabled = this.state.portStatus === PS.OPEN || this.state.portStatus === PS.OPENING;
        
        return(            
            <div className={style([{className: styles.container}, {
                className: styles.hidden,
                disabled: this.props.visible
            }])}>
                <div className={styles.header}>
                    <DropdownSelect
                        selected={this.state.selectedConnectionIndex}
                        options={supportedConnections}
                        innerLabel={"Connection"}
                        callback={this.onConnectionSelect}
                        disabled={dropdownsEnabled}
                        placeholder={"Select connection type"}
                    />
                    <DropdownSelect
                        selected={this.state.selectedProtocolIndex}
                        options={supportedProtocols}
                        innerLabel={"Protocol"}
                        callback={this.onProtocolSelect}
                        disabled={dropdownsEnabled}
                        placeholder={"Select protocol"}
                    />
                    <DropdownSelect
                        selected={this.state.selectedPortIndex}
                        options={this.state.ports.map(port => port.path)}
                        innerLabel={"Serial port"}
                        callback={this.onPortSelect}
                        disabled={dropdownsEnabled}
                        placeholder={"Select serial port"}
                    />
                    <Button disabled={!openButtonEnabled} onClick={this.openSelectedPort} type={"primary"}>Open Port</Button>
                </div>
                { (this.state.selectedPortIndex >= 0 && this.state.portStatus === PS.OPEN) ? <>
                    <div className={styles.portInfo}>
                        <KeyValue values={this.state.ports[this.state.selectedPortIndex]}/>
                    </div> 
                    <div className={styles.footer}>
                        <Button disabled={!closeButtonEnabled} onClick={this.closeSelectedPort} type={"destructive"}>Close Port</Button>
                    </div>
                </> : <div className={styles.empty}>
                    No device active
                </div> }
            </div>
        )
    }
}

SerialManager.propTypes = {

}

export default SerialManager;