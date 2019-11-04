import { GUEST_REQUESTS } from '../actions';

const initialState = {
    requests: [],
    loader:true
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GUEST_REQUESTS.SUCCESS: {
            console.log(action.payload, 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
            return {
                ...state,
                requests: action.payload.orders,
                loader:false
            };
        }
        default:
            return state;
    }
}