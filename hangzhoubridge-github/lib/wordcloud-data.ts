import { TimelineEra } from './timeline-data'

export interface WordCloudWord {
  text: string
  value: number
  color?: string
}

/**
 * 每个时代的词云数据
 * 从时代故事、代表性桥梁、数据洞察中提取关键词
 */
export const eraWordClouds: Record<string, WordCloudWord[]> = {
  ancient: [
    { text: '西兴桥', value: 50, color: '#7B2D8E' },
    { text: '西泠桥', value: 45, color: '#7B2D8E' },
    { text: '东晋南渡', value: 35, color: '#9333EA' },
    { text: '石拱桥', value: 40, color: '#A855F7' },
    { text: '官道要津', value: 30, color: '#C084FC' },
    { text: '钱塘江', value: 38, color: '#7B2D8E' },
    { text: '江南水乡', value: 42, color: '#9333EA' },
    { text: '营造技艺', value: 28, color: '#A855F7' },
    { text: '州府', value: 25, color: '#C084FC' },
    { text: '古韵', value: 48, color: '#7B2D8E' },
    { text: '南北连接', value: 32, color: '#9333EA' },
    { text: '精品', value: 22, color: '#A855F7' },
    { text: '桥梁基石', value: 36, color: '#C084FC' },
    { text: '南朝', value: 26, color: '#7B2D8E' },
    { text: '隋唐', value: 24, color: '#9333EA' }
  ],
  song: [
    { text: '苏堤六桥', value: 55, color: '#2D6A4F' },
    { text: '映波桥', value: 42, color: '#2D6A4F' },
    { text: '压堤桥', value: 40, color: '#40916C' },
    { text: '望山桥', value: 38, color: '#52B788' },
    { text: '东浦桥', value: 36, color: '#74C69D' },
    { text: '跨虹桥', value: 44, color: '#40916C' },
    { text: '宋室南渡', value: 48, color: '#2D6A4F' },
    { text: '临安', value: 45, color: '#52B788' },
    { text: '西湖十景', value: 50, color: '#2D6A4F' },
    { text: '运河', value: 46, color: '#40916C' },
    { text: '拱宸桥', value: 43, color: '#52B788' },
    { text: '大关桥', value: 38, color: '#74C69D' },
    { text: '漕运', value: 40, color: '#2D6A4F' },
    { text: '商贾云集', value: 35, color: '#40916C' },
    { text: '诗画交融', value: 47, color: '#52B788' },
    { text: '水在城中', value: 41, color: '#74C69D' },
    { text: '城在桥中', value: 41, color: '#2D6A4F' },
    { text: '园林桥', value: 37, color: '#40916C' },
    { text: '交通桥', value: 39, color: '#52B788' },
    { text: '鼎盛', value: 52, color: '#2D6A4F' }
  ],
  'yuan-ming-qing': [
    { text: '广济桥', value: 48, color: '#3D5A80' },
    { text: '忠义桥', value: 42, color: '#3D5A80' },
    { text: '元续宋制', value: 38, color: '#5C7AA6' },
    { text: '明代修城', value: 40, color: '#6B8CB8' },
    { text: '薄拱技术', value: 45, color: '#7A9ECA' },
    { text: '乡村扩散', value: 43, color: '#5C7AA6' },
    { text: '市镇经济', value: 41, color: '#6B8CB8' },
    { text: '城乡连接', value: 39, color: '#7A9ECA' },
    { text: '功能多样', value: 44, color: '#3D5A80' },
    { text: '小桥流水', value: 50, color: '#5C7AA6' },
    { text: '江南风貌', value: 46, color: '#6B8CB8' },
    { text: '田园', value: 35, color: '#7A9ECA' },
    { text: '官道', value: 33, color: '#3D5A80' },
    { text: '技艺成熟', value: 37, color: '#5C7AA6' },
    { text: '桥型丰富', value: 42, color: '#6B8CB8' },
    { text: '传承', value: 38, color: '#7A9ECA' }
  ],
  modern: [
    { text: '钱塘江大桥', value: 58, color: '#2563EB' },
    { text: '茅以升', value: 50, color: '#2563EB' },
    { text: '公铁两用', value: 45, color: '#3B82F6' },
    { text: '复兴大桥', value: 42, color: '#60A5FA' },
    { text: '北星桥', value: 40, color: '#93C5FD' },
    { text: '自建第一桥', value: 48, color: '#3B82F6' },
    { text: '天堑变通途', value: 52, color: '#2563EB' },
    { text: '一桥飞架', value: 46, color: '#60A5FA' },
    { text: '钢构', value: 38, color: '#93C5FD' },
    { text: '悬索', value: 36, color: '#3B82F6' },
    { text: '现代工程', value: 44, color: '#2563EB' },
    { text: '传统融合', value: 40, color: '#60A5FA' },
    { text: '古桥保护', value: 42, color: '#93C5FD' },
    { text: '新桥建设', value: 41, color: '#3B82F6' },
    { text: '传奇续写', value: 47, color: '#2563EB' },
    { text: '突破', value: 43, color: '#60A5FA' },
    { text: '创新', value: 39, color: '#93C5FD' }
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
    { text: '杭州古桥', value: 60, color: '#6B7280' },
    { text: '千年时光', value: 50, color: '#9CA3AF' },
    { text: '桥梁', value: 55, color: '#6B7280' },
    { text: '水乡', value: 45, color: '#9CA3AF' },
    { text: '历史', value: 40, color: '#6B7280' },
    { text: '文化', value: 42, color: '#9CA3AF' },
    { text: '传承', value: 38, color: '#6B7280' },
    { text: '西湖', value: 48, color: '#9CA3AF' },
    { text: '运河', value: 46, color: '#6B7280' },
    { text: '选择时期', value: 35, color: '#9CA3AF' }
  ]
}
