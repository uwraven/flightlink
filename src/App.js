import React, { Component } from 'react';
import SerialManager from './Components/SerialManager/SerialManager';
import Footer from './Components/Footer/Footer';
import styles from './app.module.scss';
import './constants.css';
import './API/main'
import TabBar from './Components/TabBar/TabBar';

import { ReactComponent as ConsoleIcon } from './Assets/Icons/console.svg';
import { ReactComponent as GraphIcon } from './Assets/Icons/graph.svg';
import Telemetry from './Telemetry/Telemetry';
import Header from './Components/Header/Header';
import ApplicationHeader from './Components/ApplicationHeader/ApplicationHeader';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			wsConnected: false,
			showSerial: false,
			serialConnected: false,
			interface: 0,
			data: []
		}
		this.setInterface = this.setInterface.bind(this);
	}

	componentDidMount() {
		window.arcc.api.openSocket("8080").then(() => {
			this.setState({wsConnected: true})
		});
	}

	setInterface(i) { 
		this.setState({interface: i});
	}

	render() {
		return(
			<div className={styles.app}>
				{/* <ApplicationHeader title={"Teensyduino - Serial"}/> */}
				<Header
					toggleSerial={() => this.setState({showSerial: !this.state.showSerial})}
					showSerial={this.state.showSerial}
					serialConnected={this.state.serialConnected}
				/>
				<div className={styles.main}>
					{ this.state.wsConnected ?
						<SerialManager 
							visible={this.state.showSerial}
							setStatus={(status) => this.setState({serialConnected: status})}
						/> 
						: 
						<div>No websocket connection</div>
					}
					<div className={styles.monitor}>
						<TabBar options={[GraphIcon, ConsoleIcon]} selected={this.state.interface} onClick={this.setInterface}/>
						<Telemetry/>
					</div>
				</div>
				<Footer socketConnected={this.state.wsConnected}/>
			</div>
		)
	}

}
