'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(
  () => import('echarts-for-react'),
  { ssr: false }
)

export default function TestChartPage() {
  const option = useMemo(() => ({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'line'
    }]
  }), [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Chart</h1>
      <div style={{ width: '600px', height: '400px' }}>
        <ReactECharts option={option} />
      </div>
    </div>
  )
}
