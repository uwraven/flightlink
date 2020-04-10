import types from './types';

const setCommandPaletteVisibility = (visible) => {
    return {
        type: types.COMMAND_PALETTE_VISIBILITY,
        value: visible
    };
};

const setCommandPaletteHeight = (height) => {
    return {
        type: types.COMMAND_PALETTE.SIZE.HEIGHT,
        value: height
    };
};

export { setCommandPaletteVisibility, setCommandPaletteHeight };
