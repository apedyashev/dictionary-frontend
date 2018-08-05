export default {
  baseUrl:
    process.env.NODE_ENV === 'production' ? 'https://dict.apedyashev.com' : 'http://localhost:3001',
  apiBaseUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://dict-api1.apedyashev.com'
      : 'http://localhost:3001',
};
