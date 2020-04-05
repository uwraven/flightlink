import React, { Component, createRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Plot, { Color, Line, Themes } from './gl-rtplot';
import styles from './GLPlot.module.scss';

const GLPlot = ({ layout, buffer, ...props }) => {
	let canvas = useRef();
	let plot = useRef(null);

	// Utilized during animate frame
	let _buffer = useRef(null);
	let _t = useRef(0);
	let _dt = useRef(16.67);
	let on = useRef(true);

	useEffect(
		() => {
			let plot = new Plot(canvas.current, {
				antialias: layout.render.antialias,
				alpha: layout.render.alpha
			});
			plot.current = plot;

			return () => {
				plot.current.dispose();
			};
		},
		[ layout.render.antialias, layout.render.alpha ]
	);

	useEffect(
		() => {
			_buffer.current = buffer;
		},
		[ buffer ]
	);

	useEffect(
		() => {
			let dx = 1 / layout.points;
			if (plot.current) {
				plot.current.lines = [];
				for (let i = 0; i < layout.streams; i++) {
					let colors = Themes.palette.midnight;
					let line = new Line(Color.fromHex(colors[i % (colors.length - 1)], 1.0), layout.points + 1);
					line.fill(0, dx, _buffer[i] || 0);
					plot.addStream(line);
				}
				plot.current.render();
				plot.current = plot;
			}
		},
		[ layout.streams, layout.points ]
	);

	useEffect(
		() => {
			_dt.current = layout.duration / layout.points;
		},
		[ layout.points, layout.duration ]
	);

	useEffect(
		() => {
			// Update plot size
			if (plot.current) {
				plot.current.setSize({
					width: props.width,
					height: props.height
				});
			}
		},
		[ props.width, props.height ]
	);

	useEffect(
		() => {
			if (plot.current) {
				plot.current.setOrigin();
			}
		},
		[ layout.origin.x, layout.origin.y ]
	);

	useEffect(
		() => {
			if (plot.current) plot.current._origin.y = layout.origin.y || 0;
		},
		[ layout.origin.y ]
	);

	useEffect(
		() => {
			// Update plot color values
		},
		[ props.colors ]
	);

	useEffect(
		() => {
			if (plot.current && props.scale) {
				plot.current.scale = 1 / props.scale;
			}
		},
		[ props.scale ]
	);

	useEffect(
		() => {
			on.current = props.on;

			const animateFrame = (t) => {
				let dt = t - _t.current;

				let intervals = Math.floor(dt / _dt.current);
				let remainder = dt % _dt.current;

				if (plot.current && dt >= _dt.current) {
					plot.current.lines.map((line, i) => {
						for (let j = 0; j < intervals; j++) {
							line.push(_buffer.current.slice(i, i + 1));
						}
					});
					plot.current.render();
					_t.current = t - remainder;
				}

				// animate frame code
				if (on.current) requestAnimationFrame(animateFrame);
			};

			if (props.on) animateFrame(0);
		},
		[ props.on ]
	);

	const aspect = props.aspect ? styles.aspectTrue : styles.aspectFalse;

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
};

export default GLPlot;
