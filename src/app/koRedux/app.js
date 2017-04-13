import store from './js/store';
import ViewModel from './viewModel';
import template from './template.html';
import ko from 'knockout';
import './components/todoList';
import './components/clock';
import actionCreators from './js/bindActions';
let {addTodo, updateClock} = actionCreators;

let appDOM = document.createElement('div'),
    rootDOM = document.getElementById('root');
appDOM.setAttribute('data-bind', `component: {name: 'app'}`);
rootDOM.appendChild(appDOM);

let viewModel = new ViewModel();
ko.components.register('app', {
    viewModel: {
        instance: viewModel
    },
    template
});
ko.applyBindings();
const update = () => {
    let state = store.getState();
    let {todos, clock} = state;

    viewModel.todos(todos);
    viewModel.clockText(clock);
    console.log('state:', state, '\nVM:', viewModel);
};
update();

store.subscribe(() => {
    update();
});

console.log(actionCreators);
document.onclick = () => {
    addTodo('get up');
};
setInterval(() => {
    updateClock(`${new Date()}`);
}, 1000);
