import ko from 'knockout';
import template from './template.html';

ko.components.register('clock', {
    viewModel(params) {
        Object.assign(this, params);
    },
    template
});
