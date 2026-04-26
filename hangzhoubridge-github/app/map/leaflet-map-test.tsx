'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { BridgeNode } from '@/lib/bridge-data-new'
import { getYearColor } from '@/lib/bridge-data-new'

interface LeafletMapProps {
  bridges: BridgeNode[]
  connections: any[]
  selectedBridge: BridgeNode | null
  relatedBridges: BridgeNode[]
  onBridgeClick: (bridge: BridgeNode) => void
  onNodeHover: (bridge: BridgeNode | null) => void
  onMapClick: () => void
}

export function LeafletMap({
  bridges,
  connections,
  selectedBridge,
  relatedBridges,
  onBridgeClick,
  onNodeHover,
  onMapClick
}: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    console.log('Initializing map...')

    const map = L.map(mapContainerRef.current, {
      center: [30.25, 120.17],
      zoom: 12,
      zoomControl: true
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map)

    map.on('click', onMapClick)

    mapRef.current = map

    console.log('Map initialized', { center: map.getCenter(), zoom: map.getZoom() })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [onMapClick])

  useEffect(() => {
    if (!mapRef.current || bridges.length === 0) return

    const map = mapRef.current

    // 清除旧标记
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer)
      }
    })

    // 添加桥梁标记
    bridges.forEach(bridge => {
      const isSelected = selectedBridge?.id === bridge.id
      const isRelated = relatedBridges.some(b => b.id === bridge.id)
      const isDimmed = !!selectedBridge && !isSelected && !isRelated

      const color = getYearColor(bridge.year)
      const opacity = isDimmed ? 0.3 : 1
      const size = 40 + bridge.importance * 20

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: ${opacity};
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        ">
          <span style="color: white; font-weight: bold; font-size: ${Math.max(12, size / 3)}px; text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">
            ${bridge.name.charAt(0)}
          </span>
        </div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      })

      const marker = L.marker([bridge.location[1], bridge.location[0]], { icon })
      marker.on('click', () => onBridgeClick(bridge))
      marker.on('mouseover', () => onNodeHover(bridge))
      marker.on('mouseout', () => onNodeHover(null))
      marker.addTo(map)

      // 添加弹出框
      marker.bindPopup(`
        <div>
          <h3>${bridge.name}</h3>
          <p>${bridge.year} · ${bridge.dynasty}</p>
          <p>${bridge.description}</p>
        </div>
      `)
    })

    // 调整视图
    if (selectedBridge && relatedBridges.length > 0) {
      const allBridges = [selectedBridge, ...relatedBridges]
      const bounds = L.latLngBounds(allBridges.map(b => [b.location[1], b.location[0]]))
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 })
    }
  }, [bridges, selectedBridge, relatedBridges, onBridgeClick, onNodeHover])

  return (
    <div
      ref={mapContainerRef}
      style={{ height: '100%', width: '100%', background: '#f5f0e6', minHeight: '400px' }}
    />
  )
}

export const LeafletMapComponent = LeafletMap
