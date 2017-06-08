import React from "react";
import LoginForm from "../components/LoginForm.js";
import Auth from '../modules/Auth';
import { Redirect } from 'react-router-dom'


class LoginPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props, context) {
        super(props, context);


        this.processForm = this.processForm.bind(this);
        this.handleChange = this.handleChange.bind(this);

        // set the initial component state
        this.state = {
            redirectToDashboardPage: null,
            successMessage :"",
            errors: {},
            user: {
                email: '',
                password: ''
            }
        };
    }

    componentDidMount(){
        const storedMessage = localStorage.getItem('successMessage');
        let successMessage = '';

        if (storedMessage) {
            this.setState({
                successMessage: storedMessage
            });
            localStorage.removeItem('successMessage');
        }
    }
    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        // create a string for an HTTP body message
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // success
                // change the component-container state
                this.setState({
                    errors: {}
                });

                // save the token
                Auth.authenticateUser(xhr.response.token);
                // change the current URL to /
                this.setState({redirectToDashboardPage : '/'})
            } else {
                // failure
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;
                this.setState({
                    errors
                });
            }
        });

        xhr.send(formData);
    }

    handleChange(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <div>
                {this.state.redirectToDashboardPage
                    ? <Redirect to={{pathname: this.state.redirectToDashboardPage}}/>
                    : <LoginForm
                        onSubmit={this.processForm}
                        onChange={this.handleChange}
                        successMessage={this.state.successMessage}
                        errors={this.state.errors}
                        user={this.state.user}
                    />
                }
            </div>
        );
    }
}

export default LoginPage;