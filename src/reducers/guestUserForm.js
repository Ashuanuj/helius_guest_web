// import { LOG_IN, HANDLE_ERROR, APP_LOADED } from '../actions';
import { LOG_IN, HANDLE_ERROR } from '../actions';

const initialState = {
    error: undefined,
    IS_LOGIN: false,
    services: [],
    // apploaded: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
       
        case LOG_IN.SUCCESS:
            {
                return {
                    ...state,
                    //   ...action.payload,
                    IS_LOGIN: true,
                    guestDetails: action.payload,
                    services: action.payload.services
                };
            }
            case HANDLE_ERROR: {
                return {
                    ...state,
                    error_1: undefined
                }
            }
            // case APP_LOADED: {
            //     return {
            //         ...state,
            //         apploaded: !state.apploaded
            //     }
            // }
        case LOG_IN.FAILURE:
            {
                return {
                    ...state,
                    error: action.payload,
                };
            }
        default:
            return state;
    }
}