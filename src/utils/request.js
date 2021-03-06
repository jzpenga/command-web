import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store/store'
import { getToken } from '@/utils/auth'
import {config} from "./config";

// create an axios instance
const service = axios.create({
  //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL:config.baseUrl,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    let res = response.data;
    if (response.config.originResponse) {
        res = response.request.responseText;
    }
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      });

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.response.data.msg || error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
