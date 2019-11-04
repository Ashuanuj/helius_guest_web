import { CHECKOUT_PAGE, CHECKOUT, LOAD_CART_ITEMS } from '../actions';

const initialState = {
    error: undefined,
    checkout: false,
    requests: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHECKOUT_PAGE.SUCCESS:
            {
                return {
                    ...state,
                    checkout: true,
                };
            }
        case CHECKOUT_PAGE.FAILURE:
            {
                return {
                    ...state,
                    error: action.payload,
                };
            }
        case LOAD_CART_ITEMS.SUCCESS: {
            return {
                ...state,
                requests: action.payload.cartItems
            };
        }
        default:
            return state;
    }
}