import React, { Component, createRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Plot, {Color, Line, Themes, Axes} from './gl-rtplot';
import styles from './GLPlot.module.scss';

const GLPlot = ({layout, buffer, ...props}) => {

    let canvas = useRef();
    let glPlot = useRef(null);

    // Called during animate frame
    let _buffer = useRef(null);
    let _t = useRef(0);
    let _dt = useRef(16);
    let on = useRef(true);

    useEffect(() => {
        let plot;
         plot = new Plot(canvas.current, {
            antialias: layout.render.antialias,
            transparent: layout.render.transparent
        });
        glPlot.current = plot;

        return () => {
            glPlot.current.dispose();
        }
    }, [layout.render.antialias, layout.render.transparent])


    useEffect(() => {
        _buffer.current = buffer;
    }, [buffer])


    useEffect(() => {
        let dx = 1 / layout.points;
        if (glPlot.current) {
            let plot = glPlot.current;
            plot.lines = [];
            for (let i = 0; i < layout.streams; i++) {
                let colors = Themes.palette.midnight;
                let line = new Line(Color.fromHex(colors[i % (colors.length - 1)], 1.0), layout.points + 1);
                line.fill(0, dx, _buffer[i] || 0);
                plot.addLine(line);
            }
            plot.update();
            glPlot.current = plot;
        }
    }, [layout.streams, layout.points])


    useEffect(() => {
        _dt.current = layout.duration / layout.points;
    }, [layout.points, layout.duration])


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
        if (glPlot.current) glPlot.current._origin.x = layout.origin.x || 0;
    }, [layout.origin.x]);


    useEffect(() => {
        if (glPlot.current) glPlot.current._origin.y = layout.origin.y || 0;
    }, [layout.origin.y]);



    useEffect(() => {
        // Update plot color values
    }, [props.colors])


    useEffect(() => {
        if (glPlot.current && props.scale) {
            glPlot.current.scale = 1 / props.scale;
        }
    }, [props.scale])
 

    useEffect(() => {
        on.current = props.on;

        const animateFrame = (t) => {

            let dt = t - _t.current;

            let intervals = Math.floor(dt / _dt.current);
            let remainder = dt % _dt.current;

            if (glPlot.current && dt >= _dt.current) {
                glPlot.current.lines.map((line, i) => {
                    for (let j = 0; j < intervals; j++) {
                        line.push(_buffer.current.slice(i, i+1));
                    }
                })
                glPlot.current.update();
                _t.current = t - remainder;
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
    // layout: PropTypes.objectOf({
    //     scale: PropTypes.objectOf({
    //         x: PropTypes.number,
    //         y: PropTypes.number
    //     })
    // }),
    // streams: PropTypes.number.isRequired,
    // points: PropTypes.number.isRequired,
    // duration: PropTypes.number.isRequired,
    // colors: PropTypes.array,
    // width: PropTypes.number,
    // height: PropTypes.number
}

export default GLPlot;