import React from 'react';
import ReactDOM from 'react-dom';
import App from './Views/App/App';
import { HashRouter, Route } from 'react-router-dom';
import './constants.css';
import './index.css';
import Launcher from 'Views/Launcher/Launcher';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { launchReducer, appReducer } from 'Store';

const Console = ({props}) => {
    return (<div>
        Console
    </div>);
}

const launcherStore = configureStore({
    reducer: launchReducer
});

const appStore = configureStore({
    reducer: appReducer
})

ReactDOM.render(
    <HashRouter basename="">
        <Route path={'/splash'}>
            <Provider store={launcherStore}>
                <Launcher/>
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
