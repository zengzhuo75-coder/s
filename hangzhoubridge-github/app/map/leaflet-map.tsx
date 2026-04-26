'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { BridgeNode, BridgeConnection, getYearColor } from '@/lib/bridge-data-new'

// 确保 Leaflet CSS 正确加载
if (typeof window !== 'undefined') {
  // 重置 Leaflet 图层 z-index
  const style = document.createElement('style')
  style.innerHTML = `
    .leaflet-container {
      background: #e5e7eb !important;
    }
    .leaflet-tile-pane {
      z-index: 1 !important;
    }
    .leaflet-overlay-pane {
      z-index: 2 !important;
    }
    .leaflet-shadow-pane {
      z-index: 3 !important;
    }
    .leaflet-marker-pane {
      z-index: 4 !important;
    }
    .leaflet-tooltip-pane {
      z-index: 5 !important;
    }
    .leaflet-popup-pane {
      z-index: 6 !important;
    }
    /* 确保瓦片可见 */
    .leaflet-tile {
      visibility: visible !important;
      display: block !important;
    }
    .leaflet-tile-pane {
      visibility: visible !important;
      display: block !important;
    }
    /* 背景图片层 */
    .map-background-overlay {
      pointer-events: none;
    }
    .leaflet-overlay-pane img {
      max-width: none;
    }
  `
  document.head.appendChild(style)
}

interface LeafletMapProps {
  bridges: BridgeNode[]
  connections: BridgeConnection[]
  selectedBridge: BridgeNode | null
  focusedBridges: BridgeNode[] | null
  onBridgeClick: (bridge: BridgeNode) => void
  onMapClick: () => void
  showConnections: boolean
}

export function LeafletMapComponent({ bridges, connections, selectedBridge, focusedBridges, onBridgeClick, onMapClick, showConnections }: LeafletMapProps) {
  const [containerId] = useState(() => `map-container-${Math.random().toString(36).substr(2, 9)}`)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)
  const linesLayerRef = useRef<L.LayerGroup | null>(null)

  // 初始化地图
  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) {
      console.log('[Map] Container not found:', containerId)
      return
    }

    console.log('[Map] Initializing map...', containerId)
    console.log('[Map] Container size:', container.offsetWidth, 'x', container.offsetHeight)

    // 创建地图
    const map = L.map(container, {
      center: [30.25, 120.17],
      zoom: 12,
      maxZoom: 21,
      minZoom: 3,
      zoomControl: true,
      preferCanvas: false
    })

    // 添加底图（使用多个备用源确保能加载）
    const tileProviders = [
      {
        name: 'Esri World Imagery (高精度)',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri',
        maxZoom: 21
      },
      {
        name: 'GeoQ 中国地图',
        url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
        attribution: 'GeoQ',
        maxZoom: 18
      },
      {
        name: '高德地图 (路网)',
        url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        attribution: '高德地图',
        maxZoom: 19
      },
      {
        name: 'Esri World Street',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19
      },
      {
        name: 'CartoDB Positron',
        url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        attribution: '&copy; CartoDB',
        subdomains: 'abcd',
        maxZoom: 20
      },
      {
        name: 'OpenStreetMap',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; OpenStreetMap',
        subdomains: 'abc',
        maxZoom: 19
      }
    ]

    let currentProviderIndex = 0
    let currentTileLayer: L.TileLayer | null = null

    const tryNextProvider = () => {
      if (currentProviderIndex >= tileProviders.length) {
        console.error('[Map] All tile providers failed')
        return
      }

      const provider = tileProviders[currentProviderIndex]
      console.log(`[Map] Trying provider ${currentProviderIndex + 1}/${tileProviders.length}: ${provider.name}`)

      // 移除之前的瓦片层
      if (currentTileLayer) {
        map.removeLayer(currentTileLayer)
      }

      // 创建新的瓦片层
      currentTileLayer = L.tileLayer(provider.url, {
        attribution: provider.attribution,
        maxZoom: provider.maxZoom || 19,
        minZoom: 3,
        subdomains: provider.subdomains || 'abc',
        crossOrigin: true
      }).addTo(map)

      // 监听加载状态
      let tilesLoaded = 0
      let tilesErrored = 0

      currentTileLayer.on('tileload', () => {
        tilesLoaded++
        if (tilesLoaded === 1) {
          console.log(`[Map] ✓ ${provider.name}: First tile loaded!`)
        }
      })

      currentTileLayer.on('tileerror', (error) => {
        tilesErrored++
        console.error(`[Map] ✗ ${provider.name} tile error`, error)

        // 如果这个提供商失败，尝试下一个
        if (tilesErrored > 3 && tilesLoaded === 0) {
          console.warn(`[Map] ${provider.name} failed, trying next provider...`)
          currentProviderIndex++
          setTimeout(tryNextProvider, 500)
        }
      })

      currentTileLayer.on('load', () => {
        console.log(`[Map] ✓ ${provider.name}: All tiles loaded successfully!`)
      })

      // 超时检测
      setTimeout(() => {
        if (tilesLoaded === 0 && currentProviderIndex === tileProviders.length - 1) {
          console.error('[Map] All providers failed or timed out')
        }
      }, 8000)
    }

    // 尝试第一个提供商
    tryNextProvider()

    console.log('[Map] Tile layer initialization started')

    // 创建图层（连接线在下，标记在上）
    const linesLayer = L.layerGroup().addTo(map)
    const markersLayer = L.layerGroup().addTo(map)

    linesLayerRef.current = linesLayer
    markersLayerRef.current = markersLayer
    mapInstanceRef.current = map

    // 添加地图点击事件监听器（点击空白处取消选中）
    map.on('click', () => {
      onMapClick()
    })

    console.log('[Map] Map click listener added')

    // 确保地图 invalidate size
    setTimeout(() => {
      map.invalidateSize()
      console.log('[Map] Map size invalidated')
    }, 100)

    console.log('[Map] Map initialized successfully')

    // 清理函数
    return () => {
      console.log('[Map] Cleaning up map')
      if (mapInstanceRef.current) {
        mapInstanceRef.current.off('click')
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        markersLayerRef.current = null
        linesLayerRef.current = null
      }
    }
  }, [containerId, onMapClick])

  // 更新地图内容（标记和连接线）
  useEffect(() => {
    const map = mapInstanceRef.current
    const markersLayer = markersLayerRef.current
    const linesLayer = linesLayerRef.current

    if (!map || !markersLayer || !linesLayer) {
      console.log('[Map] Layers not ready')
      return
    }

    console.log('[Map] Updating...', { bridges: bridges.length, connections: connections.length, showConnections })

    // 清除现有内容
    markersLayer.clearLayers()
    linesLayer.clearLayers()

    // 添加连接线
    if (showConnections && connections.length > 0) {
      console.log('[Map] Adding', connections.length, 'connections')

      // 去重连接（避免双向重复）
      const seen = new Set<string>()
      const uniqueConnections = connections.filter(conn => {
        const key = [conn.source, conn.target].sort().join('-')
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })

      uniqueConnections.forEach(conn => {
        const source = bridges.find(b => b.id === conn.source)
        const target = bridges.find(b => b.id === conn.target)

        if (!source || !target) {
          console.log('[Map] Missing bridge for connection:', conn.source, conn.target)
          return
        }

        const isSelected = selectedBridge && (
          conn.source === selectedBridge.id || conn.target === selectedBridge.id
        )
        const isDimmed = selectedBridge && !isSelected

        const latlngs: L.LatLngExpression[] = [
          [source.location[1], source.location[0]],
          [target.location[1], target.location[0]]
        ]

        const polyline = L.polyline(latlngs, {
          color: isSelected ? '#C82A2A' : '#2D6A4F',
          weight: isSelected ? 4 : 2,
          opacity: isDimmed ? 0.1 : (isSelected ? 0.9 : 0.4),
          dashArray: isSelected ? '10, 5' : '5, 5',
          lineCap: 'round'
        })

        linesLayer.addLayer(polyline)
      })

      console.log('[Map] Connections added:', linesLayer.getLayers().length)
    }

    // 添加桥梁标记
    console.log('[Map] Adding', bridges.length, 'markers')

    bridges.forEach(bridge => {
      const isSelected = selectedBridge?.id === bridge.id
      const isDimmed = selectedBridge && !isSelected
      const size = 36 + bridge.importance * 12
      const color = getYearColor(bridge.year)

      // 创建标记元素
      const markerEl = document.createElement('div')
      markerEl.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        opacity: ${isDimmed ? 0.3 : 1};
        transition: transform 0.2s, box-shadow 0.2s;
      `
      markerEl.innerHTML = `<span style="color:white;font-weight:bold;font-size:${Math.max(11,size/3)}px;text-shadow:1px 1px 2px rgba(0,0,0,0.5);">${bridge.name.charAt(0)}</span>`

      // 鼠标悬停效果
      markerEl.onmouseenter = () => {
        markerEl.style.transform = 'scale(1.15)'
        markerEl.style.zIndex = '1000'
      }
      markerEl.onmouseleave = () => {
        markerEl.style.transform = 'scale(1)'
        markerEl.style.zIndex = 'auto'
      }

      // 创建图标
      const icon = L.divIcon({
        html: markerEl,
        className: '',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      })

      // 创建标记
      const marker = L.marker([bridge.location[1], bridge.location[0]], { icon })

      // 点击事件
      marker.on('click', (e: L.LeafletMouseEvent) => {
        L.DomEvent.stopPropagation(e)
        onBridgeClick(bridge)
      })

      markersLayer.addLayer(marker)
    })

    console.log('[Map] Markers added:', markersLayer.getLayers().length)

    // 调整视图范围（仅在首次或有重大变化时）
    if (bridges.length > 0) {
      const bounds = L.latLngBounds(bridges.map(b => [b.location[1], b.location[0]]))
      // 使用简单的动画，避免卡顿
      try {
        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 14,
          animate: true,
          duration: 0.5
        })
      } catch (e) {
        console.warn('[Map] Initial fitBounds error:', e)
      }

      // 确保 map 正确渲染
      setTimeout(() => {
        map.invalidateSize()
      }, 50)
    }
  }, [bridges, connections, selectedBridge, onBridgeClick, showConnections])

  // 处理聚焦视图变化（使用平滑动画）
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    // 防抖：避免快速连续调用导致卡顿
    const timer = setTimeout(() => {
      if (focusedBridges && focusedBridges.length > 0) {
        // 有聚焦桥梁：平滑飞行到这些桥梁的范围
        console.log('[Map] Focusing on', focusedBridges.length, 'bridges')
        const bounds = L.latLngBounds(focusedBridges.map(b => [b.location[1], b.location[0]]))
        // 使用 panInside 获得更好的性能
        try {
          map.fitBounds(bounds, {
            padding: [80, 80],
            maxZoom: 15,
            animate: true,
            duration: 0.8
          })
        } catch (e) {
          console.warn('[Map] fitBounds error:', e)
        }
      } else {
        // 无聚焦桥梁：恢复全景
        console.log('[Map] Resetting to full view')
        if (bridges.length > 0) {
          const bounds = L.latLngBounds(bridges.map(b => [b.location[1], b.location[0]]))
          try {
            map.fitBounds(bounds, {
              padding: [50, 50],
              maxZoom: 14,
              animate: true,
              duration: 1.0
            })
          } catch (e) {
            console.warn('[Map] fitBounds error:', e)
          }
        }
      }
    }, 100) // 100ms 延迟避免快速连续调用

    return () => clearTimeout(timer)
  }, [focusedBridges, bridges])

  return (
    <div
      id={containerId}
      style={{
        height: '100%',
        width: '100%',
        background: '#e5e7eb',
        minHeight: '400px',
        position: 'relative',
        zIndex: 1
      }}
    />
  )
}
