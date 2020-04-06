import React, { Component } from 'react';
import styles from './ApplicationHeader.module.scss';

class ApplicationHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullScreen: window.isFullScreen
        }
        // this.enterFullScreen = this.enterFullScreen.bind(this);
        // this.leaveFullScreen = this.leaveFullScreen.bind(this);
    }

    // componentDidMount() {
    //     window.addEventListener('enter-full-screen', this.enterFullScreen);
    //     window.addEventListener('leave-full-screen', this.leaveFullScreen);
    // }
    
    // componentWillUnmount() {
    //     window.removeEventListener('enter-full-screen', this.enterFullScreen);
    //     window.addEventListener('leave-full-screen', this.leaveFullScreen);
    // }

    // enterFullScreen() {
    //     this.setState({fullScreen: true})
    // }

    // leaveFullScreen() {
    //     this.setState({fullScreen: false})
    // }

    render() {
        return (
            <>
                {!this.state.fullScreen &&
                    <div className={styles.container}>
                        {this.props.title}
                    </div>
                }
            </>
        );
    }
}

export default ApplicationHeader;