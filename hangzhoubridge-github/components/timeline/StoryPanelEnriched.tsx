'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Clock, TrendingUp, MapPin, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { TimelineEra, TimelineBridge } from '@/lib/timeline-data-enriched'

interface StoryPanelProps {
  era: TimelineEra | null
}

/**
 * 故事面板组件 - 增强版
 * 包含叙事性故事、数据洞察、统计亮点、代表性桥梁
 */
export function StoryPanelEnriched({ era }: StoryPanelProps) {
  if (!era) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 mb-6 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #F3F4F6, #E5E7EB)' }}
        >
          <MapPin size={40} style={{ color: '#9CA3AF' }} />
        </motion.div>
        <h3 className="text-xl font-bold mb-2" style={{ color: '#1A1A2E' }}>
          选择一个时期
        </h3>
        <p className="text-sm max-w-xs" style={{ color: '#6B7280' }}>
          点击左侧时间线上的任意时期，开始探索杭州古桥的千年故事
        </p>
      </div>
    )
  }

  // 处理故事文本中的 markdown 粗体标记
  const formatStoryText = (text: string) => {
    return text.split('**').map((part, index) =>
      index % 2 === 1 ? (
        <strong key={index} style={{ color: era.color }}>
          {part}
        </strong>
      ) : (
        <span key={index}>{part}</span>
      )
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={era.id}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="h-full flex flex-col"
      >
        {/* 时期标题区 */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <span
              className="px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ background: era.color }}
            >
              {era.tag}
            </span>
            <span className="text-sm" style={{ color: '#9CA3AF' }}>
              {era.startYear} - {era.endYear >= 2000 ? '至今' : era.endYear}
            </span>
          </div>
          <h2
            className="text-3xl font-bold mb-2"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              color: era.color
            }}
          >
            {era.name}
          </h2>
          <p className="text-sm" style={{ color: '#6B7280' }}>
            该时期共建桥梁 <span className="font-bold" style={{ color: era.color }}>
              {era.bridgeCount}
            </span> 座
          </p>
        </motion.div>

        {/* 滚动内容区 */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
          {/* 故事文本 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-5 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #F9FAFB, #F3F4F6)' }}
          >
            <div className="flex items-start gap-2 mb-3">
              <Sparkles size={18} style={{ color: era.color, flexShrink: 0 }} />
              <h3 className="font-bold text-base" style={{ color: '#1A1A2E' }}>
                千年故事
              </h3>
            </div>
            <div
              className="text-sm leading-relaxed"
              style={{ color: '#4B5563', lineHeight: '2' }}
            >
              {formatStoryText(era.storyText)}
            </div>
          </motion.div>

          {/* 数据洞察 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="p-5 rounded-2xl border-2"
            style={{ borderColor: era.color + '30', background: era.color + '05' }}
          >
            <div className="flex items-start gap-2 mb-3">
              <TrendingUp size={18} style={{ color: era.color, flexShrink: 0 }} />
              <h3 className="font-bold text-base" style={{ color: '#1A1A2E' }}>
                数据洞察
              </h3>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: '#4B5563', lineHeight: '1.8' }}
            >
              {era.keyInsight}
            </p>
          </motion.div>

          {/* 统计亮点 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-5 rounded-2xl bg-white shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold" style={{ color: era.color }}>
                  {era.statHighlight.value}
                </div>
                <div className="text-sm" style={{ color: '#6B7280' }}>
                  {era.statHighlight.label}
                </div>
              </div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  era.statHighlight.trend === 'up'
                    ? 'bg-green-100'
                    : era.statHighlight.trend === 'down'
                    ? 'bg-red-100'
                    : 'bg-gray-100'
                }`}
              >
                {era.statHighlight.trend === 'up' ? (
                  <TrendingUp size={20} className="text-green-600" />
                ) : era.statHighlight.trend === 'down' ? (
                  <TrendingUp size={20} className="text-red-600 rotate-180" />
                ) : (
                  <Clock size={20} className="text-gray-600" />
                )}
              </div>
            </div>
            <p className="text-xs mt-2" style={{ color: '#9CA3AF' }}>
              {era.statHighlight.description}
            </p>
          </motion.div>

          {/* 代表性桥梁 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <h3
              className="text-lg font-bold mb-3 flex items-center gap-2"
              style={{ color: '#1A1A2E' }}
            >
              <MapPin size={18} style={{ color: era.color }} />
              代表性桥梁
            </h3>
            <div className="space-y-3">
              {era.highlightBridges.map((bridge, index) => (
                <BridgeCard
                  key={bridge.id}
                  bridge={bridge}
                  eraColor={era.color}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * 桥梁卡片组件
 */
interface BridgeCardProps {
  bridge: TimelineBridge
  eraColor: string
  index: number
}

function BridgeCard({ bridge, eraColor, index }: BridgeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + index * 0.1 }}
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
    >
      <Link href={`/bridges/${bridge.id}`}>
        <motion.div
          className="p-4 rounded-xl border-2 cursor-pointer hover:shadow-lg transition-all"
          style={{
            borderColor: eraColor + '20',
            background: eraColor + '03'
          }}
          whileHover={{
            borderColor: eraColor + '60',
            background: eraColor + '08'
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-base" style={{ color: '#1A1A2E' }}>
                  {bridge.name}
                </h4>
                <span
                  className="px-2 py-0.5 rounded-full text-xs text-white"
                  style={{ background: eraColor }}
                >
                  {bridge.year}
                </span>
              </div>
              <p
                className="text-sm mb-2 leading-relaxed"
                style={{ color: '#6B7280' }}
              >
                {bridge.shortDesc}
              </p>
              <div className="flex flex-wrap gap-1">
                {bridge.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{
                      background: '#F3F4F6',
                      color: '#6B7280'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <ArrowRight
              size={18}
              style={{ color: eraColor, flexShrink: 0 }}
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
