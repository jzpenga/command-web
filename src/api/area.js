import request from '@/utils/request'


/**
 *  区域获取
 * /command/area/areaTreeAll
 */
export function fetchList() {
  return request({
    url: `/command/area/areaTreeAll`,
    method: 'get'
  })
}

/**
 * 保存区域信息
 * /command/area/save
 */
export function save(data) {
  return request({
    url: `/command/area/save`,
    method: 'post',
    data
  })
}

/**
 * /command/area/delete
 */
export function deleteArea(data) {
  return request({
    url: `/command/area/delete`,
    method: 'delete',
    data
  })
}


/**
 * 根据id获取区域信息
 * /command/area/getById/{id}
 */
export function getAreaById(data) {
  return request({
    url: `/command/area/getById/${data}`,
    method: 'get'
  })
}

/**
 * /command/areaDiversification/urls
 */
export function saveAreaDiversification(data) {
  return request({
    url: `/command/areaDiversification/urls`,
    method: 'post',
    data
  })
}
