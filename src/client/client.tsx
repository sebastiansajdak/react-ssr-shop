import * as firebase from 'firebase/app';
import App from '../components/App';
import firebaseConfig from '../firebaseConfig';
import promiseMiddleware from 'redux-promise-middleware';
import React from 'react';
import ReactDOM from 'react-dom';
import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { IStore } from '../types';
import { applyMiddleware, compose, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'firebase/firestore';

declare global {
    interface Window {
        APP_STATE: IStore;
        __REDUX_DEVTOOLS_EXTENSION__: any;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunkMiddleware, promiseMiddleware];
const devTools = process.env.NODE_ENV === 'production' ?
        applyMiddleware(...middlewares)
    :
        composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(
    reducers,
    { ...window.APP_STATE },
    devTools
);

ReactDOM.hydrate(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('app'),
);
