export default function ViewModel() {
    let self = this;
    this.params = {
        params_todoList: {
            todos: self.todos
        },
        params_clock: {
            clockText: self.clockText
        }
    };
}

