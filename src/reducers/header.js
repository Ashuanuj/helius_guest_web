import { HANDLE_HEADER, SET_COUNTER } from '../actions';
import { setAuthData } from '../utility/auth'

const initialState = {
    header:undefined,
    dashbaord:false,
    cart:false
};

export default function reducer(state = initialState, action) {
 switch (action.type) {
        case HANDLE_HEADER: {
            console.log(action,'llllllllllllllllllllllllllllllll')
            if(action.payload[0]=='Checkout' || action.payload[0]=='Request' || action.payload[0]=='Front Office' || action.payload[0]=='Wake up Call' || action.payload[0]=='Room Change'|| action.payload[0]==' Wifi Password'){                
                var enable=true
                }else{
                var enable=false
                }
            return {
                header:action.payload[0],
                dashbaord:action.payload[1],
                cart:enable,
                cartCount: localStorage.getItem('cartCount')
            }
        }

        case SET_COUNTER: {
            return {
                ...state,
                cartCount: localStorage.getItem('cartCount')
            }
        }
        default:
            return state;
    }
}