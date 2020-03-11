import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Main.module.scss';
import Telemetry from '../Telemetry/Telemetry';
import MainController from './MainController/MainController';

const pages = {
    'telemetry': Telemetry,
    'command': () => <div>Test</div>
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'telemetry',
        }
        this.setPage = this.setPage.bind(this);
    }

    setPage(page) {
        if (Object.keys(pages).includes(page)) {
            this.setState({
                page: page
            })
        }
    }

    render() {
        const Page = pages[this.state.page] || Telemetry;
        const renderControlBar = this.state.page === 'telemetry' || this.state.page === 'command';
        return (
            <div className={styles.container}>
                { renderControlBar && <MainController setPage={this.setPage} pages={Object.keys(pages)}/> }
                <Page/>
            </div>
        );
    }
}

Main.propTypes = {
    deviceConnected: PropTypes.bool.isRequired
}

export default Main;