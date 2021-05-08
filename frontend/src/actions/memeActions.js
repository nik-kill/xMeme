import axios from 'axios';
import { GET_MEMES, ADD_MEME, DELETE_MEME, MEMES_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getMemes = () => dispatch => {
    dispatch(setMemesLoading());
    console.log("getting");
    axios.get('http://localhost:8081/')
    .then(res =>
        dispatch({
            type: GET_MEMES,
            payload: res.data
        })
    ).catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addMeme = meme => (dispatch, getState) => {
    axios.post('http://localhost:8081/', meme, tokenConfig(getState))
    .then(res => 
        dispatch({
            type: ADD_MEME,
            payload: res.data
        })
    ).catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteMeme = id => (dispatch, getState) => {
    console.log("DELETING----- reducer");
    axios.delete(`http://localhost:8081/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_MEME,
        payload: id
    })
    ).catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setMemesLoading = () => {
    return{
        type: MEMES_LOADING
    };
};