import axios from 'axios';

const ApiRequestMethod = {
  post: axios.post,
  put: axios.put,
  get: axios.get,
  url: 'https://instamernclone.herokuapp.com/api/v1/'
};

export default ApiRequestMethod;
