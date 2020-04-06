import React, { Component, createRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Plot, { Color, Line, Themes, Axes, Grid } from './gl-rtplot';
import styles from './GLPlot.module.scss';

const GLPlot = ({ config, contextAttributes, layout, buffer, ...props }) => {
    let canvas = useRef();
    let glplot = useRef(null);

    // Utilized during animate frame
    let _buffer = useRef(null);
    let _t = useRef(0);
    let _dt = useRef(16.67);
    let live = useRef(true);

    /**
     * Plot initialization effect, requires context attributes and grid
     */
    useEffect(
        () => {
            let plot = new Plot(canvas.current, {
                antialias: contextAttributes.antialias,
                alpha: contextAttributes.alpha
            });

            if (config.axes) {
                let majorColor = new Color(0.85, 0.85, 0.85, 1.0);
                let minorColor = new Color(0.95, 0.95, 0.95, 1.0);

                let axes = new Axes(majorColor);
                if (config.grid) {
                    let grid = new Grid(majorColor, minorColor, 10, 5);
                    axes.grid = grid;
                }

                plot.attachAxes(axes);
            }

            glplot.current = plot;

            return () => {
                glplot.current.dispose();
            };
        },
        [ contextAttributes.antialias, contextAttributes.alpha, config.axes, config.grid ]
    );

    useEffect(
        () => {
            _buffer.current = buffer;
        },
        [ buffer ]
    );

    useEffect(
        () => {
            let dx = 1 / config.points;
            if (glplot.current) {
                let plot = glplot.current;
                // plot.lines = [];
                for (let i = 0; i < config.streams; i++) {
                    let colors = Themes.palette.midnight;
                    let line = new Line(Color.fromHex(colors[i % (colors.length - 1)], 1.0), config.points + 1);
                    line.fill(0, dx, _buffer.current || 0);
                    plot.addStream(line);
                }
                plot.render();
                glplot.current = plot;
            }
        },
        [ config.streams, config.points ]
    );

    useEffect(
        () => {
            _dt.current = config.duration / config.points;
        },
        [ config.points, config.duration ]
    );

    useEffect(
        () => {
            // Update plot size
            if (glplot.current) {
                glplot.current.renderer.setSize(props.width, props.height);
            }
        },
        [ props.width, props.height ]
    );

    useEffect(
        () => {
            // Update plot color values
        },
        [ props.colors ]
    );

    useEffect(
        () => {
            glplot.current.renderer.setPixelRatio(layout.pixelRatio);
        },
        [ layout.pixelRatio ]
    );

    useEffect(
        () => {
            if (glplot.current && layout.scale) {
                glplot.current.setScale(layout.scale, layout.scale);
            }
        },
        [ layout.scale ]
    );

    useEffect(
        () => {
            live.current = props.live;

            const animateFrame = (t) => {
                let dt = t - _t.current;

                let intervals = Math.floor(dt / _dt.current);
                let remainder = dt % _dt.current;

                if (glplot.current && dt >= _dt.current) {
                    glplot.current.lines.map((line, i) => {
                        for (let j = 0; j < intervals; j++) {
                            line.push(_buffer.current.slice(i, i + 1));
                        }
                    });
                    glplot.current.render();
                    _t.current = t - remainder;
                }

                // animate frame code
                if (live.current) requestAnimationFrame(animateFrame);
            };

            if (props.live) animateFrame(0);
        },
        [ props.live ]
    );

    return (
        <div className={props.className}>
            <canvas
                ref={canvas}
                width={props.width || 300}
                height={props.height || 300}
                className={[ styles.canvas ].join(' ')}
            />
        </div>
    );
};

GLPlot.propTypes = {
    // config: PropTypes.objectOf({
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
};

GLPlot.defaultProps = {
    config: {
        duration: 5000,
        points: 100,
        streams: 0,
        axes: true,
        grid: false
    },
    contextAttributes: {
        antialias: true,
        alpha: true
    },
    layout: {
        scale: 1,
        pixelRatio: window.devicePixelRatio || 1
    }
};

export default GLPlot;
