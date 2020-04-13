import { combineReducers } from '@reduxjs/toolkit';
import InterfaceSlice from './Interface/InterfaceSlice';
import DeviceSlice from './Record/Device/DeviceSlice';

export default combineReducers({
    interface: InterfaceSlice,
    device: DeviceSlice
});
