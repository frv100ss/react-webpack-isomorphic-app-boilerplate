import {Switch, Route} from 'react-router-dom'
import React from "react";
import TopNav from '../components/TopNav'
import {Redirect} from 'react-router-dom'
import Auth from '../modules/Auth';
import * as Routes from '../routes/Routes'

const Layout = () => {
    return (
        <div>
            <TopNav />
            <Switch>
                {Auth.isUserAuthenticated()
                    ? <Route exact path="/" component={Routes.DashboardPage}/>
                    : <Route exact path="/" component={Routes.HomePage}/>
                }
                <Route path="/login" component={Routes.LoginPage}/>
                <Route path="/signup" component={Routes.SignUpPage}/>
                <Route path="/logout" render={() => {
                    Auth.deauthenticateUser();
                    return (
                        <Redirect to="/"/>
                    )
                } }/>
            </Switch>
        </div>
    )
};

export default Layout;

