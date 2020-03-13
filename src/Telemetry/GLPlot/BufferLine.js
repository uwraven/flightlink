class BufferLine {

    /**
     * @property {BufferColor} color - line color (RGBA)
     */
    color;

    /**
     * @property {Number} length - number of points to be rendered
     */
    length;

    /**
     * @property {Boolean} visible - flag to render the line
     */
    visible;

    /**
     * @property {Number} intensity - rendered intensity of the line
     */
    intensity;

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
     * @param {BufferColor} color - the color of the line
     * @param {Number} length - the number of points to be rendered
     */
    constructor(color, length) {
        this.color = color;
        this.length = length;

        this.scaleX = 1;
        this.scaleY = 1;
        this.offsetX = 0;
        this.offsetY = 0;

        this.visible = true;
        this.intensity = 1;

        this.closed = false;

        this.xy = new Float32Array(2 * length);
        this._vbuffer = 0;
        this._prog = 0;
        this._coord = 0;

        this.max = 0;
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

    setLinearSpace(x0, dx) {
        for (let i = 0; i < this.length; i++) this.setX(i, x0 + i * dx);
    }

    fillY(y) {
        for (let i = 0; i < this.length; i++) this.setY(i, y);
    }

    fill(x0, dx, y) {
        for (let i = 0; i < this.length; i++) {
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
        for (let i = 0; i < this.length - shiftLen; i++) {
            this.setY(i, this.getY(i + shiftLen));
        }
        for (let i = 0; i < shiftLen; i++) {
            this.setY(i + this.length - shiftLen, data[i]);
        }
    }

    
}

export default BufferLine;