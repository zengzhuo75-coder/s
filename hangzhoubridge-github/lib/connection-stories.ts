/**
 * 连接线故事数据
 * 为地图连接线增加叙事性描述
 */

import { ConnectionMode } from './bridge-data-new'

export interface ConnectionStory {
  id: string
  sourceId: string
  targetId: string
  mode: ConnectionMode
  title: string
  shortStory: string
  fullStory: string
  year?: string
  yearSpan?: string
  fact?: string
  distance?: string
  culturalContext?: string
}

/**
 * 连接线故事库
 * 根据不同连接模式提供富有故事性的描述
 */
export const connectionStories: ConnectionStory[] = [
  // ===== 时间模式故事 =====
  {
    id: 'story-001',
    sourceId: 'bridge_006',
    targetId: 'bridge_007',
    mode: 'temporal',
    title: '苏堤兄弟',
    shortStory: '同为苏东坡1089年所建，相距约400米',
    fullStory: '**元祐四年（公元1089年）**，56岁的苏东坡第二次来到杭州。面对淤塞的西湖，他上书朝廷："西湖如人之眉目，岂可废乎？"遂率二十万民工疏浚西湖，用淤泥筑成苏堤。\n\n**东浦桥**与**压堤桥**，同为苏堤六桥之一，同年建成。东浦桥取意"东岸渡口"，压堤桥则用于调节西湖水位。两桥相距约400米，共同守护苏堤东侧近千年。',
    year: '1089年',
    fact: '苏堤六桥平均间距约470米',
    distance: '约400米',
    culturalContext: '苏堤春晓为西湖十景之首'
  },
  {
    id: 'story-002',
    sourceId: 'bridge_006',
    targetId: 'bridge_002',
    mode: 'temporal',
    title: '跨越四百年的对话',
    shortStory: '从唐代西泠桥到宋代东浦桥',
    fullStory: '**西泠桥**建于唐代，是连接孤山与北山街的要津。白居易有诗云："孤山寺北贾亭西，水面初平云脚低。"\n\n471年后，**东浦桥**在宋代苏堤上崛起。两座桥梁，隔着400多年的时光，一在孤山之麓，一在苏堤之东，共同见证了杭州从郡县升为州府的千年跨越。',
    yearSpan: '618-1089年',
    fact: '相隔471年',
    culturalContext: '白居易与苏东坡都曾疏浚西湖'
  },
  {
    id: 'story-003',
    sourceId: 'bridge_006',
    targetId: 'bridge_021',
    mode: 'temporal',
    title: '从湖到江的跨越',
    shortStory: '848年：从西湖渡口到钱塘江大桥',
    fullStory: '**1089年**，东浦桥在西湖苏堤上建成，是观赏日出的绝佳之地。苏东坡诗云："黑云翻墨未遮山，白雨跳珠乱入船。"\n\n**1937年**，钱塘江大桥建成，中国人自建第一座公铁两用桥。茅以升打破"钱塘江上不能建桥"的神话。\n\n一座在西湖，一座在钱塘江。848年间，杭州的桥梁从"渡口"演变为"地标"，从"石拱"进化为"钢构"。',
    yearSpan: '1089-1937年',
    fact: '相隔848年',
    distance: '约15公里'
  },

  // ===== 河流模式故事 =====
  {
    id: 'story-004',
    sourceId: 'bridge_006',
    targetId: 'bridge_010',
    mode: 'river',
    title: '苏堤首尾',
    shortStory: '映波桥与东浦桥，苏堤的起点与终点',
    fullStory: '**映波桥**是苏堤南端第一桥，得名于"映照波光"。**东浦桥**是苏堤第四桥，意为"东岸渡口"。\n\n两桥一南一北，相距约1.4公里，连同中间的锁澜、望山、压堤、跨虹，共同构成苏堤"六桥烟柳"的诗意画卷。春日时节，桃花盛开，柳丝轻拂，行于桥上，如入画中。',
    fact: '苏堤全长2.8公里',
    distance: '约1.4公里',
    culturalContext: '苏堤春晓是西湖十景之首'
  },
  {
    id: 'story-005',
    sourceId: 'bridge_006',
    targetId: 'bridge_001',
    mode: 'river',
    title: '湖上双璧',
    shortStory: '东浦桥与断桥，都是西湖名桥',
    fullStory: '**断桥**，西湖十景之一"断桥残雪"，因白娘子传奇而家喻户晓。**东浦桥**，苏堤六桥之一，是观赏日出的佳处。\n\n两桥同在西湖，一在白堤，一在苏堤。断桥承载爱情传说，东浦桥见证苏堤风月。它们不仅是交通要道，更是杭州文化的重要载体。',
    culturalContext: '断桥因白蛇传闻名于世'
  },

  // ===== 功能模式故事 =====
  {
    id: 'story-006',
    sourceId: 'bridge_006',
    targetId: 'bridge_007',
    mode: 'function',
    title: '交通与水利',
    shortStory: '一座渡人，一座调节水位',
    fullStory: '**东浦桥**主要功能是交通，连接苏堤与东岸，是渔船出入西湖的要津。\n\n**压堤桥**则承担水利功能，用于调节西湖水位，保证下游灌溉用水。\n\n两桥功能互补，体现了古代杭州"**桥随水兴，城因桥盛**"的城市发展理念。实用与美学并重，工程与人文交融。',
    culturalContext: '苏堤兼具水利和景观功能'
  },

  // ===== 结构模式故事 =====
  {
    id: 'story-007',
    sourceId: 'bridge_006',
    targetId: 'bridge_008',
    mode: 'structure',
    title: '苏堤石拱',
    shortStory: '同为石拱桥，形态各异',
    fullStory: '**东浦桥**与**望山桥**都是石拱桥，采用宋代先进的"薄拱"技术。\n\n东浦桥跨度较小，适合作为渡口；望山桥则视野开阔，可远眺群山。两桥一东一西，体现了古代工匠根据地形和功能需求灵活设计桥梁的智慧。\n\n"因地制宜"是中国传统建筑的精髓，苏堤六桥即是明证。',
    fact: '石拱桥是中国古代桥梁的典型代表',
    culturalContext: '宋代薄拱技术达到高峰'
  }
]

/**
 * 根据连接关系获取故事
 */
export function getConnectionStory(
  sourceId: string,
  targetId: string,
  mode: ConnectionMode
): ConnectionStory | undefined {
  return connectionStories.find(
    story =>
      story.mode === mode &&
      ((story.sourceId === sourceId && story.targetId === targetId) ||
       (story.sourceId === targetId && story.targetId === sourceId))
  )
}

/**
 * 获取指定桥梁的所有相关故事
 */
export function getBridgeStories(bridgeId: string, mode: ConnectionMode): ConnectionStory[] {
  return connectionStories.filter(
    story =>
      story.mode === mode &&
      (story.sourceId === bridgeId || story.targetId === bridgeId)
  )
}
