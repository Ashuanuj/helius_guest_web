import React from 'react';
import ReactDOM from 'react-dom';

//Store and Reducers
import { Provider } from 'react-redux';
import  configureStore  from './helper/store';
// import 'core-js/fn/number/is-nan'; 
// import 'core-js/es7/'; 
// import 'core-js/es6/'; 
// import 'raf/polyfill';

import App from './App';

const store = configureStore({});
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
document.getElementById('root'));
