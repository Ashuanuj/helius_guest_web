import { put, call, take  } from "redux-saga/effects";
import * as actions from "../actions";
import { api } from '../services';
import Image1 from "../components/assets/img/icons/category/Image1.png";
import Image2 from "../components/assets/img/icons/category/Image2.png";
import Image3 from "../components/assets/img/icons/category/Image3.png";
import Image4 from "../components/assets/img/icons/category/Image4.png";
import Image5 from "../components/assets/img/icons/category/Image5.png";

export function* loadServiceCategory(id) {
  yield put(actions.loadServiceCategory.request());
  try {
    let objArray = [
        { icon: Image1, link: `mainsubcategorypage` },
        { icon: Image2, link: `services` },
        { icon: Image3, link: `services` },
        { icon: Image4, link: `services` },
        { icon: Image5, link: `services` }
    ];
    const response = yield call(api.getServiceCategory, id);
    response && response.serviceCategory.forEach((item, i) => {
        objArray.forEach((elem, index) => {
            if(i==index){
                item.icon = elem.icon
                item.link = elem.link
            }
        })
    })
    yield put(actions.loadServiceCategory.success(response));
  } catch ({ error }) {
    yield put(actions.loadServiceCategory.failure(error));
  }
}

export function* watchloadServiceCategory() {
    while (true) {
        const { payload } = yield take(actions.LOAD_SERVICE_CATEGORY);
        yield call(loadServiceCategory, payload);
      }
}

export default watchloadServiceCategory;
