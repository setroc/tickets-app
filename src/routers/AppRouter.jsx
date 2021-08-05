import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
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

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {uid, checking} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch])

    if (checking) {
        return (
            <h3>Espere...</h3>
        )
    }

    return (
        <Router>
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
                        component={ TicketScreen }
                        isAuthenticated={!!uid}
                    />
                    <PrivateRoute 
                        exact
                        path="/admin"
                        component= { AdminScreen }
                        isAuthenticated={!!uid}
                    />

                    <Redirect to="/" />   
                </Switch>
            </div>
        </Router>
    )
}
