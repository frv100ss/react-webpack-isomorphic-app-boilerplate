import React, {Component} from 'react';
import {render} from "react-dom";
import Tata from "./test"
import './stylesheets/index.css';

class Toto extends Component {
    render() {
        return (
            <div>
                <p>My name is Jean</p>
                <Tata/>
            </div>

        )
    }
}

render(<Toto/>, document.getElementById('app'));