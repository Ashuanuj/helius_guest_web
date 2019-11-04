import { SUB_CATEGORY_QTY,SUB_CATEGORY_QTY_DATA} from '../actions';

const initialState = {
    error: undefined,
    sub_Category:[],
    loading:false
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
        case SUB_CATEGORY_QTY_DATA.SUCCESS:
            {
                return {
                    ...state,
                    sub_Category: action.payload,
                };
            }
        case SUB_CATEGORY_QTY.FAILURE:
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