import request from '@/utils/request'


/**
 *获取指标树
 * /command/target/targetTreeNoAuth
 */
export function targetTree(id) {
  return request({
    url: '/command/target/targetTreeNoAuth?parentId='+id,
    method: 'get'
  })
}

