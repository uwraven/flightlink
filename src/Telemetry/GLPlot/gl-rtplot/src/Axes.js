import BufferLine from './Line';
import BufferColorRGBA from './Color';

export default class BufferAxes {
    x
    y
    grid

    enabled

    /**
     * 
     * @param {BufferColor} color - axes color
     * @param {BufferGrid} grid - enable background grid
     */

    constructor(color, grid) {
        this.enabled = true;
        this.x = {
            line: new BufferLine(color, 2)
        }
        this.y = {
            line: new BufferLine(color, 2)
        }
        this.x.line.xy = new Float32Array([-1, 0, 1, 0]);
        this.y.line.xy = new Float32Array([0, -1, 0, 1]);

        this.grid = {
            static: false,

        }

    } 
}