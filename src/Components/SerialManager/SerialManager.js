import React, { Component } from 'react';
import styles from './SerialManager.module.scss';
import PropTypes from 'prop-types';
import DropdownSelect from '../DropdownSelect/DropdownSelect';
import Button from '../Button/Button';
import { style } from '../../utility';
import KeyValue from '../KeyValue/KeyValue';

const PS = {
    CLOSED: 0,
    OPENING: 1,
    OPEN: 2,
}

class SerialManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPortIndex: -1,
            ports: [],
            portStatus: PS.CLOSED
        }
        this.onPortSelect = this.onPortSelect.bind(this);
        this.openSelectedPort = this.openSelectedPort.bind(this);
        this.closeSelectedPort = this.closeSelectedPort.bind(this);
        this.requests = window.arcc.api.keys.requests;
        this.actions = window.arcc.api.keys.actions;
    }

    componentDidMount() {
        window.arcc.api.sendRequest({
            type: this.requests.ACTION,
            action: this.actions.LISTSERIAL,
        }, (response) => {
            if (response.status === 200) {
                console.log(response.payload);
                this.setState({ports: response.payload}, () => {
                    this.state.ports.map((port, i) => {
                        if (port.manufacturer === "Teensyduino") {
                            this.setState({selectedPortIndex: i})
                        }
                    })
                });
            }
        })
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
        
        return(            
            <div className={style([{className: styles.container}, {
                className: styles.hidden,
                disabled: this.props.visible
            }])}>
                <div className={styles.header}>
                    <DropdownSelect
                        selected={this.state.selectedPortIndex}
                        options={this.state.ports.map(port => port.path)}
                        innerLabel={"Select serial port"}
                        callback={this.onPortSelect}
                        disabled={this.state.portStatus === PS.OPEN || this.state.portStatus === PS.OPENING}
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
                    No port active
                </div> }
            </div>
        )
    }
}

SerialManager.propTypes = {

}

export default SerialManager;