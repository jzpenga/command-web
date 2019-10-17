import request from '@/utils/request'
import {config} from '@/utils/config'
import axios from 'axios'
import {getUEToken} from "../utils/auth";
import qs from 'qs';


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
            let ueToken = JSON.parse(getUEToken());
            config.headers[ueToken.name] = ueToken.value;
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            config.headers['Accept'] = 'application/json';
            return config
        },
        error => {
            return Promise.reject(error)
        }
    );
    return axios.post(config.ueUrl+'/analystui/service/outSystem/copyNoAuthenticationUrl',qs.stringify(data))
}
