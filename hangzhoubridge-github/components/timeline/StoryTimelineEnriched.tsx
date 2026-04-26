'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, ChevronRight } from 'lucide-react'
import { TimelineEra } from '@/lib/timeline-data-enriched'

interface StoryTimelineProps {
  eras: TimelineEra[]
  selectedEraId: string | null
  onEraSelect: (eraId: string) => void
  isPlaying: boolean
  onPlayToggle: () => void
}

/**
 * 交互式时间线组件 - 增强版
 * - 光晕和高亮效果
 * - 自动播放控制
 * - 进度指示
 */
export function StoryTimelineEnriched({
  eras,
  selectedEraId,
  onEraSelect,
  isPlaying,
  onPlayToggle
}: StoryTimelineProps) {
  const currentIndex = eras.findIndex(e => e.id === selectedEraId)
  const progress = selectedEraId ? ((currentIndex + 1) / eras.length) * 100 : 0

  return (
    <div className="flex flex-col h-full">
      {/* 标题和播放控制 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "'Noto Serif SC', serif", color: '#1A1A2E' }}
          >
            千年时光
          </h2>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
            点击时期，聆听古桥故事
          </p>
        </div>
        <motion.button
          onClick={onPlayToggle}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all shadow-lg"
          style={{
            background: isPlaying ? '#EF4444' : '#2D6A4F',
            color: 'white'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <>
              <Pause size={18} />
              <span className="font-medium">暂停</span>
            </>
          ) : (
            <>
              <Play size={18} fill="white" />
              <span className="font-medium">开始旅程</span>
            </>
          )}
        </motion.button>
      </div>

      {/* 时间线 */}
      <div className="relative flex-1">
        {/* 渐变连接线 */}
        <div
          className="absolute left-8 top-4 bottom-4 w-1 rounded-full"
          style={{
            background: 'linear-gradient(180deg, #7B2D8E 0%, #2D6A4F 33%, #3D5A80 66%, #2563EB 100%)'
          }}
        />

        {/* 时期列表 */}
        <div className="space-y-3">
          <AnimatePresence>
            {eras.map((era, index) => {
              const isSelected = era.id === selectedEraId
              const isPast = currentIndex >= 0 && index < currentIndex
              const isCurrent = era.id === selectedEraId

              return (
                <motion.div
                  key={era.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.button
                    onClick={() => onEraSelect(era.id)}
                    className="relative w-full flex items-center gap-4 p-4 rounded-xl transition-all"
                    style={{
                      background: isSelected ? 'white' : 'rgba(255,255,255,0.5)',
                      border: `2px solid ${isSelected ? era.color : 'transparent'}`,
                      boxShadow: isSelected ? `0 8px 24px ${era.color}30` : 'none',
                      cursor: 'pointer'
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: isSelected ? `0 12px 32px ${era.color}40` : '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* 光晕效果 */}
                    {isSelected && (
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        style={{ background: era.color }}
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}

                    {/* 左侧圆圈图标 */}
                    <div
                      className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        background: era.color,
                        boxShadow: isSelected
                          ? `0 0 20px ${era.color}, 0 0 40px ${era.color}60`
                          : `0 4px 12px ${era.color}40`
                      }}
                    >
                      <motion.div
                        animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {/* 时钟图标 */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-6 h-6"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </motion.div>

                      {/* 完成标记 */}
                      {isPast && !isSelected && (
                        <div
                          className="absolute inset-0 flex items-center justify-center rounded-full"
                          style={{ background: era.color }}
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={20}
                              height={20}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth={3}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </motion.div>
                        </div>
                      )}
                    </div>

                    {/* 右侧内容 */}
                    <div className="flex-1 text-left relative z-10">
                      <div className="flex items-center gap-3 mb-1">
                        <h3
                          className="text-xl font-bold"
                          style={{
                            fontFamily: "'Noto Serif SC', serif",
                            color: isSelected ? era.color : '#1A1A2E'
                          }}
                        >
                          {era.name}
                        </h3>
                        <span
                          className="px-2 py-0.5 text-xs rounded-full text-white"
                          style={{ background: era.color }}
                        >
                          {era.bridgeCount}座桥
                        </span>
                      </div>
                      <p className="text-sm mb-1" style={{ color: '#6B7280' }}>
                        {era.startYear}-{era.endYear >= 2000 ? '至今' : era.endYear} · {era.tag}
                      </p>
                      {isSelected && (
                        <motion.p
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs mt-2 line-clamp-2"
                          style={{ color: '#4B5563' }}
                        >
                          {era.storyText.substring(0, 50).replace(/\*\*/g, '')}...
                        </motion.p>
                      )}
                    </div>

                    {/* 箭头指示器 */}
                    {isSelected && (
                      <motion.div
                        className="relative z-10"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <ChevronRight size={24} style={{ color: era.color }} />
                      </motion.div>
                    )}
                  </motion.button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* 进度条 */}
      <div className="mt-6 pt-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
        <div className="flex items-center justify-between text-sm mb-2" style={{ color: '#6B7280' }}>
          <span>旅程进度</span>
          <span className="font-medium" style={{ color: '#2D6A4F' }}>
            {selectedEraId ? currentIndex + 1 : 0}/{eras.length}
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: '#E5E7EB' }}>
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #7B2D8E 0%, #2D6A4F 33%, #3D5A80 66%, #2563EB 100%)'
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  )
}
