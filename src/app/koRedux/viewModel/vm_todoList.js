import ko from 'knockout';

export default function ViewModel() {
    this.todos = ko.observableArray([]);
}
