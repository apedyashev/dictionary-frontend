export default {
  baseUrl:
    process.env.NODE_ENV === 'production' ? 'http://dict.apedyashev.com' : 'http://localhost:3001',
  apiBaseUrl:
    process.env.NODE_ENV === 'production'
      ? 'http://dict-api.apedyashev.com'
      : 'http://localhost:3001',
};
