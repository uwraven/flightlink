import React, { Component } from 'react';
import SerialManager from './Components/SerialManager/SerialManager';
import Footer from './Components/Footer/Footer';
import styles from './app.module.scss';
import './constants.css';
import './API/main'
import Telemetry from './Telemetry/Telemetry';
import ApplicationHeader from './Components/ApplicationHeader/ApplicationHeader';
import Main from './Main/Main';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			websocketConnected: false,
			showCommunicationPanel: true,
			deviceConnected: false,
		}
		this.openConsole = this.openConsole.bind(this);
		this.toggleCommPanel = this.toggleCommPanel.bind(this);
	}

	componentDidMount() {
		window.arcc.api.openSocket("8080").then(() => {
			this.setState({websocketConnected: true})
		});
		document.title = "RAVEN";
	}

	toggleCommPanel() {
		this.setState({showCommunicationPanel: !this.state.showCommunicationPanel})
	}

	openConsole() {
		
	}

	render() {
		return(
			<div className={styles.app}>
				{ this.state.websocketConnected ?
					<div className={styles.main}>
						<SerialManager 
							visible={this.state.showCommunicationPanel}
							setStatus={(status) => this.setState({deviceConnected: status})}
						/>
						<Main
							deviceConnected={this.state.deviceConnected}
						/>
					</div>
					:
					<div className={styles.mainEmpty}>
						{this.state.websocketConnected}
					</div>
				}
				<Footer
					toggleCommPanel={this.toggleCommPanel}
					openConsole={this.openConsole}
					deviceConnected={this.state.deviceConnected}
					websocketConnected={this.state.websocketConnected}
				/>
			</div>
		)
	}

}
