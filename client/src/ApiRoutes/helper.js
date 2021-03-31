import axios from 'axios';

const ApiRequestMethod = {
  post: axios.post,
  put: axios.put,
  get: axios.get,
  patch: axios.patch,
  url: 'http://localhost:3001/api/v1/',
  mainURL: 'https://instamernclone.herokuapp.com/api/v1/',
};

export default ApiRequestMethod;
