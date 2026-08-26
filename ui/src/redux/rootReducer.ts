import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
const rootReducer: any = combineReducers({
    auth: authReducer
})
export default rootReducer