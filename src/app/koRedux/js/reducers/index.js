import * as actionTypes from './../actionType';

//reducer
const initialState = [{
    text: 'Consider using Redux',
    completed: true
}];
export const todos = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO:
            return [...state, {
                text: action.text,
                completed: false
            }];
        default:
            return state;
    }
};

export const clock = (state = '', action) => {
    switch (action.type) {
        case actionTypes.SET_CLOCK:
            return action.config;
        default:
            return state;
    }
};
