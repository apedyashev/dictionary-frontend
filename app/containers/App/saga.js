import {takeLatest, call, put, select} from 'redux-saga/effects';
// import {LOAD_PROFILE} from 'containers/App/constants';
import {profileActionTypes, loadProfileActions} from 'containers/App/actions';
import http from 'utils/http';

export function* loadProfile({schema}) {
  const url = 'auth/profile';

  try {
    const profile = yield call(http.get, {url, schema});
    console.log('profile', profile);
    yield put(loadProfileActions.success(profile));
  } catch (err) {
    yield put(loadProfileActions.failure(err));
  }
}

// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield [takeLatest(profileActionTypes.GET.REQUEST, loadProfile)];
}
