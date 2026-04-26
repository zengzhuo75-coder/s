'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { bridgeNodes } from '@/lib/bridge-data-new'
import { heritageColors, typography, spacing, borderRadius, shadows, animations, heritageDesignSystem, decorations } from '@/lib/heritage-design-system'
import { MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function HeritageLandingPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 首屏显示 4 张精选卡片（横向排列）
  const featuredBridges = bridgeNodes.slice(0, 4)

  // 朝代颜色映射
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

  // 生成随机位置（使用百分比避免 SSR 问题）
  const getRandomPosition = () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`
  })

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: heritageColors.ivory }}>
      {/* 背景装饰 */}
      <div className="fixed inset-0 -z-10">
        {/* 宣纸纹理 */}
        <div
          className="absolute inset-0"
          style={{
            ...heritageDesignSystem.textures.ricePaper
          }}
        />

        {/* 水墨渐变 */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: heritageColors.gradient.ink
          }}
        />

        {/* 氛气/光晕效果 */}
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(166, 124, 82, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite'
        }} />

        <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(110, 110, 110, 0.05) 0%, transparent 60%)',
          filter: 'blur(40px)',
          animation: 'float 10s ease-in-out infinite 2s'
        }} />

        {/* 浮动粒子 - 仅在客户端渲染 */}
        {isClient && [...Array(8)].map((_, i) => {
          const startPos = getRandomPosition()
          const endPos = getRandomPosition()
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: startPos.left,
                top: startPos.top,
                background: heritageColors.bronzeGold,
                filter: 'blur(1px)'
              }}
              animate={{
                left: endPos.left,
                top: endPos.top,
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          )
        })}
      </div>

      {/* Hero 区 - 占 55% 高度 */}
      <section
        className="flex-1 flex items-center justify-center px-6 relative"
        style={{ maxHeight: '55vh' }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* 装饰印章 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2"
            style={{
              ...decorations.seal,
              transform: 'rotate(-8deg)',
              opacity: 0.15
            }}
          >
            千年古韵
          </motion.div>

          {/* 主标题 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6"
            style={{
              fontFamily: typography.fontFamily.serif,
              fontSize: typography.fontSize.hero,
              color: heritageColors.inkBlack,
              fontWeight: 600,
              letterSpacing: typography.letterSpacing.wide,
              textShadow: '0 2px 8px rgba(31, 26, 23, 0.1)'
            }}
          >
            桥·水·城
          </motion.h1>

          {/* 诗意副标题 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-xl mb-3"
            style={{
              fontFamily: typography.fontFamily.serif,
              color: heritageColors.darkTea,
              fontWeight: 300,
              letterSpacing: typography.letterSpacing.normal
            }}
          >
            千年古桥，一城烟雨，半部江南史
          </motion.p>

          {/* 时代标签 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-8"
            style={{ fontFamily: typography.fontFamily.serif }}
          >
            <span className="text-sm" style={{ color: heritageColors.text.muted }}>
              东晋古韵
            </span>
            <span style={{ color: heritageColors.bronzeGold, opacity: 0.3 }}>•</span>
            <span className="text-sm" style={{ color: heritageColors.text.muted }}>
              两宋鼎盛
            </span>
            <span style={{ color: heritageColors.bronzeGold, opacity: 0.3 }}>•</span>
            <span className="text-sm" style={{ color: heritageColors.text.muted }}>
              元明清续
            </span>
            <span style={{ color: heritageColors.bronzeGold, opacity: 0.3 }}>•</span>
            <span className="text-sm" style={{ color: heritageColors.text.muted }}>
              现代新篇
            </span>
          </motion.div>

          {/* 两个按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            <Link
              href="/map"
              className="group relative px-10 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg"
              style={{
                background: heritageColors.inkBlack,
                color: heritageColors.ivory,
                fontFamily: typography.fontFamily.serif,
                letterSpacing: typography.letterSpacing.normal,
                boxShadow: heritageColors.shadow.md
              }}
            >
              开始探索
              <ArrowRight
                className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform"
                strokeWidth={2}
              />
            </Link>

            <Link
              href="/timeline"
              className="px-10 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-md"
              style={{
                background: 'transparent',
                color: heritageColors.inkBlack,
                border: `1px solid ${heritageColors.border.medium}`,
                fontFamily: typography.fontFamily.serif,
                letterSpacing: typography.letterSpacing.normal
              }}
            >
              时光之旅
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 精选古桥区 - 占 45% 高度 */}
      <section
        className="flex-1 px-6 pb-6"
        style={{ maxHeight: '45vh' }}
      >
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {/* 标题区 */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              {/* 装饰标点 */}
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: heritageColors.bronzeGold }}
              />

              <h2
                className="text-2xl font-semibold"
                style={{
                  fontFamily: typography.fontFamily.serif,
                  color: heritageColors.inkBlack,
                  letterSpacing: typography.letterSpacing.tight
                }}
              >
                精选古桥
              </h2>

              <p
                className="text-sm"
                style={{
                  color: heritageColors.text.secondary,
                  fontFamily: typography.fontFamily.serif,
                  letterSpacing: typography.letterSpacing.wide
                }}
              >
                凝固的千年诗篇
              </p>
            </div>

            {/* 查看全部按钮 */}
            <Link
              href="/museum"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md group"
              style={{
                background: heritageColors.bg.card,
                color: heritageColors.bronzeGold,
                border: `1px solid ${heritageColors.border.light}`,
                fontFamily: typography.fontFamily.serif
              }}
            >
              查看全部
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                strokeWidth={2}
              />
            </Link>
          </div>

          {/* 金色分隔线 */}
          <div className="mb-5" style={decorations.goldDivider} />

          {/* 4列卡片网格 */}
          <div className="flex-1 grid grid-cols-4 gap-5 min-h-0">
            {featuredBridges.map((bridge, index) => (
              <motion.div
                key={bridge.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <Link href={`/bridges/${bridge.id}`} className="block h-full">
                  <div
                    className="h-full rounded-lg overflow-hidden transition-all duration-300 group"
                    style={{
                      background: heritageColors.bg.card,
                      border: `1px solid ${heritageColors.border.light}`,
                      boxShadow: shadows.card
                    }}
                  >
                    {/* 图片区 */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={`/images/bridges/${bridge.id}.png`}
                        alt={bridge.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        style={{ filter: 'brightness(0.85) saturate(0.9)' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          if (target.src.endsWith('.png')) {
                            target.src = target.src.replace('.png', '.svg')
                          }
                        }}
                      />

                      {/* 水墨渐变遮罩 */}
                      <div
                        className="absolute inset-0 opacity-40 group-hover:opacity-20 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(180deg, transparent 0%, rgba(31, 26, 23, 0.4) 100%)'
                        }}
                      />

                      {/* 朝代标签 */}
                      <div className="absolute top-2 right-2">
                        <span
                          className="px-2 py-1 text-[10px] font-medium text-white rounded shadow-sm"
                          style={{
                            backgroundColor: getDynastyColor(bridge.dynasty),
                            fontFamily: typography.fontFamily.serif
                          }}
                        >
                          {bridge.dynasty}
                        </span>
                      </div>
                    </div>

                    {/* 信息区 */}
                    <div className="p-3">
                      <h3
                        className="font-semibold text-sm mb-1"
                        style={{
                          fontFamily: typography.fontFamily.serif,
                          color: heritageColors.inkBlack,
                          letterSpacing: typography.letterSpacing.tight
                        }}
                      >
                        {bridge.name}
                      </h3>
                      <p
                        className="text-xs leading-relaxed"
                        style={{
                          color: heritageColors.text.secondary,
                          lineHeight: typography.lineHeight.tight
                        }}
                      >
                        {bridge.river} · {bridge.dynasty}年
                      </p>
                    </div>

                    {/* 悬停装饰线 */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${heritageColors.bronzeGold}, transparent)`
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 底部装饰 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(247, 243, 234, 0.8))',
          pointerEvents: 'none'
        }}
      />
    </div>
  )
}
