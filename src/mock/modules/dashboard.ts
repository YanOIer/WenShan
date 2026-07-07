/**
 * Dashboard Mock 数据模块
 *
 * 示例：大屏首页的 Mock 接口
 */

import Mock from 'mockjs'

const Random = Mock.Random

/** 生成概览统计数据 */
function generateOverviewStats() {
  return Mock.mock({
    code: 200,
    data: {
      'totalUsers|10000-50000': 1,
      'todayActive|1000-8000': 1,
      'totalOrders|50000-200000': 1,
      'revenue|1000000-5000000': 1,
      'growthRate|5-25.1': 1,
      'satisfactionRate|85-99.1': 1,
    },
    message: 'success',
  })
}

/** 生成图表数据 */
function generateChartData(type: string) {
  return Mock.mock({
    code: 200,
    data: {
      'categories|7': ['@date("MM-dd")'],
      'values|7': ['@integer(100, 5000)'],
      'name': () => `${type}数据`,
    },
    message: 'success',
  })
}

/** 生成地图散点数据 */
function generateMapData() {
  return Mock.mock({
    code: 200,
    data: {
      'points|15-30': [
        {
          'name': '@city(true)',
          'value|100-999': 1,
          'coord|1': [
            ['@float(75, 135, 3, 3)', '@float(18, 53, 3, 3)'],
          ],
        },
      ],
    },
    message: 'success',
  })
}

/** 生成实时数据 */
function generateRealtimeData() {
  return Mock.mock({
    code: 200,
    data: {
      timestamp: Random.now(),
      'cpu|20-90.1': 1,
      'memory|30-85.1': 1,
      'disk|40-70.1': 1,
      'network|100-9999': 1,
    },
    message: 'success',
  })
}

/** 注册 Dashboard 的 Mock 接口 */
export function dashboardMock() {
  // 概览统计
  Mock.mock(/\/api\/dashboard\/overview/, 'get', generateOverviewStats)

  // 折线图数据
  Mock.mock(/\/api\/dashboard\/chart\/line/, 'get', () => generateChartData('折线图'))

  // 柱状图数据
  Mock.mock(/\/api\/dashboard\/chart\/bar/, 'get', () => generateChartData('柱状图'))

  // 饼图数据
  Mock.mock(/\/api\/dashboard\/chart\/pie/, 'get', () => generateChartData('饼图'))

  // 地图数据
  Mock.mock(/\/api\/dashboard\/map/, 'get', generateMapData)

  // 实时监控数据
  Mock.mock(/\/api\/dashboard\/realtime/, 'get', generateRealtimeData)
}