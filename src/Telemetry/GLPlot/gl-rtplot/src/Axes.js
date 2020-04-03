import Line from './Line';
import Color from './Core/Color';

export default class Axes {
    x
    y
    grid

    enabled

    /**
     *
     * @param {Color} color - axes color
     * @param {Boolean} enableGrid - enable background grid
     */

    constructor(color) {
        this.enabled = true;
        this.x = {
            line: new Line(color, 2)
        }
        this.y = {
            line: new Line(color, 2)
        }
        this.x.line.xy = new Float32Array([-1, 0, 1, 0]);
        this.y.line.xy = new Float32Array([0, -1, 0, 1]);

        this.grid = {
            static: false,
            enabled: false,
            lines: {
                x: [],
                y: []
            }
        }
    }

    render(gl) {
        
    }

    /**
     * @description Returns a new axes instance with major-minor grid
     * @param {Color} majorColor 
     * @param {Color} minorColor 
     * @param {Number} xIntervals
     * @param {Number} yIntervals 
     */
    static Grid(majorColor, minorColor, xIntervals, yIntervals) {
        let axes = new Axes(majorColor);

        axes.grid.static = true;
        axes.grid.enabled = true;

        for (let i = -xIntervals; i < xIntervals; i++) {
            if (i !== 0) {
                let line = new Line(minorColor, 2);
                line.xy = new Float32Array([i / xIntervals, -1, i / xIntervals, 1]);
                axes.grid.lines.x.push(line);
            }
        }

        for (let i = -yIntervals; i < yIntervals; i++) {
            if (i !== 0) {
                let line = new Line(minorColor, 2);
                line.xy = new Float32Array([-1, i / yIntervals, 1, i / yIntervals]);
                axes.grid.lines.y.push(line);
            }
        } 

        return axes;
    }

}