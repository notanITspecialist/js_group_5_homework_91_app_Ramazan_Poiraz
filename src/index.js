import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {createBrowserHistory} from "history";
import {ConnectedRouter, connectRouter, routerMiddleware} from "connected-react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import user from "./reducers/authorization";
import chatReducer from "./reducers/chatReducer";

const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    authorization: user,
    chat: chatReducer
});

const saveUserInfo = state => {
    try {
        const save = JSON.stringify(state);
        localStorage.setItem('state', save);
    } catch (e) {
        console.log('Dont save')
    }
};

const loadUserInfo = () => {
    try {
        const load = localStorage.getItem('state');
        if(load === null) return undefined;

        return JSON.parse(load);
    } catch (e) {
        return undefined
    }
};

const middleware = [
    thunk,
    routerMiddleware(history)
];

const store = createStore(rootReducer, loadUserInfo(), applyMiddleware(...middleware));

store.subscribe(() => {
    saveUserInfo({
        authorization: {
            user: store.getState().authorization.user
        }
    })
});

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();