import request from '@/utils/request'
import {config} from '@/utils/config'
import axios from 'axios'


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
    return service({
        url: '/analystui/service/outSystem/copyNoAuthenticationUrl',
        method: 'post',
        data
    })
}
