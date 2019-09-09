import request from '@/utils/request'


// http://localhost:8060/command/dept/save
export function save(data) {
    return request({
        url: '/dept/save',
        method: 'post',
        data
    })
}
