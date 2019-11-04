import { LOAD_CATEGORY,SERVICE_CATEGORY } from '../actions';

const initialState = {
    error: undefined,
    Category:[],
    loading:false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        // case LOAD_SERVICE_LOADING: {
        //     return {
        //         ...state,
        //         loading: true,
        //         error:''
        //     };
        // }
        case SERVICE_CATEGORY.SUCCESS:
            {                
                return {
                    ...state,
                    Category: action.payload.serviceCategory,
                };
            }
        case LOAD_CATEGORY.FAILURE:
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