import React, {Component} from "react";
import {Avatar, Button, Form, Input, notification} from "antd";
import {signIn} from "../../../services/authentication/AuthService";
import {Link} from "react-router-dom";
import FormItem from "antd/es/form/FormItem";

import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import {ACCESS_TOKEN} from "../../../constants";


class SignInForm extends Component {

    state = {
        email: '',
        password: ''
    };

    handleSubmit = () => {
        const signInRequest = {
            email: this.state.email,
            password: this.state.password
        };
        signIn(signInRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                this.props.onLogin();
            }).catch(() => {
            notification.error({
                message: "Spare Part Store",
                description: "Your Username or Password is incorrect. Please try again!"
            });
        });
    };


    handleEmailChange = (event) => {
        const value = event.target.value;
        this.setState({
            email: value
        });
    };

    handlePasswordChange = (event) => {
        const value = event.target.value;
        this.setState({
            password: value
        });
    };


    render() {

        return (
            <Form onFinish={this.handleSubmit}
                  className="login-form">

                <Avatar size={40} style={{ color: '#f3f5f5', backgroundColor: '#c9aa95' }}>U</Avatar>

                <br/>
                <br/>

                <FormItem
                    className="product-form-row"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Email required!',
                            required: true,
                        }
                    ]}
                    onChange={this.handleEmailChange}>
                    <Input
                        prefix={<UserOutlined/>}
                        name="email"
                        placeholder="email"/>
                </FormItem>

                <FormItem
                    className="product-form-row"
                    name="password"
                    rules={[
                        {
                            message: 'Password required!',
                            required: true,
                        },
                    ]}
                    onChange={this.handlePasswordChange}>

                    <Input.Password
                        prefix={<LockOutlined/>}
                        name="password"
                        type="password"
                        placeholder="password"/>
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">
                        Submit
                    </Button>
                    or
                    <br/>
                    <Link to="/signUp">
                        Register now!
                    </Link>
                </FormItem>
            </Form>
        );
    }
}

export default SignInForm;