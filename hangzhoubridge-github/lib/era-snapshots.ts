/**
 * 历史时期快照数据
 * 用于小多重（Small Multiples）展示
 */

export interface EraSnapshot {
  id: string
  era: string
  year: number
  bridgeCount: number
  description: string
  story: string
  thumbnailUrl: string
  bounds: [[number, number], [number, number]]
  center: [number, number]
  color: string
  bridgeIds: string[]
}

/**
 * 四个关键历史时期的桥梁网络快照
 */
export const eraSnapshots: EraSnapshot[] = [
  {
    id: 'tang',
    era: '唐代',
    year: 800,
    bridgeCount: 3,
    description: '三颗明珠',
    story: '**唐代（公元618-907年）**：白居易任杭州刺史，疏浚西湖，筑白堤。**断桥、西泠桥、锦带桥、玉带桥**相继建成，勾勒出杭州城市发展的最初轮廓。',
    thumbnailUrl: '/images/snapshots/tang.png',
    bounds: [[30.23, 120.13], [30.27, 120.17]],
    center: [30.25, 120.15],
    color: '#EAB308',
    bridgeIds: ['bridge_001', 'bridge_002', 'bridge_003', 'bridge_004']
  },
  {
    id: 'song',
    era: '宋代',
    year: 1100,
    bridgeCount: 12,
    description: '苏堤六桥',
    story: '**宋代（公元960-1279年）**：苏东坡元祐四年（1089年）疏浚西湖，筑**苏堤**，建**映波、锁澜、望山、压堤、东浦、跨虹**六桥。宋室南渡定都临安，运河漕运兴盛，**拱宸桥、大关桥**巍然屹立。',
    thumbnailUrl: '/images/snapshots/song.png',
    bounds: [[30.22, 120.12], [30.28, 120.20]],
    center: [30.25, 120.16],
    color: '#2D6A4F',
    bridgeIds: ['bridge_005', 'bridge_006', 'bridge_007', 'bridge_008', 'bridge_009', 'bridge_010', 'bridge_011', 'bridge_012', 'bridge_013']
  },
  {
    id: 'ming-qing',
    era: '明清',
    year: 1600,
    bridgeCount: 18,
    description: '小桥流水',
    story: '**元明清（公元1279-1911年）**：桥梁从城市向乡村扩散。**塘栖广济桥**七孔横跨运河，**忠义桥**承载岳飞部将传说。薄拱技术成熟，桥型多样，形成"**小桥流水人家**"的典型江南风貌。',
    thumbnailUrl: '/images/snapshots/ming-qing.png',
    bounds: [[30.20, 120.10], [30.32, 120.24]],
    center: [30.25, 120.16],
    color: '#DC2626',
    bridgeIds: ['bridge_014', 'bridge_015', 'bridge_018', 'bridge_022', 'bridge_023']
  },
  {
    id: 'modern',
    era: '现代',
    year: 2004,
    bridgeCount: 45,
    description: '钱塘时代',
    story: '**近现代（公元1644年至今）**：1937年，**茅以升**设计的**钱塘江大桥**建成，中国人自建第一座公铁两用桥。**复兴大桥、西兴大桥、彭埠大桥**相继建成，钱塘江时代开启，"**天堑变通途**"。',
    thumbnailUrl: '/images/snapshots/modern.png',
    bounds: [[30.18, 120.08], [30.32, 120.24]],
    center: [30.25, 120.17],
    color: '#2563EB',
    bridgeIds: ['bridge_021', 'bridge_030', 'bridge_031', 'bridge_032', 'bridge_033']
  }
]

/**
 * 根据时期ID获取快照
 */
export function getEraSnapshot(eraId: string): EraSnapshot | undefined {
  return eraSnapshots.find(snap => snap.id === eraId)
}

/**
 * 根据年份获取最近的快照
 */
export function getSnapshotByYear(year: number): EraSnapshot | undefined {
  const sorted = [...eraSnapshots].sort((a, b) => a.year - b.year)
  return sorted.find(snap => year <= snap.year) || sorted[sorted.length - 1]
}
