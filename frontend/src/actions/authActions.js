import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

//checking token and then load user
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING});

    axios.get('https://x4meme.herokuapp.com/user/user',tokenConfig(getState))
    .then(res => 
        dispatch({
            type:USER_LOADED,
            payload: res.data
        })
    ).catch(err => {
        if (err.response && err.response.data && err.response.status) 
            dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
};

//Registering User
export const register = ({ name, username, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, username, password});

    axios.post('https://x4meme.herokuapp.com/user/register', body, config)
    .then(res =>
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    ).catch(err => {
        dispatch(
            returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
        );
        dispatch({
            type: REGISTER_FAIL
        });
    });
    console.log("USER REGISTERED");
};

//Loging User
export const login = ({ username, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password });

    axios.post('https://x4meme.herokuapp.com/user/login', body, config)
    .then(res => 
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    ).catch(err => {
        dispatch(
            returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
        );
        dispatch({
            type: LOGIN_FAIL
        });
    });
    console.log("USER LOGIN");
};

//LogOut
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

//Setup config/headers and token
export const tokenConfig = getState => {

    const token = getState().auth.token;
    console.log(token);
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if(token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
};
