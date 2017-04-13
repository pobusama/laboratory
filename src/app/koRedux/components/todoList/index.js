import './index.scss?p';
import ko from 'knockout';
import template from './template.html';

ko.components.register('todoList', {
    viewModel(params) {
        Object.assign(this, params);
    },
    template
});
