import { LOAD_SERVICE,LOAD_SERVICE_LOADING, SERVICE_DATA } from '../actions';

const initialState = {
    error: undefined,
    services:[],
    loading:false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SERVICE_LOADING: {
            return {
                ...state,
                loading: true,
                error:''
            };
        }
        case SERVICE_DATA.SUCCESS:
            {
                return {
                    ...state,
                    services: action.payload.guestServices,
                };
            }
        case LOAD_SERVICE.FAILURE:
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