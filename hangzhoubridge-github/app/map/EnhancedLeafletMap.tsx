'use client'

import { useEffect, useRef, useState } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { BridgeNode, BridgeConnection, getYearColor } from '@/lib/bridge-data-new'
import { HistoricalWaterLayer } from '@/lib/historical-layers'

// Leaflet CSS 和 z-index 设置
if (typeof window !== 'undefined') {
  const style = document.createElement('style')
  style.innerHTML = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .leaflet-container {
      background: #e5e7eb !important;
    }
    .leaflet-tile-pane { z-index: 1 !important; }
    .leaflet-overlay-pane { z-index: 2 !important; }
    .leaflet-shadow-pane { z-index: 3 !important; }
    .leaflet-marker-pane { z-index: 4 !important; }
    .leaflet-tooltip-pane { z-index: 5 !important; }
    .leaflet-popup-pane { z-index: 6 !important; }

    /* 历史图层容器 */
    .historical-layer-overlay {
      pointer-events: none;
    }

    /* 自定义 Tooltip 样式 */
    .custom-story-tooltip {
      background: rgba(255, 255, 255, 0.95) !important;
      backdrop-filter: blur(12px) !important;
      border: 1px solid rgba(0, 0, 0, 0.08) !important;
      border-radius: 12px !important;
      padding: 16px !important;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
      max-width: 280px !important;
    }

    .custom-story-tooltip::before {
      border-top-color: rgba(255, 255, 255, 0.95) !important;
    }

    .custom-tooltip-title {
      font-size: 14px;
      font-weight: 600;
      color: #1A1A2E;
      margin-bottom: 6px;
      font-family: 'Noto Serif SC', serif;
    }

    .custom-tooltip-content {
      font-size: 12px;
      color: #4B5563;
      line-height: 1.6;
    }

    .custom-tooltip-meta {
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(0, 0, 0, 0.06);
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .custom-tooltip-tag {
      font-size: 10px;
      padding: 3px 8px;
      background: #F3F4F6;
      border-radius: 6px;
      color: #6B7280;
    }

    /* 连接线交互效果 */
    .connection-line-interactive {
      cursor: pointer;
      transition: stroke-width 0.2s, stroke-opacity 0.2s;
    }

    .connection-line-interactive:hover {
      stroke-width: 4 !important;
      stroke-opacity: 1 !important;
    }
  `
  document.head.appendChild(style)
}

interface EnhancedLeafletMapProps {
  bridges: BridgeNode[]
  connections: BridgeConnection[]
  selectedBridge: BridgeNode | null
  focusedBridges: BridgeNode[] | null
  onBridgeClick: (bridge: BridgeNode) => void
  onConnectionClick: (sourceId: string, targetId: string) => void
  showConnections: boolean
  historicalLayer: HistoricalWaterLayer | null
  layerOpacity: number
}

export function EnhancedLeafletMap({
  bridges,
  connections,
  selectedBridge,
  focusedBridges,
  onBridgeClick,
  onConnectionClick,
  showConnections,
  historicalLayer,
  layerOpacity
}: EnhancedLeafletMapProps) {
  const [containerId] = useState(() => `map-container-${Math.random().toString(36).substr(2, 9)}`)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)
  const linesLayerRef = useRef<L.LayerGroup | null>(null)
  const historicalLayerRef = useRef<L.ImageOverlay | null>(null)

  // 初始化地图
  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    const map = L.map(container, {
      center: [30.25, 120.17],
      zoom: 12,
      zoomControl: true,
      preferCanvas: false
    })

    // 添加底图
    const tileLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; CartoDB',
        maxZoom: 19,
        subdomains: 'abcd'
      }
    ).addTo(map)

    mapInstanceRef.current = map

    // 初始化图层组
    markersLayerRef.current = L.layerGroup().addTo(map)
    linesLayerRef.current = L.layerGroup().addTo(map)

    return () => {
      map.remove()
    }
  }, [containerId])

  // 更新历史水系图层
  useEffect(() => {
    if (!mapInstanceRef.current) return

    const map = mapInstanceRef.current

    // 移除旧的历史图层
    if (historicalLayerRef.current) {
      map.removeLayer(historicalLayerRef.current)
      historicalLayerRef.current = null
    }

    // 添加新的历史图层（带错误处理）
    if (historicalLayer) {
      try {
        const overlay = L.imageOverlay(
          historicalLayer.imageUrl,
          historicalLayer.bounds,
          {
            opacity: layerOpacity,
            className: 'historical-layer-overlay',
            interactive: false,
            // 添加错误处理
            errorOverlayUrl: '' // 空字符串表示不显示错误图片
          }
        )

        // 监听图片加载事件
        const imgElement = overlay.getElement()
        if (imgElement) {
          imgElement.onerror = () => {
            console.warn(`[Map] 历史图层图片加载失败: ${historicalLayer.imageUrl}`)
            // 可以在这里添加用户提示
          }
        }

        overlay.addTo(map)
        historicalLayerRef.current = overlay
      } catch (error) {
        console.warn(`[Map] 历史图层加载失败:`, error)
      }
    }
  }, [historicalLayer, layerOpacity])

  // 更新连接线
  useEffect(() => {
    if (!linesLayerRef.current || !mapInstanceRef.current) return

    const linesLayer = linesLayerRef.current
    linesLayer.clearLayers()

    if (!showConnections || connections.length === 0) return

    // 创建可点击的连接线
    connections.forEach(conn => {
      const sourceBridge = bridges.find(b => b.id === conn.source)
      const targetBridge = bridges.find(b => b.id === conn.target)

      if (!sourceBridge || !targetBridge) return

      // 判断是否在聚焦列表中
      const isFocused =
        focusedBridges &&
        focusedBridges.some(b => b.id === sourceBridge.id || b.id === targetBridge.id)

      const isSelected =
        selectedBridge &&
        (selectedBridge.id === sourceBridge.id || selectedBridge.id === targetBridge.id)

      // 根据连接类型生成颜色
      const getConnectionColor = (type: string) => {
        switch(type) {
          case 'temporal': return '#2D6A4F'
          case 'river': return '#3D5A80'
          case 'structure': return '#7B2D8E'
          case 'function': return '#DC2626'
          default: return '#6B7280'
        }
      }

      // 计算连接线样式
      const baseOpacity = isFocused || isSelected ? 0.8 : 0.3
      const baseWeight = isFocused || isSelected ? 3 : 2

      // 使用 SVG 创建可点击的连接线
      const latlngs = [
        [sourceBridge.location[1], sourceBridge.location[0]],
        [targetBridge.location[1], targetBridge.location[0]]
      ] as [number, number][]

      const line = L.polyline(latlngs, {
        color: getConnectionColor(conn.type),
        weight: baseWeight,
        opacity: baseOpacity,
        smoothFactor: 1,
        className: 'connection-line-interactive'
      })

      // 连接线点击事件（显示故事）
      line.on('click', () => {
        onConnectionClick(conn.source, conn.target)
      })

      // 连接线悬停显示简短信息
      line.bindTooltip(
        `
        <div class="custom-story-tooltip">
          <div class="custom-tooltip-title">${conn.reason || '连接'}</div>
          <div class="custom-tooltip-content">
            点击查看详细故事
          </div>
        </div>
        `,
        {
          direction: 'top',
          offset: [0, -10],
          className: 'custom-story-tooltip'
        }
      )

      linesLayer.addLayer(line)
    })
  }, [showConnections, connections, bridges, selectedBridge, focusedBridges, onConnectionClick])

  // 更新桥梁标记
  useEffect(() => {
    if (!markersLayerRef.current || !mapInstanceRef.current) return

    const markersLayer = markersLayerRef.current
    markersLayer.clearLayers()

    bridges.forEach(bridge => {
      // 判断是否被聚焦
      const isFocused = focusedBridges?.some(b => b.id === bridge.id)
      const isSelected = selectedBridge?.id === bridge.id

      // 标记样式
      const markerSize = isFocused || isSelected ? 16 : 12
      const markerOpacity = focusedBridges ? (isFocused ? 1 : 0.3) : 1

      // 创建自定义图标
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: ${markerSize * 2}px;
            height: ${markerSize * 2}px;
            background: ${getYearColor(bridge.year)};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            ${isSelected ? 'animation: pulse 2s infinite;' : ''}
          "></div>
        `,
        iconSize: [markerSize * 2, markerSize * 2],
        iconAnchor: [markerSize, markerSize]
      })

      const marker = L.marker([bridge.location[1], bridge.location[0]], {
        icon,
        opacity: markerOpacity
      })

      // 标记点击事件
      marker.on('click', () => {
        onBridgeClick(bridge)
      })

      // 标记 Tooltip
      marker.bindTooltip(
        `
        <div class="custom-story-tooltip">
          <div class="custom-tooltip-title">${bridge.name}</div>
          <div class="custom-tooltip-content">
            ${bridge.dynasty} · ${bridge.year}<br/>
            ${bridge.river} · ${bridge.description}
          </div>
          ${isFocused ? `
            <div class="custom-tooltip-meta">
              <span class="custom-tooltip-tag">点击查看详情</span>
            </div>
          ` : ''}
        </div>
        `,
        {
          direction: 'top',
          offset: [0, -15],
          className: 'custom-story-tooltip'
        }
      )

      markersLayer.addLayer(marker)
    })
  }, [bridges, selectedBridge, focusedBridges, onBridgeClick])

  return (
    <div
      id={containerId}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }}
    />
  )
}
