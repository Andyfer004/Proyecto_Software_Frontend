import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;