import React from "react";
import HomePage from '../components/HomePage';
import Auth from '../modules/Auth';
import DashboardPage from './DashboardPage';

const HomePageSwitcher = () => (
Auth.isUserAuthenticated()
    ? <DashboardPage/>
    : <HomePage/>
);
export default HomePageSwitcher;