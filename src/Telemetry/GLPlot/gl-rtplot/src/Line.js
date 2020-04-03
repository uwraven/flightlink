import CoreObject from './Core/CoreObject';

class Line2 {

    /**
     * @property {BufferColor} color - line color (RGBA)
     */
    color;

    /**
     * @property {Number} points - number of points to be rendered
     */
    points;

    /**
     * @property {Boolean} visible - flag to render the line
     */
    visible;

    /**
     * @property {Boolean} closed - If the line should be closed
     */
    closed;

    /**
     * @property {Float32Array} xy - Buffer of line data (x, y) coords
     */
    xy;

    /**
     * @property {Number} max - maximum value, allows for normalization
     */
    max;

    /**
     * @private
     * @property {WebGLBuffer} _vbuffer - WebGL vertex buffer
     */
    _vbuffer;

    /**
     * @private
     * @property {WebGLProgram} _prog - WebGL program
     */
    _prog;

    /**
     * @private
     * @property {Number} _coord - Base coordinate
     */
    _coord;

    /**
     * @param {Color} color - the color of the line
     * @param {Number} points - the number of points to be rendered
     */
    constructor(color, points) {
        this.color = color;
        this.points = points;

        this.scaleX = 1;
        this.scaleY = 1;
        this.offsetX = 0;
        this.offsetY = 0;

        this.visible = true;

        this.closed = false;

        this.xy = new Float32Array(2 * points);
        this._vbuffer = 0;
        this._prog = 0;
        this._coord = 0;

    }

    setColor(color) {
        this.color = color;
    }

    setX(index, x) {
        this.xy[index * 2] = x;
    }

    setY(index, y) {
        this.xy[index * 2 + 1] = y;
    }

    getX(index) {
        return this.xy[index * 2];
    }

    getY(index) {
        return this.xy[index * 2 + 1];
    }

    setLinspace(x0, dx) {
        for (let i = 0; i < this.points; i++) this.setX(i, x0 + i * dx);
    }

    fillY(y) {
        for (let i = 0; i < this.points; i++) this.setY(i, y);
    }

    fill(x0, dx, y) {
        for (let i = 0; i < this.points; i++) {
            this.setX(i, x0 + dx * i);
            this.setY(i, y);
        }
    }

    /**
     * 
     * @param {Float32Array} data - new data
     */
    shiftAdd(data) {
        const shiftLen = data.length;
        for (let i = 0; i < this.points - shiftLen; i++) {
            this.setY(i, this.getY(i + shiftLen));
        }
        for (let i = 0; i < shiftLen; i++) {
            this.setY(i + this.points - shiftLen, data[i]);
        }
    }

    
}

// export default Line;

class Line extends CoreObject {

    color;
    isLine = true;

    constructor(color, points) {
        super();
        this.color = color;
        this.buffer = new Float32Array(2 * points);
        this.scale = {x: 1, y: 1};
        this.origin = {x: 0, y: 0};
    }

    setX = (i, x) => { this.buffer[i * 2] = x }

    setY = (i, x) => { this.buffer[i * 2 + 1] = x }

    getX = (i) => this.buffer[i * 2];

    getY = (i) => this.buffer[i * 2 + 1];

    linspace(x0, dx) {
        for (let i = 0; i < this.points; i++) this.setX(i, x0 + i * dx);
    }

    fillY(y) {
        for (let i = 0; i < this.points; i++) this.setY(i, y);
    }

    fill(x0, dx, y) {
        for (let i = 0; i < this.points; i++) {
            this.setX(i, x0 + dx * i);
            this.setY(i, y);
        }
    }

    /**
     * 
     * @param {Float32Array} data a fresh buffer of data
     */
    push(data) {
        const len = data.length;
        for (let i = 0; i < this.bufferSize - len; i++) {
            this.setY(i, this.getY(i + len));
        }
        for (let i = 0; i < len; i++) {
            this.setY(i + this.bufferSize - len, data[i]);
        }
    }


}

export default Line;