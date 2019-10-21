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
 *  数据请求删除
 * /command/data/request/delete
 */
export function remove(data) {
    return request({
        url: `command/data/request/delete?name=${data.name}`,
        method: 'post'
    })
}