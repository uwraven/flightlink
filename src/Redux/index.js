import { combineReducers } from '@reduxjs/toolkit';
import InterfaceSlice from './Interface/InterfaceSlice';
import DeviceSlice from './Record/Device/DeviceSlice';
import RecordSlice from './Record/RecordSlice';
import SignalSlice from './Record/Signal/Signal';
import ConfigureSlice from './Configure/ConfigureSlice';
import SignalEditorSlice from './Configure/SignalEditorSlice';

export default combineReducers({
    interface: InterfaceSlice,
    record: RecordSlice,
    device: DeviceSlice,
    signal: SignalSlice,
    configure: ConfigureSlice,
    signalEditor: SignalEditorSlice
});
