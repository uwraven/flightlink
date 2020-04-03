import Line from "./Line";
import Color from "./Core/Color";
import {LineShader} from "./Shaders";

export default class Renderer {

    constructor(parameters) {
        var _canvas, _context;
        _canvas = parameters.canvas ? parameters.canvas : document.createElement("canvas"); 
        _context = parameters.context ? parameters.context : null;

        let _attributes = {
            antialias: parameters.antialias !== undefined ? parameters.antialias : true,
            alpha: parameters.alpha !== undefined ? parameters.alpha : false,
            powerPreference: parameters.powerPreference !== undefined ? parameters.powerPreference : 'default',
            premultipliedAlpha: parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
            depth: parameters.depth !== undefined ? parameters.depth : false
        };

        var _gl;

        try {
            _gl = !_context ? _canvas.getContext('webgl', _attributes) : _context;
            _gl.enable(_gl.DEPTH_TEST);
            _gl.depthFunc(_gl.LESS);
            _gl.clear(_gl.COLOR_BUFFER_BIT || _gl.DEPTH_BUFFER_BIT);
            _gl.viewport(0, 0, _canvas.width, _canvas.height);
        } catch(error)  {
            console.error('GLPlot: ', error.message);
            throw error;
        }

        this.properties = {
            canvas: _canvas,
            context: _context,
            attributes: _attributes
        }
        this.objects = [];

        var _width, _height, _pixelRatio

        this.setSize = (width, height) => {
            _width = width;
            _height = height;
            this.properties.canvas.width = Math.floor(_width * _pixelRatio);
            this.properties.canvas.height = Math.floor(_height * _pixelRatio);
            _gl.viewport(0, 0, _width, _height);
        }

        this.getSize = () => {
            return {
                _width,
                _height
            }
        }

        this.setPixelRatio = (pixelRatio) => {
            _pixelRatio = pixelRatio;
        }

        this.getPixelRatio = () => {
            return _pixelRatio;
        }

        this.disposeContext = () => {
            const ext = _gl.getExtension('WebGL_lose_context');
            if (!ext) {
                console.warn("WebGL_lose_context extension unavailable, cannot manually dispose of current WebGL context");
                console.log("https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context/loseContext");
                return;
            }
            ext.loseContext()
            this.objects.map(object => object.dispose());
        }

        this.instantiateObject = (object) => {
            object._vbuffer = _gl.createBuffer();

            if (object.isLine) {

                _gl.bindBuffer(_gl.ARRAY_BUFFER, object._vbuffer);
                
                _gl.bufferData(
                    _gl.ARRAY_BUFFER,
                    object.buffer,
                    _gl.STREAM_DRAW
                );

                let vertexShader = _gl.createShader(_gl.VERTEX_SHADER);
                _gl.shaderSource(vertexShader, LineShader.VERTEX);
                _gl.compileShader(vertexShader);

                let fragmentShader = _gl.createShader(_gl.FRAGMENT_SHADER);
                _gl.shaderSource(fragmentShader, LineShader.FRAGMENT);
                _gl.compileShader(fragmentShader);
                _gl.attachShader(object.program, fragmentShader);

                object.program = _gl.createProgram();

                _gl.attachShader(object.program, vertexShader);
                _gl.attachShader(object.program, fragmentShader);

                _gl.linkProgram(object.program);
                _gl.bindBuffer(_gl.ARRAY_BUFFER, object._vbuffer);

                object._coord = _gl.getAttribLocation(object.program, "uv");
                _gl.vertexAttribPointer(object._coord, 2, _gl.FLOAT, false, 0, 0);
                _gl.enableVertexAttribArray(object._coord);

            }
        }

        this.renderObject = (object) => {

            _gl.useProgram(object.program);

            _gl.uniformMatrix2fv(
                _gl.getUniformLocation(object.program, "u_scale"),
                false,
                new Float32Array([object.scale.x, 0, 0, object.scale.y])
            );

            _gl.uniform2fv(
                _gl.getUniformLocation(object.program, "u_origin"),
                new Float32Array([object.origin.x, object.origin.y])
            )

            if (object.isLine) {

                _gl.uniform4fv(
                    _gl.getUniformLocation(object.program, "u_color"),
                    object.color.r,
                    object.color.g,
                    object.color.b, 
                    object.color.a
                );

                _gl.bufferData(
                    _gl.ARRAY_BUFFER,
                    object.buffer,
                    _gl.STREAM_DRAW
                );

                _gl.drawArrays(
                    _gl.LINE_STRIP,
                    0,
                    object.bufferSize
                );

                return;
            }
        }

        this.render = () => {
            this.objects.map(object => this.renderObject(object));
        }

    }
}