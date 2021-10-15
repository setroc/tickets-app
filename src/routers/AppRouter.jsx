import React, { useEffect } from 'react';
import {
    // BrowserRouter as Router,
    HashRouter,
    Switch,
    Redirect
} from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { TicketScreen } from '../components/ticket/TicketScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';
import { RegisterScreen } from '../components/login/RegisterScreen';
import { AdminScreen } from '../components/admin/AdminScreen';
import { AdminRoute } from './AdminRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {uid, checking, role} = useSelector(state => state.auth);
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch])

    if (checking) {
        return (
            <h3>Espere...</h3>
        )
    }

    return (
        <HashRouter>
            <div>
                <Switch>
                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={ LoginScreen }
                        isAuthenticated={!!uid}
                    />
                    <PublicRoute 
                        exact 
                        path="/register" 
                        component={ RegisterScreen }
                        isAuthenticated={!!uid}
                    />
                    <PrivateRoute
                        exact 
                        path="/" 
                        component={TicketScreen}
                        isAuthenticated={!!uid}
                    /> 
                    <AdminRoute
                        exact 
                        path="/admin" 
                        component={AdminScreen}
                        isAuthenticated={!!uid}
                        role={role}
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </HashRouter>
    )
}
