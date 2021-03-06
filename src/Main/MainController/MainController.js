import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styles from './MainController.module.scss';
import Switch from '../../Components/Switch/Switch';

class MainController extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: this.props.initial
		};
		this.onPageChange = this.onPageChange.bind(this);
	}

	onPageChange(index) {
		this.props.setPage(this.props.pages[index]);
		if (index !== this.state.index) this.setState({ index: index });
	}

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.left} />
				<Switch selected={this.state.index} onClick={this.onPageChange} options={[ 'Telemetry', 'Command' ]} />
			</div>
		);
	}
}

MainController.propTypes = {};

export default MainController;
