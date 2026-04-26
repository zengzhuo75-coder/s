'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, MapPin, Calendar } from 'lucide-react'
import { bridgeNodes, getYearColor } from '@/lib/bridge-data-new'
import { TimelineEra } from '@/lib/timeline-data'
import Link from 'next/link'

interface StoryPanelProps {
  era: TimelineEra | null
}

export function StoryPanel({ era }: StoryPanelProps) {
  const highlightBridges = era
    ? bridgeNodes.filter(b => era.highlightBridges.includes(b.id))
    : []

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence mode="wait">
        {era ? (
          <motion.div
            key={era.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-full"
          >
            {/* 时期标题 */}
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-block px-4 py-1.5 rounded-full text-white text-sm font-medium mb-3"
                style={{ background: era.color }}
              >
                {era.tag}
              </motion.div>
              <h2
                className="text-4xl font-bold mb-2"
                style={{ fontFamily: "'Noto Serif SC', serif", color: '#1A1A2E' }}
              >
                {era.name}
              </h2>
              <p className="text-lg" style={{ color: '#6B7280' }}>
                {era.startYear} - {era.endYear}
              </p>
            </div>

            {/* 故事文本 */}
            <div className="mb-6 p-5 rounded-2xl" style={{ background: `${era.color}08`, borderLeft: `4px solid ${era.color}` }}>
              <p className="text-base leading-relaxed" style={{ color: '#1A1A2E' }}>
                {era.storyText}
              </p>
            </div>

            {/* 数据洞察 */}
            <div className="mb-6 p-4 rounded-xl bg-white shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${era.color}15` }}>
                  <Lightbulb size={20} style={{ color: era.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: '#1A1A2E' }}>
                    数据洞察
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>
                    {era.keyInsight}
                  </p>
                </div>
              </div>
            </div>

            {/* 桥梁数量动画 */}
            <div className="mb-6 text-center p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(243,244,246,0.9))' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="inline-block"
              >
                <div className="text-5xl font-bold mb-1" style={{ color: era.color }}>
                  {era.bridgeCount}
                </div>
                <div className="text-sm" style={{ color: '#6B7280' }}>
                  座代表性古桥
                </div>
              </motion.div>
            </div>

            {/* 代表性桥梁 */}
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-4" style={{ color: '#1A1A2E' }}>
                代表性桥梁
              </h3>
              <div className="space-y-3">
                {highlightBridges.map((bridge, index) => (
                  <motion.div
                    key={bridge.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Link
                      href={`/bridges/${bridge.id}`}
                      className="block p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        {/* 桥梁缩略图 */}
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={`/images/bridges/${bridge.id}.png`}
                            alt={bridge.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = target.src.replace('.png', '.svg')
                            }}
                          />
                        </div>

                        {/* 桥梁信息 */}
                        <div className="flex-1">
                          <h4 className="font-bold text-base mb-1" style={{ color: '#1A1A2E' }}>
                            {bridge.name}
                          </h4>
                          <div className="flex items-center gap-3 text-xs" style={{ color: '#6B7280' }}>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {bridge.year}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {bridge.river}
                            </span>
                          </div>
                        </div>

                        {/* 年代标签 */}
                        <div
                          className="flex-shrink-0 px-2 py-1 text-xs font-medium text-white rounded-full"
                          style={{ background: getYearColor(bridge.year) }}
                        >
                          {bridge.year}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <div className="w-24 h-24 mb-6 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F3F4F6, #E5E7EB)' }}>
              <MapPin size={40} style={{ color: '#9CA3AF' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1A1A2E' }}>
              选择一个时期
            </h3>
            <p className="text-sm max-w-xs" style={{ color: '#6B7280' }}>
              点击左侧时间线上的任意时期，开始探索杭州古桥的千年故事
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
