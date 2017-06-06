//Standard dependencies for our server in both development and production mode
const path = require('path');
const bodyParser = require("body-parser");
const express = require("express");
import template from './views/template';
// Here is all necessary dependencies useful for (server side) rendering
// our Layout component in production mode
import React from "react";
import Layout from "./../client/containers/Layout";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {renderToString} from "react-dom/server";
import {CookiesProvider} from 'react-cookie';
import {StaticRouter} from "react-router-dom";

//Stuff here is just required for dev mode to get the hot reloading functionality activated
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);

const staticRouter = express();
const authRoutes = require("../server/routes/auth");
const apiRoutes = require('../server/routes/api');

const config = require('./config');
require('../server/models').connect(config.dbUri);
const passport = require('passport');

// load passport strategies
const localSignupStrategy = require('../server/passport/local-signup');
const localLoginStrategy = require('../server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
const authCheckMiddleware = require('../server/middleware/auth-check');
/**
 * Here we're splitting environments based on Node_ENV value
 * If this value is dev so => doDev, and... the same for prod :)
 * We want to get our server side rendering activated only in production
 * and we want to get hot reloading functionality only in development
 * NB => On development mode we really don't need to get the server
 * side rendering activated. This would be neither useful nor easy
 * to setup and we could have some problems with our component state
 **/

const doDevEnv = () => {
    //Let's initialise our compiler then compile....
    staticRouter
        .use(require('webpack-dev-middleware')(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }))
        .use(require('webpack-hot-middleware')(compiler))
};

const doProdEnv = () => {
    //Here we just retrieve our assets and then inject our bundles into our template
    const manifest = require('../dist/build/asset-manifest.json');
    const bundleJS = manifest['main.js'];
    const bundleCSS = manifest['main.css'];

    staticRouter
    // tell the server to look for static files in these directories
        .use(express.static('./dist/build'))
        .get('*', (req, res) => {
            const context = {};
            //Here we need to set the user Agent in order muiTheme
            //works properly; We should follow the doc here:
            //http://www.material-ui.com/#/get-started/server-rendering
            //and also don't forget to specify unique id for our label (cn the client side)
            //otherwise we'll have warning error about checksums value
            const muiTheme = getMuiTheme({
                userAgent: 'all',
            });
            const html = renderToString(
                <CookiesProvider cookies={req.universalCookies}>
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <StaticRouter location={req.url} context={context}>
                            <div id="app-routes">
                                <Layout />
                            </div>
                        </StaticRouter>
                    </MuiThemeProvider>
                </CookiesProvider>
            );

            res.send(template({
                "html": html,
                "bundleJS": bundleJS,
                "bundleCSS": bundleCSS
            }));
        });
};

staticRouter.get('env') === 'production'
    ? doProdEnv()
    : doDevEnv();

staticRouter
// tell the server to parse HTTP body messages
    .use(bodyParser.urlencoded({extended: false}))
    // pass the passport middleware
    .use(passport.initialize())
    .use(bodyParser.json())
    .use('/auth', authRoutes)
    .use('/api', authCheckMiddleware)
    .use('/api', apiRoutes)
    .set('port', (process.env.PORT || 8080))
    // start the server and listen to the port
    // Ensure the correct environment setup is set
    .listen(staticRouter.get('port'), function () {
        console.log('Node server is now running on port', staticRouter.get('port'));
        console.log('The server is setup for', staticRouter.get('env'), 'mode');
    });
