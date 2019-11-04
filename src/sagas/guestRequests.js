import { put, call, fork, take, select } from 'redux-saga/effects';
import * as actions from '../actions';
import { api } from '../services';

export function* loadRequests(data) {
    yield put(actions.guestRequests.request());
    try {
      const response = yield call(api.loadGuestRequests, data);
      console.log(response,'guestttttttttttttttttttttttttttttttttttttttttttttttttttttttttt')
      yield put(actions.guestRequests.success(response));
    }
    catch ({ error }) {
      yield put(actions.guestRequests.failure(error));
    }
  }


export function* watchloadRequests() {
    while (true) {
      const { payload } = yield take(actions.LOAD_GUEST_REQUESTS);
      yield fork(loadRequests, payload);
    }
  }

export default watchloadRequests