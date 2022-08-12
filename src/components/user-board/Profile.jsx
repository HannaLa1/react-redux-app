import React, {Component} from 'react'
import {Button, Form, Input, notification, Tabs} from "antd";
import s from './Profile.css'

import {
    ERROR,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    SUCCESS
} from "../../constants/index";
import {updatePersonalInfo} from "../../services/user/UserService";
import ImageLoader from "../common/image/ImageLoader";
import {withRouter} from "react-router-dom";

const {TabPane} = Tabs;


const layout = {
    labelCol: {
        span: 9,
    },
    wrapperCol: {
        span: 15,
    },
}

class Profile extends Component {

    state = {
        currentUser: this.props.currentUser,

        name: {
            value: this.props.currentUser.name,
            validateStatus: SUCCESS,
            errorMsg: null
        },
        email: {
            value: this.props.currentUser.email,
            validateStatus: SUCCESS
        },
        password: {
            value: this.props.currentUser.password,
            validateStatus: SUCCESS
        },

        imageUrl: this.props.currentUser.image === null ? '' : this.props.currentUser.image.imageUrl
    }


    handleSubmit = () => {
        const updateRequest = {
            id: this.state.currentUser.id,
            username: this.state.name.value,
            email: this.state.email.value,
            password: this.state.password.value,
            image: {
                imageUrl: this.state.imageUrl
            }
        }

        console.log(updateRequest)

        updatePersonalInfo(updateRequest)
            .then(() => {
                notification.success({
                    message: "Spare Part Store",
                    description: "Editing has completed successfully!",
                })
                this.props.history.push('/profile')
            }).catch(error => {
            notification.error({
                message: "Spare Part Store",
                description: error.message || "Sorry! Something went wrong. Please try again!"
            })
        })
    }


    render() {

        return (
            <div className="container py-5 px-3 mb-5">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Personal Account" key="1">
                        <div className="col-sm-12 mb-5">
                            <Form {...layout}
                                  onFinish={this.handleSubmit} className={s.form}>

                                <div className="row mb-5">
                                    <div className="col-sm-6">
                                        <ImageLoader
                                            imageUrl={this.state.imageUrl}
                                            handleImageUrlChange={this.handleImageUrlChange}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <Form.Item
                                            className={s.formItem}
                                            label='Your username'
                                            validateStatus={this.state.name.validateStatus}
                                            hasFeedback={!this.isFormInvalid()}
                                            onChange={(event) => this.handleInputChange(event, this.validateUsername)}
                                            help={this.state.name.errorMsg}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please, enter your username!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                name="name"
                                                type=""
                                                size="middle"
                                                value={this.state.name.value}>
                                            </Input>
                                        </Form.Item>

                                        <Form.Item
                                            className={s.formItem}
                                            label='Email'
                                            validateStatus={this.state.email.validateStatus}
                                        >
                                            <Input
                                                type="email"
                                                name="email"
                                                size="middle"
                                                disabled={true}
                                                value={this.state.email.value}>
                                            </Input>
                                        </Form.Item>

                                        <Form.Item
                                            className={s.formItem}
                                            label='Password'
                                            validateStatus={this.state.password.validateStatus}
                                            hasFeedback={!this.isFormInvalid()}
                                            onChange={(event) => this.handleInputChange(event, this.validatePassword)}
                                            help={this.state.password.errorMsg}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please, enter you password!',
                                                },
                                            ]}
                                        >

                                            <Input
                                                name="password"
                                                size="middle"
                                                value={this.state.password.value}>
                                            </Input>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row mb-5 d-flex justify-content-end">
                                    <div className="col-3">
                                        <Form.Item className={s.formItem}>
                                            <Button
                                                htmlType="submit"
                                                type="primary"
                                                style={{background: "black", color: "white"}}
                                                shape="round"
                                                disabled={this.isFormInvalid()}
                                            >
                                                Change profile
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }

    handleInputChange = (event, validationFun) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        })
    }

    isFormInvalid = () => {
        return !(
            this.state.name.validateStatus === SUCCESS &&
            this.state.email.validateStatus === SUCCESS &&
            this.state.password.validateStatus === SUCCESS
        )
    }


    handleImageUrlChange = (imageUrl) => {
        this.setState({
            imageUrl: imageUrl
        })
    }

    validateUsername = (name) => {
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
}

export default withRouter(Profile)