import { createSlice } from '@reduxjs/toolkit';
import uuid from 'uuid';

const CommandsSlice = createSlice({
    name: 'commands',
    initialState: {        
        commandEntities: {},
        commandIds: [],
    },
    reducers: {
        setCommands(state, action) {
            const { commandEntities, commandIds } = action.payload;
            state.commandEntities = commandEntities;
            state.commandIds = commandIds;
        },
    }
})

export const {
    setCommands
} = CommandsSlice.actions;

export default CommandsSlice.reducer;