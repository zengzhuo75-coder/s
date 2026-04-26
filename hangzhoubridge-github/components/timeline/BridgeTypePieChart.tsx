'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { TimelineEra } from '@/lib/timeline-data'
import { getBridgeTypeDistribution, BridgeTypeDistribution } from '@/lib/bridge-type-distribution'
import { heritageColors, typography } from '@/lib/heritage-design-system'

const ReactECharts = dynamic(
  () => import('echarts-for-react'),
  { ssr: false }
)

interface BridgeTypePieChartProps {
  era: TimelineEra | null
}

export function BridgeTypePieChart({ era }: BridgeTypePieChartProps) {
  const chartOption = useMemo(() => {
    if (!era) {
      return {
        title: {
          text: '请选择时期',
          left: 'center',
          top: 'center',
          textStyle: {
            fontSize: 14,
            color: heritageColors.text.secondary
          }
        }
      }
    }

    const distribution = getBridgeTypeDistribution(era)

    if (distribution.length === 0) {
      return {
        title: {
          text: '该时期暂无数据',
          left: 'center',
          top: 'center',
          textStyle: {
            fontSize: 14,
            color: heritageColors.text.secondary
          }
        }
      }
    }

    const data = distribution.map(d => ({
      value: d.count,
      name: d.typeLabel,
      itemStyle: {
        color: d.color
      }
    }))

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}座 ({d}%)',
        backgroundColor: 'rgba(31, 26, 23, 0.9)',
        borderColor: heritageColors.bronzeGold,
        borderWidth: 1,
        textStyle: {
          color: heritageColors.ivory,
          fontFamily: typography.fontFamily.serif
        }
      },
      legend: {
        orient: 'horizontal',
        bottom: '5%',
        left: 'center',
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 16,
        textStyle: {
          fontSize: 12,
          color: heritageColors.text.secondary,
          fontFamily: typography.fontFamily.serif
        },
        icon: 'circle'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '40%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 8,
            borderColor: heritageColors.ivory,
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}\n{d}%',
            fontSize: 13,
            color: heritageColors.inkBlack,
            fontFamily: typography.fontFamily.serif,
            fontWeight: 500
          },
          labelLine: {
            show: true,
            length: 15,
            length2: 15,
            smooth: true,
            lineStyle: {
              color: heritageColors.text.tertiary,
              width: 1.5
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 15,
              fontWeight: 'bold',
              color: heritageColors.inkBlack
            },
            itemStyle: {
              shadowBlur: 12,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.25)'
            }
          },
          data,
          animationType: 'expansion',
          animationEasing: 'cubicOut',
          animationDelay: (idx: number) => idx * 50
        }
      ]
    }
  }, [era])

  const EChartsComponent = ReactECharts as any

  return (
    <EChartsComponent
      option={chartOption}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  )
}
