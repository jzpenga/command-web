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
    const service = axios.create({
        baseURL:config.ueUrl,
        timeout: 50000 // request timeout
    });
    // request interceptor
    service.interceptors.request.use(
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
    )
    return service({
        url: '/analystui/service/outSystem/copyNoAuthenticationUrl',
        method: 'post',
        data
    })
}
