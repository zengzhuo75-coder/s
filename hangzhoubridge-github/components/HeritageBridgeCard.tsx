'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BridgeNode } from '@/lib/bridge-data-new'
import { heritageColors, typography, shadows, borderRadius } from '@/lib/heritage-design-system'
import { Calendar, MapPin, Eye } from 'lucide-react'

interface HeritageBridgeCardProps {
  bridge: BridgeNode
  index?: number
  size?: 'compact' | 'normal' | 'large'
  showHoverInfo?: boolean
}

// 朝代颜色映射（提取到组件外部，供多个组件使用）
const getDynastyColor = (dynasty: string) => {
  const colors: Record<string, string> = {
    '唐': heritageColors.era.ancient,
    '宋': heritageColors.era.song,
    '元': heritageColors.era.yuanMingQing,
    '明': '#DC2626',
    '清': heritageColors.era.yuanMingQing,
    '东晋': heritageColors.era.ancient,
    '现代': heritageColors.era.modern
  }
  return colors[dynasty] || heritageColors.celadon
}

/**
 * 博物馆风格桥梁卡片
 * 具有优雅的展示效果和悬停交互
 */
export function HeritageBridgeCard({
  bridge,
  index = 0,
  size = 'normal',
  showHoverInfo = true
}: HeritageBridgeCardProps) {

  // 根据尺寸设置样式
  const sizeStyles = {
    compact: {
      aspectRatio: 'aspect-[4/3]',
      padding: 'p-3',
      titleSize: 'text-sm',
      descSize: 'text-xs'
    },
    normal: {
      aspectRatio: 'aspect-[4/3]',
      padding: 'p-4',
      titleSize: 'text-base',
      descSize: 'text-sm'
    },
    large: {
      aspectRatio: 'aspect-[3/2]',
      padding: 'p-5',
      titleSize: 'text-lg',
      descSize: 'text-base'
    }
  }

  const currentSize = sizeStyles[size]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link href={`/bridges/${bridge.id}`} className="block h-full">
        <div
          className="h-full rounded-xl overflow-hidden transition-all duration-500 group"
          style={{
            background: heritageColors.bg.card,
            border: `1px solid ${heritageColors.border.light}`,
            boxShadow: shadows.card,
            position: 'relative'
          }}
        >
          {/* 装饰角 */}
          <div
            className="absolute top-2 left-2 w-4 h-4 opacity-30"
            style={{
              borderTop: `1px solid ${heritageColors.bronzeGold}`,
              borderLeft: `1px solid ${heritageColors.bronzeGold}`
            }}
          />

          {/* 图片区 */}
          <div
            className={`${currentSize.aspectRatio} relative overflow-hidden`}
            style={{ background: 'linear-gradient(135deg, #FAF7F2 0%, #F0EBE4 100%)' }}
          >
            <img
              src={`/images/bridges/${bridge.id}.png`}
              alt={bridge.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              style={{
                filter: 'brightness(0.85) saturate(0.9)',
                mixBlendMode: 'multiply'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                if (target.src.endsWith('.png')) {
                  target.src = target.src.replace('.png', '.svg')
                }
              }}
            />

            {/* 水墨渐变遮罩 */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(31, 26, 23, 0.3) 100%)',
                opacity: 0.6
              }}
            />

            {/* 朝代标签 */}
            <div className="absolute top-3 right-3">
              <span
                className="px-3 py-1.5 text-xs font-medium text-white rounded shadow-sm"
                style={{
                  backgroundColor: getDynastyColor(bridge.dynasty),
                  fontFamily: typography.fontFamily.serif,
                  letterSpacing: typography.letterSpacing.tight
                }}
              >
                {bridge.dynasty}
              </span>
            </div>

            {/* 悬停时显示的信息 */}
            {showHoverInfo && (
              <div
                className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'rgba(31, 26, 23, 0.85)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <div className="flex items-center gap-2">
                  <Calendar size={12} style={{ color: heritageColors.ivory }} />
                  <span
                    className="text-xs font-medium"
                    style={{
                      color: heritageColors.ivory,
                      fontFamily: typography.fontFamily.serif
                    }}
                  >
                    {bridge.year}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={12} style={{ color: heritageColors.ivory }} />
                  <span
                    className="text-xs"
                    style={{ color: heritageColors.ivory }}
                  >
                    {bridge.river}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 信息区 */}
          <div className={currentSize.padding}>
            {/* 装饰线 */}
            <div
              className="w-8 h-0.5 mb-3"
              style={{ background: `linear-gradient(90deg, ${heritageColors.bronzeGold}, transparent)` }}
            />

            <h3
              className={`${currentSize.titleSize} font-semibold mb-2`}
              style={{
                fontFamily: typography.fontFamily.serif,
                color: heritageColors.inkBlack,
                letterSpacing: typography.letterSpacing.tight
              }}
            >
              {bridge.name}
            </h3>

            <p
              className={`${currentSize.descSize} leading-relaxed mb-3`}
              style={{
                color: heritageColors.text.secondary,
                lineHeight: typography.lineHeight.relaxed
              }}
            >
              {bridge.description}
            </p>

            {/* 底部装饰 */}
            <div
              className="flex items-center justify-between"
              style={{
                borderTop: `1px solid ${heritageColors.border.light}`,
                paddingTop: '8px'
              }}
            >
              <span
                className="text-xs"
                style={{
                  color: heritageColors.text.tertiary,
                  fontFamily: typography.fontFamily.sansSerif
                }}
              >
                {bridge.type === 'arch' ? '拱桥' : bridge.type === 'beam' ? '梁桥' : bridge.type === 'suspension' ? '悬索桥' : bridge.type === 'pontoon' ? '浮桥' : bridge.type === 'cantilever' ? '悬臂桥' : bridge.type}
              </span>

              <Eye
                size={14}
                style={{
                  color: heritageColors.bronzeGold,
                  opacity: 0.6
                }}
              />
            </div>
          </div>

          {/* 底部金边 */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            style={{
              background: `linear-gradient(90deg, transparent, ${heritageColors.bronzeGold}, transparent)`,
              opacity: 0.5
            }}
          />
        </div>
      </Link>
    </motion.div>
  )
}

/**
 * 横向滚动桥梁卡片容器
 * 用于展示多张桥梁卡片
 */
interface BridgeCardScrollProps {
  bridges: BridgeNode[]
  title?: string
  subtitle?: string
  showViewAll?: boolean
  viewAllLink?: string
}

export function BridgeCardScroll({
  bridges,
  title = '精选古桥',
  subtitle = '凝固的千年诗篇',
  showViewAll = true,
  viewAllLink = '/museum'
}: BridgeCardScrollProps) {
  return (
    <div className="py-8 px-6">
      {/* 标题区 */}
      <div className="flex items-center justify-between mb-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          {/* 装饰标点 */}
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: heritageColors.bronzeGold }}
          />

          <div>
            <h2
              className="text-2xl font-semibold mb-1"
              style={{
                fontFamily: typography.fontFamily.serif,
                color: heritageColors.inkBlack,
                letterSpacing: typography.letterSpacing.tight
              }}
            >
              {title}
            </h2>
            <p
              className="text-sm"
              style={{
                color: heritageColors.text.secondary,
                fontFamily: typography.fontFamily.serif,
                letterSpacing: typography.letterSpacing.wide
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        {showViewAll && (
          <Link
            href={viewAllLink}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md group"
            style={{
              background: heritageColors.bg.card,
              color: heritageColors.bronzeGold,
              border: `1px solid ${heritageColors.border.light}`,
              fontFamily: typography.fontFamily.serif,
              boxShadow: shadows.card
            }}
          >
            查看全部
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </div>

      {/* 卡片网格 */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bridges.slice(0, 4).map((bridge, index) => (
            <HeritageBridgeCard
              key={bridge.id}
              bridge={bridge}
              index={index}
              size="normal"
              showHoverInfo={true}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * 垂直列表风格桥梁卡片
 * 用于侧边栏或紧凑布局
 */
export function CompactBridgeCard({ bridge }: { bridge: BridgeNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="mb-3"
    >
      <Link
        href={`/bridges/${bridge.id}`}
        className="block p-3 rounded-lg transition-all duration-300 hover:shadow-md group"
        style={{
          background: heritageColors.bg.card,
          border: `1px solid ${heritageColors.border.light}`,
          boxShadow: shadows.card,
          textDecoration: 'none'
        }}
      >
        <div className="flex items-start gap-3">
          {/* 桥梁缩略图 */}
          <div
            className="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #FAF7F2 0%, #F0EBE4 100%)' }}
          >
            <img
              src={`/images/bridges/${bridge.id}.png`}
              alt={bridge.name}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.9)' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                if (target.src.endsWith('.png')) {
                  target.src = target.src.replace('.png', '.svg')
                }
              }}
            />
          </div>

          {/* 桥梁信息 */}
          <div className="flex-1 min-w-0">
            <h4
              className="text-sm font-semibold mb-1"
              style={{
                fontFamily: typography.fontFamily.serif,
                color: heritageColors.inkBlack
              }}
            >
              {bridge.name}
            </h4>

            <div className="flex items-center gap-2 mb-2">
              <span
                className="px-2 py-0.5 text-[10px] font-medium text-white rounded"
                style={{
                  backgroundColor: getDynastyColor(bridge.dynasty)
                }}
              >
                {bridge.dynasty}
              </span>
              </div>

            <p
              className="text-xs line-clamp-1"
              style={{
                color: heritageColors.text.secondary,
                lineHeight: typography.lineHeight.tight
              }}
            >
              {bridge.description}
            </p>

            <div
              className="flex items-center gap-3 text-xs"
              style={{ color: heritageColors.text.tertiary }}
            >
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
        </div>

        {/* 右箭头（悬停显示） */}
        <div
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: heritageColors.bronzeGold }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </Link>
    </motion.div>
  )
}
