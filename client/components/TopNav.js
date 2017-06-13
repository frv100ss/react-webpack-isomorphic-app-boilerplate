import React from "react";
import {Link} from "react-router-dom";
import Drawer from 'material-ui/Drawer';
import Auth from '../modules/Auth';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const styles = {
    title: {
        cursor: 'pointer',
    },
};


class TopNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.handleHomePage = this.handleHomePage.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
    }

    handleHomePage() {this.props.history.push('/')};
    handleMenu() {this.setState({open: !this.state.open})};

    render() {
        return (
            <AppBar style={{height: "60px", marginBottom: "30px"}}
                    title={<span style={styles.title}>React-App</span>}
                    onTitleTouchTap={this.handleHomePage}
                    onLeftIconButtonTouchTap={this.handleMenu}
            >

                <Drawer open={this.state.open}
                        containerStyle={{
                            backgroundColor: "#00BCD4",
                        }}
                >
                    {Auth.isUserAuthenticated() ? (
                        <div>
                            <IconButton><NavigationClose onClick={this.handleMenu}/></IconButton>
                            <MenuItem style={{color: "white"}}>Gérer blog France</MenuItem>
                            <MenuItem style={{color: "white"}}>Gérer blog International</MenuItem>
                        </div>

                        ) : (
                            <div>
                                <IconButton><NavigationClose onClick={this.handleMenu}/></IconButton>
                                <MenuItem style={{color: "white"}}>Actu Politique France</MenuItem>
                                <MenuItem style={{color: "white"}}>Actu Politique Internationale</MenuItem>
                            </div>
                        )}

                </Drawer>

                <div className="top-bar">
                    {Auth.isUserAuthenticated() ? (
                        <div className="top-bar-right">
                            <Link to="/logout">Se déconnecter</Link>
                        </div>
                    ) : (
                        <div className="top-bar-right">
                            <Link to="/login">Se connecter</Link>
                            <Link to="/signup">S'inscrire</Link>
                        </div>
                    )}
                </div>
            </AppBar>
        )
    }

}


export default TopNav