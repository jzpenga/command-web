import request from '@/utils/request'

/**
 *  数据请求列表获取
 * /command/data/request
 */
export function fetchList(data) {
    return request({
        url: `/command/data/request`,
        method: 'get',
        params: data
    })
}

/**
 *  数据请求增改
 * /command/data/request
 */
export function saveRequest(data) {
    return request({
        url: `command/data/request`,
        method: 'post',
        data: data
    })
}

/**
 *  数据请求删除
 * /command/data/request/delete
 */
export function remove(data) {
    return request({
        url: `command/data/request/delete?name=${data.name}`,
        method: 'post'
    })
}

/**
 *  数据请求参数列表获取
 * /command/data/request
 */
export function fetchListP(data) {
    return request({
        url: `/command/data/request/parameters`,
        method: 'get',
        params: data
    })
}

/**
 *  数据请求参数保存
 * /command/data/request
 */
export function saveRequestParameter(data) {
    return request({
        url: `command/data/request/parameters`,
        method: 'post',
        data: data
    })
}

/**
 *  数据请求参数删除
 * /command/data/request/parameters/delete
 */
export function removeParameter(data) {
    return request({
        url: `command/data/request/parameters/delete?parameterId=${data.id}`,
        method: 'post'
    })
}