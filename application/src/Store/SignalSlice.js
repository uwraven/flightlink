import { createSlice } from '@reduxjs/toolkit';

const SignalSlice = createSlice({
    name: 'signal',
    initialState: {
        configurationOptions: [],
        selectedConfiguration: -1
    },
    reducers: {
        setConfigurationOptions(state, action) {
            state.configurationOptions = action.payload;
        },
        setSelectedConfiguration(state, action) {
            state.selectedConfiguration = action.payload;
        }
    }
});

export const { setConfigurationOptions, setSelectedConfiguration } = SignalSlice.actions;

export default SignalSlice.reducer;

export const loadConfigurations = () => async (dispatch) => {
    dispatch(setConfigurationOptions([]));
};
