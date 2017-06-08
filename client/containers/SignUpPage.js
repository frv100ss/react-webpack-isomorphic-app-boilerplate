import React from "react";
import SignUpForm from "../components/SignUpForm.js";
import { Redirect } from 'react-router-dom'

class SignUpPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        // set the initial component state
        this.state = {
            redirectToLoginPage: null,
            errors: {},
            user: {
                email: '',
                name: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
        /**
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        // create a string for an HTTP body message
        const name = encodeURIComponent(this.state.user.name);
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `name=${name}&email=${email}&password=${password}`;

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/signup');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // success
                // change the component-container state
                this.setState({
                    errors: {}
                });
                // set a message
                localStorage.setItem('successMessage', xhr.response.message);
                // make a redirect
                this.setState({redirectToLoginPage : '/login'})

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


    /**
     * Change the user object.
     *
     * @param {object} event - the JavaScript event object
     */
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
                {this.state.redirectToLoginPage ?
                    <Redirect to={{pathname: this.state.redirectToLoginPage}}/> :
                    <SignUpForm
                        onSubmit={this.processForm}
                        onChange={this.handleChange}
                        errors={this.state.errors}
                        user={this.state.user}
                    />
                }
            </div>
        );
    }

}

export default SignUpPage;