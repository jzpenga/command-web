import request from '@/utils/request'

/**
 *  指标分类获取
 * /command/target/targetTreeAll
 */
export function fetchList() {
  return request({
    url: `/command/target/targetTreeAll`,
    method: 'get'
  })
}

/**
 * 根据id获取指标信息
 * /command/target/getTargetById/{id}
 */
export function getTargetById(data) {
  return request({
    url: `/command/target/getTargetById/${data}`,
    method: 'get'
  })
}

/**
 * 根据用户id获取指标
 * /command/target/getTargetListByUserId/{id}
 */
export function getTargetListByUserId(data) {
  return request({
    url: `/command/target/getTargetListByUserId?userId=${data}`,
    method: 'get'
  })
}



/**
 * 保存用户信息
 * /command/target/saveTarget
 */
export function saveTarget(data) {
  return request({
    url: `/command/target/saveTarget`,
    method: 'post',
    data
  })
}

/**
 * /command/target/deleteTarget
 */
export function deleteTarget(data) {
  return request({
    url: `/command/target/deleteTarget`,
    method: 'delete',
    data
  })
}
