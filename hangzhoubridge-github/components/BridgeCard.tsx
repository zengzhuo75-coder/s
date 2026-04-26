'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BridgeData, dynastyColors } from '@/lib/bridge-data'

interface BridgeCardProps {
  bridge: BridgeData
  index?: number
  variant?: 'default' | 'compact' | 'detailed'
}

export function BridgeCard({ bridge, index = 0, variant = 'default' }: BridgeCardProps) {
  const cardVariants = {
    default: 'aspect-[4/3]',
    compact: 'aspect-square',
    detailed: 'aspect-video',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/map?bridge=${bridge.id}`}>
        <div className="glass-card rounded-2xl overflow-hidden h-full cursor-pointer group">
          {/* Image placeholder */}
          <div className={`relative ${cardVariants[variant]} bg-gradient-to-br from-water-light/20 to-water-dark/20 overflow-hidden`}>
            {/* Bridge icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.svg
                className="w-20 h-20 text-water-dark/30 group-hover:text-water-dark/50 transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                whileHover={{ scale: 1.1 }}
              >
                <path d="M4 12h16M4 12c0-3 2-5 4-5s4 2 4 5M12 12c0-3 2-5 4-5s4 2 4 5M4 12v6h16v-6" />
              </motion.svg>
            </div>

            {/* Dynasty badge */}
            <div className="absolute top-3 right-3">
              <span
                className="px-3 py-1 text-xs font-medium text-white rounded-full shadow-lg"
                style={{
                  backgroundColor: dynastyColors[bridge.dynasty as keyof typeof dynastyColors]
                }}
              >
                {bridge.dynasty}
              </span>
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-water-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-serif text-xl text-water-dark mb-2 group-hover:text-bridge-accent transition-colors">
              {bridge.name}
            </h3>

            {variant !== 'compact' && (
              <>
                <p className="text-sm text-water-dark/60 mb-3">
                  {bridge.river} · {bridge.type}
                </p>
                <p className="text-sm text-water-dark/70 line-clamp-2 leading-relaxed">
                  {bridge.description}
                </p>
              </>
            )}

            {/* View details indicator */}
            <div className="mt-4 flex items-center text-sm text-bridge-accent opacity-0 group-hover:opacity-100 transition-opacity">
              <span>在地图上查看</span>
              <svg
                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
