import BufferLine from './BufferLine';
import BufferColorRGBA from './BufferColorRGBA';

export default class BufferAxes {
    _x
    _y
    _grid

    enabled

    /**
     * 
     * @param {BufferColor} color - axes color
     * @param {BufferGrid} grid - background grid
     */

    constructor(color, grid) {
        this.enabled = true;
        this._x = {
            line: new BufferLine(color, 2)
        }
        this._y = {
            line: new BufferLine(color, 2)
        }
        this._x.line.xy = new Float32Array([-1, 0, 1, 0]);
        this._y.line.xy = new Float32Array([0, -1, 0, 1]);
    }
}