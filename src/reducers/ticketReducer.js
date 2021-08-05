import { types } from '../types/types';

const initialState = {
    enviando:false
}

export const ticketReducer = (state=initialState, action)=>{
    switch (action.type) {
        case types.ticketSolicitado: 
            return {
                ...state,
                enviando: true
            }
        default:
            return state;
    }
}
