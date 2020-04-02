import React, { Component, createRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Plot, {Color, Line, Themes, Axes} from './gl-rtplot';
import styles from './GLPlot.module.scss';

const GLPlot = (props) => {

    let canvas = useRef();
    let glPlot = useRef(null);

    // Called during animate frame
    let buffer = useRef(null);
    let _t = useRef(0);
    let _dt = useRef(16);
    let on = useRef(true);

    useEffect(() => {
        let plot;
         plot = new Plot(canvas.current, {
            antialias: props.antialias,
            transparent: props.transparent
        });
        glPlot.current = plot;

        return () => {
            glPlot.current.destroy();
        }
    }, [props.antialias, props.transparent])


    useEffect(() => {
        buffer.current = props.buffer;
    }, [props.buffer])


    useEffect(() => {
        let dx = 1 / props.points;
        if (glPlot.current) {
            let plot = glPlot.current;
            plot.lines = [];
            for (let i = 0; i < props.streams; i++) {
                let colors = Themes.palette.midnight;
                let line = new Line(Color.fromHex(colors[i % (colors.length - 1)], 1.0), props.points);
                line.fill(0, dx, buffer[i] || 0);
                plot.addLine(line);
            }
            plot.update();
            glPlot.current = plot;
        }
    }, [props.streams, props.points])


    useEffect(() => {
        _dt.current = props.duration / props.points;
    }, [props.points, props.duration])


    useEffect(() => {
        // Update plot size
        if (glPlot.current) {
            glPlot.current.size = {
                width: props.width,
                height: props.height
            }
        }
        if (canvas.current) {
            canvas.current.width = props.width;
            canvas.current.height = props.height;
        }
    }, [props.width, props.height])


    useEffect(() => {
        // Update plot color values
    }, [props.colors])


    useEffect(() => {
        if (glPlot.current && props.scale) {
            glPlot.current.scale = 1 / props.scale;
        }
    }, [props.scale])


    useEffect(() => {
        console.log("on change");
        console.log(props.on);
        on.current = props.on;

        const animateFrame = (t) => {
            // animateframe is called much faster than buffer is updated,
            // animateframe is called slower than buffer is updated, or called 
            // about the same rate.

            let dt = t - _t.current;

            let intervals = Math.floor(dt, _dt.current);
            let remainder = dt % _dt.current;

            if (glPlot.current && dt >= _dt.current) {
                glPlot.current.lines.map((line, i) => {
                    line.shiftAdd(buffer.current.slice(i, i+1));
                })
                glPlot.current.update();
                _t.current = t;
            }

            // animate frame code
            if (on.current) requestAnimationFrame(animateFrame)
        }

        if (props.on) animateFrame(0);

    }, [props.on])


    const aspect = (props.aspect) ? styles.aspectTrue : styles.aspectFalse;
    

    return(
        <div className={props.className}>
            <canvas
                ref={canvas}
                width={props.width || 300}
                height={props.height || 300}
                className={[styles.canvas].join(" ")}
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
    points: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    colors: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number
}

export default GLPlot;