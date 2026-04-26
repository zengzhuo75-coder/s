'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WordCloudWord, getEraWordCloud, getDefaultWordCloud } from '@/lib/wordcloud-data'

interface WordCloudProps {
  eraId: string | null
  eraColor?: string
}

interface WordWithPosition extends WordCloudWord {
  id: string
  x: number
  y: number
  rotation: number
}

/**
 * 词云组件 - 带有粒子分离重组动画效果
 */
export function WordCloud({ eraId, eraColor }: WordCloudProps) {
  const [words, setWords] = useState<WordWithPosition[]>([])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayWords, setDisplayWords] = useState<WordWithPosition[]>([])

  // 容器尺寸 - 适应右侧栏宽度
  const containerSize = { width: 280, height: 170 }

  // 生成随机位置（螺旋分布）
  const generatePosition = (index: number, total: number) => {
    const centerX = containerSize.width / 2
    const centerY = containerSize.height / 2

    // 使用螺旋算法分布词云
    const angle = index * 2.4 // 黄金角度
    const radius = 25 + Math.sqrt(index) * 18

    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius * 0.8,
      rotation: (Math.random() - 0.5) * 30
    }
  }

  // 获取当前时代的词云数据
  const currentWords = useMemo(() => {
    return eraId ? getEraWordCloud(eraId) : getDefaultWordCloud()
  }, [eraId])

  // 当词云数据变化时，触发动画
  useEffect(() => {
    if (currentWords.length === 0) {
      setWords([])
      setDisplayWords([])
      return
    }

    setIsTransitioning(true)

    // 第一阶段：旧词云爆炸散开
    const explosionAnimation = setTimeout(() => {
      setDisplayWords(prev =>
        prev.map(word => ({
          ...word,
          x: containerSize.width / 2 + (Math.random() - 0.5) * containerSize.width * 1.5,
          y: containerSize.height / 2 + (Math.random() - 0.5) * containerSize.height * 1.5,
          rotation: (Math.random() - 0.5) * 180
        }))
      )
    }, 100)

    // 第二阶段：生成新词云并汇聚
    const implodeAnimation = setTimeout(() => {
      const newWords = currentWords.map((word, index) => {
        const pos = generatePosition(index, currentWords.length)
        return {
          ...word,
          id: `${eraId}-${index}-${Date.now()}`,
          x: containerSize.width / 2 + (Math.random() - 0.5) * containerSize.width,
          y: containerSize.height / 2 + (Math.random() - 0.5) * containerSize.height,
          rotation: (Math.random() - 0.5) * 180,
          targetX: pos.x,
          targetY: pos.y,
          targetRotation: pos.rotation
        }
      })

      setWords(newWords)
      setDisplayWords(newWords)
    }, 500)

    // 第三阶段：词云稳定到最终位置
    const stabilizeAnimation = setTimeout(() => {
      setDisplayWords(prev =>
        prev.map(word => ({
          ...word,
          x: (word as any).targetX || word.x,
          y: (word as any).targetY || word.y,
          rotation: (word as any).targetRotation || word.rotation
        }))
      )
      setIsTransitioning(false)
    }, 900)

    return () => {
      clearTimeout(explosionAnimation)
      clearTimeout(implodeAnimation)
      clearTimeout(stabilizeAnimation)
    }
  }, [currentWords, eraId])

  // 计算字体大小 - 适应较小容器
  const getFontSize = (value: number) => {
    const minSize = 10
    const maxSize = 22
    const normalizedValue = Math.min(value / 60, 1)
    return minSize + normalizedValue * (maxSize - minSize)
  }

  // 计算透明度
  const getOpacity = (value: number) => {
    const minOpacity = 0.6
    const maxOpacity = 1
    const normalizedValue = Math.min(value / 60, 1)
    return minOpacity + normalizedValue * (maxOpacity - minOpacity)
  }

  if (currentWords.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        选择时期查看关键词
      </div>
    )
  }

  return (
    <div
      className="relative"
      style={{
        width: containerSize.width,
        height: containerSize.height
      }}
    >
      <AnimatePresence mode="sync">
        {displayWords.map((word) => (
          <motion.div
            key={word.id}
            initial={{
              x: containerSize.width / 2,
              y: containerSize.height / 2,
              scale: 0,
              rotate: 0,
              opacity: 0
            }}
            animate={{
              x: word.x,
              y: word.y,
              scale: 1,
              rotate: word.rotation,
              opacity: isTransitioning ? 0 : getOpacity(word.value)
            }}
            exit={{
              scale: 0,
              opacity: 0,
              rotate: (Math.random() - 0.5) * 360
            }}
            transition={{
              duration: 0.6,
              ease: [0.34, 1.56, 0.64, 1],
              delay: isTransitioning ? 0 : Math.random() * 0.3
            }}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              fontSize: getFontSize(word.value),
              fontWeight: Math.round(word.value / 15) > 3 ? 'bold' : 'normal',
              color: word.color || eraColor || '#6B7280',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              cursor: 'pointer',
              textShadow: eraId ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              transformOrigin: 'center center'
            }}
            whileHover={{
              scale: 1.15,
              zIndex: 100,
              transition: { duration: 0.2 }
            }}
          >
            {word.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

/**
 * 词云面板组件 - 包含标题和词云
 */
export function WordCloudPanel({ eraId, eraColor }: WordCloudProps) {
  const title = eraId ? '时代关键词' : '杭州古桥'
  const subtitle = eraId ? '点击词云探索更多' : '选择时期开始探索'

  return (
    <div className="rounded-2xl p-6 shadow-lg bg-white">
      <div className="mb-4">
        <h3
          className="text-xl font-bold"
          style={{ fontFamily: "'Noto Serif SC', serif", color: '#1A1A2E' }}
        >
          {title}
        </h3>
        <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
          {subtitle}
        </p>
      </div>
      <div className="flex items-center justify-center" style={{ minHeight: '300px' }}>
        <WordCloud eraId={eraId} eraColor={eraColor} />
      </div>
    </div>
  )
}
