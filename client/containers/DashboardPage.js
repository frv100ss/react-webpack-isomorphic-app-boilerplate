import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.js';

class DashboardPage extends React.Component {
    /**
     * Class constructor.
     */
    constructor(props, context) {
        super(props, context);
        this.state = {
            secretData: '',
            userInformation: '',
            errors:{}
        };

    }

    /**
     * This method will be executed after initial rendering.
     */
    componentDidMount() {

        const storedUser = localStorage.getItem('userInformation');
        let userInformation = '';

        if (storedUser) {
            userInformation = storedUser;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/dashboard');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // set the authorization HTTP header
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    secretData: xhr.response.message,
                    userInformation: storedUser
                });
            }
            localStorage.removeItem('userInformation');
        });
        xhr.send();
    }
    /**
     * Render the component.
     */
    render() {
        return (<Dashboard
            props={this.props}
            secretData={this.state.secretData}
            userInformation={this.state.userInformation}
        />);
    }

}




export default DashboardPage