import axios from 'axios';

const api = axios.create({
  baseURL: "http://e8d7dedc.ngrok.io"
});

export default api;