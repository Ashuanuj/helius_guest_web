import { put, call, take ,all, fork } from 'redux-saga/effects';
import * as actions from '../actions';
import { api } from '../services';

export function* loadCategories(id) {
    console.log(id, 'from saga file')
    yield put(actions.loadCategories.request());
    try {
        const response = yield call(api.getServiceCategory, id);
      yield put(actions.loadCategories.success(response));
    } catch ({ error }) {
      yield put(actions.loadCategories.failure(error));
    }
  }

  export function* watchloadCategories() {
    while (true) {
        const { payload } = yield take(actions.GET_CATEGORY_LIST);
        yield call(loadCategories, payload);
      }
}

function* rootSaga() {
    yield all([fork(watchloadCategories)])
}

export default rootSaga