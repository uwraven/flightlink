import Line from "./Line";
import Axes from "./Axes";
import Color from "./Core/Color";

// https://github.com/danchitnis/webgl-plot/tree/master/src

class Plot {

    _scaleX;
    _scaleY;
    _ratioXY;
    _offsetX;
    _offsetY;
    _axes;
    _size;
    _origin;
    
    gl;
    lines;
    
    /**
     * @param  {HTMLCanvasElement} canvas
     * @param {WebGL2RenderingContext} context
     * @param  {Object} params - Standard webgl context parameters (e.g. antialias, transparency)
     */
    constructor(canvas, properties) {
        this.pixelRatio = window.devicePixelRatio || 1;

        // canvas.width = canvas.width * this.pixelRatio;
        // canvas.height = canvas.height * this.pixelRatio;

        this._size = {
            width: canvas.width,
            height: canvas.height
        }

        let gl = canvas.getContext("webgl2", properties);

        this.scale = 1.0;

        // this._ratioXY = this._size.width / this._size.height;
        // this._ratioXY = 1;
        // Offsets are normalized to canvas space
        this._origin = {
            x: 0,
            y: 0
        }

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.ALWAYS)
        gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, this._size.width, this._size.height);

        this.gl = gl;

        this.lines = [];

        if (properties.grid) {
            this._axes = Axes.Grid(
                new Color(0.6, 0.6, 0.6, 1.0),
                new Color(0.95, 0.95, 0.95, 1.0),
                12,
                6
            );
            this._axes.grid.lines.x.map(line => this.generateLine(line));
            this._axes.grid.lines.y.map(line => this.generateLine(line));
        } else {
            this._axes = new Axes(new Color(0.6, 0.6, 0.6, 1.0));
        }
        this._axes.x.line.scaleX = 1 / this._scaleX;
        this._axes.y.line.scaleY = 1 / this._scaleY;
        this._axes.x.line = this.generateLine(this._axes.x.line);
        this._axes.y.line = this.generateLine(this._axes.y.line);
    }


    layout() {
    }
    
    
    resize() {
        let canvas = this.gl.canvas;
        this.size = {
            width: canvas.width,
            height: canvas.height
        }
    }


    dispose() {
        const ext = this.gl.getExtension('WebGL_lose_context');
        if (ext) ext.loseContext();
        else {
            console.warn("WebGL_lose_context extension not available, cannot dispose of current WebGL context");
            console.log("https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context/loseContext");
        }
    }

    // Axes getters / setters
    set scaleX(x) {
        this._axes.x.line.scaleX = 1 / x;
        this._scaleX = x;
    }

    set scaleY(y) {
        this._axes.y.line.scaleY = 1 / y;
        this._scaleY = y;
    }

    set size(s) {
        this._size = {
            width: s.width,
            height: s.height
        }
        this._ratioXY = this._size.width / this._size.height;
    }

    set scale(s) {
        this._scaleX = s;
        this._scaleY = s;
    }

    /**
     * @description Update plot contents
     */
    update() {
        const gl = this.gl;
        if (this._axes.enabled) {
            if (this._axes.grid.enabled) {
                this._axes.grid.lines.x.map(line => {
                    this.updateLine(line, gl)
                });
                this._axes.grid.lines.y.map(line => {
                    this.updateLine(line, gl)
                });
            }
            this.updateLine(this._axes.x.line, gl);
            this.updateLine(this._axes.y.line, gl);
        }
        this.lines.map(line => {
            if (line.visible) this.updateLine(line, gl);
        })
    }


    /**
     * @description Clears the current context
     */
    clear() {
        this.gl.clear(
            this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT
        )
    }



    /**
     * @description Generates a single line with fragment and vertex shaders, renders to the WebGL context
     * @param {BufferLine} line 
     */
    generateLine(line) {
        // Takes a line argument and generates the webgl shader, draws to active context
        line._vbuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, line._vbuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            line.xy,
            this.gl.STREAM_DRAW
        )

        // Attach vertex shader
        const vertexShaderCode = `
            attribute vec2 uv;
            uniform mat2 u_scale;
            uniform vec2 u_offset;

            void main(void) {
                gl_Position = vec4(u_scale * (uv + u_offset), 0.0, 1.0);
            }`;

        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, vertexShaderCode);
        this.gl.compileShader(vertexShader);

        // Attach fragment shader
        const fragmentShaderCode = `
            precision mediump float;
            uniform highp vec4 uColor;
            
            void main(void) {
                gl_FragColor = uColor;
            }`;

        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, fragmentShaderCode);
        this.gl.compileShader(fragmentShader);

        line._prog = this.gl.createProgram();

        this.gl.attachShader(line._prog, vertexShader);
        this.gl.attachShader(line._prog, fragmentShader);
        this.gl.linkProgram(line._prog);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, line._vbuffer);

        line._coord = this.gl.getAttribLocation(line._prog, "uv");
        this.gl.vertexAttribPointer(
            line._coord,
            2,
            this.gl.FLOAT,
            false,
            0,
            0,
        );
        this.gl.enableVertexAttribArray(line._coord);
             
        return line;
    }


    /**
     * 
     * @param {Line} line 
     * @param {*} gl
     */
    updateLine(line, gl) {
        gl.useProgram(line._prog);
        const u_scale = gl.getUniformLocation(line._prog, "u_scale");
        gl.uniformMatrix2fv(
            u_scale,
            false,
            new Float32Array([
                line.scaleX * this._scaleX,
                0,
                0,
                line.scaleY * this._scaleY
            ])
        );

        const u_offset = gl.getUniformLocation(line._prog, "u_offset");
        gl.uniform2fv(
            u_offset,
            new Float32Array([
                line.offsetX + this._origin.x,
                line.offsetY + this._origin.y
            ])
        );

        const uColor = gl.getUniformLocation(line._prog, "uColor");
        gl.uniform4fv(uColor, [
            line.color.r,
            line.color.g,
            line.color.b,
            line.color.a
        ]);

        gl.bufferData(
            gl.ARRAY_BUFFER,
            line.xy,
            gl.STREAM_DRAW
        );

        gl.drawArrays(
            gl.LINE_STRIP,
            0,
            line.points
        )
    }
    

    /**
     * @param  {Line} line - A BufferLine object
     * @description Instantiates a new webgl shader from a BufferLine object and draws to a webgl context.
     */
    addLine(line) {
        let newLine = this.generateLine(line);
        this.lines.push(newLine);
    }
}

export default Plot