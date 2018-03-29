import {takeLatest, call, put, select} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import {
  profileActionTypes,
  loadProfileActions,
  entityActionTypes,
  createEntityActions,
} from 'containers/App/actions';
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

export function* createEntity({payload, entity, meta}) {
  const {url, schema, key} = entity;

  try {
    const entityResponse = yield call(http.post, {url, schema, payload});
    meta.resolve();
    yield put(createEntityActions.success(entityResponse, entity));
  } catch (err) {
    console.log('err', err);
    meta.reject(err);
    yield put(createEntityActions.failure(err, entity));
  }
}

export function* handleEntityCreated({entity, response}) {
  if (entity.key === 'user') {
    localStorage.setItem('authToken', response.result.token);
    yield put(push('/dashboard'));
  }
}

// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield [
    takeLatest(profileActionTypes.GET.REQUEST, loadProfile),
    takeLatest(entityActionTypes.POST.REQUEST, createEntity),
    takeLatest(entityActionTypes.POST.SUCCESS, handleEntityCreated),
  ];
}
