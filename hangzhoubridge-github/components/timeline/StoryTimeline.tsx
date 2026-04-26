'use client'

import { motion } from 'framer-motion'
import { Clock, Play, Pause } from 'lucide-react'
import { TimelineEra, getEraYearLabel } from '@/lib/timeline-data'

interface StoryTimelineProps {
  eras: TimelineEra[]
  selectedEraId: string | null
  onEraSelect: (eraId: string) => void
  isPlaying: boolean
  onPlayToggle: () => void
}

export function StoryTimeline({
  eras,
  selectedEraId,
  onEraSelect,
  isPlaying,
  onPlayToggle
}: StoryTimelineProps) {
  return (
    <div className="flex flex-col h-full">
      {/* 标题与播放控制 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#1A1A2E' }}>
            千年时光
          </h2>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
            点击时期，聆听古桥故事
          </p>
        </div>
        <motion.button
          onClick={onPlayToggle}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all shadow-lg hover:shadow-xl"
          style={{
            background: isPlaying ? '#C82A2A' : '#2D6A4F',
            color: 'white'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} fill="white" />}
          <span className="font-medium">{isPlaying ? '暂停' : '开始旅程'}</span>
        </motion.button>
      </div>

      {/* 时间线 */}
      <div className="relative flex-1">
        {/* 垂直连接线 */}
        <div
          className="absolute left-8 top-4 bottom-4 w-0.5"
          style={{ background: 'linear-gradient(180deg, #7B2D8E 0%, #2D6A4F 33%, #3D5A80 66%, #2563EB 100%)' }}
        />

        {/* 时期节点 */}
        <div className="space-y-2">
          {eras.map((era, index) => {
            const isSelected = selectedEraId === era.id
            const isPast = !isSelected && eras.findIndex(e => e.id === selectedEraId) > index

            return (
              <motion.div
                key={era.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* 节点按钮 */}
                <button
                  onClick={() => onEraSelect(era.id)}
                  className="relative w-full flex items-center gap-4 p-4 rounded-xl transition-all hover:shadow-md"
                  style={{
                    background: isSelected
                      ? `${era.color}15`
                      : isPast
                        ? '#F3F4F6'
                        : 'white',
                    border: isSelected ? `2px solid ${era.color}` : '2px solid transparent',
                    cursor: 'pointer'
                  }}
                >
                  {/* 时间点 */}
                  <motion.div
                    className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: era.color,
                      boxShadow: isSelected ? `0 0 0 4px ${era.color}40` : undefined
                    }}
                    animate={isSelected ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Clock size={20} color="white" />
                    {isSelected && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ border: '2px solid white', opacity: 0.5 }}
                        animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* 时期信息 */}
                  <div className="flex-1 text-left">
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
                      {getEraYearLabel(era)} · {era.tag}
                    </p>
                    {isSelected && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-sm mt-2 leading-relaxed"
                        style={{ color: '#4B5563' }}
                      >
                        {era.keyInsight}
                      </motion.p>
                    )}
                  </div>

                  {/* 进度指示器 */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex-shrink-0"
                    >
                      <div className="w-3 h-3 rounded-full" style={{ background: era.color }} />
                    </motion.div>
                  )}
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* 进度条 */}
      <div className="mt-6 pt-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
        <div className="flex items-center justify-between text-sm mb-2" style={{ color: '#6B7280' }}>
          <span>旅程进度</span>
          <span>
            {selectedEraId
              ? `${eras.findIndex(e => e.id === selectedEraId) + 1}/${eras.length}`
              : '0/' + eras.length}
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: '#E5E7EB' }}>
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #7B2D8E 0%, #2D6A4F 33%, #3D5A80 66%, #2563EB 100%)'
            }}
            initial={{ width: 0 }}
            animate={{
              width: selectedEraId
                ? `${((eras.findIndex(e => e.id === selectedEraId) + 1) / eras.length) * 100}%`
                : '0%'
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  )
}
