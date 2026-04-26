'use client'

import { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { BridgeNode, ConnectionMode, getConnectionsByMode, getYearColor } from '@/lib/bridge-data-new'
import { ChevronLeft, Clock, MapPin, Network, Maximize2, Minimize2 } from 'lucide-react'

// 添加旋转动画样式
if (typeof window !== 'undefined') {
  const style = document.createElement('style')
  style.innerHTML = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `
  document.head.appendChild(style)
}

// 动态导入地图组件，确保只在客户端加载
const LeafletMapComponent = dynamic(() => import('./leaflet-map').then(m => ({ default: m.LeafletMapComponent })), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#f5f0e6' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #e5e7eb', borderTopColor: '#374151', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
        <p style={{ color: '#6B7280', margin: 0 }}>正在加载地图...</p>
      </div>
    </div>
  )
})

interface MapClientProps {
  initialBridges: BridgeNode[]
}

type MapMode = 'distribution' | 'connection'

export function MapClient({ initialBridges }: MapClientProps) {
  const router = useRouter()

  const [mapMode, setMapMode] = useState<MapMode>('distribution')
  const [connectionMode, setConnectionMode] = useState<ConnectionMode>('temporal')
  const [selectedBridge, setSelectedBridge] = useState<BridgeNode | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [focusedBridges, setFocusedBridges] = useState<BridgeNode[] | null>(null)

  // 计算连接关系
  const connections = useMemo(() => {
    if (mapMode !== 'connection') return []
    return getConnectionsByMode(initialBridges, connectionMode)
  }, [mapMode, connectionMode, initialBridges])

  // 桥梁点击处理
  const handleBridgeClick = useCallback((bridge: BridgeNode) => {
    if (mapMode === 'distribution') {
      // 分布模式：跳转到详情页
      router.push(`/bridges/${bridge.id}`)
    } else {
      // 连接模式：选中/取消选中，并计算需要聚焦的桥梁
      if (selectedBridge?.id === bridge.id) {
        // 点击同一个桥梁，取消选中
        setSelectedBridge(null)
        setFocusedBridges(null)
      } else {
        // 选中新桥梁，找出所有连接的桥梁
        setSelectedBridge(bridge)

        // 找出与当前桥梁有连接关系的所有桥梁
        const connectedBridgeIds = new Set<string>([bridge.id])
        connections.forEach(conn => {
          if (conn.source === bridge.id) {
            connectedBridgeIds.add(conn.target)
          } else if (conn.target === bridge.id) {
            connectedBridgeIds.add(conn.source)
          }
        })

        const focused = initialBridges.filter(b => connectedBridgeIds.has(b.id))
        setFocusedBridges(focused)
      }
    }
  }, [mapMode, router, selectedBridge, connections, initialBridges])

  // 地图点击（取消选中）
  const handleMapClick = useCallback(() => {
    setSelectedBridge(null)
    setFocusedBridges(null)
  }, [])

  // 切换地图模式
  const toggleMapMode = useCallback(() => {
    setMapMode(prev => {
      const newMode = prev === 'distribution' ? 'connection' : 'distribution'
      // 切换到连接模式时，清除选中状态
      if (newMode === 'connection') {
        setSelectedBridge(null)
      }
      return newMode
    })
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#F5F0E6', overflow: 'hidden' }}>
      {/* 顶部导航栏 */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.9)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        zIndex: 50
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#374151' }}>
          <ChevronLeft size={20} />
          <span style={{ fontWeight: 500 }}>返回</span>
        </Link>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>桥·水·城</h1>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          style={{ padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '50%' }}
          title={isFullscreen ? '退出全屏' : '全屏'}
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
      </header>

      {/* 主内容区域 */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* 左侧控制面板 */}
        <div style={{
          width: isFullscreen ? '64px' : '280px',
          background: 'rgba(255,255,255,0.95)',
          borderRight: '1px solid rgba(0,0,0,0.1)',
          overflowY: 'auto',
          zIndex: 10,
          transition: 'width 0.3s'
        }}>
          <div style={{ padding: '16px' }}>
            {/* 地图模式切换 */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>地图模式</h3>
              <button
                onClick={toggleMapMode}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: mapMode === 'distribution' ? '#1F2937' : '#F3F4F6',
                  color: mapMode === 'distribution' ? 'white' : '#374151',
                  transition: 'background 0.2s'
                }}
              >
                {mapMode === 'distribution' ? <MapPin size={20} /> : <Network size={20} />}
                {!isFullscreen && (
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ margin: 0, fontWeight: 500, fontSize: '14px' }}>
                      {mapMode === 'distribution' ? '分布模式' : '连接模式'}
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>
                      {mapMode === 'distribution' ? '点击查看详情' : '点击查看关系'}
                    </p>
                  </div>
                )}
              </button>
            </div>

            {/* 连接模式选择（仅在连接模式下显示） */}
            {mapMode === 'connection' && !isFullscreen && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>连接类型</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { mode: 'temporal' as ConnectionMode, icon: Clock, label: '时间模式', desc: '按年份' },
                    { mode: 'river' as ConnectionMode, icon: Network, label: '河流模式', desc: '按水系' }
                  ].map(({ mode, icon: Icon, label, desc }) => (
                    <button
                      key={mode}
                      onClick={() => setConnectionMode(mode)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: connectionMode === mode ? '#1F2937' : '#F3F4F6',
                        color: connectionMode === mode ? 'white' : '#374151',
                        transition: 'background 0.2s'
                      }}
                    >
                      <Icon size={18} />
                      <div style={{ textAlign: 'left', flex: 1 }}>
                        <p style={{ margin: 0, fontWeight: 500, fontSize: '13px' }}>{label}</p>
                        <p style={{ margin: 0, fontSize: '11px', opacity: 0.7 }}>{desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 统计信息 */}
            {!isFullscreen && (
              <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }}>
                  桥梁数量: <span style={{ fontWeight: 600, color: '#1F2937' }}>{initialBridges.length}</span>
                </p>
                {mapMode === 'connection' && (
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }}>
                    连接数量: <span style={{ fontWeight: 600, color: '#1F2937' }}>{connections.length}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 地图区域 */}
        <div style={{ flex: 1, position: 'relative', minHeight: '400px', overflow: 'hidden' }}>
          {/* 状态指示器 */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            padding: '8px 12px',
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '8px',
            fontSize: '12px',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <span>桥梁: <b>{initialBridges.length}</b></span>
            <span style={{ marginLeft: '12px', color: '#2D6A4F' }}>
              {mapMode === 'distribution' ? '分布模式' : '连接模式'}
            </span>
          </div>

          {/* 地图组件 */}
          <LeafletMapComponent
            bridges={initialBridges}
            connections={connections}
            selectedBridge={selectedBridge}
            focusedBridges={focusedBridges}
            onBridgeClick={handleBridgeClick}
            onMapClick={handleMapClick}
            showConnections={mapMode === 'connection'}
          />

          {/* 提示信息 */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '8px',
            fontSize: '14px',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            {mapMode === 'distribution' ? '💡 点击桥梁标记查看详情' : '💡 点击桥梁标记查看关系'}
          </div>
        </div>

        {/* 右侧关系面板（仅连接模式且选中桥梁时显示） */}
        {mapMode === 'connection' && selectedBridge && (
          <div style={{
            width: '320px',
            background: 'rgba(255,255,255,0.95)',
            borderLeft: '1px solid rgba(0,0,0,0.1)',
            overflowY: 'auto',
            zIndex: 10,
            transition: 'transform 0.3s ease-in-out'
          }}>
            <div style={{ padding: '20px' }}>
              {/* 关闭按钮 */}
              <button
                onClick={() => setSelectedBridge(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '4px 8px',
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ✕
              </button>

              {/* 桥梁名称 */}
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: '8px',
                marginTop: '0'
              }}>
                {selectedBridge.name}
              </h2>

              {/* 年代标签 */}
              <div style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: getYearColor(selectedBridge.year),
                color: 'white',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 500,
                marginBottom: '16px'
              }}>
                {selectedBridge.year}
              </div>

              {/* 基本信息 */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }}>
                  <strong>类型:</strong> {selectedBridge.type}
                </p>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }}>
                  <strong>水系:</strong> {selectedBridge.river}
                </p>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }}>
                  <strong>位置:</strong> {selectedBridge.location[1].toFixed(4)}, {selectedBridge.location[0].toFixed(4)}
                </p>
              </div>

              {/* 描述 */}
              {selectedBridge.description && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                    简介
                  </h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#6B7280', lineHeight: '1.6' }}>
                    {selectedBridge.description}
                  </p>
                </div>
              )}

              {/* 连接关系 */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
                  连接关系 ({connectionMode === 'temporal' ? '时间' : connectionMode === 'river' ? '河流' : ''}模式)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {connections
                    .filter(c => c.source === selectedBridge.id || c.target === selectedBridge.id)
                    .map((conn, idx) => {
                      const otherBridgeId = conn.source === selectedBridge.id ? conn.target : conn.source
                      const otherBridge = initialBridges.find(b => b.id === otherBridgeId)
                      if (!otherBridge) return null

                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedBridge(otherBridge)}
                          style={{
                            padding: '12px',
                            background: '#f9fafb',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                            border: '1px solid #e5e7eb'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                          onMouseLeave={(e) => e.currentTarget.style.background = '#f9fafb'}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: getYearColor(otherBridge.year),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '14px',
                              fontWeight: 'bold'
                            }}>
                              {otherBridge.name.charAt(0)}
                            </div>
                            <div style={{ flex: 1 }}>
                              <p style={{ margin: 0, fontWeight: 500, fontSize: '14px', color: '#1F2937' }}>
                                {otherBridge.name}
                              </p>
                              <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>
                                {otherBridge.year} · {conn.type}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>

                {connections.filter(c => c.source === selectedBridge.id || c.target === selectedBridge.id).length === 0 && (
                  <p style={{ margin: 0, fontSize: '14px', color: '#9CA3AF', textAlign: 'center', padding: '20px 0' }}>
                    暂无连接关系
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
