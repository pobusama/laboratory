import React, {Component} from 'react';
import MyContainer from './MyContainer';

@MyContainer
class MyComponent extends Component {
    method() {
        console.log('MyComponent method');
    }
    render() {
        return <div>{this.props.text}</div>;
    }
}
export default MyComponent;
