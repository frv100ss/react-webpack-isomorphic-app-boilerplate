import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Layout from './../containers/Layout'

const App = () => (
  <BrowserRouter>
    <div id="app-routes">
       <Layout />
    </div>
  </BrowserRouter>
);

export default App;