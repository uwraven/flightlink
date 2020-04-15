import { createSlice } from '@reduxjs/toolkit';

const InterfaceSlice = createSlice({
    name: 'interface',
    initialState: {
        commandPaletteOpen: true,
        consoleOpen: false,
        selectedTab: 0
    },
    reducers: {
        setCommandPaletteOpen(state, action) {
            state.commandPaletteOpen = action.payload;
        },
        setSelectedTab(state, action) {
            if (action.payload !== state.selectedTab) {
                state.selectedTab = action.payload;
            }
        },
        setConsoleOpen(state, action) {
            state.consoleOpen = action.payload;
        }
    }
});

export const { setCommandPaletteOpen, setSelectedTab } = InterfaceSlice.actions;
export default InterfaceSlice.reducer;
