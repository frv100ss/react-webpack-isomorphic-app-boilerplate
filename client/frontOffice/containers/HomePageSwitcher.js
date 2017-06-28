import React from "react";
import HomePage from '../components/HomePage';
import Auth from '../../modules/Auth';
import DashboardPage from '../../backOffice/containers/DashboardPage';

const HomePageSwitcher = props => (
Auth.isUserAuthenticated()
    ? <DashboardPage {...props}/>
    : <HomePage {...props}/>
);
export default HomePageSwitcher;