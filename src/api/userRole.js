import request from '@/utils/request'


/**
 *获取角色列表
 * /command/user/roleList
 */
export function fetchList(data) {
  return request({
    url: `/command/user/roleList?page=${data.pageNum}&rows=${data.pageSize}`,
    method: 'get'
  })
}

/**
 *获取权限列表
 * /command/user/saveRole
 */
export function saveRole(data) {
  return request({
    url: `/command/user/saveRole`,
    method: 'post',
    data
  })
}

/**
 *获取权限列表
 * /command/user/getRoleById/{id}
 */
export function getRoleById(id) {
  return request({
    url: `/command/user/getRoleById/${id}`,
    method: 'get'
  })
}


/**
 * /command/user/deleteRole
 */
export function deleteRole(data) {
  return request({
    url: `/command/user/deleteRole`,
    method: 'delete',
    data
  })
}
