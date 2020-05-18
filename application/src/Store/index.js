import { combineReducers } from '@reduxjs/toolkit';
import InterfaceSlice from './InterfaceSlice';
import DeviceSlice from './DeviceSlice';
import RecordSlice from './RecordSlice';
import ApplicationSlice from './ApplicationSlice';
import WorkspaceSlice from './Workspace';
import LauncherSlice from './LauncherSlice'

export const appReducer = combineReducers({
    interface: InterfaceSlice,
    record: RecordSlice,
    device: DeviceSlice,
    workspace: WorkspaceSlice
});

export const launchReducer = combineReducers({
    application: ApplicationSlice,
    launcher: LauncherSlice
})

/*

state = {
    interface: {}
    record: {}
    device: {}
    workspace: {
        name: "",
        configuration: {
            entities: {},
            ids: []
        },
        signal: {
            entities: {},
            ids: []
        },
        command: {
            entities: {},
            ids: []
        }
    }
}

*/