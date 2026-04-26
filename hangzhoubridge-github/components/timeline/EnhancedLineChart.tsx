'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { TimelineEra, timelineData } from '@/lib/timeline-data'

const ReactECharts = dynamic(
  () => import('echarts-for-react'),
  { ssr: false }
)

interface EnhancedLineChartProps {
  eras: TimelineEra[]
  selectedEraId: string | null
  onEraClick?: (eraId: string) => void
}

export function EnhancedLineChart({ eras, selectedEraId, onEraClick }: EnhancedLineChartProps) {
  const chartOption = useMemo(() => {
    // 防御性检查
    if (!timelineData.yearlyData || timelineData.yearlyData.length === 0) {
      return {}
    }

    if (!eras || eras.length === 0) {
      return {}
    }

    const xAxisData = timelineData.yearlyData.map(d => String(d.year))
    const seriesData = timelineData.yearlyData.map(d => d.count)

    return {
      animation: true,
      grid: {
        left: '8%',
        right: '5%',
        bottom: '15%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          color: '#6B7280',
          fontSize: 11,
          interval: (index: number) => index % 2 === 0
        }
      },
      yAxis: {
        type: 'value',
        name: '桥梁数量',
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
      series: [{
        name: '桥梁数量',
        type: 'line',
        smooth: true,
        data: seriesData,
        lineStyle: {
          width: 3,
          color: '#2D6A4F'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(45, 106, 79, 0.3)' },
              { offset: 1, color: 'rgba(45, 106, 79, 0.05)' }
            ]
          }
        }
      }]
    }
  }, [eras])

  const onChartClick = (params: any) => {
    console.log('Chart clicked:', params)
  }

  return (
    <ReactECharts
      option={chartOption}
      style={{ height: '100%', width: '100%', minHeight: '400px' }}
      opts={{ renderer: 'canvas' }}
      onEvents={{ click: onChartClick }}
    />
  )
}
