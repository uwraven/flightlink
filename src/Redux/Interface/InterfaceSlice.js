import { createSlice } from '@reduxjs/toolkit';

const InterfaceSlice = createSlice({
    name: 'interface',
    initialState: {
        commandPaletteVisibility: true
    },
    reducers: {
        setCommandPaletteVisibility(state, action) {
            state.commandPaletteVisibility = action.payload;
        }
    }
});

export const { setCommandPaletteVisibility } = InterfaceSlice.actions;

export default InterfaceSlice.reducer;
