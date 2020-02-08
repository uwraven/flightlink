import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Footer.module.scss';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }


    render() {
        return (
            <div className={styles.container}>
                <p className={styles.socketStatus}>
                    { (this.props.socketConnected) && "Socket Connected" }
                </p>
                <p>
                    Flight Link Pre Alpha V0.1
                </p>
            </div>
        );
    }
}

Footer.propTypes = {

};

export default Footer;