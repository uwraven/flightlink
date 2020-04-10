import types from './types';

const initialState = {
    commandPaletteVisibility: true
};

const Interface = (state = initialState, action) => {
    const { type, value } = action;

    switch (type) {
        case types.COMMAND_PALETTE_VISIBILITY: {
            return {
                ...state,
                commandPaletteVisibility: value
            };
        }
        default: {
            return state;
        }
    }
};

export { Interface as default, types };
