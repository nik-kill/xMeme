import { combineReducers } from 'redux';
import memeReducer from './memeReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    meme: memeReducer,
    error: errorReducer,
    auth: authReducer
});