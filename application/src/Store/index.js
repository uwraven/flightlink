import { combineReducers } from '@reduxjs/toolkit';
import InterfaceSlice from './InterfaceSlice';
import DeviceSlice from './DeviceSlice';
import RecordSlice from './RecordSlice';
import SignalSlice from './SignalSlice';
import ConfigureSlice from './ConfigureSlice';
import ApplicationSlice from './ApplicationSlice';
import WorkspaceSlice from './Workspace';

export const appReducer = combineReducers({
    interface: InterfaceSlice,
    record: RecordSlice,
    device: DeviceSlice,
    signal: SignalSlice,
    configure: ConfigureSlice,
    workspace: WorkspaceSlice
});

export const splashReducer = combineReducers({
    application: ApplicationSlice
})