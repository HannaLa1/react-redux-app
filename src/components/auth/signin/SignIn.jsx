import React, {Component} from 'react';
import './SignIn.css';

import {notification} from 'antd';
import SignInForm from "./SignInForm";


class SignIn extends Component {

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.error) {
            this.showAlertMessage();
        }
    }

    showAlertMessage = () => {
        setTimeout(() => {
            notification.error({
                message: "Spare Part Store",
                description: this.props.location.state.error,
                duration: 5000
            });
            this.props.history.replace({
                pathname: this.props.location.pathname,
                state: {}
            });
        }, 100);
    };


    render() {
        return (
            <div>
                <h1 className="page-title">
                    <div className="page-title-text">
                        Please enter your credentials...
                    </div>
                </h1>
                <div className="login-container">
                    <div className="login-content">
                        <SignInForm onLogin={this.props.onLogin}/>
                    </div>
                </div>
            </div>
        );
    }
}


export default SignIn;