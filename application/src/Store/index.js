import { combineReducers } from '@reduxjs/toolkit';
import InterfaceSlice from './Interface/Interface';
import DeviceSlice from './Interface/Recorder/Device';
import SocketSlice from './Interface/Recorder/Socket';
import ApplicationSlice from './Data/Application/Application';
import LauncherSlice from './Interface/Launcher/LauncherSlice'
import ConfigurationEditorSlice from './Interface/Editor/ConfigurationEditor';
import SignalEditorSlice from './Interface/Editor/SignalEditor';
import MetaSlice from './Data/Workspace/Meta';
import ConfigurationsSlice from './Data/Workspace/Configurations';
import SignalsSlice from './Data/Workspace/Signals';

export const appReducer = combineReducers({
    interface: combineReducers({
        editor: combineReducers({
            configurations: ConfigurationEditorSlice,
            signals: SignalEditorSlice,
        }),
        launcher: LauncherSlice,
        recorder: combineReducers({
            device: DeviceSlice,
            socket: SocketSlice
        }),
        dangerous: InterfaceSlice
    }),
    data: combineReducers({
        application: ApplicationSlice,
        workspace: combineReducers({
            meta: MetaSlice,
            configurations: ConfigurationsSlice,
            signals: SignalsSlice,
        })
    })
});

export const launchReducer = combineReducers({
    application: ApplicationSlice,
    launcher: LauncherSlice
})
