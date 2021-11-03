import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router'
import { NavBar } from '../components/navbar/NavBar';

export const PrivateRoute = ({isAuthenticated, component: Component, ...rest }) => {

    return (
        <>
            <NavBar />
            <Route
                {...rest}
                component= {(props)=> (
                    (isAuthenticated)
                    ? <Component {...props} />
                    : <Redirect to="/login" />
                )}
            />
        </>
    )
}
PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}