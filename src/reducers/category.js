import { LOAD_CATEGORIES } from '../actions';

const initialState = {
    serviceCategory: [],
    serviceCategoryId: localStorage.getItem('serviceCategoryId')
}

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case LOAD_CATEGORIES.SUCCESS: {
            console.log(action.payload, 'gggggggggggggggggggggg');            
            return {
                ...state,
                serviceCategory: action.payload.serviceCategory
            }
        }

        default: 
            return state;
    }
}