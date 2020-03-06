import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WebGLPlot from './GLPlot/WebglPlot';

class GLPlot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            channels: [],
            pixelRatio: window.devicePixelRatio || 1
        };
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        if (this.renderTarget) {
            let w = this.renderTarget.clientWidth;
            let h = this.renderTarget.clientHeight;
            const webglContext = this.renderTarget.getContext("webgl", {
                antialias: true,
                transparent: false,
            });

            // 
            webglContext.enable(webglContext.DEPTH_TEST);

            // clear color and depth buffer of instance
            webglContext.clear(webglContext.COLOR_BUFFER_BIT || webglContext.DEPTH_BUFFER_BIT);

            // 
            webglContext.viewport(0, 0, w, h);

            this.renderer = webglContext;
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <canvas
                className={this.props.className}
                ref={(ref) => this.renderTarget = ref}
            />
        );
    }
}

GLPlot.propTypes = {

};

export default GLPlot;