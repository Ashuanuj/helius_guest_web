import { SERVICE_SUB_CATEGORY, PLACE_ORDER} from '../actions';

const initialState = {
    error: undefined,
    subCategory:[],
    loading:false,
    cartItems: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        // case LOAD_SUBCATEGORY_LOADING: {
        //     return {
        //         ...state,
        //         loading: true,
        //         error:''
        //     };
        // }
        case SERVICE_SUB_CATEGORY.SUCCESS:
            {
                return {
                    ...state,
                    subCategory: action.payload.serviceSubCategory,
                };
            }
        // case SUB_CATEGORY.FAILURE:
        //     {
        //         return {
        //             ...state,
        //             error: action.payload,
        //         };
        //     }
            case PLACE_ORDER: {
                return {
                    ...state,
                    cartItems: action.payload
                }
            }
        default:
            return state;
    }
}