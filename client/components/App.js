import React from 'react'
import Layout from '../containers/Layout'
import {BrowserRouter} from 'react-router-dom'

const App = () => (

    <div id="app-routes">
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </div>
);

export default App;