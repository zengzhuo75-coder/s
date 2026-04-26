/**
 * 时间线数据故事结构定义
 */

export interface TimelineEra {
  /** 时期ID */
  id: string
  /** 时期名称 */
  name: string
  /** 开始年份 */
  startYear: number
  /** 结束年份 */
  endYear: number
  /** 该时期桥梁数量 */
  bridgeCount: number
  /** 时期标签（简短描述） */
  tag: string
  /** 故事文本（富有文化感染力） */
  storyText: string
  /** 数据洞察 */
  keyInsight: string
  /** 该时期代表性桥梁 */
  highlightBridges: string[]
  /** 朝代 */
  dynasty: string
  /** 时期颜色 */
  color: string
}

export interface TimelineData {
  /** 所有时期 */
  eras: TimelineEra[]
  /** 按年份统计的桥梁数据（用于图表） */
  yearlyData: Array<{ year: number; count: number; era: string }>
}

/**
 * 时间线数据
 */
export const timelineData: TimelineData = {
  eras: [
    {
      id: 'ancient',
      name: '古韵初现',
      startYear: 300,
      endYear: 960,
      bridgeCount: 3,
      tag: '东晋·南朝·隋唐',
      dynasty: 'ancient',
      storyText: '江南水乡，桥影初现。东晋南渡，北方士族南迁，带来先进营造技艺。西兴、西泠诸桥，跨越钱塘、西湖，连接南北，见证杭州从郡县升为州府的千年跨越。',
      keyInsight: '这一时期，杭州桥梁多建于官道要津，以石拱桥为主，奠定了"桥都"的基石。平均每200年仅增一座，座座皆精品。',
      highlightBridges: ['bridge_001', 'bridge_002'],
      color: '#7B2D8E'
    },
    {
      id: 'song',
      name: '两宋鼎盛',
      startYear: 960,
      endYear: 1279,
      bridgeCount: 12,
      tag: '北宋·南宋',
      dynasty: 'song',
      storyText: '宋室南渡，定都临安。西湖十景成形，苏堤六桥横卧，"映波、压堤、望山、东浦、跨虹"，桥因堤生，堤以桥名，诗画交融。运河两岸，拱宸、大关巍然屹立，漕运兴盛，商贾云集。',
      keyInsight: '两宋300余年，桥梁数量激增4倍。西湖园林桥与运河交通桥并重，功能与美学达到完美统一，形成"水在城中，城在桥中"的独特格局。',
      highlightBridges: ['bridge_005', 'bridge_006', 'bridge_007', 'bridge_008', 'bridge_013'],
      color: '#2D6A4F'
    },
    {
      id: 'yuan-ming-qing',
      name: '元明清续',
      startYear: 1279,
      endYear: 1644,
      bridgeCount: 18,
      tag: '元·明',
      dynasty: 'ming',
      storyText: '元续宋制，明代修城。钱塘江大桥虽未至，但忠义古桥犹存，广济长桥卧波，连接城乡。桥梁从城市走向乡村，从官道延伸至田间，见证江南市镇经济的繁荣。',
      keyInsight: '元明时期，桥梁建设向乡村扩散。工艺上，"薄拱"技术成熟，桥型更加多样。_functional与艺术性并重，形成"小桥流水人家"的典型江南风貌。',
      highlightBridges: ['bridge_014', 'bridge_015', 'bridge_018', 'bridge_022'],
      color: '#3D5A80'
    },
    {
      id: 'modern',
      name: '现代新篇',
      startYear: 1644,
      endYear: 2004,
      bridgeCount: 12,
      tag: '清·近现代',
      dynasty: 'modern',
      storyText: '钱塘江大桥，茅以升设计，中国人自建第一座公铁两用桥，打破"钱塘江上不能建桥"的神话。复兴大桥、北星桥相继建成，现代工程技术与传统桥文化交相辉映。',
      keyInsight: '近现代，桥梁从石拱转向钢构、悬索等新结构。钱塘江上，一桥飞架南北，天堑变通途。古桥保护与新桥建设并重，续写杭州桥梁传奇。',
      highlightBridges: ['bridge_021', 'bridge_030', 'bridge_031'],
      color: '#2563EB'
    }
  ],

  yearlyData: [
    { year: 300, count: 0, era: '' },
    { year: 350, count: 1, era: 'ancient' }, // 西兴桥
    { year: 600, count: 1, era: 'ancient' },
    { year: 960, count: 2, era: 'ancient' }, // 西泠桥
    { year: 1000, count: 3, era: 'song' },
    { year: 1089, count: 5, era: 'song' }, // 苏堤建成
    { year: 1200, count: 10, era: 'song' },
    { year: 1279, count: 12, era: 'song' },
    { year: 1300, count: 13, era: 'yuan-ming-qing' },
    { year: 1400, count: 15, era: 'yuan-ming-qing' },
    { year: 1500, count: 17, era: 'yuan-ming-qing' },
    { year: 1600, count: 18, era: 'yuan-ming-qing' },
    { year: 1644, count: 18, era: 'yuan-ming-qing' },
    { year: 1700, count: 19, era: 'modern' },
    { year: 1900, count: 20, era: 'modern' },
    { year: 1937, count: 21, era: 'modern' }, // 钱塘江大桥
    { year: 2004, count: 45, era: 'modern' }
  ]
}

/**
 * 获取时期的年份范围标签
 */
export function getEraYearLabel(era: TimelineEra): string {
  if (era.endYear >= 2000) {
    return `${era.startYear}至今`
  }
  return `${era.startYear}-${era.endYear}`
}

/**
 * 根据年份获取所属时期
 */
export function getEraByYear(year: number): TimelineEra | null {
  for (const era of timelineData.eras) {
    if (year >= era.startYear && year <= era.endYear) {
      return era
    }
  }
  return null
}
