import request from '@/utils/request'


/**
 *获取专题树
 * /command/subject/subjectTreeNoAuth
 */
export function subjectTree(id) {
  return request({
    url: '/command/subject/subjectTreeNoAuth?parentId='+id,
    method: 'get'
  })
}

/**
 *  指标专题获取
 * /command/subject/subjectTreeAll
 */
export function fetchList() {
  return request({
    url: `/command/subject/subjectTreeAll`,
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

/**
 * 保存专题信息
 * /command/subject/save
 */
export function saveSubject(data) {
  return request({
    url: `/command/subject/save`,
    method: 'post',
    data
  })
}

/**
 * /command/subject/delete
 */
export function deleteSubject(data) {
  return request({
    url: `/command/subject/delete`,
    method: 'delete',
    data
  })
}


/**
 * 根据id获取专题信息
 * /command/subject/getById/{id}
 */
export function getSubjectById(data) {
  return request({
    url: `/command/subject/getById/${data}`,
    method: 'get'
  })
}
