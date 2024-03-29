import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? (
                <Component {...rest} {...props} />
            ) : (
                <Redirect to={{ pathname: '/', state: { from: props.location } }}
                />
            )
        }
    />
)

export default PrivateRoute