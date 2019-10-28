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
 * /command/target/getById/{id}
 */
export function getTargetById(data) {
  return request({
    url: `/command/target/getById/${data}`,
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
 * 保存指标信息
 * /command/target/save
 */
export function saveTarget(data) {
  return request({
    url: `/command/target/save`,
    method: 'post',
    data
  })
}

/**
 * /command/target/delete
 */
export function deleteTarget(data) {
  return request({
    url: `/command/target/delete`,
    method: 'delete',
    data
  })
}

export function updateGradationById(id, gradation) {
    return request({
        url: `/command/target/updateGradationById`,
        method: 'post',
        params: {id: id, gradation: gradation}
    })
}