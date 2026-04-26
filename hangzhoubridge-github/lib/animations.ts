/**
 * GSAP 动画钩子和工具函数
 * 提供统一的动画接口和效果
 */

import { useEffect, useRef, useCallback, useState } from 'react'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

// ==================== 动画钩子 ====================

/**
 * 节点出现动画 - 淡入 + 缩放
 */
export const useNodeAppear = (elementRef: React.RefObject<HTMLElement>, delay: number = 0) => {
  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    gsap.fromTo(el,
      {
        opacity: 0,
        scale: 0,
        rotation: -10
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        delay: delay,
        ease: 'back.out(1.7)'
      }
    )
  }, [elementRef, delay])
}

/**
 * 连接线绘制动画 - 从起点到终点绘制
 */
export const useLineDraw = (svgRef: React.RefObject<SVGSVGElement>, delay: number = 0) => {
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const lines = svg.querySelectorAll('line.connection-line')
    if (lines.length === 0) return

    lines.forEach((line, index) => {
      const length = (line as SVGLineElement).getTotalLength()

      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0
      })

      gsap.to(line, {
        strokeDashoffset: 0,
        opacity: 0.6,
        duration: 1.5,
        delay: delay + index * 0.05,
        ease: 'power2.inOut'
      })
    })
  }, [svgRef, delay])
}

/**
 * 面板滑入动画 - 从右侧滑入
 */
export const usePanelSlideIn = (panelRef: React.RefObject<HTMLElement>, isOpen: boolean) => {
  const tlRef = useRef<any>(null)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    if (isOpen) {
      // 面板内容动画
      tlRef.current = gsap.context(() => {
        const elements = panel.querySelectorAll('.animate-item')

        gsap.fromTo(panel,
          { x: 400, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
          }
        )

        gsap.fromTo(elements,
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out',
            delay: 0.2
          }
        )
      })
    } else {
      tlRef.current?.revert()
    }

    return () => {
      tlRef.current?.revert()
    }
  }, [panelRef, isOpen])
}

/**
 * 涟漪效果 - 点击时产生水波纹
 */
export const useRipple = (event: React.MouseEvent, containerRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // 创建涟漪元素
    const ripple = document.createElement('div')
    ripple.className = 'ripple-effect'
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(200, 42, 42, 0.4) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9999;
    `

    container.appendChild(ripple)

    // GSAP 动画
    gsap.to(ripple, {
      width: 100,
      height: 100,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => ripple.remove()
    })
  }, [event, containerRef])
}

/**
 * 光晕效果 - 悬停时的柔和光晕
 */
export const useGlow = (elementRef: React.RefObject<HTMLElement>, isActive: boolean) => {
  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    if (isActive) {
      gsap.to(el, {
        boxShadow: '0 0 20px rgba(200, 42, 42, 0.4), 0 0 40px rgba(200, 42, 42, 0.2)',
        duration: 0.3,
        ease: 'power2.out'
      })
    } else {
      gsap.to(el, {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        duration: 0.3,
        ease: 'power2.inOut'
      })
    }
  }, [elementRef, isActive])
}

/**
 * 弹性拖拽 - 拖拽时的弹性跟随
 */
export const useElasticDrag = (elementRef: React.RefObject<HTMLElement>) => {
  const positionRef = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDraggingRef.current = true
    positionRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current || !elementRef.current) return

    const dx = e.clientX - positionRef.current.x
    const dy = e.clientY - positionRef.current.y

    gsap.to(elementRef.current, {
      x: dx,
      y: dy,
      duration: 0.1,
      ease: 'power1.out'
    })

    positionRef.current = { x: e.clientX, y: e.clientY }
  }, [elementRef])

  const handleMouseUp = useCallback(() => {
    if (isDraggingRef.current && elementRef.current) {
      gsap.to(elementRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      })
    }
    isDraggingRef.current = false
  }, [elementRef])

  return { handleMouseDown, handleMouseMove, handleMouseUp }
}

/**
 * 粒子流动动画 - 连接线上的流动粒子
 */
export const useParticleFlow = (containerRef: React.RefObject<HTMLElement>) => {
  const particlesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 清除旧粒子
    particlesRef.current.forEach(p => p.remove())
    particlesRef.current = []

    // 创建新粒子
    const particleCount = 8
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'connection-particle'
      particle.style.cssText = `
        position: absolute;
        width: ${visualEffects.connection.particleSize}px;
        height: ${visualEffects.connection.particleSize}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(200, 42, 42, 0.8) 0%, rgba(200, 42, 42, 0) 70%);
        pointer-events: none;
        z-index: 10;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      `
      container.appendChild(particle)
      particlesRef.current.push(particle)

      // 随机延迟启动
      gsap.to(particle, {
        left: '100%',
        duration: visualEffects.connection.particleSpeed,
        delay: i * 0.3,
        repeat: -1,
        ease: 'none'
      })
    }

    return () => {
      particlesRef.current.forEach(p => p.remove())
      particlesRef.current = []
    }
  }, [containerRef])
}

/**
 * 筛选过渡动画 - 节点筛选时的平滑过渡
 */
export const useFilterTransition = (
  elementsRef: React.RefObject<HTMLElement>[],
  activeIds: string[],
  delay: number = 0
) => {
  useEffect(() => {
    const elements = elementsRef.map(ref => ref.current).filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return

    elements.forEach((el, index) => {
      const isActive = activeIds.includes(el.dataset.id || '')

      gsap.to(el, {
        opacity: isActive ? 1 : 0.2,
        scale: isActive ? 1 : 0.8,
        duration: 0.4,
        delay: delay + index * 0.05,
        ease: 'power2.out'
      })
    })
  }, [elementsRef, activeIds, delay])
}

/**
 * 时间线渐进动画 - 桥梁按时间顺序出现
 */
export const useTimelineProgressive = (
  elementsRef: React.RefObject<HTMLElement>[],
  delay: number = 0
) => {
  useEffect(() => {
    const elements = elementsRef.map(ref => ref.current).filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return

    // 根据位置排序（模拟时间顺序）
    const sortedElements = [...elements].sort((a, b) => {
      const rectA = a.getBoundingClientRect()
      const rectB = b.getBoundingClientRect()
      return rectA.left - rectB.left
    })

    sortedElements.forEach((el, index) => {
      gsap.fromTo(el,
        {
          opacity: 0,
          scale: 0.8,
          x: -20
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.6,
          delay: delay + index * 0.08,
          ease: 'back.out(1.7)'
        }
      )
    })
  }, [elementsRef, delay])
}

/**
 * Flip 动画 - 位置平滑过渡
 */
export const useFlip = () => {
  const flipRef = useRef<any>(null)

  useEffect(() => {
    // GSAP Flip doesn't need constructor - it's used as static methods
    // This hook is a placeholder for Flip functionality
    return () => {
      // cleanup
    }
  }, [])

  return flipRef
}

/**
 * 悬停序列动画 - 元素依次悬停高亮
 */
export const useHoverSequence = (
  elementsRef: React.RefObject<HTMLElement>[],
  currentIndex: number,
  interval: number = 1000
) => {
  useEffect(() => {
    if (currentIndex < 0) return

    const elements = elementsRef.map(ref => ref.current).filter(Boolean) as HTMLElement[]

    elements.forEach((el, index) => {
      const isActive = index === currentIndex

      gsap.to(el, {
        scale: isActive ? 1.15 : 1,
        opacity: isActive ? 1 : 0.7,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
  }, [elementsRef, currentIndex, interval])
}

// ==================== 全局动画状态 ====================

export const useAnimationState = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)

  const startAnimation = useCallback(() => setIsAnimating(true), [])
  const stopAnimation = useCallback(() => setIsAnimating(false), [])

  return {
    isAnimating,
    animationProgress,
    setAnimationProgress,
    startAnimation,
    stopAnimation
  }
}

// ==================== 视觉效果配置 ====================

const visualEffects = {
  connection: {
    particleSize: 3,
    particleSpeed: 2,
  },

  ripple: {
    duration: 0.6,
    maxRadius: 100,
  },

  glow: {
    blur: 20,
    spread: 40,
    intensity: 0.4,
  }
}

export { visualEffects }

// ==================== 类型定义 ====================

export interface AnimationConfig {
  duration?: number
  delay?: number
  ease?: string
  stagger?: number
}

export interface RippleConfig {
  size?: number
  color?: string
  duration?: number
}

export interface GlowConfig {
  blur?: number
  spread?: number
  intensity?: number
}

// ==================== 工具函数 ====================

/**
 * 创建涟漪元素
 */
export const createRippleElement = (x: number, y: number, config: RippleConfig = {}) => {
  const ripple = document.createElement('div')
  const size = config.size || 100
  const color = config.color || 'rgba(200, 42, 42, 0.4)'

  ripple.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, ${color} 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
  `

  return ripple
}

/**
 * 计算两点之间的距离
 */
export const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

/**
 * 判断元素是否在视口中
 */
export const isInViewport = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * 视口进入检测钩子
 */
export const useOnScreen = (threshold: number = 0.1) => {
  const ref = useRef<HTMLElement>(null)
  const [isOnScreen, setIsOnScreen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnScreen(entry.isIntersecting)
      },
      { threshold }
    )

    const current = ref.current
    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  }, [threshold])

  return [ref, isOnScreen] as const
}
