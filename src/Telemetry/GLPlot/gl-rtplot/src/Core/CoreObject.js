class CoreObject {

    _program;
    _vbuffer;
    buffer;
    bufferSize;
    renderable = true;
    
    constructor() {

        let _origin = {
            x: 0,
            y: 0,
        };
        
        let _scale = {
            x: 0,
            y: 0,
        }

        this.setScale = (scale) => {_scale = scale}
        this.scale = () => _scale;

        this.setOrigin = (origin) => {_origin = origin}
        this.origin = () => _origin;

        this._program = 0;
        this._vbuffer = 0;
        this.buffer = 0;
        this.bufferSize = 0;

    }

    dispose() {
        this._program = null;
        this._vbuffer = null;
        this.buffer = null;
        return;
    }
}

export default CoreObject;