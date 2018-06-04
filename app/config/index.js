export default {
  apiBaseUrl:
    process.env.NODE_ENV === 'production'
      ? 'http://dict-api.apedyashev.com'
      : 'http://localhost:3001',
};
