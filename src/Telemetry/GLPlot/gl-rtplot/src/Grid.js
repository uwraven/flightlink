import Line from './Line';
import Color from './Core/Color';

function Grid(majorColor, minorColor, xIntervals, yIntervals) {
	this.static = true;
	this.enabled = true;
	this.children = [];

	for (let i = -xIntervals; i < xIntervals; i++) {
		if (i !== 0) {
			let line = new Line(minorColor, 2);
			line.xy = new Float32Array([ i / xIntervals, -1, i / xIntervals, 1 ]);
			this.children.push(line);
		}
	}

	for (let i = -yIntervals; i < yIntervals; i++) {
		if (i !== 0) {
			let line = new Line(minorColor, 2);
			line.xy = new Float32Array([ -1, i / yIntervals, 1, i / yIntervals ]);
			this.children.push(line);
		}
	}
}

export default Grid;
