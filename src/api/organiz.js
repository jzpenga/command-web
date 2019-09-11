import request from '@/utils/request'




/**
 *  组织机构树获取
 * /command/dept/deptTreeAll
 */
export function fetchList() {
    return request({
        url: `/command/dept/deptTreeAll`,
        method: 'get'
    })
}
