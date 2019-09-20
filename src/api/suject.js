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


/**
 * 根据用户id获取专题
 * /command/subject/getSubjectListByUserId/{id}
 */
export function getSubjectListByUserId(data) {
  return request({
    url: `/command/subject/getSubjectListByUserId?userId=${data}`,
    method: 'get'
  })
}
