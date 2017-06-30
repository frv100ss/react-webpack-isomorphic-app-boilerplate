import { Route} from 'react-router-dom'
import React from "react";
import TopNav from './TopNav'
import {Redirect} from 'react-router-dom'
import Auth from './modules/Auth';
import * as Routes from './routes/Routes'

const Layout = () => {
    return (
            <div>
                <Route path="/" component={TopNav}/>
                <Route exact path='/' component={Routes.HomePageSwitcher}/>
                <Route path="/login" component={Routes.LoginPage}/>
                <Route path="/signup" component={Routes.SignUpPage}/>
                <Route path="/createArticle" component={Routes.CreateArticlePage}/>
                <Route path="/previewArticle/:category/:title" component={Routes.PreviewArticlePage}/>
                <Route path="/info/:category/:title" component={Routes.ArticlePage}/>
                <Route path="/updateArticle/:_id" component={Routes.UpdateArticlePage}/>
                <Route path="/logout" render={() => {
                    Auth.deauthenticateUser();
                    return (
                        <Redirect to="/"/>
                    )
                } }/>
            </div>
    )
};

export default Layout;
