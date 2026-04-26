'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { StoryTimelineEnriched } from './StoryTimelineEnriched'
import { StoryPanelEnriched } from './StoryPanelEnriched'
import { EnhancedLineChartEnriched } from './EnhancedLineChartEnriched'
import { WordCloud } from './WordCloud'
import {
  timelineDataEnriched,
  getEraById,
  getNextEra,
  TimelineEra
} from '@/lib/timeline-data-enriched'

/**
 * 数据故事页面 - 完整版
 * 整合时间线、故事面板、折线图、词云
 * 支持自动播放和联动动画
 */
export function DataStoryPage() {
  const [selectedEraId, setSelectedEraId] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoPlayIndex, setAutoPlayIndex] = useState(0)
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // 获取选中的时期
  const selectedEra = selectedEraId ? getEraById(selectedEraId) : null

  // 处理时期选择
  const handleEraSelect = useCallback((eraId: string) => {
    setSelectedEraId(eraId)
    setAutoPlayIndex(timelineDataEnriched.eras.findIndex(e => e.id === eraId))

    // 滚动到故事面板顶部（移动端体验优化）
    if (window.innerWidth < 1024) {
      const storyPanel = document.getElementById('story-panel')
      if (storyPanel) {
        storyPanel.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [])

  // 自动播放逻辑
  useEffect(() => {
    if (!isPlaying) {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current)
        playIntervalRef.current = null
      }
      return
    }

    // 如果还没选择时期，从第一个开始
    if (selectedEraId === null) {
      setSelectedEraId(timelineDataEnriched.eras[0].id)
      setAutoPlayIndex(0)
    }

    playIntervalRef.current = setInterval(() => {
      setAutoPlayIndex(prev => {
        const next = (prev + 1) % timelineDataEnriched.eras.length
        const nextEra = timelineDataEnriched.eras[next]
        setSelectedEraId(nextEra.id)

        // 播放到最后一个时期后自动停止
        if (next === timelineDataEnriched.eras.length - 1) {
          setTimeout(() => {
            setIsPlaying(false)
          }, 5000) // 等待5秒后停止，让用户看完最后一个时期
        }

        return next
      })
    }, 8000) // 每8秒切换到下一个时期

    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current)
      }
    }
  }, [isPlaying, selectedEraId])

  // 播放/暂停切换
  const handlePlayToggle = useCallback(() => {
    if (!isPlaying) {
      // 开始播放：如果还没有选中的时期，从第一个开始
      if (selectedEraId === null) {
        setSelectedEraId(timelineDataEnriched.eras[0].id)
        setAutoPlayIndex(0)
      }
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }, [isPlaying, selectedEraId])

  // 停止播放
  const handleStopPlayback = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const eras = timelineDataEnriched.eras

  return (
    <div className="min-h-screen" style={{ background: '#F5F0E6' }}>
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 backdrop-blur-md"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-base font-medium transition-colors hover:opacity-70"
              style={{ color: '#1A1A2E' }}
            >
              <ChevronLeft size={20} />
              返回首页
            </Link>
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ fontFamily: "'Noto Serif SC', serif", color: '#1A1A2E' }}
              >
                桥·水·城
              </h1>
              <p className="text-sm text-center" style={{ color: '#6B7280' }}>
                杭州古桥千年时光之旅
              </p>
            </div>
            <Link
              href="/museum"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md"
              style={{ background: '#2D6A4F', color: 'white' }}
            >
              <BarChart3 size={16} />
              桥梁博物馆
            </Link>
          </div>
        </div>
      </header>

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
            style={{ fontFamily: "'Noto Serif SC', serif", color: '#1A1A2E' }}
          >
            数据背后的故事
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
            从东晋古韵到现代新篇，穿越1700年时光，见证45座杭州古桥的兴衰变迁。
            <br />
            点击时间线上的任意时期，或使用"开始旅程"按钮，聆听桥梁与水、桥与城的千年故事。
          </p>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full"
              style={{ background: '#2D6A4F15', color: '#2D6A4F' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: '#2D6A4F' }}
                ></span>
                <span className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: '#2D6A4F' }}
                ></span>
              </span>
              <span className="text-sm font-medium">自动播放中...</span>
              <button
                onClick={handleStopPlayback}
                className="ml-2 text-xs underline hover:opacity-70"
              >
                停止
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* 三栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左侧：时间线 */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 rounded-2xl p-6 shadow-lg bg-white">
              <StoryTimelineEnriched
                eras={eras}
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
              id="story-panel"
              className="rounded-2xl p-6 shadow-lg bg-white h-full min-h-[700px]"
            >
              <StoryPanelEnriched era={selectedEra} />
            </div>
          </div>

          {/* 右侧：折线图 + 词云 */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl p-6 shadow-lg bg-white">
              <h3
                className="text-xl font-bold mb-4"
                style={{ fontFamily: "'Noto Serif SC', serif", color: '#1A1A2E' }}
              >
                桥梁数量变迁
              </h3>
              <div className="h-[320px]">
                <EnhancedLineChartEnriched
                  eras={eras}
                  selectedEraId={selectedEraId}
                  onEraClick={handleEraSelect}
                />
              </div>

              {/* 词云区域 */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium" style={{ color: '#1A1A2E' }}>
                    时代关键词
                  </h4>
                  {selectedEra && (
                    <motion.span
                      key={selectedEra.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs px-2 py-1 rounded-full text-white"
                      style={{ background: selectedEra.color }}
                    >
                      {selectedEra.name}
                    </motion.span>
                  )}
                </div>
                <div
                  className="rounded-xl p-3 flex items-center justify-center"
                  style={{ background: '#F9FAFB', minHeight: '200px' }}
                >
                  <WordCloud eraId={selectedEraId} eraColor={selectedEra?.color} />
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
              className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl font-bold mb-1" style={{ color: '#2D6A4F' }}>
                {stat.value}
              </div>
              <div className="text-sm mb-1" style={{ color: '#6B7280' }}>
                {stat.label}
              </div>
              <div className="text-xs" style={{ color: '#9CA3AF' }}>
                {stat.suffix}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* 页脚 */}
      <footer className="mt-16 py-8 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm" style={{ color: '#6B7280' }}>
            数据来源于杭州古桥历史文献与考古发现 · 可视化设计呈现千年文化传承
          </p>
        </div>
      </footer>
    </div>
  )
}
