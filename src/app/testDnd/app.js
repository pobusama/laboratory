import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Card from './components/card';

class App extends Component {
    render() {
        return (
            <Card />
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
