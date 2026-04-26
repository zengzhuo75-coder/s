'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { StoryTimeline } from '@/components/timeline/StoryTimeline'
import { StoryPanel } from '@/components/timeline/StoryPanel'
import { EnhancedLineChart } from '@/components/timeline/EnhancedLineChart'
import { WordCloud } from '@/components/timeline/WordCloud'
import { BridgeTypePieChart } from '@/components/timeline/BridgeTypePieChart'
import { timelineData } from '@/lib/timeline-data'
import { heritageColors, typography } from '@/lib/heritage-design-system'

export default function DataStoryPage() {
  const [selectedEraId, setSelectedEraId] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoPlayIndex, setAutoPlayIndex] = useState(0)

  // 获取选中的时期
  const selectedEra = timelineData.eras.find(e => e.id === selectedEraId) || null
  const selectedEraColor = selectedEra?.color

  // 处理时期选择
  const handleEraSelect = useCallback((eraId: string) => {
    setSelectedEraId(eraId)
    // 如果正在自动播放，更新索引
    setAutoPlayIndex(timelineData.eras.findIndex(e => e.id === eraId))
  }, [])

  // 自动播放逻辑
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setAutoPlayIndex(prev => {
        const next = (prev + 1) % timelineData.eras.length
        setSelectedEraId(timelineData.eras[next].id)

        // 播放完一轮后停止
        if (next === timelineData.eras.length - 1) {
          setIsPlaying(false)
        }

        return next
      })
    }, 5000) // 每5秒切换到下一个时期

    return () => clearInterval(interval)
  }, [isPlaying])

  // 播放/暂停切换
  const handlePlayToggle = useCallback(() => {
    if (!isPlaying) {
      // 开始播放：如果还没有选中的时期，从第一个开始
      if (selectedEraId === null) {
        setSelectedEraId(timelineData.eras[0].id)
        setAutoPlayIndex(0)
      }
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }, [isPlaying, selectedEraId])

  return (
    <div className="min-h-screen pt-16" style={{ background: heritageColors.ivory }}>
      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 引导文案 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              fontFamily: typography.fontFamily.serif,
              color: heritageColors.inkBlack,
              letterSpacing: typography.letterSpacing.tight
            }}
          >
            数据背后的故事
          </h2>
          <p
            className="text-lg max-w-3xl mx-auto leading-relaxed"
            style={{
              color: heritageColors.text.secondary,
              fontFamily: typography.fontFamily.serif,
              lineHeight: typography.lineHeight.relaxed
            }}
          >
            从东晋古韵到现代新篇，穿越1700年时光，见证45座杭州古桥的兴衰变迁。
            <br />
            点击时间线上的任意时期，聆听桥梁与水、桥与城的千年故事。
          </p>
        </motion.div>

        {/* 三栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左侧：时间线 */}
          <div className="lg:col-span-3">
            <div
              className="sticky top-24 rounded-2xl p-6 shadow-lg"
              style={{
                background: heritageColors.bg.card,
                border: `1px solid ${heritageColors.border.light}`
              }}
            >
              <StoryTimeline
                eras={timelineData.eras}
                selectedEraId={selectedEraId}
                onEraSelect={handleEraSelect}
                isPlaying={isPlaying}
                onPlayToggle={handlePlayToggle}
              />
            </div>
          </div>

          {/* 中间：故事面板 */}
          <div className="lg:col-span-5">
            <div
              className="rounded-2xl p-6 shadow-lg h-full min-h-[600px]"
              style={{
                background: heritageColors.bg.card,
                border: `1px solid ${heritageColors.border.light}`
              }}
            >
              <StoryPanel era={selectedEra} />
            </div>
          </div>

          {/* 右侧：折线图 / 饼状图 */}
          <div className="lg:col-span-4">
            <div
              className="sticky top-24 rounded-2xl p-6 shadow-lg"
              style={{
                background: heritageColors.bg.card,
                border: `1px solid ${heritageColors.border.light}`
              }}
            >
              {/* 标题 - 根据选择状态变化 */}
              <h3
                className="text-xl font-bold mb-4"
                style={{
                  fontFamily: typography.fontFamily.serif,
                  color: heritageColors.inkBlack,
                  letterSpacing: typography.letterSpacing.tight
                }}
              >
                {selectedEra ? `${selectedEra.name} - 桥梁种类分布` : '桥梁数量变迁'}
              </h3>

              {/* 内容区域 - 根据选择状态切换 */}
              <div className="h-[400px]">
                {selectedEra ? (
                  <BridgeTypePieChart era={selectedEra} />
                ) : (
                  <EnhancedLineChart
                    eras={timelineData.eras}
                    selectedEraId={selectedEraId}
                    onEraClick={handleEraSelect}
                  />
                )}
              </div>

              {/* 词云图 - 始终显示 */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4
                    className="text-sm font-medium"
                    style={{
                      fontFamily: typography.fontFamily.serif,
                      color: heritageColors.inkBlack
                    }}
                  >
                    时代关键词
                  </h4>
                  {selectedEra && (
                    <span
                      className="text-xs"
                      style={{
                        color: selectedEraColor,
                        fontFamily: typography.fontFamily.serif
                      }}
                    >
                      {selectedEra.name}
                    </span>
                  )}
                </div>
                <div
                  className="rounded-xl p-3 flex items-center justify-center"
                  style={{
                    background: 'rgba(166, 124, 82, 0.05)',
                    minHeight: '150px'
                  }}
                >
                  <WordCloud eraId={selectedEraId} eraColor={selectedEraColor} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部数据概览 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: '总跨度', value: '1700年', suffix: '时光' },
            { label: '古桥数量', value: '45', suffix: '座' },
            { label: '历史时期', value: '4', suffix: '个阶段' },
            { label: '涵盖朝代', value: '10+', suffix: '个朝代' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="text-center p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              style={{
                background: heritageColors.bg.card,
                border: `1px solid ${heritageColors.border.light}`
              }}
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{
                  color: heritageColors.bronzeGold,
                  fontFamily: typography.fontFamily.serif
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm mb-1"
                style={{
                  color: heritageColors.text.secondary,
                  fontFamily: typography.fontFamily.serif
                }}
              >
                {stat.label}
              </div>
              <div
                className="text-xs"
                style={{
                  color: heritageColors.text.tertiary,
                  fontFamily: typography.fontFamily.serif
                }}
              >
                {stat.suffix}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* 页脚 */}
      <footer
        className="mt-16 py-8"
        style={{
          borderTop: `1px solid ${heritageColors.border.light}`
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p
            className="text-sm"
            style={{
              color: heritageColors.text.tertiary,
              fontFamily: typography.fontFamily.serif
            }}
          >
            数据来源于杭州古桥历史文献与考古发现 · 可视化设计呈现千年文化传承
          </p>
        </div>
      </footer>
    </div>
  )
}
