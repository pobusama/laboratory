import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
let store = createStore((state = '', action) => {
    switch (action.type) {
        case 'CHANGE_VAL':
            return action.text;
        default:
            return state;
    }
});

store.subscribe(() => {
    console.log(store.getState());
});
let autobind = (target, key, descriptor) => {
    // let fn = descriptor.value;
    // return {
    //     configurable: true,
    //     get: function get() {
    //         console.log(this === target.prototype, this.hasOwnProperty(key));
    //         let bundFn = fn.bind(this);
    //         return bundFn;
    //     }
    // };
    let fn = descriptor.value;
    let definingProperty = false;
    return {
        configurable: true,
        get: function get() {
            console.log(definingProperty, this === target.prototype, this.hasOwnProperty(key));
            console.log('get');
            if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
                return fn;
            }
            let boundFn = fn.bind(this);
            definingProperty = true;
            Object.defineProperty(this, key, {
                value: boundFn,
                configurable: true,
                writable: true
            });
            definingProperty = false;
            return boundFn;
        }
    };
};
class App extends Component {
    @autobind
    handleChange(e) {
        console.log(this);
        store.dispatch({
            type: 'CHANGE_VAL',
            text: e.target.value
        });
    }
    render() {
        const {inputValprop} = this.props;
        return (
            <div>
                <input type="text" value={inputValprop} onChange={this.handleChange}/>
                <div>{inputValprop}</div>
            </div>
        );
    }
}
const Container = connect(state => ({inputValprop: state}))(App);
ReactDom.render((
    <Provider store={store}>
        <Container />
    </Provider>
    ), document.getElementById('root'));
