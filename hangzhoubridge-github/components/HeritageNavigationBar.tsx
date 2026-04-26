'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Clock,
  Landmark,
  Menu,
  X,
  ChevronRight,
  Home
} from 'lucide-react'
import { heritageColors, decorations } from '@/lib/heritage-design-system'

export function HeritageNavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // 监听滚动，改变导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 导航项配置
  const navItems = [
    { href: '/', label: '首页', icon: Home },
    { href: '/map', label: '古桥地图', icon: MapPin },
    { href: '/timeline', label: '时光之旅', icon: Clock },
    { href: '/museum', label: '桥梁博物馆', icon: Landmark },
  ]

  return (
    <>
      {/* 顶部装饰线 */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #A67C52, transparent)' }} />

      {/* 导航栏 */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          background: isScrolled
            ? `rgba(247, 243, 234, 0.95)`
            : 'rgba(247, 243, 234, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: isScrolled
            ? '1px solid rgba(166, 124, 82, 0.1)'
            : '1px solid rgba(166, 124, 82, 0.05)',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16">
          <div className="flex items-center justify-between h-full">
            {/* Logo 区域 */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              style={{ textDecoration: 'none' }}
            >
              {/* 印章 Logo */}
              <div
                className="flex items-center justify-center w-10 h-10 rounded"
                style={{
                  border: `2px solid ${heritageColors.bronzeGold}`,
                  background: `linear-gradient(135deg, ${heritageColors.ivory} 0%, ${heritageColors.ricePaper} 100%)`,
                  transition: 'all 0.3s ease'
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: heritageColors.bronzeGold,
                    fontFamily: "'Noto Serif SC', serif"
                  }}
                >
                  桥
                </span>
              </div>

              {/* 标题 */}
              <div className="hidden md:block">
                <h1
                  className="text-lg"
                  style={{
                    fontFamily: "'Noto Serif SC', serif",
                    color: heritageColors.inkBlack,
                    fontWeight: 500,
                    letterSpacing: '0.05em'
                  }}
                >
                  桥·水·城
                </h1>
                <p
                  className="text-xs"
                  style={{
                    color: heritageColors.text.secondary,
                    letterSpacing: '0.05em'
                  }}
                >
                  杭州古桥多维可视化系统
                </p>
              </div>
            </Link>

            {/* 桌面端导航 */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2 rounded-full transition-all duration-300 group"
                    style={{
                      textDecoration: 'none',
                      color: isActive ? heritageColors.bronzeGold : heritageColors.text.primary,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon size={16} />
                      <span
                        className="text-sm font-medium"
                        style={{
                          fontFamily: "'Noto Serif SC', serif",
                          letterSpacing: '0.03em'
                        }}
                      >
                        {item.label}
                      </span>
                    </div>

                    {/* 激活指示器 */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2"
                        style={{
                          width: '20px',
                          height: '2px',
                          background: heritageColors.bronzeGold,
                          borderRadius: '1px'
                        }}
                      />
                    )}

                    {/* 悬停下划线 */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent group-hover:w-full transition-all duration-300"
                      style={{ color: 'currentColor' }}
                    />
                  </Link>
                )
              })}
            </div>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full transition-colors"
              style={{
                color: heritageColors.text.primary,
                background: 'rgba(255, 255, 255, 0.5)'
              }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-30 overflow-hidden"
            style={{
              background: `rgba(247, 243, 234, 0.98)`,
              backdropFilter: 'blur(12px)',
              borderBottom: `1px solid ${heritageColors.border.light}`
            }}
          >
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
                        style={{
                          textDecoration: 'none',
                          color: isActive ? heritageColors.bronzeGold : heritageColors.text.primary,
                          background: isActive
                            ? `rgba(166, 124, 82, 0.1)`
                            : 'transparent',
                        }}
                      >
                        <item.icon size={18} />
                        <span
                          className="text-base"
                          style={{
                            fontFamily: "'Noto Serif SC', serif",
                            fontWeight: isActive ? 600 : 400
                          }}
                        >
                          {item.label}
                        </span>
                        {isActive && (
                          <ChevronRight size={16} style={{ color: heritageColors.bronzeGold }} />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* 底部装饰 */}
              <div
                className="mt-6 pt-4"
                style={{
                  borderTop: `1px solid ${heritageColors.border.light}`
                }}
              >
                <p
                  className="text-xs text-center"
                  style={{
                    color: heritageColors.text.tertiary,
                    fontFamily: "'Noto Serif SC', serif",
                    letterSpacing: '0.05em'
                  }}
                >
                  探索千年古桥 · 传承文化记忆
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
