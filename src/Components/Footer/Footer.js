import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Footer.module.scss';
import Button from '../Button/Button';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }


    render() {
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <Button 
                        onClick={this.props.toggleCommPanel}
                        type={"small"}>
                            Toggle panel
                    </Button>
                    <Button 
                        onClick={this.props.openConsole}
                        type={"small"}>
                            Open console
                    </Button>
                    <p className={styles.socketStatus}>
                        { (this.props.websocketConnected) ? "Socket OK" : "Socket Disconnected"}
                    </p>
                    <p className={styles.socketStatus}>
                        { (this.props.deviceConnected) ? "Device OK" : "No Device Connected" }
                    </p>
                </div>
                <p>
                    Flightlink pre-alpha V0.1
                </p>
            </div>
        );
    }
}

Footer.propTypes = {

};

export default Footer;