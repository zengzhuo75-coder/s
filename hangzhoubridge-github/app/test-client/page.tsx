'use client'

import { useState, useEffect } from 'react'
import { bridgeNodes } from '@/lib/bridge-data-new'

export default function TestClientPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    console.log('=== 客户端测试 ===')
    console.log('bridgeNodes:', bridgeNodes)
    console.log('bridgeNodes类型:', typeof bridgeNodes)
    console.log('bridgeNodes长度:', bridgeNodes?.length)
    console.log('bridgeNodes前3个:', bridgeNodes?.slice(0, 3))

    setData({
      exists: !!bridgeNodes,
      type: typeof bridgeNodes,
      isArray: Array.isArray(bridgeNodes),
      length: bridgeNodes?.length || 0,
      first3: bridgeNodes?.slice(0, 3) || []
    })
  }, [])

  if (!data) {
    return <div className="p-8">加载中...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">客户端数据测试</h1>
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded">
          <p>存在: {data.exists ? '✓' : '✗'}</p>
          <p>类型: {data.type}</p>
          <p>是数组: {data.isArray ? '✓' : '✗'}</p>
          <p>长度: <span className="font-bold text-green-600">{data.length}</span></p>
        </div>

        {data.first3.length > 0 && (
          <div className="bg-green-50 p-4 rounded">
            <h2 className="font-semibold mb-2">前3座桥梁:</h2>
            <ul className="list-disc pl-5">
              {data.first3.map((bridge: any) => (
                <li key={bridge.id}>
                  {bridge.name} - {bridge.year}年 - {bridge.river}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
