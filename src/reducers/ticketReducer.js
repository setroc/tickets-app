import { types } from '../types/types';

const initialState = {
    enviando:false,
    tickets: null
}

export const ticketReducer = (state=initialState, action)=>{
    switch (action.type) {
        case types.ticketSolicitado: 
            return {
                ...state,
                enviando: true
            }
        case types.ticketCargados: 
            return {
                ...state,
                tickets: action.payload
            }
        case types.ticketActualizado: 
            return {
                ...state,
                tickets: state.tickets.map( ticket => {
                    return (ticket._id === action.payload._id) ? action.payload : ticket 
                })
            }
        case types.ticketLogout :
            return initialState;
        default:
            return state;
    }
}
