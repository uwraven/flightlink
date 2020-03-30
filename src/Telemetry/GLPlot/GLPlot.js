import React, { Component, createRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import WebGLPlot from './WebGLPlot';
import BufferLine from './BufferLine';
import BufferColorRGBA from './BufferColorRGBA';

const defaultColors = [
    new BufferColorRGBA(0.0, 1.0, 0.0, 1.0),
    new BufferColorRGBA(0.0, 0.0, 1.0, 1.0),
    new BufferColorRGBA(1.0, 0.0, 0.0, 1.0),
    new BufferColorRGBA(0.0, 0.0, 0.0, 1.0),
];

const GLPlot = (props) => {

    let canvas = useRef();
    let context = useRef();
    let prevTime = useRef(Date.now());
    let glPlot = useRef(null);

    useEffect(() => {
        
        const resizeListener = () => {
            if (glPlot.current && canvas.current) {
                canvas.current.width = canvas.current.clientWidth;
                canvas.current.height = canvas.current.clientHeight;
                glPlot.current.resize();
            }
        }

        // window.addEventListener('resize', resizeListener);

        let plot;
        plot = new WebGLPlot(canvas.current, {
            antialias: true,
            transparent: true,
        });
        glPlot.current = plot;

        return () => {
            window.removeEventListener('resize', resizeListener);
            glPlot.current.destroy();
        }
    }, [])

    useEffect(() => {
        if (glPlot.current) {
            let plot = glPlot.current;
            plot.lines = [];
            for (let i = 0; i < props.streams; i++) {
                let line = new BufferLine(
                    new BufferColorRGBA(defaultColors[i % (defaultColors.length - 1)]), props.length
                );
                line.fill(0, 1 / props.length, 0);
                plot.addLine(line);
            }
            plot.update();
            glPlot.current = plot;
        }
    }, [props.streams, props.length])


    useEffect(() => {
        // Update plot size
        if (glPlot.current) {
            glPlot.current.size = {
                width: props.width,
                height: props.height
            }
        }
    }, [props.width, props.height])


    useEffect(() => {
        // Update plot color values
    }, [props.colors])


    useEffect(() => {
        // Update plot length
        if (glPlot.current) {
            let plot = glPlot.current;
            plot.lines.map((line) => line.length = props.length); 
        }
    }, [props.length])


    useEffect(() => {
        // Add new elements to stream
        if (glPlot.current) {
            glPlot.current.lines.map((line, i) => {
                line.shiftAdd(new Float32Array([props.buffer]))
            })
            glPlot.current.update();
        }
    }, [props.buffer])


    const animateFrame = (time) => {
        const dt = time - prevTime;
    }

    
    return(
        <div className={props.className}>
            <canvas
                ref={canvas}
                width={props.width || 300}
                height={props.height || 300}
            />
        </div>
    )

}

GLPlot.propTypes = {
    plot: PropTypes.objectOf({
        scale: PropTypes.objectOf({
            x: PropTypes.number,
            y: PropTypes.number
        })
    }),
    streams: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    colors: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number
}

export default GLPlot;