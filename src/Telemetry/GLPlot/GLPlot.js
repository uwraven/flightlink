import React, { Component, createRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Plot, {Color, Line, Themes, Axes} from './gl-rtplot';
import styles from './GLPlot.module.scss';

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

        // window.addEventListenerp('resize', resizeListener);

        let plot;
        plot = new Plot(canvas.current, {
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
            console.log("plot");
            let plot = glPlot.current;
            plot.lines = [];
            for (let i = 0; i < props.streams; i++) {
                let colors = Themes.palette.umber;
                let line = new Line(
                    Color.fromHex(colors[i % (colors.length - 1)], 1.0), props.length
                );
                line.fillSin(0.1 * i, 1 / props.length, 0.05);
                plot.addLine(line);
            }
            plot.update();
            glPlot.current = plot;
            console.log(props.streams, props.length);
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
                line.shiftAdd(new Float32Array([props.buffer[i]]))
            })
            glPlot.current.update();
        }
    }, [props.buffer])


    useEffect(() => {
        if (glPlot.current && props.scale) {
            glPlot.current.scale = 1 / props.scale;
        }
    }, [props.scale])

    const animateFrame = (time) => {
        const dt = time - prevTime;
    }

    const aspect = (props.aspect) ? styles.aspectTrue : styles.aspectFalse;
    
    return(
        <div className={props.className}>
            <canvas
                ref={canvas}
                width={props.width || 300}
                height={props.height || 300}
                className={[styles.canvas, aspect].join(" ")}
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