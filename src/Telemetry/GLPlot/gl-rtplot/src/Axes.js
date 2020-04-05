import Line from './Line';
import Color from './Core/Color';

export default class Axes {
	x;
	y;
	grid;

	enabled;

	/**
     *
     * @param {Color} color - axes color
     * @param {Boolean} enableGrid - enable background grid
     */

	constructor(color) {
		this.enabled = true;
		this.x = {
			line: new Line(color, 2)
		};
		this.y = {
			line: new Line(color, 2)
		};
		this.x.line.xy = new Float32Array([ -1, 0, 1, 0 ]);
		this.y.line.xy = new Float32Array([ 0, -1, 0, 1 ]);

		this.grid = {
			static: false,
			enabled: false,
			lines: {
				x: [],
				y: []
			}
		};
	}
}
