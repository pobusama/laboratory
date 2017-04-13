import * as actionTypes from './actionType';

//action creators
export const addTodo = text => ({
    type: actionTypes.ADD_TODO,
    text
});

export const updateClock = config => ({
    type: actionTypes.SET_CLOCK,
    config
});
