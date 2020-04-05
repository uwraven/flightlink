import Line from './Line';
import Color from './Core/Color';

class Axes {
	x;
	y;
	grid;

	enabled;

	/**
     *
     * @param {Color} color - axes color
     */

	constructor(color) {
		this.enabled = true;
		this.x = {
			line: new Line(color, 2)
		};
		this.y = {
			line: new Line(color, 2)
		};
		this.x.line.buffer = new Float32Array([ -1, 0, 1, 0 ]);
		this.y.line.buffer = new Float32Array([ 0, -1, 0, 1 ]);
	}
}

export default Axes;
