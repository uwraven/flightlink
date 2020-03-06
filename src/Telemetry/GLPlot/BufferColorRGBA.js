class BufferColorRGBA {
    /**
     * @property {Number} r - Red component (0 - 1)
     */
    r;
    
    /**
     * @property {Number} g - Green component (0 - 1)
     */
    g;

    /**
     * @property {Number} b - Green component (0 - 1)
     */
    b;

    /**
     * @property {Number} a - Alpha component (0 - 1)
     */
    a;

    /**
     * 
     * @param {Number} r - Red (0 - 1)
     * @param {Number} g - Green (0 - 1)
     * @param {Number} b - Blue (0 - 1)
     * @param {Number} a - Alpha (0 - 1)
     */
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

export default BufferColorRGBA;