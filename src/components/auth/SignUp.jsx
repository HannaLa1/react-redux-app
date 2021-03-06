import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import {signUp} from "../../actions/auth";
import isEmail from "validator/es/lib/isEmail";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 10) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 10 characters!
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 15) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 15 characters!
            </div>
        );
    }
};

const confirmPassword = (value) => {
    if (value.length < 6 || value.length > 15) {
        return (
            <div className="alert alert-danger" role="alert">
                Confirmed password should be between 6 and 15 characters!
            </div>
        );
    }
};

const email = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email!
            </div>
        );
    }
};

const firstName = (value) => {
    if (value.length < 3 || value.length > 15) {
        return (
            <div className="alert alert-danger" role="alert">
                Firstname must be between 3 and 15 characters!
            </div>
        );
    }
};

const lastName = (value) => {
    if (value.length < 3 || value.length > 15) {
        return (
            <div className="alert alert-danger" role="alert">
                Lastname must be between 3 and 15 characters!
            </div>
        );
    }
};

const imageUrl = (value) => {
    if (value.length < 0) {
        return (
            <div className="alert alert-danger" role="alert">
                Image url should not be blank!
            </div>
        );
    }
};

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeImageUrl = this.onChangeImageUrl.bind(this);

        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            firstName: "",
            lastName: "",
            imageUrl: "",
            successful: false,
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value,
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value,
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value,
        });
    }

    onChangeImageUrl(e) {
        this.setState({
            imageUrl: e.target.value,
        });
    }

    handleSignUp(e) {
        e.preventDefault();

        this.setState({
            successful: false,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            this.props
                .dispatch(
                    signUp(this.state.username, this.state.password, this.state.confirmPassword,
                        this.state.email, this.state.firstName, this.state.lastName, this.state.imageUrl)
                )
                .then(() => {
                    this.setState({
                        successful: true,
                    });
                })
                .catch(() => {
                    this.setState({
                        successful: false,
                    });
                });
        }
    }

    render() {
        const { message } = this.props;

        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <Form
                        onSubmit={this.handleSignUp}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        validations={[required, vusername]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.onChangeConfirmPassword}
                                        validations={[required, confirmPassword]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, email]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="firstName">Firstname</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        value={this.state.firstName}
                                        onChange={this.onChangeFirstName}
                                        validations={[required, firstName]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName">Lastname</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={this.state.lastName}
                                        onChange={this.onChangeLastName}
                                        validations={[required, lastName]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="imageUrl">Image Url</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="imageUrl"
                                        value={this.state.imageUrl}
                                        onChange={this.onChangeImageUrl}
                                        validations={[required, imageUrl]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Sign Up</button>
                                </div>
                            </div>
                        )}

                        {message && (
                            <div className="form-group">
                                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={(c) => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
        message,
    };
}

export default connect(mapStateToProps)(SignUp);