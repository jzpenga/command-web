import request from '@/utils/request'


/**
 *获取指标树
 * /command/target/targetTree
 */
export function targetTree(id) {
  return request({
    url: '/command/target/targetTree?parentId='+id,
    method: 'get'
  })
}

