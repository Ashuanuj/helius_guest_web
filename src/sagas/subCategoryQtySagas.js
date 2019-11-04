
import { put, call, take  } from "redux-saga/effects";
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

export function* watchloadServiceSUBCategory() {
    while (true) {
        const { payload } = yield take(actions.LOAD_SERVICE_SUBCATEGORY);
        yield call(loadServiceSUBCategory, payload);
      }
}

export default watchloadServiceSUBCategory