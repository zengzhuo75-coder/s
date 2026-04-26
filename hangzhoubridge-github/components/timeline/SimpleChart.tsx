'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(
  () => import('echarts-for-react'),
  { ssr: false }
)

export function SimpleChart() {
  const [error, setError] = useState<string | null>(null)

  const getChartOption = () => {
    return {
      grid: {
        left: '10%',
        right: '5%',
        bottom: '15%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['300', '600', '960', '1200', '1500', '2000'],
        axisLine: {
          lineStyle: {
            color: '#E5E7EB'
          }
        },
        axisLabel: {
          color: '#6B7280',
          fontSize: 11
        }
      },
      yAxis: {
        type: 'value',
        name: '桥梁数量',
        nameTextStyle: {
          color: '#6B7280',
          fontSize: 12
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
        }
      },
      series: [{
        name: '桥梁数量',
        data: [1, 3, 5, 12, 18, 45],
        type: 'line',
        smooth: true,
        symbolSize: 6,
        lineStyle: {
          width: 3,
          color: '#2D6A4F'
        },
        itemStyle: {
          color: '#2D6A4F',
          borderWidth: 2,
          borderColor: 'white'
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
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500 text-sm">
        {error}
      </div>
    )
  }

  return (
    <ReactECharts
      option={getChartOption()}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  )
}
