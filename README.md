## About

This **`webpack-boilerplate`** for [React](https://facebook.github.io/react/) aims to run **`universal rendering`** also called **`isomorphic app`** <br>

**It comes with [React-Router V4](https://reacttraining.com/react-router/web/guides/quick-start)** <br>
And it also contains minimals login boxes to start a project with user's stories 

* **In production mode :** <br> 
It runs **`server side rendering`** and **`asynchronous routes`** on client side <br>

* **In development mode** : <br>
It runs **`react-hot-loader`** and **`synchronous routes`** <br>
**`Server side rendering`** is turn off in this mode

## Usage
```
git clone https://github.com/frv100ss/react-webpack-isomorphic-app-boilerplate.git
npm install

NB : You have to install and use MongoDb then start server to store token. 

```

### Main Dependencies

* [React](https://facebook.github.io/react/)
* [React-Router V4](https://reacttraining.com/react-router/web/guides/quick-start)
* [Webpack 2](https://webpack.js.org/)
* [babel-loader](https://github.com/babel/babel-loader)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)
* [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html)
* [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [bcrypt](https://www.bcrypt.fr/)
* [express 4](http://expressjs.com/fr/api.html)
* [jsonwebtoken](https://www.jsonwebtoken.io/)
* [material-ui](http://www.material-ui.com/#/)
* [mongoose](http://mongoosejs.com/)
* [nodemon](https://nodemon.io/)
    
    
## Setup for development environment

##### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will **hot-reload** if you make edits.<br>
You will also see any lint errors in the console.

* React **hot loader is activated** 
* Routes are in **synchronous mode** on client side
* There is **no server side rendering** 

## Setup for production environment

##### `npm run build`

Runs the app in the production mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

* React **hod loader** is **unactivated** 
* Routes are **asynchronous** on client side
* **server side rendering** is **activated**

### Special thanks for source sharing and free online tutorials to :

* [Apostolos Tsakpinis : "Server-side rendering, code-splitting, and hot reloading with React Router v4"](https://medium.com/@apostolos/server-side-rendering-code-splitting-and-hot-reloading-with-react-router-v4-87239cfc172c)
* [Vladimir Ponomarev : "Authentication in React Applications, Part 1 : creating components"](https://vladimirponomarev.com/blog/authentication-in-react-apps-creating-components)
* [Vladimir Ponomarev : "Authentication in React Applications, Part 2: JSON Web Token (JWT)](https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt)
* [Sokra : react-webpack-server-side-example](https://github.com/webpack/react-webpack-server-side-example)
