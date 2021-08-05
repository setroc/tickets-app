import { combineReducers } from "redux";
import { authReducer } from './authReducer';
import { ticketReducer } from './ticketReducer';


export const rootReducer = combineReducers({
    auth: authReducer,
    ticket: ticketReducer,
});