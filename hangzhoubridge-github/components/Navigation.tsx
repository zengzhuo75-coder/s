'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Map, Calendar } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: '首页', icon: Home },
    { href: '/map', label: '地图', icon: Map },
    { href: '/timeline', label: '时间线', icon: Calendar },
  ]

  return (
    <nav className="glass-card border-b border-water-dark/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl text-water-dark">
            桥·水·城
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map(item => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isActive
                      ? 'bg-water-dark text-white'
                      : 'text-water-dark hover:bg-water-dark/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
