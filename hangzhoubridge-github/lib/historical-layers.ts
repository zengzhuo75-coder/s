/**
 * 历史水系图层数据
 * 用于地图叠加显示，展示古代水系变化
 */

export interface HistoricalWaterLayer {
  id: string
  name: string
  period: string
  periodStart: number
  periodEnd: number
  imageUrl: string
  bounds: [[number, number], [number, number]] // [[south, west], [north, east]]
  description: string
  highlights: string[]
  defaultOpacity: number
}

/**
 * 历史水系图层配置
 */
export const historicalWaterLayers: HistoricalWaterLayer[] = [
  {
    id: 'tang-westlake',
    name: '唐代西湖',
    period: '唐代',
    periodStart: 618,
    periodEnd: 907,
    imageUrl: '/images/maps/westlake-tang.png',
    bounds: [[30.23, 120.13], [30.27, 120.17]],
    description: '唐代西湖水域范围，白居易任杭州刺史时疏浚西湖，筑白堤，建锦带、玉带、西泠三桥。',
    highlights: [
      '白居易筑白堤',
      '西湖三桥建成',
      '水域面积约5.6平方公里'
    ],
    defaultOpacity: 0.6
  },
  {
    id: 'song-su-dike',
    name: '宋代苏堤',
    period: '北宋',
    periodStart: 960,
    periodEnd: 1279,
    imageUrl: '/images/maps/su-dike-song.png',
    bounds: [[30.22, 120.12], [30.28, 120.20]],
    description: '元祐四年（1089年），苏东坡率民工疏浚西湖，用淤泥筑成苏堤，建六桥：映波、锁澜、望山、压堤、东浦、跨虹。',
    highlights: [
      '苏东坡筑苏堤',
      '苏堤六桥建成',
      '苏堤长度2.8公里'
    ],
    defaultOpacity: 0.7
  },
  {
    id: 'song-canal',
    name: '宋代运河',
    period: '南宋',
    periodStart: 1127,
    periodEnd: 1279,
    imageUrl: '/images/maps/canal-song.png',
    bounds: [[30.20, 120.14], [30.30, 120.22]],
    description: '南宋定都临安（杭州），京杭大运河成为朝廷经济命脉。拱宸桥、大关桥巍然屹立，漕运兴盛。',
    highlights: [
      '南宋定都临安',
      '运河成为经济命脉',
      '漕运兴盛'
    ],
    defaultOpacity: 0.6
  },
  {
    id: 'ming-qing-bridges',
    name: '明清桥梁',
    period: '元明清',
    periodStart: 1279,
    periodEnd: 1911,
    imageUrl: '/images/maps/bridges-ming-qing.png',
    bounds: [[30.18, 120.10], [30.32, 120.24]],
    description: '元明清时期，桥梁从城市向乡村扩散。塘栖广济桥、忠义桥等名桥相继建成，形成"小桥流水人家"的江南风貌。',
    highlights: [
      '桥梁向乡村扩散',
      '广济桥建成',
      '江南水乡风貌形成'
    ],
    defaultOpacity: 0.5
  }
]

/**
 * 获取指定时期的水系图层
 */
export function getHistoricalLayerByPeriod(period: string): HistoricalWaterLayer | undefined {
  return historicalWaterLayers.find(layer => layer.period === period)
}

/**
 * 获取指定年份的水系图层
 */
export function getHistoricalLayerByYear(year: number): HistoricalWaterLayer | undefined {
  return historicalWaterLayers.find(
    layer => year >= layer.periodStart && year <= layer.periodEnd
  )
}
