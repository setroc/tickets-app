import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router'
import { NavBar } from '../components/navbar/NavBar';

export const AdminRoute = ({isAuthenticated, component: Component, role, ...rest }) => {

    return (
        <div className="Admin">
            <NavBar />
            <Route
                {...rest}
                component= {(props)=> (
                    (isAuthenticated && role==="ADMIN")
                    ? (<Component {...props} />)
                    : <Redirect to="/login" />
                )}
            />
        </div>
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