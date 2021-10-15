import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router'

export const AdminRoute = ({isAuthenticated, component: Component, role, ...rest }) => {

    return (
        <Route
            {...rest}
            component= {(props)=> (
                (isAuthenticated && role==="ADMIN")
                ? (<Component {...props} />)
                : <Redirect to="/login" />
            )}
        />
    )
}
AdminRoute.propTypes = {
    role: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}