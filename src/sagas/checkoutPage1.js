import { put, call, take ,all, fork } from 'redux-saga/effects';
import * as actions from '../actions';
import { api } from '../services';

export function* createRequest(data) {
    yield put(actions.checkout.create.request());
    try {
        
        let _data = {
            cartItems: data,
            room_no: localStorage.getItem('roomNo'),
            areaId: localStorage.getItem('areaId'),
            instruction:localStorage.getItem('instructions')
        }
        const response = yield call(api.requestCreate, _data);
        yield put(actions.checkout.create.success(response));
       
    }
    catch ({ error }) {
        yield put(actions.checkout.create.failure(error));
    }
}

export function* loadCartItems(id) {
    yield put(actions.loadCartItems.request());
    try {
        const response = yield call(api.getCartDetails, id);
      yield put(actions.loadCartItems.success(response));
    } catch ({ error }) {
      yield put(actions.loadCartItems.failure(error));
    }
  }

export function* watchcreateRequest() {
    while (true) {
        const { payload } = yield take(actions.CREATE_REQUEST);
        yield call(createRequest, payload);
    }
}

export function* watchloadCartItems() {
    while (true) {
        const { payload } = yield take(actions.CART_ITEMS);
        yield call(loadCartItems, payload);
      }
}

function* rootSaga() {
    yield all([fork(watchcreateRequest), fork(watchloadCartItems)])
}

export default rootSaga