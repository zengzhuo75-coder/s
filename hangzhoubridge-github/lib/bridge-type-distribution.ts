/**
 * 桥梁种类分布数据计算
 */

import { bridgeNodes, BridgeNode } from './bridge-data-new'
import { TimelineEra, getEraByYear } from './timeline-data'

// 桥梁类型中文映射
export const bridgeTypeLabels: Record<string, string> = {
  arch: '拱桥',
  beam: '梁桥',
  suspension: '悬索桥',
  pontoon: '浮桥',
  cantilever: '悬臂桥'
}

// 桥梁类型颜色
export const bridgeTypeColors: Record<string, string> = {
  arch: '#A67C52',      // 青铜金
  beam: '#6E8B74',      // 青瓷绿
  suspension: '#2563EB', // 蓝色
  pontoon: '#A63D2F',   // 朱砂红
  cantilever: '#7B2D8E' // 紫色
}

export interface BridgeTypeDistribution {
  type: string
  typeLabel: string
  count: number
  percentage: number
  color: string
}

/**
 * 获取指定时期的桥梁种类分布
 */
export function getBridgeTypeDistribution(era: TimelineEra): BridgeTypeDistribution[] {
  // 筛选出属于该时期的桥梁
  const eraBridges = bridgeNodes.filter(bridge => {
    const bridgeEra = getEraByYear(bridge.year)
    return bridgeEra?.id === era.id
  })

  if (eraBridges.length === 0) {
    return []
  }

  // 按类型统计
  const typeCountMap: Record<string, number> = {}
  eraBridges.forEach(bridge => {
    typeCountMap[bridge.type] = (typeCountMap[bridge.type] || 0) + 1
  })

  // 计算百分比并转换为数组
  const distribution: BridgeTypeDistribution[] = Object.entries(typeCountMap).map(([type, count]) => ({
    type,
    typeLabel: bridgeTypeLabels[type] || type,
    count,
    percentage: Math.round((count / eraBridges.length) * 100),
    color: bridgeTypeColors[type] || '#A67C52'
  }))

  // 按数量排序
  distribution.sort((a, b) => b.count - a.count)

  return distribution
}

/**
 * 获取所有时期的桥梁种类分布映射
 */
export function getAllErasTypeDistribution(): Record<string, BridgeTypeDistribution[]> {
  const { timelineData } = require('./timeline-data')

  const distributions: Record<string, BridgeTypeDistribution[]> = {}

  timelineData.eras.forEach((era: TimelineEra) => {
    distributions[era.id] = getBridgeTypeDistribution(era)
  })

  return distributions
}
