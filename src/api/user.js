import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/command/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

/**
 * 获取用户列表
 * /command/user/userList
 */
export function fetchList(data) {
  return request({
    url: `/command/user/userList?page=${data.pageNum}&rows=${data.pageSize}`,
    method: 'get'
  })
}


/**
 * 根据id获取用户信息
 * /command/user/getUserById/{id}
 */
export function getUserById(data) {
  return request({
    url: `/command/user/getUserById/${data}`,
    method: 'get'
  })
}



/**
 * 保存用户信息
 * /command/user/saveUser
 */
export function saveUser(data) {
  return request({
    url: `/command/user/saveUser`,
    method: 'post',
    data
  })
}
