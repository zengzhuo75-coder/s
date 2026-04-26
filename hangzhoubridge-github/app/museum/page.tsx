'use client'

import { useState, useMemo } from 'react'
import { bridgeNodes, dynastyColors, dynastyOrder } from '@/lib/bridge-data-new'
import { HeritageBridgeCard } from '@/components/HeritageBridgeCard'
import { heritageColors, typography } from '@/lib/heritage-design-system'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Calendar, Building2, X } from 'lucide-react'

export default function MuseumPage() {
  const [selectedDynasty, setSelectedDynasty] = useState<string>('all')
  const [selectedRiver, setSelectedRiver] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  // Extract unique values for filters
  const dynasties = useMemo(() => {
    return Array.from(new Set(bridgeNodes.map(b => b.dynasty)))
      .sort((a, b) => (dynastyOrder[a] || 0) - (dynastyOrder[b] || 0))
  }, [])

  const rivers = useMemo(() => {
    return Array.from(new Set(bridgeNodes.map(b => b.river))).sort()
  }, [])

  const types = useMemo(() => {
    const typeLabels: { [key: string]: string } = {
      arch: '拱桥',
      beam: '梁桥',
      suspension: '悬索桥',
      pontoon: '浮桥',
      cantilever: '悬臂桥'
    }
    return Array.from(new Set(bridgeNodes.map(b => b.type)))
      .map(type => ({ value: type, label: typeLabels[type] || type }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [])

  // Filter bridges
  const filteredBridges = useMemo(() => {
    return bridgeNodes.filter(bridge => {
      const matchesDynasty = selectedDynasty === 'all' || bridge.dynasty === selectedDynasty
      const matchesRiver = selectedRiver === 'all' || bridge.river === selectedRiver
      const matchesType = selectedType === 'all' || bridge.type === selectedType
      return matchesDynasty && matchesRiver && matchesType
    })
  }, [selectedDynasty, selectedRiver, selectedType])

  const typeLabels: { [key: string]: string } = {
    arch: '拱桥',
    beam: '梁桥',
    suspension: '悬索桥',
    pontoon: '浮桥',
    cantilever: '悬臂桥'
  }

  const hasActiveFilters = selectedDynasty !== 'all' || selectedRiver !== 'all' || selectedType !== 'all'

  return (
    <div className="min-h-screen pt-16" style={{ background: heritageColors.ivory }}>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #F7F3EA 0%, #EFE6D2 100%)'
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative">
          <div className="text-center">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                fontFamily: typography.fontFamily.serif,
                color: heritageColors.inkBlack
              }}
            >
              桥梁博物馆
            </h1>
            <p
              className="text-lg text-center max-w-2xl mx-auto"
              style={{
                color: heritageColors.text.secondary,
                fontFamily: typography.fontFamily.serif
              }}
            >
              收录 {bridgeNodes.length} 座杭州古桥，跨越东晋至现代近1700年历史
            </p>
          </div>
        </div>
      </div>

      {/* Filters - Always Visible */}
      <div
        className="sticky top-16 z-40"
        style={{
          background: 'rgba(247, 243, 234, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(166, 124, 82, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-lg font-medium"
              style={{
                fontFamily: typography.fontFamily.serif,
                color: heritageColors.inkBlack
              }}
            >
              筛选桥梁
            </h2>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedDynasty('all')
                  setSelectedRiver('all')
                  setSelectedType('all')
                }}
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: heritageColors.bronzeGold }}
              >
                <X size={16} />
                清除所有筛选
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Dynasty Filter */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  fontFamily: typography.fontFamily.serif,
                  color: heritageColors.text.secondary
                }}
              >
                朝代
              </label>
              <select
                value={selectedDynasty}
                onChange={(e) => setSelectedDynasty(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: selectedDynasty !== 'all' ? heritageColors.bronzeGold : 'rgba(166, 124, 82, 0.2)',
                  backgroundColor: 'white',
                  color: heritageColors.inkBlack,
                  fontFamily: typography.fontFamily.serif
                }}
              >
                <option value="all">全部朝代</option>
                {dynasties.map(dynasty => (
                  <option key={dynasty} value={dynasty}>{dynasty}</option>
                ))}
              </select>
            </div>

            {/* River Filter */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  fontFamily: typography.fontFamily.serif,
                  color: heritageColors.text.secondary
                }}
              >
                水系
              </label>
              <select
                value={selectedRiver}
                onChange={(e) => setSelectedRiver(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: selectedRiver !== 'all' ? heritageColors.bronzeGold : 'rgba(166, 124, 82, 0.2)',
                  backgroundColor: 'white',
                  color: heritageColors.inkBlack,
                  fontFamily: typography.fontFamily.serif
                }}
              >
                <option value="all">全部水系</option>
                {rivers.map(river => (
                  <option key={river} value={river}>{river}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  fontFamily: typography.fontFamily.serif,
                  color: heritageColors.text.secondary
                }}
              >
                结构
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: selectedType !== 'all' ? heritageColors.bronzeGold : 'rgba(166, 124, 82, 0.2)',
                  backgroundColor: 'white',
                  color: heritageColors.inkBlack,
                  fontFamily: typography.fontFamily.serif
                }}
              >
                <option value="all">全部类型</option>
                {types.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div
            className="mt-4 text-sm"
            style={{
              color: heritageColors.text.secondary,
              fontFamily: typography.fontFamily.serif
            }}
          >
            显示{' '}
            <span
              className="font-medium"
              style={{ color: heritageColors.bronzeGold }}
            >
              {filteredBridges.length}
            </span>{' '}
            / {bridgeNodes.length} 座桥梁
          </div>
        </div>
      </div>

      {/* Bridge Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBridges.map((bridge, index) => (
            <HeritageBridgeCard
              key={bridge.id}
              bridge={bridge}
              index={index}
              size="normal"
              showHoverInfo={true}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredBridges.length === 0 && (
          <div className="text-center py-16">
            <p
              className="text-xl mb-4"
              style={{
                fontFamily: typography.fontFamily.serif,
                color: heritageColors.text.secondary
              }}
            >
              未找到符合条件的桥梁
            </p>
            <button
              onClick={() => {
                setSelectedDynasty('all')
                setSelectedRiver('all')
                setSelectedType('all')
              }}
              className="px-6 py-3 rounded-full transition-all"
              style={{
                background: heritageColors.bronzeGold,
                color: 'white',
                fontFamily: typography.fontFamily.serif
              }}
            >
              清除筛选
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
