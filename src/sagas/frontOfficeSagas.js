
import { put, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions';


export function* FrontOfficeData() {
    yield put(actions.loadFrontOfficeData.request());
    try {
        let objArray = [
            {   id: 1, 
                Title: " Wake up Call", 
                SubTitle: "You tell we call", 
                link: `wakeup` 
            },
            {   id: 2, 
                Title: "Room Change", 
                SubTitle: "Request text comes here", 
                link:  `frontoffice`
            },
            {   id: 3, 
                Title: " Wifi Password",
                SubTitle: " Request for password ", 
                link: `frontoffice` 
            },
        ]
        yield put(actions.loadFrontOfficeData.success(objArray));
    } catch ({ error }) {
        yield put(actions.loadFrontOfficeData.read.failure(error));
    }
}

export function* watchFrontOfficeData() {
    yield takeEvery(actions.LOAD_FRONT_OFFICE, FrontOfficeData);
}

export default watchFrontOfficeData