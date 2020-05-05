import { createSlice } from '@reduxjs/toolkit';

const InterfaceSlice = createSlice({
    name: 'interface',
    initialState: {
        commandPaletteOpen: true,
        consoleOpen: false,
        selectedTab: 1,
        renderOpen: false,
        streamOpen: true
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
        },
        setRenderOpen(state, action) {
            state.renderOpen = action.payload;
        },
        setStreamOpen(state, action) {
            state.streamOpen = action.payload;
        }
    }
});

export const {
    setCommandPaletteOpen,
    setSelectedTab,
    setConsoleOpen,
    setRenderOpen,
    setStreamOpen
} = InterfaceSlice.actions;

export default InterfaceSlice.reducer;
