//Standard dependencies for our server in both development and production mode
const path = require('path');
const bodyParser = require("body-parser");
const express = require("express");
import fs from "fs";
// Here is all necessary dependencies useful for (server side) rendering
// our Layout component in production mode
import React from "react";
import Layout from "./../client/containers/Layout";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {renderToString} from "react-dom/server";
import {StaticRouter} from "react-router-dom";
//Here we just retrieve our assets and then inject our bundles into our template
//This is needed only in production mode for server side rendering
const manifestPath = path.resolve(__dirname, '../dist/build/asset-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const bundleJS = manifest['main.js'];
const bundleCSS = manifest['main.css'];
//Stuff here is just required for dev mode to get the hot reloading functionality activated
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);
//App is a wrapper including staticRouter + apiRouter
const staticRouter = express();
const authRoutes = require("../api/routes/auth");

/**
 * Here we're splitting environments based on Node_ENV value
 * If this value is dev so => doDev, and... the same for prod :)
 * We want to get our server side rendering activated only in production
 * and we want to get hot reloading functionality only in development
 * NB => On development mode we really don't need to get the server
 * side rendering activated. This would be neither useful nor easy
 * to setup and we could have some problems with our component state
**/

const doDevelopmentEnvironment = () => {
  //Let's initialise our compiler then compile....
  staticRouter.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }))
    .use(require('webpack-hot-middleware')(compiler))
};

const doProductionEnvironment = () => {
    staticRouter
    // tell the server to look for static files in these directories
    .use(express.static('./dist/build'))
    //set view engine and go for all routes
    .set('view engine', 'ejs')
    .set('views', path.join(__dirname))
    .get('*', (req, res) => {
      const initialState = {};
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
        <MuiThemeProvider muiTheme={muiTheme}>
          <StaticRouter location={req.url} context={context}>
            <div id="app-routes">
              <Layout />
            </div>
          </StaticRouter>
        </MuiThemeProvider>
      );
      //Here is just a workaround to avoid renaming the variable in .ejs template
      //This way we can inject the variable from webpack config plugin
      //Then udpate them just by passing the new value here
      //naming is confusing therefore... it works properly
      const htmlWebpackPlugin = {
        options: {
          "html": html,
          "bundleJS": bundleJS,
          "bundleCSS": bundleCSS,
          "initialState": JSON.stringify(initialState)
        }
      };
      res.render('template', {htmlWebpackPlugin});
      res.end();
    });
};

staticRouter.get('env') === 'production' ?
  doProductionEnvironment() :
  doDevelopmentEnvironment();

staticRouter
// tell the server to parse HTTP body messages
  .use(bodyParser.urlencoded({extended: false}))
  .use(bodyParser.json())
  .use('/api', authRoutes)
  .set('port', (process.env.PORT || 8080))
  // start the server and listen to the port
  // Ensure the correct environment setup is set
  .listen(staticRouter.get('port'), function () {
    console.log('Node server is now running on port', staticRouter.get('port'));
    console.log('The server is setup for', staticRouter.get('env'), 'mode');
  });

