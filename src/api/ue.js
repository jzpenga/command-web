import request from '@/utils/request'
import {config} from '@/utils/config'
import axios from 'axios'
import {getUEToken} from "../utils/auth";


export function fetchList() {
    return request({
        url: '/command/admin/ue-projects',
        method: 'get'

    })
}

export function fetchUrl(data) {
    // request interceptor
    axios.interceptors.request.use(
        config => {
            if (getUEToken()) {
                config.headers['name'] = getUEToken().name;
                config.headers['value'] = getUEToken().value
            }
            return config
        },
        error => {
            return Promise.reject(error)
        }
    );
    return axios.post(config.ueUrl+'/analystui/service/outSystem/copyNoAuthenticationUrl',data)
}
