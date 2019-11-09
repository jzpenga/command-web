import request from '@/utils/request'

/**
 *  参数获取
 * /command/parameters
 */
export function fetchList(data) {
    return request({
        url: `/command/parameters`,
        method: 'get',
        params: data
    })
}

/**
 *  参数修改
 * /command/parameters/modify
 */
export function modify(data) {
    return request({
        url: `/command/parameters/modify`,
        method: 'post',
        data: data
    })
}

/**
 *  参数增加
 * /command/parameters/create
 */
export function add(data) {
    return request({
        url: `/command/parameters/create`,
        method: 'post',
        data: data
    })
}

/**
 *  参数删除
 * /command/parameters/delete
 */
export function remove(data) {
    return request({
        url: `/command/parameters/delete?id=${data.id}`,
        method: 'post'
    })
}

/**
 *  更据参数名字获取值
 * /command/parameters/name
 */
export function getValueByName(name) {
    return request({
        url: `/command/parameters/name?name=${name}`,
        method: 'get'
    })
}
