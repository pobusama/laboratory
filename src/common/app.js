import './sass/app.scss';
import $ from 'jquery';
export moment from 'moment';
export React from 'react';
export * as ReactDOM from 'react-dom';
export * as Redux from 'redux';
export ReduxThunk from 'redux-thunk';
export * as ReactRedux from 'react-redux';
export Mock from 'mockjs';
import ko from 'knockout';

window.$ = $;
window.jQuery = $;
window.ko = ko;

//window.$.ajaxSettings = $.ajaxSettings || {};
window.$.ajaxSettings.crossDomain = true;
window.$.ajaxSettings.xhrFields = {
    withCredentials: true
};
