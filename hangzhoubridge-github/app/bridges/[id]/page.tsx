'use client'

import { useParams, useRouter } from 'next/navigation'
import { bridgeNodes } from '@/lib/bridge-data-new'
import { ArrowLeft, MapPin, Calendar, Map, ChevronLeft, ChevronRight, Landmark, Droplets, Building2, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { heritageColors, typography } from '@/lib/heritage-design-system'

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

// 苏堤六桥列表
const SU_DI_BRIDGES = ['bridge_010', 'bridge_009', 'bridge_008', 'bridge_007', 'bridge_006', 'bridge_005']

// 桥梁类型标签
const typeLabels: Record<string, string> = {
  arch: '拱桥',
  beam: '梁桥',
  suspension: '悬索桥',
  pontoon: '浮桥',
  cantilever: '悬臂桥'
}

// 材料标签
const materialLabels: Record<string, string> = {
  stone: '石',
  wood: '木',
  steel: '钢',
  mixed: '混合',
  brick: '砖'
}

// 功能标签
const functionLabels: Record<string, string> = {
  trade: '商贸',
  transport: '交通',
  military: '军事',
  ceremonial: '礼仪',
  irrigation: '水利'
}

// 为特定桥梁生成高质量历史背景
function generateBridgeStory(bridge: any): { title: string; content: string[]; highlights: Array<{ label: string; value: string }> } {
  // 东浦桥专用故事
  if (bridge.id === 'bridge_006') {
    return {
      title: '千年古渡，苏堤东望',
      content: [
        `**元祐四年（公元1089年）**，苏东坡第二次来杭州任知州。此时的西湖，因长期淤塞，几近湮废。这位56岁的文豪，上书朝廷，力陈"西湖如人之眉目，岂可废乎？"，遂率二十万民工疏浚西湖，用挖出的淤泥筑成一道南北长堤，后世称为"**苏堤**"。`,

        `**东浦桥**，便坐落在这道长堤的东侧，是苏堤六桥中的第四桥。宋人周密在《武林旧事》中记载："苏堤六桥，映波、锁澜、望山、压堤、东浦、跨虹。"东浦桥之名，意取"**东岸渡口**"，正是连接苏堤与东岸的要津。`,

        `九百多年前，当晨雾散去，渔船从东浦桥下缓缓驶入西湖，桥上行人匆匆，桥下波光潋滟。这座**石拱桥**不仅是交通要道，更是观赏日出的绝佳之地。苏东坡有诗云："黑云翻墨未遮山，白雨跳珠乱入船。"写的就是这附近雨过天晴、云开见山的壮美景象。`
      ],
      highlights: [
        { label: '建桥年份', value: '1089年' },
        { label: '距今', value: `${new Date().getFullYear() - bridge.year}年` },
        { label: '苏堤长度', value: '2.8公里' },
        { label: '桥梁间距', value: '约500米' }
      ]
    }
  }

  // 苏堤六桥通用故事
  if (SU_DI_BRIDGES.includes(bridge.id)) {
    return {
      title: '苏堤春晓，六桥烟柳',
      content: [
        `**${bridge.name}** 是苏堤六桥之一，始建于北宋元祐四年（1089年）。当时，大文豪**苏东坡**任杭州知州，疏浚西湖，用淤泥筑成这道南北长堤，堤上建六桥以通湖水。`,

        `苏堤全长2.8公里，连接南北两岸，堤上植杨柳、桃花，春日时节，"**苏堤春晓**"成为西湖十景之首。六桥自南向北依次为：映波、锁澜、望山、压堤、东浦、跨虹，各有其妙。`,

        `${bridge.name}作为其中的重要一环，不仅承担着**交通**功能，更是观赏湖景的绝佳之处。站在桥上，远眺群山如黛，近观湖水如镜，不禁让人联想到苏子笔下"欲把西湖比西子，淡妆浓抹总相宜"的千古名句。`
      ],
      highlights: [
        { label: '建桥年份', value: `${bridge.year}年` },
        { label: '距今', value: `${new Date().getFullYear() - bridge.year}年` },
        { label: '苏堤长度', value: '2.8公里' },
        { label: '桥梁数量', value: '六座' }
      ]
    }
  }

  // 西湖古桥通用故事
  if (bridge.river === '西湖') {
    return {
      title: '西湖古韵，桥影千年',
      content: [
        `**${bridge.name}**，建于${bridge.year}年，是${bridge.dynasty}时期的代表性建筑。这座**${typeLabels[bridge.type]}**横跨于西湖之上，见证了杭州千年的沧桑变迁。`,

        `作为西湖水系的重要组成部分，${bridge.name}不仅是交通要道，更是${bridge.dynasty}建筑艺术的珍贵遗存。桥梁采用**${materialLabels[bridge.material]}**材料建造，体现了当时先进的工程技术与审美理念。`,

        `${bridge.description}${bridge.dynasty === '唐' ? '唐代时，白居易任杭州刺史，也为西湖的疏浚和桥梁建设作出贡献，留下了"最爱湖东行不足，绿杨阴里白沙堤"的佳句。' : ''}`
      ],
      highlights: [
        { label: '建桥年份', value: `${bridge.year}年` },
        { label: '距今', value: `${new Date().getFullYear() - bridge.year}年` },
        { label: '桥梁类型', value: typeLabels[bridge.type] },
        { label: '建造材料', value: materialLabels[bridge.material] }
      ]
    }
  }

  // 通用故事
  return {
    title: `${bridge.name}的历史`,
    content: [
      `**${bridge.name}** 建于 ${bridge.year} 年，是 ${bridge.dynasty} 时期的代表性桥梁。这座${typeLabels[bridge.type]}横跨于${bridge.river}之上，体现了古代工匠的精湛技艺。`,

      `桥梁采用 ${materialLabels[bridge.material]} 材料建造，主要用于${functionLabels[bridge.function]}。${bridge.description}`,

      `历经 ${new Date().getFullYear() - bridge.year} 年风雨，${bridge.name} 依然矗立，承载着丰富的历史文化内涵，是杭州桥梁文化遗产的重要组成部分。`
    ],
    highlights: [
      { label: '建桥年份', value: `${bridge.year}年` },
      { label: '距今', value: `${new Date().getFullYear() - bridge.year}年` },
      { label: '桥梁类型', value: typeLabels[bridge.type] },
      { label: '所属水系', value: bridge.river }
    ]
  }
}

export default function BridgeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const bridgeId = params.id as string

  // 查找桥梁
  const bridge = useMemo(() => {
    return bridgeNodes.find(b => {
      if (/^\d+$/.test(bridgeId)) {
        const numId = parseInt(bridgeId)
        return b.id === `bridge_${numId.toString().padStart(3, '0')}`
      }
      return b.id === bridgeId
    })
  }, [bridgeId])

  if (!bridge) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: heritageColors.ivory }}>
        <div className="text-center">
          <h1
            className="text-2xl font-bold mb-4"
            style={{
              fontFamily: typography.fontFamily.serif,
              color: heritageColors.inkBlack
            }}
          >
            桥梁未找到
          </h1>
          <Link
            href="/"
            className="text-lg hover:underline"
            style={{ color: heritageColors.bronzeGold }}
          >
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  // 生成故事内容
  const story = generateBridgeStory(bridge)

  // 获取相关桥梁
  const suDiBridges = bridgeNodes.filter(b =>
    SU_DI_BRIDGES.includes(b.id) && b.id !== bridge.id
  )

  const otherWestLakeBridges = bridgeNodes.filter(b =>
    b.river === '西湖' && !SU_DI_BRIDGES.includes(b.id) && b.id !== bridge.id
  ).slice(0, 6)

  // 导航桥梁
  const currentIndex = bridgeNodes.findIndex(b => b.id === bridge.id)
  const prevBridge = currentIndex > 0 ? bridgeNodes[currentIndex - 1] : null
  const nextBridge = currentIndex < bridgeNodes.length - 1 ? bridgeNodes[currentIndex + 1] : null

  return (
    <div className="min-h-screen" style={{ background: heritageColors.ivory }}>
      {/* Hero Section - 全屏大图背景 */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {/* 背景图片 */}
        <img
          src={`/images/bridges/${bridge.id}.png`}
          alt={bridge.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.75) contrast(1.1)' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            if (target.src.endsWith('.png')) {
              target.src = target.src.replace('.png', '.svg')
            }
          }}
        />

        {/* 多层渐变遮罩 - 让文字更清晰 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* 返回按钮组 */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/95 hover:bg-white rounded-full shadow-lg transition-all font-medium"
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span
                style={{
                  fontFamily: typography.fontFamily.serif,
                  color: heritageColors.inkBlack
                }}
              >
                返回首页
              </span>
            </Link>
            <Link
              href="/map"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/95 hover:bg-white rounded-full shadow-lg transition-all font-medium"
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <Map className="w-5 h-5" />
              <span
                style={{
                  fontFamily: typography.fontFamily.serif,
                  color: heritageColors.inkBlack
                }}
              >
                返回地图
              </span>
            </Link>
          </div>
        </div>

        {/* 桥梁信息 - 底部居中 */}
        <div className="absolute bottom-12 left-0 right-0 px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* 标签 */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span
                className="px-4 py-1.5 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: getDynastyColor(bridge.dynasty),
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  fontFamily: typography.fontFamily.serif
                }}
              >
                {bridge.year}
              </span>
              <span
                className="px-4 py-1.5 bg-white/25 backdrop-blur-md rounded-full text-sm font-medium"
                style={{
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontFamily: typography.fontFamily.serif
                }}
              >
                {bridge.dynasty}
              </span>
            </div>

            {/* 超大标题 */}
            <h1
              className="mb-4"
              style={{
                fontFamily: typography.fontFamily.serif,
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 600,
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                letterSpacing: typography.letterSpacing.tight
              }}
            >
              {bridge.name}
            </h1>

            {/* 诗意副标题 */}
            <p
              className="text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
              style={{
                color: 'rgba(255, 255, 255, 0.95)',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                fontFamily: typography.fontFamily.serif
              }}
            >
              {bridge.description}
            </p>
          </div>
        </div>
      </div>

      {/* 主内容 */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* 概览信息卡 - 两行横向布局 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            style={{
              background: heritageColors.bg.card,
              border: `1px solid ${heritageColors.border.light}`
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Landmark className="w-5 h-5" style={{ color: heritageColors.era.song }} />
              <span
                className="text-sm"
                style={{
                  color: heritageColors.text.tertiary,
                  fontFamily: typography.fontFamily.serif
                }}
              >
                桥梁类型
              </span>
            </div>
            <p
              className="text-lg font-semibold"
              style={{
                color: heritageColors.inkBlack,
                fontFamily: typography.fontFamily.serif
              }}
            >
              {typeLabels[bridge.type]}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            style={{
              background: heritageColors.bg.card,
              border: `1px solid ${heritageColors.border.light}`
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-5 h-5" style={{ color: heritageColors.era.ancient }} />
              <span
                className="text-sm"
                style={{
                  color: heritageColors.text.tertiary,
                  fontFamily: typography.fontFamily.serif
                }}
              >
                建造材料
              </span>
            </div>
            <p
              className="text-lg font-semibold"
              style={{
                color: heritageColors.inkBlack,
                fontFamily: typography.fontFamily.serif
              }}
            >
              {materialLabels[bridge.material]}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            style={{
              background: heritageColors.bg.card,
              border: `1px solid ${heritageColors.border.light}`
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Droplets className="w-5 h-5" style={{ color: heritageColors.era.yuanMingQing }} />
              <span
                className="text-sm"
                style={{
                  color: heritageColors.text.tertiary,
                  fontFamily: typography.fontFamily.serif
                }}
              >
                所属水系
              </span>
            </div>
            <p
              className="text-lg font-semibold"
              style={{
                color: heritageColors.inkBlack,
                fontFamily: typography.fontFamily.serif
              }}
            >
              {bridge.river}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            style={{
              background: heritageColors.bg.card,
              border: `1px solid ${heritageColors.border.light}`
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5" style={{ color: heritageColors.era.modern }} />
              <span
                className="text-sm"
                style={{
                  color: heritageColors.text.tertiary,
                  fontFamily: typography.fontFamily.serif
                }}
              >
                主要功能
              </span>
            </div>
            <p
              className="text-lg font-semibold"
              style={{
                color: heritageColors.inkBlack,
                fontFamily: typography.fontFamily.serif
              }}
            >
              {functionLabels[bridge.function]}
            </p>
          </motion.div>
        </div>

        {/* 历史背景区 - 大宽比例 */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 md:p-12 shadow-lg"
            style={{
              background: heritageColors.bg.card,
              border: `1px solid ${heritageColors.border.light}`
            }}
          >
            {/* 标题 */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-1 h-8 rounded-full"
                style={{ background: getDynastyColor(bridge.dynasty) }}
              />
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{
                  fontFamily: typography.fontFamily.serif,
                  color: heritageColors.inkBlack,
                  letterSpacing: typography.letterSpacing.tight
                }}
              >
                {story.title}
              </h2>
            </div>

            {/* 叙事性文字 */}
            <div className="mb-10">
              {story.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-6 leading-loose text-lg"
                  style={{
                    color: heritageColors.text.secondary,
                    lineHeight: typography.lineHeight.relaxed,
                    fontFamily: typography.fontFamily.serif
                  }}
                >
                  {paragraph.split('**').map((part, i) =>
                    i % 2 === 1 ? (
                      <strong
                        key={i}
                        style={{
                          color: heritageColors.inkBlack,
                          fontWeight: 600
                        }}
                      >
                        {part}
                      </strong>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </p>
              ))}
            </div>

            {/* 数据亮点小模块 */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
              style={{
                borderTop: `1px solid ${heritageColors.border.light}`
              }}
            >
              {story.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl"
                  style={{
                    background: 'rgba(166, 124, 82, 0.05)'
                  }}
                >
                  <p
                    className="text-xs mb-2"
                    style={{
                      color: heritageColors.text.tertiary,
                      fontFamily: typography.fontFamily.serif
                    }}
                  >
                    {highlight.label}
                  </p>
                  <p
                    className="text-xl font-semibold"
                    style={{
                      fontFamily: typography.fontFamily.serif,
                      color: getDynastyColor(bridge.dynasty)
                    }}
                  >
                    {highlight.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 相关探索区 */}
        <div className="mb-16">
          <h3
            className="text-2xl font-bold mb-8 text-center"
            style={{
              fontFamily: typography.fontFamily.serif,
              color: heritageColors.inkBlack,
              letterSpacing: typography.letterSpacing.tight
            }}
          >
            相关探索
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 苏堤六桥 */}
            {suDiBridges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl p-6 shadow-sm"
                style={{
                  background: heritageColors.bg.card,
                  border: `1px solid ${heritageColors.border.light}`
                }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <Lightbulb className="w-5 h-5" style={{ color: heritageColors.era.song }} />
                  <h4
                    className="text-lg font-bold"
                    style={{
                      color: heritageColors.inkBlack,
                      fontFamily: typography.fontFamily.serif
                    }}
                  >
                    苏堤六桥
                  </h4>
                </div>
                <div className="space-y-3">
                  {suDiBridges.map(b => (
                    <Link
                      key={b.id}
                      href={`/bridges/${b.id}`}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/80 transition-all group"
                      style={{
                        background: 'transparent',
                        textDecoration: 'none'
                      }}
                    >
                      <div>
                        <p
                          className="font-medium"
                          style={{
                            color: heritageColors.inkBlack,
                            fontFamily: typography.fontFamily.serif
                          }}
                        >
                          {b.name}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: heritageColors.text.tertiary }}
                        >
                          {b.year}
                        </p>
                      </div>
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          background: `${getDynastyColor(b.dynasty)}25`,
                          color: getDynastyColor(b.dynasty),
                          fontFamily: typography.fontFamily.serif
                        }}
                      >
                        {b.dynasty}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 西湖其他名桥 */}
            {otherWestLakeBridges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl p-6 shadow-sm"
                style={{
                  background: heritageColors.bg.card,
                  border: `1px solid ${heritageColors.border.light}`
                }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <MapPin className="w-5 h-5" style={{ color: heritageColors.era.yuanMingQing }} />
                  <h4
                    className="text-lg font-bold"
                    style={{
                      color: heritageColors.inkBlack,
                      fontFamily: typography.fontFamily.serif
                    }}
                  >
                    西湖其他名桥
                  </h4>
                </div>
                <div className="space-y-3">
                  {otherWestLakeBridges.map(b => (
                    <Link
                      key={b.id}
                      href={`/bridges/${b.id}`}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/80 transition-all group"
                      style={{
                        background: 'transparent',
                        textDecoration: 'none'
                      }}
                    >
                      <div>
                        <p
                          className="font-medium"
                          style={{
                            color: heritageColors.inkBlack,
                            fontFamily: typography.fontFamily.serif
                          }}
                        >
                          {b.name}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: heritageColors.text.tertiary }}
                        >
                          {b.year}
                        </p>
                      </div>
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          background: `${getDynastyColor(b.dynasty)}25`,
                          color: getDynastyColor(b.dynasty),
                          fontFamily: typography.fontFamily.serif
                        }}
                      >
                        {b.dynasty}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* 上一座/下一座导航 */}
        <div
          className="flex items-center justify-between rounded-2xl p-6 shadow-sm"
          style={{
            background: heritageColors.bg.card,
            border: `1px solid ${heritageColors.border.light}`
          }}
        >
          <div className="flex items-center gap-4">
            {prevBridge ? (
              <Link
                href={`/bridges/${prevBridge.id}`}
                className="flex items-center gap-3 px-6 py-3 rounded-full transition-all hover:shadow-md"
                style={{
                  background: 'rgba(166, 124, 82, 0.08)',
                  textDecoration: 'none'
                }}
              >
                <ChevronLeft className="w-5 h-5" style={{ color: heritageColors.era.song }} />
                <div className="text-left">
                  <p
                    className="text-xs"
                    style={{
                      color: heritageColors.text.tertiary,
                      fontFamily: typography.fontFamily.serif
                    }}
                  >
                    上一座
                  </p>
                  <p
                    className="font-medium"
                    style={{
                      color: heritageColors.inkBlack,
                      fontFamily: typography.fontFamily.serif
                    }}
                  >
                    {prevBridge.name}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="w-36"></div>
            )}
          </div>

          <Link
            href="/"
            className="px-8 py-3 rounded-full font-medium transition-all hover:shadow-lg text-white"
            style={{
              background: heritageColors.inkBlack,
              fontFamily: typography.fontFamily.serif
            }}
          >
            返回首页
          </Link>

          <div className="flex items-center justify-end">
            {nextBridge ? (
              <Link
                href={`/bridges/${nextBridge.id}`}
                className="flex items-center gap-3 px-6 py-3 rounded-full transition-all hover:shadow-md"
                style={{
                  background: 'rgba(166, 124, 82, 0.08)',
                  textDecoration: 'none'
                }}
              >
                <div className="text-right">
                  <p
                    className="text-xs"
                    style={{
                      color: heritageColors.text.tertiary,
                      fontFamily: typography.fontFamily.serif
                    }}
                  >
                    下一座
                  </p>
                  <p
                    className="font-medium"
                    style={{
                      color: heritageColors.inkBlack,
                      fontFamily: typography.fontFamily.serif
                    }}
                  >
                    {nextBridge.name}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5" style={{ color: heritageColors.era.song }} />
              </Link>
            ) : (
              <div className="w-36"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
