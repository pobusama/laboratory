import {createStore, bindActionCreators} from 'redux';
//actionType
const ADD_TODO = 'ADD_TODO';
// const COMPLETE_TODO = 'COMPLETE_TODO';

//reducer
const initialState = [{
    text: 'Consider using Redux',
    completed: true
}, {
    text: 'Keep all state in a single tree',
    completed: false
}];
window.initialState = initialState;

const todos = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, {
                text: action.text,
                completed: false
            }];
        default:
            return state;
    }
};

//store
const store = createStore(todos, window.initialState);//仿同构
console.log('init: ', store.getState());

//action creators
const addTodo = text => ({
    type: ADD_TODO,
    text
});
const {dispatch} = store;
const actionCreators = bindActionCreators({addTodo}, dispatch);

//action
store.subscribe(() => {
    console.log(store.getState());
});

actionCreators.addTodo('todo1');
actionCreators.addTodo('todo2');


