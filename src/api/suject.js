import request from '@/utils/request'


/**
 *获取专题树
 * /command/subject/subjectTree
 */
export function subjectTree(id) {
  return request({
    url: '/command/subject/subjectTree?parentId='+id,
    method: 'get'
  })
}

