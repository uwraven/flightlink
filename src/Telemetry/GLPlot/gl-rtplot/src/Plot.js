import Line from './Line';
import Axes from './Axes';
import Color from './Core/Color';
import Renderer from './Renderer';

/**
 * @param {HTMLCanvasElement} canvas
 * @param {Object} properties Webgl renderer properties
 * @description Creates a new instance of Plot
 */

function Plot(canvas, properties) {
	var _scale, _origin, _axes;

	_scale = {
		x: 1,
		y: 1
	};

	_origin = {
		x: 0,
		y: 0
	};

	let renderer = new Renderer({
		canvas: canvas,
		...properties
	});

	renderer.setPixelRatio(window.devicePixelRatio || 1);
	renderer.setSize(canvas.width, canvas.height);

	this.lines = [];
	this.axes = null;

	let nline = new Line(new Color(1.0, 0.0, 0.0, 1.0), 4);
	nline.buffer = new Float32Array([ -1, -1, 1, -1, 1, 1, -1, 1 ]);
	nline = renderer.instantiateObject(nline);
	nline.close = true;
	this.lines.push(nline);

	let bline = new Line(new Color(0.0, 0.0, 1.0, 1.0), 4);
	bline.buffer = new Float32Array([ -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5 ]);
	bline = renderer.instantiateObject(bline);
	bline.close = true;
	this.lines.push(bline);

	this.renderer = renderer;

	this.addStream = (line) => {
		line = this.renderer.instantiateObject(line);
		this.lines.push(line);
	};

	this.setScale = (scale) => {
		_scale = {
			x: scale.x || _scale.x || 1,
			y: scale.y || _scale.y || 1
		};
	};

	this.setOrigin = (x, y) => {
		_origin = {
			x: x || _origin.x || 0,
			y: y || _origin.y || 0
		};
	};

	this.resize = () => {};

	this.attachAxes = (axes) => {
		_axes = axes;
		// TODO:: Add to children array
		_axes.x.line = this.renderer.instantiateObject(_axes.x.line);
		_axes.y.line = this.renderer.instantiateObject(_axes.y.line);
	};

	this.render = () => {
		if (_axes) {
			this.renderer.renderObject(_axes.x.line);
			this.renderer.renderObject(_axes.y.line);
		}
		this.lines.map((line) => {
			this.renderer.renderObject(line);
		});
	};

	this.dispose = () => {
		this.lines = [];
		this.renderer.disposeContext();
	};
}

export default Plot;
