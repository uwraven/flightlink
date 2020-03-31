class Grid {


    /**
     * @param
    */
    constructor(dx, dy, color) {
        this.dx = dx;
        this.dy = dy;
        this.color = color;

        this._vbuffer = 0;
        this._prog = 0;
        this._coord = 0;
    }

    setColor(color) {
        this.color = color;
    }
}

export default Grid