// import { LOG_IN, HANDLE_ERROR, APP_LOADED } from '../actions';
import { CHECK_URL1 } from '../actions';

const initialState = {
    error: undefined,
    IS_LOGIN: false,
    services: [],
    urlStatus: undefined
    // apploaded: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
       
        case CHECK_URL1.SUCCESS:
            {
                console.log(action.payload)
                return {
                    ...state,
                    IS_LOGIN: true,
                    urlStatus: action.payload                    
                };
            }
            
        case CHECK_URL1.FAILURE:
            {

                console.log(action.payload)
                return {
                    ...state,
                    // error: action.payload,
                    urlStatus: action.payload 
                };
            }
        default:
            return state;
    }
}