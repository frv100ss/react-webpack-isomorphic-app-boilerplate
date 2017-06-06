import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import React from "react";

class Auth extends React.Component{

    constructor (props) {
        super(props)
    }

    // static propTypes = {
    //     cookies: instanceOf(Cookies).isRequired
    // };
    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    static authenticateUser(token) {
        if (typeof localStorage !== 'undefined')
            localStorage.setItem('token', token);
    }

    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
        if (typeof localStorage !== 'undefined')
            return localStorage.getItem('token') !== null;
    }

    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
        if (typeof localStorage !== 'undefined')
            localStorage.removeItem('token');
    }

    /**
     * Get a token value.
     *
     * @returns {string}
     */

    static getToken() {
        if (typeof localStorage !== 'undefined')
            return localStorage.getItem('token');
    }
}
export default (Auth);