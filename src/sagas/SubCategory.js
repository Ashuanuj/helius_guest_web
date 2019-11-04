import { put, call, take ,all, fork } from 'redux-saga/effects';
import * as actions from '../actions';
import { api } from '../services';

export function* loadSubCategories(id) {
    console.log(id, 'from saga file')
    yield put(actions.loadCategories.request());
    try {
        const response = yield call(api.getServiceSubCategory, id);
        console.log(response.serviceSubCategory, 'rrrrrrrrrrrrrrrrr')
        // response = response.serviceSubCategory.slice()//.concat(response.serviceSubCategory.slice(4))
      yield put(actions.loadSubCategories.success(response));
    } catch ({ error }) {
      yield put(actions.loadSubCategories.failure(error));
    }
  }

  export function* watchloadSubCategories() {
    while (true) {
        const { payload } = yield take(actions.GET_SUB_CATEGORIES);
        yield call(loadSubCategories, payload);
      }
}

function* rootSaga() {
    yield all([fork(watchloadSubCategories)])
}

export default rootSaga