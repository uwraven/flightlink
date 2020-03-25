import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Main.module.scss';
import Telemetry from '../Telemetry/Telemetry';
import MainController from './MainController/MainController';
import Plot from '../Telemetry/GLPlot/GLPlot';
import BufferColorRGBA from '../Telemetry/GLPlot/BufferColorRGBA';

const pages = {
    'telemetry': Telemetry,
    'command': () => <div>
        <Plot
            streams={6}
            length={50}
            width={300}
            height={300}
            initialBuffer={new Float32Array([0, 0, 1])}
        />
    </div>
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'command',
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
                { renderControlBar && <MainController setPage={this.setPage} pages={Object.keys(pages)} initial={1}/> }
                <Page/>
            </div>
        );
    }
}

Main.propTypes = {
    deviceConnected: PropTypes.bool.isRequired
}

export default Main;