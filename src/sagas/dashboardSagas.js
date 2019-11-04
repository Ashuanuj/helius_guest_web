
import { put, takeEvery, call } from 'redux-saga/effects';
import * as actions from '../actions';
import { api } from '../services';
import SwipeImage from '../components/assets/img/icons/wiping-swipe-for-floors.svg';
import BellImage from '../components/assets/img/icons/bell1.svg';
import ForkImage from '../components/assets/img/icons/plate-fork-and-knife.svg';
import FileImage from '../components/assets/img/icons/file.svg';

export function* ServiceData() {
    yield put(actions.ServiceData.request());
    try {
        let objArray = [
            { icon: SwipeImage, link: `category` },
            { icon: BellImage, link: `category` },
            { icon: ForkImage, link: `category` },
            { icon: FileImage, link: `category` },
            { icon: FileImage, link: `category` }
        ]
        const response = yield call(api.getGuestServices);
        response.guestServices && response.guestServices.forEach((item, index) =>
            objArray.forEach((elem, i) => {
                if (i == index) {
                    item.icon = elem.icon  
                };
            })
        );
        yield put(actions.ServiceData.success(response));
    } catch ({ error }) {
        yield put(actions.ServiceData.failure(error));
    }
}

export function* watchServiceData() {
    yield takeEvery(actions.LOAD_SERVICE, ServiceData);
}

export default watchServiceData