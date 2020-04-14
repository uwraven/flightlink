import { combineReducers } from '@reduxjs/toolkit';
import InterfaceSlice from './Interface/InterfaceSlice';
import DeviceSlice from './Record/Device/DeviceSlice';
import RecordSlice from './Record/RecordSlice';

export default combineReducers({
    interface: InterfaceSlice,
    record: RecordSlice,
    device: DeviceSlice
});
