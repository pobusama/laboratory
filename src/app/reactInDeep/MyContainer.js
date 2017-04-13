import React, {Component} from 'react';

const getDisplayName = (WrappedComponent) =>
    WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
const MyContainer = WrappedComponent => {
    class HOC extends Component {
        static displayName = `HOC(${getDisplayName(WrappedComponent)})`;
        proc(WrappedComponentInstance) {
            WrappedComponentInstance.method();
        }
        render() {
            const props = Object.assign({}, this.props, {
                text: 'WrappedComponent',
                ref: this.proc.bind(this)
            });
            return <WrappedComponent {...props}/>;
        }
    }
    return HOC;
};

export default MyContainer;
