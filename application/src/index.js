import React from 'react';
import ReactDOM from 'react-dom';
import App from './Views/App/App';
import { HashRouter, Route } from 'react-router-dom';
import './constants.css';
import './index.css';
import Splash from 'Views/Splash/Splash';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { splashReducer, appReducer } from 'Store';

const Console = ({props}) => {
    return (<div>
        Console
    </div>);
}

const splashStore = configureStore({
    reducer: splashReducer
});

const appStore = configureStore({
    reducer: appReducer
})

ReactDOM.render(
    <HashRouter basename="">
        <Route path={'/splash'}>
            <Provider store={splashStore}>
                <Splash/>
            </Provider>
        </Route>
        <Route path={'/app'}>
            <Provider store={appStore}>
                <App/>
            </Provider>
        </Route>
        <Route path={'/console'}>
            <Console/>
        </Route>
    </HashRouter>,
    document.getElementById('root')
);
