'use client'

import { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BridgeNode,
  ConnectionMode,
  getConnectionsByMode,
  getYearColor
} from '@/lib/bridge-data-new'
import {
  HistoricalWaterLayer,
  historicalWaterLayers,
  getHistoricalLayerByYear
} from '@/lib/historical-layers'
import {
  EraSnapshot,
  eraSnapshots,
  getEraSnapshot
} from '@/lib/era-snapshots'
import {
  getConnectionStory
} from '@/lib/connection-stories'
import {
  ChevronLeft,
  Clock,
  MapPin,
  Network,
  Layers,
  Eye,
  EyeOff,
  Info,
  X,
  Calendar,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react'

// 动态导入增强版地图组件
const EnhancedLeafletMap = dynamic(
  () => import('./EnhancedLeafletMap').then(m => ({ default: m.EnhancedLeafletMap })),
  {
    ssr: false,
    loading: () => (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: '#f5f0e6'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e5e7eb',
            borderTopColor: '#374151',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#6B7280', margin: 0 }}>正在加载地图...</p>
        </div>
      </div>
    )
  }
)

interface EnhancedMapClientProps {
  initialBridges: BridgeNode[]
}

type MapMode = 'distribution' | 'connection'

export function EnhancedMapClient({ initialBridges }: EnhancedMapClientProps) {
  const router = useRouter()

  // 地图模式状态
  const [mapMode, setMapMode] = useState<MapMode>('connection')
  const [connectionMode, setConnectionMode] = useState<ConnectionMode>('temporal')
  const [selectedBridge, setSelectedBridge] = useState<BridgeNode | null>(null)
  const [focusedBridges, setFocusedBridges] = useState<BridgeNode[] | null>(null)

  // 历史图层状态
  const [activeHistoricalLayer, setActiveHistoricalLayer] = useState<HistoricalWaterLayer | null>(null)
  const [layerOpacity, setLayerOpacity] = useState(0.6)
  const [showLayerPanel, setShowLayerPanel] = useState(false)

  // 故事面板状态
  const [selectedStory, setSelectedStory] = useState<any>(null)

  // 时期快照状态
  const [selectedSnapshot, setSelectedSnapshot] = useState<EraSnapshot | null>(null)

  // 计算连接关系
  const connections = useMemo(() => {
    if (mapMode !== 'connection') return []
    return getConnectionsByMode(initialBridges, connectionMode)
  }, [mapMode, connectionMode, initialBridges])

  // 桥梁点击处理
  const handleBridgeClick = useCallback((bridge: BridgeNode) => {
    if (mapMode === 'distribution') {
      router.push(`/bridges/${bridge.id}`)
    } else {
      if (selectedBridge?.id === bridge.id) {
        setSelectedBridge(null)
        setFocusedBridges(null)
      } else {
        setSelectedBridge(bridge)
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

        // 根据选中桥梁的年份自动激活历史图层
        const historicalLayer = getHistoricalLayerByYear(bridge.year)
        if (historicalLayer) {
          setActiveHistoricalLayer(historicalLayer)
        }
      }
    }
  }, [mapMode, router, selectedBridge, connections, initialBridges])

  // 连接线点击处理（显示故事）
  const handleConnectionClick = useCallback((sourceId: string, targetId: string) => {
    const story = getConnectionStory(sourceId, targetId, connectionMode)
    if (story) {
      setSelectedStory(story)
    }
  }, [connectionMode])

  // 时期快照点击处理
  const handleSnapshotClick = useCallback((snapshot: EraSnapshot) => {
    setSelectedSnapshot(snapshot)
    // 激活对应的历史图层
    setActiveHistoricalLayer(getHistoricalLayerByYear(snapshot.year) || null)
    // 高亮该时期的桥梁
    setFocusedBridges(
      initialBridges.filter(b => snapshot.bridgeIds.includes(b.id))
    )
  }, [initialBridges])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#F5F0E6',
      overflow: 'hidden'
    }}>
      {/* 顶部导航栏 */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'white',
              borderRadius: '24px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              textDecoration: 'none',
              color: '#1A1A2E',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            <ChevronLeft size={18} />
            <span>返回首页</span>
          </Link>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setConnectionMode('temporal')}
              style={{
                padding: '8px 16px',
                background: connectionMode === 'temporal' ? '#2D6A4F' : 'white',
                color: connectionMode === 'temporal' ? 'white' : '#1A1A2E',
                border: 'none',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.2s'
              }}
            >
              <Clock size={16} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'middle' }} />
              时间
            </button>
            <button
              onClick={() => setConnectionMode('river')}
              style={{
                padding: '8px 16px',
                background: connectionMode === 'river' ? '#3D5A80' : 'white',
                color: connectionMode === 'river' ? 'white' : '#1A1A2E',
                border: 'none',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.2s'
              }}
            >
              <MapPin size={16} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'middle' }} />
              河流
            </button>
            <button
              onClick={() => setConnectionMode('structure')}
              style={{
                padding: '8px 16px',
                background: connectionMode === 'structure' ? '#7B2D8E' : 'white',
                color: connectionMode === 'structure' ? 'white' : '#1A1A2E',
                border: 'none',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.2s'
              }}
            >
              <Network size={16} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'middle' }} />
              结构
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {/* 历史图层按钮 */}
          <button
            onClick={() => setShowLayerPanel(!showLayerPanel)}
            style={{
              padding: '8px 16px',
              background: showLayerPanel ? '#7B2D8E' : 'white',
              color: showLayerPanel ? 'white' : '#1A1A2E',
              border: 'none',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Layers size={16} />
            <span>历史图层</span>
          </button>

          <Link
            href="/timeline"
            style={{
              padding: '8px 16px',
              background: '#1A1A2E',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)'
            }}
          >
            时间线视图
          </Link>
        </div>
      </header>

      {/* 主内容区 */}
      <div style={{ display: 'flex', flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* 地图区域 */}
        <div style={{ flex: 1, position: 'relative' }}>
          <EnhancedLeafletMap
            bridges={initialBridges}
            connections={connections}
            selectedBridge={selectedBridge}
            focusedBridges={focusedBridges}
            onBridgeClick={handleBridgeClick}
            onConnectionClick={handleConnectionClick}
            showConnections={mapMode === 'connection'}
            historicalLayer={activeHistoricalLayer}
            layerOpacity={layerOpacity}
          />
        </div>

        {/* 历史图层控制面板 */}
        <AnimatePresence>
          {showLayerPanel && (
            <motion.div
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '280px',
                maxHeight: 'calc(100vh - 100px)',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                zIndex: 500,
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.06)'
              }}
            >
              <div style={{
                padding: '16px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layers size={18} style={{ color: '#7B2D8E' }} />
                    <span style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#1A1A2E'
                    }}>历史图层</span>
                  </div>
                  <button
                    onClick={() => setShowLayerPanel(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      color: '#6B7280'
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div style={{ padding: '16px', overflowY: 'auto', maxHeight: 'calc(100% - 60px)' }}>
                {/* 透明度滑块 */}
                {activeHistoricalLayer && (
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      color: '#6B7280',
                      marginBottom: '8px'
                    }}>
                      图层透明度: {Math.round(layerOpacity * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={layerOpacity}
                      onChange={(e) => setLayerOpacity(parseFloat(e.target.value))}
                      style={{
                        width: '100%',
                        height: '4px',
                        borderRadius: '2px',
                        background: '#E5E7EB',
                        outline: 'none',
                        WebkitAppearance: 'none'
                      }}
                    />
                  </div>
                )}

                {/* 图层列表 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    onClick={() => setActiveHistoricalLayer(null)}
                    style={{
                      padding: '12px',
                      background: activeHistoricalLayer === null ? '#F3F4F6' : 'white',
                      border: activeHistoricalLayer === null ? '2px solid #2D6A4F' : '1px solid rgba(0, 0, 0, 0.06)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A2E' }}>
                      现代地图
                    </div>
                    <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
                      当前杭州城市全貌
                    </div>
                  </button>

                  {historicalWaterLayers.map(layer => (
                    <button
                      key={layer.id}
                      onClick={() => setActiveHistoricalLayer(layer)}
                      style={{
                        padding: '12px',
                        background: activeHistoricalLayer?.id === layer.id ? '#F3F4F6' : 'white',
                        border: activeHistoricalLayer?.id === layer.id ? '2px solid #2D6A4F' : '1px solid rgba(0, 0, 0, 0.06)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                        opacity: 0.7,
                        borderStyle: 'dashed'  // 虚线边框表示未完成
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A2E' }}>
                          {layer.name}
                        </span>
                        <span style={{
                          fontSize: '10px',
                          padding: '2px 6px',
                          background: '#E5E7EB',
                          borderRadius: '4px',
                          color: '#6B7280'
                        }}>
                          {layer.period}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
                        {layer.description}
                      </div>
                      <div style={{
                        fontSize: '10px',
                        color: '#F59E0B',
                        marginTop: '4px',
                        fontStyle: 'italic'
                      }}>
                        * 图层图片待准备
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 右侧信息面板 */}
        <div style={{
          width: '320px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          borderLeft: '1px solid rgba(0, 0, 0, 0.06)',
          overflowY: 'auto',
          padding: '20px'
        }}>
          {/* 时期快照（小多重） */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px'
            }}>
              <Calendar size={18} style={{ color: '#2D6A4F' }} />
              <span style={{
                fontSize: '15px',
                fontWeight: 600,
                color: '#1A1A2E'
              }}>历史演变</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px'
            }}>
              {eraSnapshots.map(snapshot => (
                <motion.button
                  key={snapshot.id}
                  onClick={() => handleSnapshotClick(snapshot)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'white',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    borderRadius: '12px',
                    padding: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '60px',
                    background: `${snapshot.color}15`,
                    borderRadius: '8px',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: snapshot.color
                  }}>
                    {snapshot.bridgeCount}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#1A1A2E' }}>
                    {snapshot.era}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>
                    {snapshot.description}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* 选中桥梁信息 */}
          {selectedBridge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '16px',
                marginBottom: '16px',
                border: '1px solid rgba(0, 0, 0, 0.06)'
              }}
            >
              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#1A1A2E',
                marginBottom: '8px',
                fontFamily: "'Noto Serif SC', serif"
              }}>
                {selectedBridge.name}
              </h3>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <span style={{
                  fontSize: '12px',
                  padding: '4px 8px',
                  background: `${getYearColor(selectedBridge.year)}20`,
                  color: getYearColor(selectedBridge.year),
                  borderRadius: '6px'
                }}>
                  {selectedBridge.year}
                </span>
                <span style={{
                  fontSize: '12px',
                  padding: '4px 8px',
                  background: '#F3F4F6',
                  color: '#6B7280',
                  borderRadius: '6px'
                }}>
                  {selectedBridge.dynasty}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: '1.6' }}>
                {selectedBridge.description}
              </p>

              <Link
                href={`/bridges/${selectedBridge.id}`}
                style={{
                  display: 'block',
                  marginTop: '12px',
                  padding: '10px',
                  background: '#1A1A2E',
                  color: 'white',
                  textAlign: 'center',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                查看详情
              </Link>
            </motion.div>
          )}

          {/* 连接故事 */}
          {selectedStory && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '16px',
                border: '1px solid rgba(0, 0, 0, 0.06)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px'
              }}>
                <BookOpen size={18} style={{ color: '#7B2D8E' }} />
                <span style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#1A1A2E'
                }}>连接故事</span>
                <button
                  onClick={() => setSelectedStory(null)}
                  style={{
                    marginLeft: 'auto',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6B7280'
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              <h4 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#1A1A2E',
                marginBottom: '8px',
                fontFamily: "'Noto Serif SC', serif"
              }}>
                {selectedStory.title}
              </h4>

              <p style={{
                fontSize: '12px',
                color: '#6B7280',
                marginBottom: '12px'
              }}>
                {selectedStory.shortStory}
              </p>

              <div style={{
                fontSize: '13px',
                color: '#374151',
                lineHeight: '1.7',
                whiteSpace: 'pre-line'
              }}>
                {selectedStory.fullStory}
              </div>

              {(selectedStory.year || selectedStory.yearSpan || selectedStory.fact) && (
                <div style={{
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {selectedStory.year && (
                    <span style={{
                      fontSize: '11px',
                      padding: '4px 8px',
                      background: '#F3F4F6',
                      borderRadius: '6px',
                      color: '#6B7280'
                    }}>
                      📅 {selectedStory.year}
                    </span>
                  )}
                  {selectedStory.fact && (
                    <span style={{
                      fontSize: '11px',
                      padding: '4px 8px',
                      background: '#F3F4F6',
                      borderRadius: '6px',
                      color: '#6B7280'
                    }}>
                      💡 {selectedStory.fact}
                    </span>
                  )}
                  {selectedStory.distance && (
                    <span style={{
                      fontSize: '11px',
                      padding: '4px 8px',
                      background: '#F3F4F6',
                      borderRadius: '6px',
                      color: '#6B7280'
                    }}>
                      📏 {selectedStory.distance}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* 选中的时期快照详情 */}
          {selectedSnapshot && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '16px',
                border: '1px solid rgba(0, 0, 0, 0.06)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: selectedSnapshot.color,
                  fontFamily: "'Noto Serif SC', serif"
                }}>
                  {selectedSnapshot.era}
                </div>
                <button
                  onClick={() => {
                    setSelectedSnapshot(null)
                    setActiveHistoricalLayer(null)
                    setFocusedBridges(null)
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6B7280'
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              <div style={{
                fontSize: '13px',
                lineHeight: '1.7',
                whiteSpace: 'pre-line',
                color: '#374151'
              }}>
                {selectedSnapshot.story}
              </div>

              <button
                onClick={() => router.push(`/timeline`)}
                style={{
                  marginTop: '12px',
                  width: '100%',
                  padding: '10px',
                  background: selectedSnapshot.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                在时间线中查看
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
