import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Route, Switch, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import eventBus from "../common/eventBus";
import Home from "../components/home/Home";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import Profile from "../components/user-board/Profile";
import AuthVerify from "../common/auth-verify";

import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";

import {history} from '../history/history';


class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined,
        };

        history.listen((location) => {
            props.dispatch(clearMessage()); 
        });
    }

    componentDidMount() {
        const user = this.props.user;

        if (user) {
            this.setState({
                currentUser: user,
            });
        }

        eventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        eventBus.remove("logout");
    }

    logOut() {
        this.props.dispatch(logout());
        this.setState({
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const { currentUser } = this.state;

        return (
            <Router history={history}>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <Link to={"/"} className="navbar-brand">
                            REACT APP
                        </Link>
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={"/home"} className="nav-link">
                                    Home
                                </Link>
                            </li>

                            {currentUser && (
                                <li className="nav-item">
                                    <Link to={"/user"} className="nav-link">
                                        User
                                    </Link>
                                </li>
                            )}
                        </div>

                        {currentUser ? (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        {currentUser.username}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="/signIn" className="nav-link" onClick={this.logOut}>
                                        LogOut
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/signIn"} className="nav-link">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/signUp"} className="nav-link">
                                        Sign Up
                                    </Link>
                                </li>
                            </div>
                        )}
                    </nav>

                    <div className="container mt-3">
                        <Switch>
                            <Route exact path={["/", "/home"]} component={Home} />
                            <Route exact path="/signIn" component={SignIn} />
                            <Route exact path="/signUp" component={SignUp} />
                            <Route exact path="/profile" component={Profile} />
                        </Switch>
                    </div>

                     <AuthVerify logOut={this.logOut}/> 
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(App);