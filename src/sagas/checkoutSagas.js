
import { put, call,take } from 'redux-saga/effects';
import * as actions from '../actions';

export function* Checkout() {
yield put(actions.checkoutPageData.request());
try {
    yield put(actions.checkoutPageData.success());
}
catch ({ error }) {
    yield put(actions.checkoutPageData.failure(error));
}
}

export function* watchcheckoutPage() {
    while (true) {
    const { payload } = yield take(actions.CHECKOUT_PAGE);
    yield call(Checkout, payload);
    }
}

export default watchcheckoutPage