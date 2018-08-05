import superagent from 'superagent';
import qs from 'qs';
import {normalize} from 'normalizr';
// import {camelizeKeys} from 'humps';
// TODO
import config from 'config';
import {errorHandler} from './errorHandler';

const http = {
  buildUrl: (endpoint) =>
    /^http(s)?:\/\//.test(endpoint) ? endpoint : `${config.apiBaseUrl}/${endpoint}`,

  setStore: (store) => {
    http.store = store;
  },

  getAuthHeader() {
    return http.store && http.store.getState().getIn(['app', 'profile', 'authHeader']);
  },

  get: ({url, query, schema, headers = {}}) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!schema) {
        console.warn(`schema is not defined for ${url}`);
      }
      if (!http.store) {
        console.warn('http.store isn`t set');
      }
    }

    return new Promise((resolve, reject) => {
      console.log('[GET]', http.buildUrl(url));
      return superagent
        .get(http.buildUrl(url))
        .query(qs.stringify(query))
        .set({
          Accept: 'application/json',
          Authorization: http.getAuthHeader(),
          ...headers,
        })
        .end((err, res) => {
          // const camelizedJson = camelizeKeys(res.body);
          const response = Object.assign({}, normalize(res.body || {}, schema));

          return err
            ? errorHandler(http.store.dispatch)(err).catch(reject)
            : resolve({statusCode: res.statusCode, response});
        });
    });
  },

  post: ({url, payload, query, schema, headers = {}}) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!schema) {
        console.warn(`schema is not defined for ${url}`);
      }
      if (!http.store) {
        console.warn('http.store isn`t set');
      }
    }

    return new Promise((resolve, reject) => {
      console.log('query', query);
      return superagent
        .post(http.buildUrl(url))
        .query(qs.stringify(query))
        .send(payload)
        .set({
          Accept: 'application/json',
          Authorization: http.getAuthHeader(),
          ...headers,
        })
        .end((err, res) => {
          // const camelizedJson = camelizeKeys(res.body);
          const response = Object.assign({}, normalize(res.body || {}, schema));

          return err
            ? errorHandler(http.store.dispatch)(err).catch(reject)
            : resolve({statusCode: res.statusCode, response});
        });
    });
  },

  patch: ({url, payload, query, schema, headers = {}}) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!schema) {
        console.warn(`schema is not defined for ${url}`);
      }
      if (!http.store) {
        console.warn('http.store isn`t set');
      }
    }

    return new Promise((resolve, reject) => {
      console.log('query', query);
      return superagent
        .patch(http.buildUrl(url))
        .query(qs.stringify(query))
        .send(payload)
        .set({
          Accept: 'application/json',
          Authorization: http.getAuthHeader(),
          ...headers,
        })
        .end((err, res) => {
          // const camelizedJson = camelizeKeys(res.body);
          const response = Object.assign({}, normalize(res.body || {}, schema));

          return err
            ? errorHandler(http.store.dispatch)(err).catch(reject)
            : resolve({statusCode: res.statusCode, response});
        });
    });
  },

  delete: ({url, payload, query, schema, headers = {}}) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!schema) {
        console.warn(`schema is not defined for ${url}`);
      }
      if (!http.store) {
        console.warn('http.store isn`t set');
      }
    }

    return new Promise((resolve, reject) => {
      return superagent
        .delete(http.buildUrl(url))
        .query(qs.stringify(query))
        .send(payload)
        .set({
          Accept: 'application/json',
          Authorization: http.getAuthHeader(),
          ...headers,
        })
        .end((err, res) => {
          // const camelizedJson = camelizeKeys(res.body);
          const normalisedData = schema ? normalize(res.body || {}, schema) : res.body;
          const response = Object.assign({}, normalisedData);

          return err
            ? errorHandler(http.store.dispatch)(err).catch(reject)
            : resolve({statusCode: res.statusCode, response});
        });
    });
  },

  // post: ({url, data, headers = {}}) =>
  //   new Promise((resolve, reject) =>
  //     superagent
  //       .post(http.buildUrl(url))
  //       .send(data)
  //       .set({Accept: 'application/json', Authorization: http.getAuthHeader(), ...headers})
  //       .end((err, res) => err ? errorHandler(http.store.dispatch)(err).catch(reject) : resolve({statusCode: res.statusCode, ...res.body}))
  //   ),
  //
  // put: ({url, data, query = {}, headers = {}}) =>
  //   new Promise((resolve, reject) =>
  //     superagent
  //       .put(http.buildUrl(url))
  //       .query(query)
  //       .send(data)
  //       .set({Accept: 'application/json', Authorization: http.getAuthHeader(), ...headers})
  //       .end((err, res) => err ? errorHandler(http.store.dispatch)(err).catch(reject) : resolve({statusCode: res.statusCode, ...res.body}))
  //   ),
  //
  // delete: ({url, data, query = {}, headers = {}}) =>
  //   new Promise((resolve, reject) =>
  //     superagent
  //       .delete(http.buildUrl(url))
  //       .query(query)
  //       .send(data)
  //       .set({Accept: 'application/json', Authorization: http.getAuthHeader(), ...headers})
  //       .end((err, res) => err ? errorHandler(http.store.dispatch)(err).catch(reject) : resolve({statusCode: res.statusCode, ...res.body}))
  //   )
};

export default http;
