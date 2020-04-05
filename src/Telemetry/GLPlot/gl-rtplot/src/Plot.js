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

	let renderer = new Renderer({
		canvas: canvas,
		...properties
	});

	renderer.setPixelRatio(window.devicePixelRatio || 1);
	renderer.setSize(canvas.width, canvas.height);

	this.lines = [];

	this.renderer = renderer;

	this.dispose = () => {
		this.lines = [];
		this.renderer.disposeContext();
	};

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

	this.setOrigin = (origin) => {
		_origin = {
			x: origin.x || _origin.x || 0,
			y: origin.y || _origin.y || 0
		};
	};

	/**
     * @description Update plot contents
     */
	this.render = () => {
		this.lines.map((line) => {
			if (line.visible) this.renderer.renderObject(line);
		});
	};
}

export default Plot;
