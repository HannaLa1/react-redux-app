import React, {Component} from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';

import {getCurrentUser} from '../services/authentication/AuthService';
import {ACCESS_TOKEN} from '../constants';
import SignIn from '../components/auth/signin/SignIn';
import SignUp from '../components/auth/signup/SignUp';
import AppHeader from '../components/common/header/AppHeader';
import NotFound from '../components/common/error/NotFound';
import LoadingIndicator from '../components/common/LoadingIndicator';

import {Layout, notification} from 'antd';
import PrivateRoute from "./util/PrivateRoute";
import Profile from "../components/user-board/Profile";

const { Content } = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: true
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    loadCurrentUser() {
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: "Spare Part Store",
            description: description,
        });
    }

    handleLogin() {
        notification.success({
            message: "",
            description: "You're successfully sign in!",
        });
        this.loadCurrentUser();
        this.props.history.push("/profile");
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />
        }

        return (
            <Layout className="app-container">

                <AppHeader isAuthenticated={this.state.isAuthenticated}
                           currentUser={this.state.currentUser}
                           onLogout={this.handleLogout} />

                <Content className="app-content">
                    <div className="base-container">
                        <Switch>

                            {/*<Route exact path="/"*/}
                            {/*       render={(props) =>*/}
                            {/*           <SparePartList isAuthenticated={this.state.isAuthenticated}*/}
                            {/*                        currentUser={this.state.currentUser}*/}
                            {/*                        handleLogout={this.handleLogout}*/}
                            {/*                        {...props} />}/>*/}

                            {/*<PrivateAdminRoute path="/add"*/}
                            {/*                   authenticated={this.state.isAuthenticated}*/}
                            {/*                   currentUser={this.state.currentUser}*/}
                            {/*                   component={AddProduct}*/}
                            {/*                   handleLogout={this.handleLogout}/>*/}

                            {/*<PrivateAdminRoute path="/edit/:id"*/}
                            {/*                   authenticated={this.state.isAuthenticated}*/}
                            {/*                   currentUser={this.state.currentUser}*/}
                            {/*                   component={EditProduct}*/}
                            {/*                   handleLogout={this.handleLogout}/>*/}

                            <PrivateRoute path="/profile"
                                          authenticated={this.state.isAuthenticated}
                                          currentUser={this.state.currentUser}
                                          component={Profile}/>

                            {/*<PrivateRoute path="/buy-history"*/}
                            {/*              authenticated={this.state.isAuthenticated}*/}
                            {/*              currentUser={this.state.currentUser}*/}
                            {/*              component={BuyHistory}/>*/}

                            {/*<Route path="/user/:id/basket"*/}
                            {/*       authenticated={this.state.isAuthenticated}*/}
                            {/*       currentUser={this.state.currentUser}*/}
                            {/*       handleLogout={this.handleLogout}*/}
                            {/*       component={Basket}/>*/}

                            <Route path="/signIn"
                                   render={(props) =>
                                       <SignIn onLogin={this.handleLogin}
                                              {...props} />}/>

                            <Route path="/signUp"
                                   render={(props) =>
                                       <SignUp
                                           authenticated={this.state.isAuthenticated}
                                           {...props} />}/>

                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export function isAdmin(currentUser) {
    if (currentUser !== null && currentUser !== undefined && currentUser.roles !== undefined) {
        const role = currentUser.roles.find((elem) => {
            if (elem.name === 'ROLE_ADMIN') {
                return elem.name;
            }
        });
        return role === undefined ?
            false :
            role.name === 'ROLE_ADMIN';
    }
    return false;
}

export function isUser(currentUser) {
    if (currentUser !== null && currentUser !== undefined && currentUser.roles !== undefined) {
        const role = currentUser.roles.find((elem) => {
            if (elem.name === 'ROLE_USER') {
                return elem.name;
            }
        });
        return role === undefined ?
            false :
            role.name === 'ROLE_USER';
    }
    return false;
}

export default withRouter(App);