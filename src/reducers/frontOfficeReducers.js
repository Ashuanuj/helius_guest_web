import { LOAD_FRONT_OFFICE, LOAD_FRONTOFFICE_DATA } from '../actions';

const initialState = {
    error: undefined,
    frontOffice:[],
    loading:false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_FRONT_OFFICE: {
            return {
                ...state,
                loading: true,
                error:''
            };
        }
        case LOAD_FRONTOFFICE_DATA.SUCCESS:
            {
                return {
                    ...state,
                    frontOffice: action.payload,
                };
            }
        case LOAD_FRONTOFFICE_DATA.FAILURE:
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