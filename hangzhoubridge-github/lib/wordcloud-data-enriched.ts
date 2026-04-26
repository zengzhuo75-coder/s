import { TimelineEra } from './timeline-data-enriched'

export interface WordCloudWord {
  text: string
  value: number
  color?: string
}

/**
 * 每个时代的词云数据 - 增强版
 * 从时代故事、代表性桥梁、数据洞察中提取关键词
 */
export const eraWordClouds: Record<string, WordCloudWord[]> = {
  ancient: [
    { text: '西兴桥', value: 55, color: '#7B2D8E' },
    { text: '西泠桥', value: 50, color: '#7B2D8E' },
    { text: '断桥', value: 48, color: '#7B2D8E' },
    { text: '东晋南渡', value: 42, color: '#9333EA' },
    { text: '石拱桥', value: 45, color: '#A855F7' },
    { text: '官道要津', value: 38, color: '#C084FC' },
    { text: '钱塘江', value: 40, color: '#7B2D8E' },
    { text: '江南水乡', value: 43, color: '#9333EA' },
    { text: '营造技艺', value: 35, color: '#A855F7' },
    { text: '州府', value: 32, color: '#C084FC' },
    { text: '古韵', value: 52, color: '#7B2D8E' },
    { text: '南北连接', value: 36, color: '#9333EA' },
    { text: '精品', value: 30, color: '#A855F7' },
    { text: '桥梁基石', value: 34, color: '#C084FC' },
    { text: '白居易', value: 46, color: '#7B2D8E' },
    { text: '西湖', value: 44, color: '#9333EA' },
    { text: '运河起点', value: 37, color: '#A855F7' },
    { text: '220年一座', value: 28, color: '#C084FC' },
    { text: '品质', value: 33, color: '#7B2D8E' },
    { text: '南朝', value: 29, color: '#9333EA' },
    { text: '隋唐', value: 27, color: '#A855F7' }
  ],
  song: [
    { text: '苏堤六桥', value: 58, color: '#2D6A4F' },
    { text: '映波桥', value: 48, color: '#2D6A4F' },
    { text: '压堤桥', value: 46, color: '#40916C' },
    { text: '望山桥', value: 44, color: '#52B788' },
    { text: '跨虹桥', value: 50, color: '#74C69D' },
    { text: '宋室南渡', value: 54, color: '#2D6A4F' },
    { text: '临安', value: 52, color: '#40916C' },
    { text: '西湖十景', value: 56, color: '#52B788' },
    { text: '运河', value: 50, color: '#74C69D' },
    { text: '拱宸桥', value: 47, color: '#2D6A4F' },
    { text: '漕运', value: 45, color: '#40916C' },
    { text: '商贾云集', value: 42, color: '#52B788' },
    { text: '苏东坡', value: 55, color: '#74C69D' },
    { text: '诗画交融', value: 49, color: '#2D6A4F' },
    { text: '水在城中', value: 43, color: '#40916C' },
    { text: '城在桥中', value: 43, color: '#52B788' },
    { text: '园林桥', value: 40, color: '#74C69D' },
    { text: '交通桥', value: 41, color: '#2D6A4F' },
    { text: '26年一座', value: 36, color: '#40916C' },
    { text: '300%增长', value: 38, color: '#52B788' },
    { text: '鼎盛', value: 53, color: '#74C69D' }
  ],
  'yuan-ming-qing': [
    { text: '广济桥', value: 52, color: '#3D5A80' },
    { text: '忠义桥', value: 48, color: '#3D5A80' },
    { text: '长桥', value: 46, color: '#5C7AA6' },
    { text: '元续宋制', value: 42, color: '#6B8CB8' },
    { text: '明代修城', value: 44, color: '#7A9ECA' },
    { text: '薄拱技术', value: 50, color: '#3D5A80' },
    { text: '乡村扩散', value: 47, color: '#5C7AA6' },
    { text: '市镇经济', value: 45, color: '#6B8CB8' },
    { text: '城乡连接', value: 43, color: '#7A9ECA' },
    { text: '功能多样', value: 48, color: '#3D5A80' },
    { text: '小桥流水', value: 54, color: '#5C7AA6' },
    { text: '江南风貌', value: 49, color: '#6B8CB8' },
    { text: '塘栖古镇', value: 46, color: '#7A9ECA' },
    { text: '丝绸贸易', value: 41, color: '#3D5A80' },
    { text: '岳飞部将', value: 44, color: '#5C7AA6' },
    { text: '技艺成熟', value: 43, color: '#6B8CB8' },
    { text: '桥型丰富', value: 47, color: '#7A9ECA' },
    { text: '传承', value: 40, color: '#3D5A80' },
    { text: '梁祝传说', value: 45, color: '#5C7AA6' },
    { text: '人口百万', value: 38, color: '#6B8CB8' },
    { text: '经济命脉', value: 42, color: '#7A9ECA' }
  ],
  modern: [
    { text: '钱塘江大桥', value: 60, color: '#2563EB' },
    { text: '茅以升', value: 55, color: '#2563EB' },
    { text: '复兴大桥', value: 48, color: '#3B82F6' },
    { text: '西兴大桥', value: 46, color: '#60A5FA' },
    { text: '公铁两用', value: 50, color: '#93C5FD' },
    { text: '自建第一桥', value: 54, color: '#2563EB' },
    { text: '天堑变通途', value: 56, color: '#3B82F6' },
    { text: '一桥飞架', value: 52, color: '#60A5FA' },
    { text: '钢构', value: 44, color: '#93C5FD' },
    { text: '悬索', value: 42, color: '#2563EB' },
    { text: '现代工程', value: 49, color: '#3B82F6' },
    { text: '传统融合', value: 45, color: '#60A5FA' },
    { text: '古桥保护', value: 47, color: '#93C5FD' },
    { text: '新桥建设', value: 46, color: '#2563EB' },
    { text: '传奇续写', value: 51, color: '#3B82F6' },
    { text: '钱塘江时代', value: 53, color: '#60A5FA' },
    { text: '双层钢构', value: 43, color: '#93C5FD' },
    { text: '民族工业', value: 48, color: '#2563EB' },
    { text: '抗战炸桥', value: 40, color: '#3B82F6' },
    { text: '技术突破', value: 45, color: '#60A5FA' },
    { text: '创新', value: 41, color: '#93C5FD' }
  ]
}

/**
 * 获取指定时代的词云数据
 */
export function getEraWordCloud(eraId: string | null): WordCloudWord[] {
  if (!eraId || !eraWordClouds[eraId]) {
    return []
  }
  return eraWordClouds[eraId]
}

/**
 * 获取默认词云（所有时代的混合）
 */
export function getDefaultWordCloud(): WordCloudWord[] {
  return [
    { text: '杭州古桥', value: 65, color: '#6B7280' },
    { text: '千年时光', value: 58, color: '#9CA3AF' },
    { text: '桥梁', value: 62, color: '#6B7280' },
    { text: '水乡', value: 52, color: '#9CA3AF' },
    { text: '历史', value: 48, color: '#6B7280' },
    { text: '文化', value: 50, color: '#9CA3AF' },
    { text: '传承', value: 46, color: '#6B7280' },
    { text: '西湖', value: 56, color: '#9CA3AF' },
    { text: '运河', value: 54, color: '#6B7280' },
    { text: '选择时期', value: 40, color: '#9CA3AF' },
    { text: '开始旅程', value: 44, color: '#6B7280' },
    { text: '数据故事', value: 42, color: '#9CA3AF' },
    { text: '古韵初现', value: 38, color: '#7B2D8E' },
    { text: '两宋鼎盛', value: 36, color: '#2D6A4F' },
    { text: '元明清续', value: 34, color: '#3D5A80' },
    { text: '现代新篇', value: 32, color: '#2563EB' }
  ]
}
