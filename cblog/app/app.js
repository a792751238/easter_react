/**
 * Created by easterCat on 2017/10/9.
 */
import './index.html';
import './style/app.scss';

import "babel-polyfill";
import React from 'react';
import ReactDom from 'react-dom';
import App from './component/App';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/store';
import {logged} from './component/user/user.actions';

Promise.all([
    store.dispatch(logged())
]).then(() => {
    console.log('已进入应用');
    ReactDom.render(
        <Provider store={store}>
            <BrowserRouter>
                <Route path="/" component={App}/>
            </BrowserRouter>
        </Provider>
        ,
        document.getElementById('root')
    );
});
// ReactDom.render(
//     <Provider store={store}>
//         <BrowserRouter>
//             <Route path="/" component={App}/>
//         </BrowserRouter>
//     </Provider>
//     ,
//     document.getElementById('root')
// );