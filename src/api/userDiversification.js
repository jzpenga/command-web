import request from '@/utils/request'




/**
 *  千人千面
 */
export function saveUrl(data) {
    return request({
        url: `/command/diversification/urls`,
        method: 'post',
        data
    })
}
