import { LOAD_SUB_CATEGORIES } from '../actions';

const initialState = {
    serviceSubCategory: [],
    headers: [],
    serviceCategoryId: localStorage.getItem('serviceCategoryId')
}

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case LOAD_SUB_CATEGORIES.SUCCESS: {
            console.log(action.payload, 'gggggggggggggggggggggg');            
            return {
                ...state,
                serviceSubCategory: action.payload.serviceSubCategory,
                headers: action.payload.headers
            }
        }

        default: 
            return state;
    }
}