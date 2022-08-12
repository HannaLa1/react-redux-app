import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import React, {Component} from 'react';
import {checkEmailAvailability, signUp} from '../../../services/authentication/AuthService';
import './SignUp.css';
import {Link} from 'react-router-dom';
import {
    EMAIL_MAX_LENGTH,
    ERROR,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    SUCCESS
} from '../../../constants/index';

import {Button, Form, Input, notification, Upload} from 'antd';
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import {beforeUpload, getBase64} from "../../../util/PictureLoaderUtil";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import {UploadOutlined} from "@ant-design/icons";

const FormItem = Form.Item;
const {Dragger} = Upload;

class SignUp extends Component {

    state = {
        loading: false,
        imageUrl: '',
        name: {
            value: ''
        },
        email: {
            value: ''
        },
        password: {
            value: ''
        },
        confirmedPassword: {
            value: ''
        }
    };

    handleInputChange = (event, validationFun) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    };

    handleSubmit = () => {

        const signUpRequest = {
            username: this.state.name.value,
            email: this.state.email.value,
            password: this.state.password.value,
            confirmedPassword: this.state.confirmedPassword.value,
            imageUrl: this.state.imageUrl
        };

        signUp(signUpRequest)
            .then(() => {
                notification.success({
                    message: "Spare Part Store",
                    description: "Thank you! You're successfully registered. Please Sign In to continue!",
                });
                this.props.history.push("/signIn");
            }).catch(error => {
            notification.error({
                message: "Spare Part Store",
                description: error.message || "Sorry! Something went wrong. Please try again!"
            });
        });
    };

    isFormInvalid = () => {
        return !(this.state.name.validateStatus === SUCCESS &&
            this.state.email.validateStatus === SUCCESS &&
            this.state.password.validateStatus === SUCCESS &&
            this.state.confirmedPassword.validateStatus === SUCCESS
        );
    };

    render() {

        const uploadButton = (
            <div>
                {
                    this.state.loading ?
                        <LoadingOutlined/> :
                        <p className="ant-upload-drag-icon">
                            <UploadOutlined/>
                        </p>
                }
            </div>
        );


        return (
            <div className="signup-container">

                <div>
                    <h1 className="page-title">
                        Please inter your credentials...
                    </h1>
                </div>


                <Form {...layout}
                      onFinish={this.handleSubmit}>

                    <div className="aside-picture">
                        <Dragger
                            name="file"
                            listType="picture"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleUploadImage}>

                            {this.state.imageUrl ?
                                <img src={this.state.imageUrl} alt="avatar" style={{width: '100%'}}/> :
                                uploadButton
                            }

                            <p className="ant-upload-text">
                                Choose image...
                            </p>
                        </Dragger>
                    </div>

                    <div className="content-container">

                        <FormItem
                            label="Username"
                            hasFeedback
                            validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg}>
                            <Input
                                prefix={<UserOutlined/>}
                                name="name"
                                autoComplete="off"
                                placeholder="Your username"
                                value={this.state.name.value}
                                onChange={(event) => this.handleInputChange(event, this.validateName)}/>
                        </FormItem>

                        <FormItem
                            label="Email"
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input
                                prefix={<UserOutlined/>}
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder="Your email"
                                value={this.state.email.value}
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)}/>
                        </FormItem>

                        <FormItem
                            label="Password"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input.Password
                                prefix={<LockOutlined/>}
                                name="password"
                                type="password"
                                autoComplete="off"
                                placeholder="A password between 6 to 15 characters"
                                value={this.state.password.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)}/>
                        </FormItem>

                        <FormItem
                            label="Confirmed password"
                            validateStatus={this.state.confirmedPassword.validateStatus}
                            help={this.state.confirmedPassword.errorMsg}>
                            <Input.Password
                                prefix={<LockOutlined/>}
                                name="confirmedPassword"
                                type="password"
                                autoComplete="off"
                                placeholder="A password between 6 to 15 characters"
                                value={this.state.confirmedPassword.value}
                                onChange={(event) => this.handleInputChange(event, this.validateConfirmedPassword)}/>
                        </FormItem>

                        <FormItem wrapperCol={{...layout.wrapperCol, offset: 10}}>
                            <Button type="primary"
                                    htmlType="submit"
                                    className="signup-form-button"
                                    disabled={this.isFormInvalid()}>
                                Submit
                            </Button>
                            <br/>
                            <br/>
                            Already registered?
                            <Link
                                to="/signIn"> Sign In now!
                            </Link>
                        </FormItem>
                    </div>
                </Form>
            </div>
        );
    }


    handleUploadImage = image => {
        if (image.file.status === 'uploading') {
            this.setState({
                loading: true
            });
            return;
        }
        if (image.file.status === 'done') {
            getBase64(image.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl: imageUrl,
                    loading: false,
                }),
            );
        }
    };

    validateName = (name) => {
        if (!name) {
            return {
                validateStatus: ERROR,
                errorMsg: "Required!"
            }
        }

        if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: ERROR,
                errorMsg: `Too short (Minimum ${NAME_MIN_LENGTH} characters allowed;\nMaximum ${NAME_MAX_LENGTH} characters allowed )`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: ERROR,
                errorMsg: `Too long (Minimum ${NAME_MIN_LENGTH} characters allowed;\nMaximum ${NAME_MAX_LENGTH} characters allowed )`
            }
        } else {
            return {
                validateStatus: SUCCESS,
                errorMsg: null,
            };
        }
    };

    validateEmail = (email) => {
        if (!email) {
            return {
                validateStatus: ERROR,
                errorMsg: "Email required!"
            }
        }

        const EMAIL_REGEX = RegExp('^[a-z](\\.?\\w)*@[a-z]+(\\.[a-z]+)+');
        if (!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: ERROR,
                errorMsg: "Email is not valid!"
            }
        }

        if (email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: ERROR,
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    };


    validateEmailAvailability = () => {
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if (emailValidation.validateStatus === ERROR) {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });


        checkEmailAvailability(emailValue)
            .then(response => {
                if (!response.available) {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: SUCCESS,
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: ERROR,
                            errorMsg: "This Email is already registered!"
                        }
                    });
                }
            }).catch(() => {
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: SUCCESS,
                    errorMsg: null
                }
            });
        });

        this.setState({
            email: {
                value: emailValue,
                validateStatus: SUCCESS,
                errorMsg: null
            }
        });
    };

    validatePassword = (password) => {
        if (!password) {
            return {
                validateStatus: ERROR,
                errorMsg: "Password required!"
            }
        }

        if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: ERROR,
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: ERROR,
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: SUCCESS,
                errorMsg: null,
            };
        }
    };

    validateConfirmedPassword = (confirmedPassword) => {
        if (!confirmedPassword) {
            return {
                validateStatus: ERROR,
                errorMsg: "Confirmed password required!"
            }
        }

        const validRes = this.validatePassword(confirmedPassword);
        if (validRes.validateStatus !== SUCCESS && confirmedPassword !== this.state.password) {
            return {
                validateStatus: ERROR,
                errorMsg: validRes.errorMsg + " Confirmed password don't match with your password!"
            }
        } else {
            return {
                validateStatus: SUCCESS,
                errorMsg: null,
            };
        }
    }
}

const layout = {
    labelCol: {
        span: 10,
    },
    wrapperCol: {
        span: 16,
    },
};

export default SignUp;