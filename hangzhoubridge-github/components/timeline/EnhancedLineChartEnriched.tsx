'use client'

import { useMemo, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { TimelineEra, yearlyChartData, getEraByYear } from '@/lib/timeline-data-enriched'

const ReactECharts = dynamic(
  () => import('echarts-for-react'),
  { ssr: false }
)

interface EnhancedLineChartProps {
  eras: TimelineEra[]
  selectedEraId: string | null
  onEraClick?: (eraId: string) => void
}

/**
 * 增强型折线图组件
 * - markPoint 标注时期高峰
 * - markArea 高亮选中时期
 * - 交互式 tooltip
 * - 点击标记跳转时期
 */
export function EnhancedLineChartEnriched({
  eras,
  selectedEraId,
  onEraClick
}: EnhancedLineChartProps) {
  const chartRef = useRef<any>(null)

  const chartOption = useMemo(() => {
    if (!yearlyChartData || yearlyChartData.length === 0) {
      return {}
    }

    if (!eras || eras.length === 0) {
      return {}
    }

    // 计算每个时期的标记点（使用时期中间年份的最近数据点）
    const markPoints = eras.map(era => {
      const midYear = Math.round((era.startYear + era.endYear) / 2)
      // 找到最接近的年份数据点索引
      const closestIndex = yearlyChartData.findIndex(
        d => Math.abs(d.year - midYear) === Math.min(
          ...yearlyChartData.map(d => Math.abs(d.year - midYear))
        )
      )

      const dataIndex = closestIndex >= 0 ? closestIndex : 0
      const dataPoint = yearlyChartData[dataIndex]

      return {
        name: era.id,
        coord: [dataIndex, era.bridgeCount],
        value: era.bridgeCount,
        itemStyle: {
          color: era.color,
          borderColor: '#fff',
          borderWidth: 2,
          shadowColor: era.color,
          shadowBlur: 10,
          shadowOffsetY: 2
        },
        label: {
          show: true,
          formatter: era.name,
          position: 'top',
          fontSize: 13,
          fontWeight: 'bold',
          color: era.color,
          distance: 8
        },
        emphasis: {
          scale: 1.3,
          itemStyle: {
            shadowBlur: 20
          }
        }
      }
    })

    // 选中时期的高亮区域
    const selectedEra = selectedEraId
      ? eras.find(e => e.id === selectedEraId)
      : null

    const markAreas = selectedEra
      ? [
          {
            name: '当前时期',
            silent: false,
            itemStyle: {
              color: selectedEra.color + '15',
              borderColor: selectedEra.color + '40',
              borderWidth: 2,
              borderType: 'dashed'
            },
            data: [
              [
                {
                  name: selectedEra.startYear.toString(),
                  xAxis: selectedEra.startYear
                },
                {
                  name: selectedEra.endYear.toString(),
                  xAxis: selectedEra.endYear
                }
              ]
            ],
            label: {
              show: true,
              position: 'top',
              formatter: `${selectedEra.name} (${selectedEra.startYear}-${selectedEra.endYear})`,
              color: selectedEra.color,
              fontSize: 14,
              fontWeight: 'bold',
              backgroundColor: 'rgba(255,255,255,0.9)',
              padding: [4, 8],
              borderRadius: 4
            }
          }
        ]
      : []

    return {
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicOut',
      grid: {
        left: '8%',
        right: '6%',
        bottom: '18%',
        top: '18%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        textStyle: {
          color: '#1A1A2E',
          fontSize: 13
        },
        padding: [16, 20],
        extraCssText: 'box-shadow: 0 4px 20px rgba(0,0,0,0.1); border-radius: 12px;',
        formatter: (params: any) => {
          const param = params[0]
          const year = param.name
          const count = param.value
          const era = getEraByYear(year)

          if (!era) {
            return `
              <div style="min-width: 200px;">
                <div style="font-size: 16px; font-weight: bold; color: #1A1A2E; margin-bottom: 8px;">
                  ${year}年
                </div>
                <div style="font-size: 14px; color: #6B7280;">
                  桥梁数量: <span style="color: #2D6A4F; font-weight: bold;">${count}座</span>
                </div>
              </div>
            `
          }

          return `
            <div style="min-width: 240px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                <div style="width: 10px; height: 10px; border-radius: 50%; background: ${era.color};"></div>
                <span style="font-weight: bold; font-size: 15px; color: ${era.color};">${era.name}</span>
              </div>
              <div style="color: #6B7280; font-size: 12px; margin-bottom: 8px;">
                ${year}年 · ${era.tag}
              </div>
              <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 10px;">
                <span style="font-size: 20px; font-weight: bold; color: ${era.color};">${count}座</span>
                <span style="font-size: 13px; color: #6B7280;">桥梁</span>
              </div>
              <div style="font-size: 12px; color: #4B5563; line-height: 1.6; padding-top: 8px; border-top: 1px solid #E5E7EB;">
                ${era.storyText.substring(0, 60).replace(/\*\*/g, '').replace(/\n/g, ' ')}...
              </div>
              <div style="margin-top: 10px; font-size: 11px; color: #9CA3AF; font-style: italic;">
                💡 点击标记点查看详情
              </div>
            </div>
          `
        }
      },
      xAxis: {
        type: 'category',
        data: yearlyChartData.map(d => d.year),
        axisLine: {
          lineStyle: {
            color: '#E5E7EB',
            width: 2
          }
        },
        axisLabel: {
          color: '#6B7280',
          fontSize: 11,
          interval: (index: number) => index % 3 === 0,
          formatter: (value: number) => {
            if (value >= 1000) {
              return `${(value / 1000).toFixed(0)}k`
            }
            return value
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        name: '桥梁数量',
        nameTextStyle: {
          color: '#6B7280',
          fontSize: 12,
          padding: [0, 0, 0, -10]
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#6B7280',
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            color: '#F3F4F6',
            type: 'dashed'
          }
        },
        max: 50
      },
      series: [
        {
          name: '桥梁数量',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          data: yearlyChartData.map(d => d.count),
          lineStyle: {
            width: 3,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#7B2D8E' },
                { offset: 0.33, color: '#2D6A4F' },
                { offset: 0.66, color: '#3D5A80' },
                { offset: 1, color: '#2563EB' }
              ]
            }
          },
          itemStyle: {
            borderWidth: 2,
            borderColor: 'white',
            shadowColor: 'rgba(0,0,0,0.15)',
            shadowBlur: 4
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(123, 45, 142, 0.12)' },
                { offset: 0.33, color: 'rgba(45, 106, 79, 0.12)' },
                { offset: 0.66, color: 'rgba(61, 90, 128, 0.1)' },
                { offset: 1, color: 'rgba(37, 99, 235, 0.08)' }
              ]
            }
          },
          markPoint: {
            data: markPoints,
            symbol: 'circle',
            symbolSize: 45,
            label: {
              show: true,
              fontSize: 12,
              fontWeight: 'bold'
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 15,
                shadowColor: 'rgba(0,0,0,0.3)'
              }
            }
          },
          markArea: {
            silent: false,
            data: markAreas
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 3,
              shadowBlur: 8
            }
          }
        }
      ],
      // 添加视觉映射，为不同时期设置不同颜色
      visualMap: {
        show: false,
        type: 'piecewise',
        dimension: 0,
        pieces: eras.map(era => ({
          lte: era.endYear,
          gte: era.startYear,
          color: era.color + '20'
        }))
      }
    }
  }, [eras, selectedEraId])

  // 处理图表点击事件
  const onChartClick = (params: any) => {
    if (onEraClick && params.componentType === 'markPoint') {
      onEraClick(params.name)
    }
  }

  // 当选中时期变化时，高亮对应的标记点
  useEffect(() => {
    if (chartRef.current && selectedEraId) {
      const chart = chartRef.current.getEchartsInstance()
      // 触发图表更新以显示高亮区域
      chart.setOption({
        series: [{
          markPoint: {
            data: chartOption.series?.[0]?.markPoint?.data
          },
          markArea: {
            data: chartOption.series?.[0]?.markArea?.data
          }
        }]
      })
    }
  }, [selectedEraId])

  const EChartsComponent = ReactECharts as any

  return (
    <EChartsComponent
      ref={chartRef}
      option={chartOption}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'canvas' }}
      onEvents={{ click: onChartClick }}
    />
  )
}
