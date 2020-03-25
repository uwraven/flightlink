import React, { Component, createRef, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import WebGLPlot from './WebGLPlot';
import BufferLine from './BufferLine';
import BufferColorRGBA from './BufferColorRGBA';

const defaultColors = [
    new BufferColorRGBA(),
    new BufferColorRGBA(),
    new BufferColorRGBA(),
    new BufferColorRGBA(),
];

class GLPlot extends Component {
    constructor(props) {
        super(props);
        this.canvas = createRef();
        this.animate = this.animate.bind(this);
    }

    componentDidMount() {
        // Create plot object
        this.plot = new WebGLPlot(this.canvas.current, {
            antialias: true,
            transparency: true,
        });
        this.addLines();
        this.animate();
    }



    addLines() {
        if (this.props.streams) {
            for (let i = 0; i < this.props.streams; i++) {
                let color;
                // Use colors if provided
                if (this.props.colors) {
                    let cl = this.props.colors[i % this.props.colors.length - 1];
                    color = new BufferColorRGBA(cl.r, cl.g, cl.b, cl.a);
                } else {
                    color = defaultColors[i % defaultColors.length - 1];
                }
                const line = new BufferLine(color, this.props.length);
                this.plot.addLine(line);
            }
        }
    }

    animate(t) {
        if (this.props.on) {

            // update time
            let dt = t - this.t;
            this.t = dt;

            if (this.props.onFrame) this.props.onFrame(dt);

            let frameBuffer = this.props.buffer;

        }
        requestAnimationFrame(this.animate);
    }

    render() {
        return(
            <div className={this.props.className}>
                {this.props.title && <h1>{this.props.title}</h1>}
                <canvas 
                    ref={this.canvas} 
                    width={this.props.width || 300} 
                    height={this.props.height || 300}/>
            </div>
        )
    }
}

const GLPlot2 = (props) => {

    const canvas = useRef(null);

    useEffect(() => {

    }, [props.colors])

    useEffect(() => {

    }, [props.length])

    useEffect(() => {

    }, [props.streams])

}

GLPlot.propTypes = {
    streams: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    colors: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number
}

export default GLPlot;