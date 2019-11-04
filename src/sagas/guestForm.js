import { put, call, take,all,fork } from "redux-saga/effects";
import { api } from "../services";
import { setAuthData } from "../utility/auth";
import * as actions from "../actions";
// import axios from 'axios';
import history from "../helper/history";

export function* LogIn(data) {
  console.log(data,'llkkkkkkkkkkjsssssssssssssssss')
  var params= data.params.substr(1);
  console.log(params,'llkkkkkkkkkkjsssssssssssssssss')
  yield put(actions.login.request());
  try {
    let authData = {
      email: data.name,
      password: data.roomno,
      dob: data.dob,
      params:params  ,
    }
    const response = yield call(api.login, authData);
    if (response) {
      yield put(actions.login.success(response));
      localStorage.setItem("accessToken", response.authorization.token);
      localStorage.setItem("guestId", response.guest.id);
      localStorage.setItem("guestName", response.guest.lastName);
      localStorage.setItem("roomNo", response.roomNo);
      localStorage.setItem("areaId", response.guest.areaId);
      localStorage.setItem('tenantId',params)
      console.log(localStorage.getItem("accessToken"));
    //   yield call(setAuthData, response);
    yield call(history.push,"/"+params+"/dashboard");
  } else {
      var data1 = { customMessage: "Access Denied." };
      yield put(actions.login.failure(data1));
    }
  } catch ({ error }) {
    yield put(actions.login.failure(error));
  }
}
async function loca(response) {
  await localStorage.setItem("accessToken", response.authorization.token);
  await localStorage.setItem("guestId", response.guest.id);
  await localStorage.setItem("guestName", response.guest.lastName);
  await localStorage.setItem("roomNo", response.roomNo);
  await localStorage.setItem("areaId", response.guest.areaId);
}
export function* checkURL1(data){
  var params= data.substr(1);
yield put(actions.checkURL1.request());
try {
  let authData = {
    params:params,
  };
  const response = yield call(api.checkurl, authData);
  console.log(response,'lllllllllllllllllllllllll')
  yield put(actions.checkURL1.success(response));


} catch ({ error }) {
  console.log(error)
  yield put(actions.checkURL1.failure(error));
}
 }

export function* watchLogIn() {
  while (true) {
    const { payload } = yield take(actions.GUEST_LOG_IN);
    yield call(LogIn, payload);
  }
}

export function* watchcheckURL1(){
  while (true) {
    const { payload } = yield take(actions.CHECK_URL);
    yield call(checkURL1, payload);
  }
} 

function* rootSaga() {
  yield all([fork(watchLogIn), fork(watchcheckURL1)])
}

export default rootSaga

