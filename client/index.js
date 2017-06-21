import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import App from './components/App';
import {AppContainer} from "react-hot-loader";
import 'react-hot-loader/patch';
import "./styles/index.css";
import { Provider } from 'react-redux'
import store from './data/articleStore';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();
const rootEl = document.getElementById('app');

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Component />
                </MuiThemeProvider>
            </Provider>
        </AppContainer>,
        rootEl
    )
};

render(App);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        render(App)
    })
}