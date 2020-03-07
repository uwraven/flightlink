// This is a Javascript ES6 implementation of danchitnis' awesome typescript webgl stream plotting library
// https://github.com/danchitnis/webgl-plot/tree/master/src

class WebGLPlot {

    scaleX;
    scaleY;
    ratioXY;
    offsetX;
    offsetY;
    gl;
    size;
    lines;
    grid;
    
    /**
     * @param  {HTMLCanvasElement} context
     * @param  {} params - Standard webgl context parameters (e.g. antialias, transparency)
     */
    constructor(canvas, params) {
        this.renderTarget = canvas;
        let pixelRatio = window.devicePixelRatio || 1;

        this.size = {
            width: canvas.width * pixelRatio,
            height: canvas.height * pixelRatio
        }
        let gl = canvas.getContext("webgl", params);

        this.scaleX = 1 / pixelRatio;
        this.scaleY = 1 / pixelRatio;
        // this.ratioXY = this.size.width / this.size.height;
        this.ratioXY = 1;
        // Offsets are normalized to canvas space
        this.offsetX = -1.0;
        this.offsetY = -0.5;

        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, this.size.width, this.size.height);

        this.gl = gl;

        this.lines = [];
    }
    /**
     * @description Updates plot contents
     */
    update() {
        const gl = this.gl;
        this.lines.map(line => {
            if (line.visible) {
                gl.useProgram(line._prog);

                const uscale = gl.getUniformLocation(line._prog, "uscale");
                gl.uniformMatrix2fv(
                    uscale,
                    false,
                    new Float32Array([
                        line.scaleX * this.scaleX,
                        0,
                        0,
                        line.scaleY * this.scaleY * this.ratioXY
                    ])
                );

                const uoffset = gl.getUniformLocation(line._prog, "uoffset");
                gl.uniform2fv(
                    uoffset,
                    new Float32Array([
                        line.offsetX + this.offsetX,
                        line.offsetY + this.offsetY
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
                    line.length
                )
            }
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
     * @param  {BufferLine} line - A BufferLine object
     * @description Instantiates a new webgl instance from a BufferLine object and draws to a webgl context.
     */
    addLine(line) {
        line._vbuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, line._vbuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            line.xy,
            this.gl.STREAM_DRAW
        )

        // Attach vertext shader
        const vertexShaderCode = `
            attribute vec2 coordinates;
            uniform mat2 uscale;
            uniform vec2 uoffset;

            void main(void) {
                gl_Position = vec4(uscale*coordinates + uoffset, 0.0, 1.0);
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

        line._coord = this.gl.getAttribLocation(line._prog, "coordinates");
        this.gl.vertexAttribPointer(
            line._coord,
            2, 
            this.gl.FLOAT,
            false,
            0,
            0,
        );
        this.gl.enableVertexAttribArray(line._coord);

        this.lines.push(line);

    }

}

export default WebGLPlot