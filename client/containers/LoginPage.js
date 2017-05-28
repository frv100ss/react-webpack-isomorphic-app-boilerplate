import React from "react";
import LoginForm from "../components/LoginForm.js";

class LoginPage extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.mounted = false;
    this.processForm = this.processForm.bind(this);
    this.handleChange = this.handleChange.bind(this);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };
  }

  componentDidMount() {
    this.mounted = true;
    console.log('ComponentDidMount');
  }

  componentWillUnmount() {
    this.mounted = false;
    console.log('componentWillUnmount');
  }

  handleChange(event) {
    console.log('mountedOrNot', this.mounted);
    const field = event.target.name;
    console.log('lolo', field)
    const user = this.state.user;
    user[field] = event.target.value;

      this.setState({
        user
      });
  }

  processForm(event) {

    console.log('function processForm called');
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      console.log('Loaded')
      if (xhr.status === 200) {
        // success
        // change the component-container state
        this.setState({
          errors: {}
        });

        console.log('The form is valid');
      } else {
        // failure
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        this.setState({
          errors
        });
      }
    });
    console.log('email:', email);
    console.log('password', password);
    console.log('formData', formData);
    xhr.send(formData);
  }
  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.handleChange}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

export default LoginPage;