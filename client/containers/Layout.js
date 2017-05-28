import { Switch, Route } from 'react-router-dom'
import React from "react";
import TopNav from './../components/TopNav'
import * as Routes from './../routes/Routes'

const Layout = props => {
  return (
    <div>
      <TopNav />
      <Switch>
        <Route exact path="/" component={Routes.HomePage}/>
        <Route path="/login" component={Routes.LoginPage}/>
        <Route path="/signup" component={Routes.SignUpPage}/>
      </Switch>
    </div>
  )
};

export default Layout;

