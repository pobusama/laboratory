import store from './store';
import {bindActionCreators} from 'redux';
import * as actionCreators from './action';

const {dispatch} = store;
export default bindActionCreators({...actionCreators}, dispatch);
