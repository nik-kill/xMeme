import {
    GET_MEMES,
    ADD_MEME,
    DELETE_MEME,
    MEMES_LOADING
} from '../actions/types';

const initalState = {
    memes: [],
    loading: false
};

export default function(state = initalState, action) {
    switch (action.type) {
        case GET_MEMES:
            return{
                ...state,
                memes: action.payload,
                loading: false
            };
        case DELETE_MEME:
            return {
                ...state,
                memes: state.memes.filter(item => item._id !== action.payload)
            };
        case ADD_MEME:
            return {
                ...state,
                memes: [action.payload, ...state.memes]
            };
        case MEMES_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}