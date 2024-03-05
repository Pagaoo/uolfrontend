const axios = require('axios').default;

export const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 5000
});