
import { put, call, take, fork, all  } from "redux-saga/effects";
import * as actions from "../actions";
import { api } from '../services';
import SubImage1 from '../components/assets/img/icons/subcategory/SubImage1.png';
import SubImage2 from '../components/assets/img/icons/subcategory/SubImage2.png';
import SubImage3 from '../components/assets/img/icons/subcategory/SubImage3.png';

import vegImg from '../components/assets/img/icons/veg.png'
import NonvegImg from '../components/assets/img/icons/non-veg.png'

export function* loadServiceSUBCategory(id) {
    yield put(actions.loadServiceSUBCategory.request());
    try {
        let objArray = [
            { icon: vegImg, image: SubImage1, rate: "4.00", link: `mainsubcategorypage` },
            { icon: vegImg, image: SubImage2, rate: "4.00", link: `mainsubcategorypage` },
            { icon: NonvegImg, image: SubImage3, rate: "3.00", link: `mainsubcategorypage` },
            { icon: vegImg, image: SubImage1, link: `mainsubcategorypage` },
            { icon: NonvegImg, image: SubImage3, link: `mainsubcategorypage` },
          
        ]
        let response = yield call(api.getServiceSubCategory, id);
        response && response.serviceSubCategory.forEach((service, index) => {
            objArray.forEach((elem, i) => {
                if(index == i) {
                    service.icon = elem.icon
                    service.image = elem.image
                    service.link = elem.link
                }
            })
        })
        yield put(actions.loadServiceSUBCategory.success(response));
    } catch ({ error }) {
        yield put(actions.loadServiceSUBCategory.failure(error));
    }
}

export function* placeOrder(data) {
    console.log(data, 'ooooooooooooooooooooooooooooooooooooo')
    yield put(actions.placeOrder.create.request());
    try {
        console.log(data, 'pppppppppppppppppppp')
        let _data = {
            cartItems: data,
            room_no: localStorage.getItem('roomNo'),
            areaId: localStorage.getItem('areaId')
        }
        const response = yield call(api.placeOrder, _data);
        yield put(actions.placeOrder.create.success(response));
    }
    catch ({ error }) {
        yield put(actions.placeOrder.create.failure(error));
    }
}

export function* watchloadServiceSUBCategory() {
    while (true) {
        const { payload } = yield take(actions.LOAD_SERVICE_SUBCATEGORY);
        yield call(loadServiceSUBCategory, payload);
      }
}

export function* watchplaceOrder() {
    while (true) {
        const { payload } = yield take(actions.STORE_ORDER);
        yield call(placeOrder, payload);
    }
}

function* rootSaga() {
    yield all([fork(watchloadServiceSUBCategory), fork(watchplaceOrder)])
}

export default rootSaga