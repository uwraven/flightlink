import { combineReducers } from '@reduxjs/toolkit';
import InterfaceSlice from './Interface/InterfaceSlice';
import DeviceSlice from './Record/Device/DeviceSlice';
import RecordSlice from './Record/RecordSlice';
import SignalSlice from './Record/Signal/Signal';

export default combineReducers({
    interface: InterfaceSlice,
    record: RecordSlice,
    device: DeviceSlice,
    signal: SignalSlice
});
