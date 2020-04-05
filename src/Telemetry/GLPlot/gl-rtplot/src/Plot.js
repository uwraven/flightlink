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
			if (line.visible) this.renderer.renderObject(line);
		});
	};

	this.dispose = () => {
		this.lines = [];
		this.renderer.disposeContext();
	};
}

export default Plot;
