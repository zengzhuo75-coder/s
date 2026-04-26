/**
 * 杭州古桥多维数据结构
 * 包含历史、水系、地理、美学四个维度
 */

export interface BridgeData {
  id: number
  name: string
  // 历史维度
  dynasty: string
  dynastyOrder: number
  yearRange: [number, number]
  yearBuilt: number
  historicalEvents: string[]
  culturalSignificance: string

  // 水系维度
  river: string
  riverSystem: string
  waterConnection: string[]
  bridgeRole: string

  // 地理维度
  location: {
    lat: number
    lng: number
    district: string
    area: string
  }
  nearbyBridges: number[] // 连接的桥梁ID
  spatialPattern: string

  // 美学维度
  type: string
  materials: string
  structure: string
  aestheticFeatures: string[]
  visualStyle: string

  // 元数据
  image: string
  description: string
  story: string
  dimensions: {
    length: string
    width: string
    height?: string
  }
}

// 水系系统定义
export const riverSystems = {
  westLake: {
    name: '西湖水系',
    color: '#4a8a9e',
    description: '杭州西湖流域',
    order: 1
  },
  grandCanal: {
    name: '京杭运河',
    color: '#c9a961',
    description: '京杭大运河杭州段',
    order: 2
  },
  qiantang: {
    name: '钱塘江水系',
    color: '#2d5a6b',
    description: '钱塘江及支流',
    order: 3
  },
  oldCity: {
    name: '老城内河',
    color: '#8b7355',
    description: '杭州老城区内河水道',
    order: 4
  },
  xixi: {
    name: '西溪湿地',
    color: '#5a8f7e',
    description: '西溪湿地水网',
    order: 5
  }
}

// 朝代颜色映射
export const dynastyColors = {
  '东晋': '#7b2d8e',
  '唐': '#c82a2a',
  '宋': '#2d6a4f',
  '元': '#d4a547',
  '明': '#3d5a80',
  '清': '#8b4513',
  '现代': '#2563eb'
}

export const bridgeData: BridgeData[] = [
  {
    id: 1,
    name: '断桥',
    // 历史维度
    dynasty: '唐',
    dynastyOrder: 1,
    yearRange: [618, 907],
    yearBuilt: 618,
    historicalEvents: [
      '唐代始建',
      '宋代重建',
      '明代修缮',
      '清代多次重修'
    ],
    culturalSignificance: '白蛇传爱情传说发生地，西湖十景之一"断桥残雪"',

    // 水系维度
    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['白堤', '孤山路', '西湖'],
    bridgeRole: '连接白堤与孤山，西湖重要景点',

    // 地理维度
    location: {
      lat: 30.2592,
      lng: 120.1489,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [2, 3, 4],
    spatialPattern: '环西湖布局，位于白堤东端',

    // 美学维度
    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['残雪景观', '拱形优美', '与白堤相映'],
    visualStyle: '古典雅致',

    // 元数据
    image: '/images/bridges/duanqiao.jpg',
    description: '断桥残雪是西湖十景之一，原名段家桥，因白蛇传而闻名',
    story: '相传白蛇传中，白娘子与许仙在断桥相会，被法海和尚钵点破。后人为了纪念这一传说，便将桥称为断桥。每逢冬日雪后，远望此桥，桥身白雪皑皑，仿佛断了一般，故名断桥残雪。',
    dimensions: { length: '8.8m', width: '6.5m' }
  },
  {
    id: 2,
    name: '西泠桥',
    dynasty: '唐',
    dynastyOrder: 1,
    yearRange: [618, 907],
    yearBuilt: 618,
    historicalEvents: [
      '唐代始建',
      '宋代设渡口',
      '清代西泠印社成立'
    ],
    culturalSignificance: '西泠印社文化地标，文人雅集之地',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['西泠印社', '孤山', '西湖'],
    bridgeRole: '连接孤山与北山街',

    location: {
      lat: 30.2547,
      lng: 120.1424,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [1, 3],
    spatialPattern: '孤山西侧，连接孤山与陆地',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['六角石坊', '古木参天', '文化氛围'],
    visualStyle: '文人雅致',

    image: '/images/bridges/xilingqiao.jpg',
    description: '西泠印社入口，承载着深厚的文化底蕴',
    story: '西泠桥历史悠久，始建于唐代。宋元时期，桥边设有西泠渡，为行人提供便利。清代，西泠印社成立，桥因印社而得名。桥虽不大，却承载着杭州西泠的文脉。',
    dimensions: { length: '3.5m', width: '5m' }
  },
  {
    id: 3,
    name: '锦带桥',
    dynasty: '唐',
    dynastyOrder: 1,
    yearRange: [618, 907],
    yearBuilt: 822,
    historicalEvents: [
      '白居易任杭州刺史时建造',
      '宋代重修',
      '明代重建'
    ],
    culturalSignificance: '白堤三桥之一，白居易治水工程的见证',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['白堤', '西湖'],
    bridgeRole: '白堤中段通道',

    location: {
      lat: 30.2528,
      lng: 120.1381,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [1, 4],
    spatialPattern: '白堤中段，与玉带桥遥相呼应',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['桥形如锦带', '柳岸闻莺', '春桃秋桂'],
    visualStyle: '秀丽雅致',

    image: '/images/bridges/jindaiqiao.jpg',
    description: '位于白堤上，因桥形如锦带而得名',
    story: '白居易疏浚西湖后，筑白堤以利交通，建桥以通行。锦带桥因其桥形如锦带般优美而得名，成为白堤三桥中的一座。',
    dimensions: { length: '6m', width: '4.8m' }
  },
  {
    id: 4,
    name: '玉带桥',
    dynasty: '唐',
    dynastyOrder: 1,
    yearRange: [618, 907],
    yearBuilt: 822,
    historicalEvents: [
      '白居易建造',
      '历代重修'
    ],
    culturalSignificance: '白堤三桥之一，寓意如玉带般秀美',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['白堤', '西湖'],
    bridgeRole: '白堤西段通道',

    location: {
      lat: 30.2548,
      lng: 120.1379,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [1, 3],
    spatialPattern: '白堤西段',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['桥形如玉带', '与湖水相映', '古典拱形'],
    visualStyle: '优雅秀美',

    image: '/images/bridges/yudaiqiao.jpg',
    description: '与锦带桥、断桥并称白堤三桥',
    story: '玉带桥与锦带桥相邻，同为白堤三桥。桥名典雅，寄托着对美好景色的赞美。',
    dimensions: { length: '5.5m', width: '4.2m' }
  },
  {
    id: 5,
    name: '跨虹桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 1089,
    historicalEvents: [
      '苏轼疏浚西湖时建造',
      '明代重修',
      '清代重建'
    ],
    culturalSignificance: '苏堤六桥之一，桥身如飞虹横跨湖面',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['苏堤', '西湖'],
    bridgeRole: '苏堤六桥之一',

    location: {
      lat: 30.2523,
      lng: 120.1415,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [6, 7],
    spatialPattern: '苏堤南段',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['桥身如虹', '飞虹卧波', '苏堤春晓'],
    visualStyle: '气势恢宏',

    image: '/images/bridges/kuahongqiao.jpg',
    description: '位于西湖苏堤之上，苏堤六桥之一',
    story: '苏堤春日，垂柳拂水，跨虹桥横卧湖面，如彩虹卧波。晨曦微露，晚霞映桥，为西湖平添几分诗意。',
    dimensions: { length: '18m', width: '5.8m' }
  },
  {
    id: 6,
    name: '东浦桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 1089,
    historicalEvents: [
      '苏轼建造',
      '历代修缮'
    ],
    culturalSignificance: '苏堤六桥之一，东浦意为东岸渡口',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['苏堤', '西湖'],
    bridgeRole: '苏堤东段通道',

    location: {
      lat: 30.2534,
      lng: 120.1428,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [5, 7],
    spatialPattern: '苏堤东段',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['古渡口风貌', '水波荡漾', '鸥鹭飞鸣'],
    visualStyle: '古朴典雅',

    image: '/images/bridges/dongpuqiao.jpg',
    description: '苏堤六桥之一，东浦意为东岸渡口',
    story: '东浦桥横跨西湖东岸，为行人提供渡口。古时此处设有码头，舟楫往来，热闹非凡。',
    dimensions: { length: '12m', width: '4.5m' }
  },
  {
    id: 7,
    name: '压堤桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 1089,
    historicalEvents: [
      '苏轼建造',
      '多次重修'
    ],
    culturalSignificance: '苏堤六桥之一，水利功能突出',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['苏堤', '西湖'],
    bridgeRole: '苏堤中段通道，调节水位',

    location: {
      lat: 30.2500,
      lng: 120.1380,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [5, 6, 8],
    spatialPattern: '苏堤中段',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['坚固实用', '流水潺潺', '绿树成荫'],
    visualStyle: '实用美观',

    image: '/images/bridges/yadiqiao.jpg',
    description: '压堤桥横跨堤岸，桥身坚固，是西湖重要的水利设施',
    story: '压堤桥始建于宋代，因压在堤岸之上而得名。历史上多次重修，至今仍发挥着重要作用。',
    dimensions: { length: '8m', width: '4m' }
  },
  {
    id: 8,
    name: '望山桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 1089,
    historicalEvents: [
      '苏轼建造',
      '文人题咏众多'
    ],
    culturalSignificance: '苏堤六桥之一，可远望群山',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['苏堤', '西湖'],
    bridgeRole: '苏堤西段通道',

    location: {
      lat: 30.2480,
      lng: 120.1360,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [7, 9],
    spatialPattern: '苏堤西段',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['远山如黛', '近水如镜', '诗情画意'],
    visualStyle: '诗意悠远',

    image: '/images/bridges/wangshanqiao.jpg',
    description: '望山桥因可远望群山而得名',
    story: '望山桥始建于宋代，因站在桥上可远望群山而得名。历代文人墨客在此留下许多诗篇。',
    dimensions: { length: '9m', width: '4.2m' }
  },
  {
    id: 9,
    name: '拱宸桥',
    dynasty: '明',
    dynastyOrder: 4,
    yearRange: [1368, 1644],
    yearBuilt: 1631,
    historicalEvents: [
      '明崇祯四年始建',
      '清光绪十一年重建',
      '20世纪多次修缮'
    ],
    culturalSignificance: '杭州最大古桥，京杭运河终点标志',

    river: '京杭运河',
    riverSystem: 'grandCanal',
    waterConnection: ['京杭运河', '湖州街', '拱宸桥街区'],
    bridgeRole: '京杭运河杭州段标志性桥梁',

    location: {
      lat: 30.3200,
      lng: 120.1500,
      district: '拱墅区',
      area: '拱宸桥历史街区'
    },
    nearbyBridges: [10, 11],
    spatialPattern: '运河南端，连接运河两岸',

    type: '拱桥',
    materials: '石拱桥',
    structure: '三孔石拱桥',
    aestheticFeatures: ['三孔联拱', '雄伟壮观', '运河文化象征'],
    visualStyle: '气势磅礴',

    image: '/images/bridges/gongchenqiao.jpg',
    description: '拱宸桥是杭州最著名的古桥之一，横跨京杭运河',
    story: '拱宸桥始建于明崇祯四年，清光绪十一年重建。桥名取自《论语》"拱手北宸"，寓意对皇权的尊敬。桥长98米，是杭州最大的古石拱桥。',
    dimensions: { length: '98m', width: '5.9m' }
  },
  {
    id: 10,
    name: '大关桥',
    dynasty: '明',
    dynastyOrder: 4,
    yearRange: [1368, 1644],
    yearBuilt: 1522,
    historicalEvents: [
      '明代建造',
      '清代重修',
      '现代重建'
    ],
    culturalSignificance: '运河重要关卡，商业繁荣见证',

    river: '京杭运河',
    riverSystem: 'grandCanal',
    waterConnection: ['京杭运河', '大关路'],
    bridgeRole: '运河中段通道',

    location: {
      lat: 30.3100,
      lng: 120.1600,
      district: '拱墅区',
      area: '大关地区'
    },
    nearbyBridges: [9, 11],
    spatialPattern: '运河中段',

    type: '拱桥',
    materials: '石拱桥',
    structure: '三孔石拱桥',
    aestheticFeatures: ['关卡建筑', '商业气息', '历史厚重'],
    visualStyle: '厚重稳健',

    image: '/images/bridges/daguanqiao.jpg',
    description: '大关桥横跨京杭运河，是杭州重要的交通要道',
    story: '大关桥始建于明代，因位于大关而得名。历史上是重要的关卡，见证了杭州的商业繁荣。',
    dimensions: { length: '85m', width: '5.5m' }
  },
  {
    id: 11,
    name: '德胜桥',
    dynasty: '明',
    dynastyOrder: 4,
    yearRange: [1368, 1644],
    yearBuilt: 1465,
    historicalEvents: [
      '明代建造',
      '清代重修',
      '现代扩建'
    ],
    culturalSignificance: '寓意德行胜利，传统美德象征',

    river: '京杭运河',
    riverSystem: 'grandCanal',
    waterConnection: ['京杭运河', '德胜路'],
    bridgeRole: '运河南段通道',

    location: {
      lat: 30.3050,
      lng: 120.1550,
      district: '拱墅区',
      area: '德胜地区'
    },
    nearbyBridges: [9, 10],
    spatialPattern: '运河南段',

    type: '拱桥',
    materials: '石拱桥',
    structure: '三孔石拱桥',
    aestheticFeatures: ['寓意深远', '雄伟壮观', '文化内涵'],
    visualStyle: '庄重大气',

    image: '/images/bridges/deshengqiao.jpg',
    description: '德胜桥横跨京杭运河，桥名寓意德行胜利',
    story: '德胜桥始建于明代，因德行胜利而得名。历史上是重要的交通要道，见证了杭州的繁荣。',
    dimensions: { length: '80m', width: '5.2m' }
  },
  {
    id: 12,
    name: '江涨桥',
    dynasty: '元',
    dynastyOrder: 3,
    yearRange: [1271, 1368],
    yearBuilt: 1320,
    historicalEvents: [
      '元代建造',
      '明清重修'
    ],
    culturalSignificance: '见证运河水位变化，体现古人自然观',

    river: '京杭运河',
    riverSystem: 'grandCanal',
    waterConnection: ['京杭运河', '湖墅路'],
    bridgeRole: '运河中段通道',

    location: {
      lat: 30.3000,
      lng: 120.1500,
      district: '拱墅区',
      area: '湖墅地区'
    },
    nearbyBridges: [9, 13],
    spatialPattern: '运河中段湖墅区',

    type: '拱桥',
    materials: '石拱桥',
    structure: '三孔石拱桥',
    aestheticFeatures: ['古朴典雅', '江水映照', '历史沧桑'],
    visualStyle: '古朴悠远',

    image: '/images/bridges/jiangzhangqiao.jpg',
    description: '江涨桥横跨京杭运河，桥名寓意江水上涨',
    story: '江涨桥始建于元代，因江水上涨而得名。历史上是重要的交通要道，见证了杭州的繁荣。',
    dimensions: { length: '75m', width: '5m' }
  },
  {
    id: 13,
    name: '华光桥',
    dynasty: '明',
    dynastyOrder: 4,
    yearRange: [1368, 1644],
    yearBuilt: 1500,
    historicalEvents: [
      '明代建造',
      '清代重修'
    ],
    culturalSignificance: '寓意光彩照人，体现古人对美的追求',

    river: '京杭运河',
    riverSystem: 'grandCanal',
    waterConnection: ['京杭运河', '和睦路'],
    bridgeRole: '运河支流通道',

    location: {
      lat: 30.2950,
      lng: 120.1450,
      district: '拱墅区',
      area: '和睦地区'
    },
    nearbyBridges: [12, 14],
    spatialPattern: '运河支流',

    type: '拱桥',
    materials: '石拱桥',
    structure: '三孔石拱桥',
    aestheticFeatures: ['华美壮观', '光彩照人', '艺术性强'],
    visualStyle: '华丽精美',

    image: '/images/bridges/huaguangqiao.jpg',
    description: '华光桥横跨京杭运河，桥名寓意光彩照人',
    story: '华光桥始建于明代，因光彩照人而得名。历史上是重要的交通要道，见证了杭州的繁荣。',
    dimensions: { length: '70m', width: '4.8m' }
  },
  {
    id: 14,
    name: '广济桥',
    dynasty: '明',
    dynastyOrder: 4,
    yearRange: [1368, 1644],
    yearBuilt: 1498,
    historicalEvents: [
      '弘治年间建造',
      '清代重修',
      '现代重建'
    ],
    culturalSignificance: '运河古镇塘栖标志性建筑，七孔石拱桥',

    river: '京杭运河',
    riverSystem: 'grandCanal',
    waterConnection: ['京杭运河', '塘栖古镇'],
    bridgeRole: '塘栖古镇主要通道',

    location: {
      lat: 30.4400,
      lng: 120.1800,
      district: '余杭区',
      area: '塘栖古镇'
    },
    nearbyBridges: [13, 15],
    spatialPattern: '塘栖古镇中心运河上',

    type: '拱桥',
    materials: '石拱桥',
    structure: '七孔石拱桥',
    aestheticFeatures: ['七孔连拱', '古镇风貌', '造型优美'],
    visualStyle: '古典优美',

    image: '/images/bridges/guangjiqiao.jpg',
    description: '广济桥是京杭运河上保存最完整的七孔石拱桥',
    story: '广济桥位于塘栖古镇，横跨京杭运河，是运河上保存最完整的七孔石拱桥。桥长78米，造型优美，气势恢宏，是塘栖古镇的标志性建筑。',
    dimensions: { length: '78m', width: '5.2m' }
  },
  {
    id: 15,
    name: '长桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 1174,
    historicalEvents: [
      '南宋建造',
      '明代重修',
      '现代重建'
    ],
    culturalSignificance: '西湖双绝之一，梁祝十八相送传说地',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['西湖', '南山路'],
    bridgeRole: '西湖西南通道',

    location: {
      lat: 30.2350,
      lng: 120.1380,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [1, 16],
    spatialPattern: '西湖西南岸',

    type: '曲桥',
    materials: '石桥',
    structure: '曲桥',
    aestheticFeatures: ['桥身曲折', '湖光山色', '双绝之一'],
    visualStyle: '曲折优美',

    image: '/images/bridges/changqiao.jpg',
    description: '长桥是西湖双绝之一，梁祝十八相送传说发生地',
    story: '长桥位于西湖西南岸，以"长桥不长"闻名。相传梁山伯与祝英台十八相送于此，来回送了十八次，桥虽不长，情谊深长。每当夕阳西下，"雷峰夕照"与长桥相映，构成西湖双绝。',
    dimensions: { length: '50m', width: '3m' }
  },
  {
    id: 16,
    name: '西泠印社桥',
    dynasty: '清',
    dynastyOrder: 5,
    yearRange: [1644, 1911],
    yearBuilt: 1903,
    historicalEvents: [
      '清光绪二十九年建',
      '西泠印社成立时修建',
      '民国时期重修'
    ],
    culturalSignificance: '西泠印社标志性建筑，金石文化象征',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['西泠印社', '孤山'],
    bridgeRole: '连接西泠印社与孤山',

    location: {
      lat: 30.2550,
      lng: 120.1410,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [1, 2],
    spatialPattern: '孤山东侧，西泠印社入口',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['古朴典雅', '文化氛围', '金石艺术'],
    visualStyle: '文人雅致',

    image: '/images/bridges/xilingyinsheqiao.jpg',
    description: '西泠印社桥是西泠印社的重要组成部分',
    story: '西泠印社桥位于孤山西泠印社内，清光绪二十九年西泠印社成立时修建。桥虽不大，却承载着百年金石文化，是文人墨客流连之地。',
    dimensions: { length: '4m', width: '3m' }
  },
  {
    id: 17,
    name: '苏堤六桥-压堤桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 1089,
    historicalEvents: [
      '苏轼疏浚西湖时建',
      '历代重修'
    ],
    culturalSignificance: '苏堤六桥之一，调节湖水水位',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['苏堤', '西湖'],
    bridgeRole: '苏堤中段，水利功能突出',

    location: {
      lat: 30.2480,
      lng: 120.1380,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [5, 8],
    spatialPattern: '苏堤中段',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['坚固实用', '水利工程', '苏堤景观'],
    visualStyle: '实用美观',

    image: '/images/bridges/yadiqiao.jpg',
    description: '压堤桥是苏堤六桥之一',
    story: '压堤桥始建于宋代，苏轼疏浚西湖时建造。桥名"压堤"意为压在堤岸之上，具有调节湖水水位的功能。历代多次重修，至今仍发挥着重要作用。',
    dimensions: { length: '8m', width: '4m' }
  },
  {
    id: 18,
    name: '苏堤六桥-望山桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 1089,
    historicalEvents: [
      '苏轼建造',
      '文人题咏众多'
    ],
    culturalSignificance: '苏堤六桥之一，可远望群山',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['苏堤', '西湖'],
    bridgeRole: '苏堤西段通道',

    location: {
      lat: 30.2460,
      lng: 120.1360,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [8, 17],
    spatialPattern: '苏堤西段',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['远山如黛', '近水如镜', '诗情画意'],
    visualStyle: '诗意悠远',

    image: '/images/bridges/wangshanqiao.jpg',
    description: '望山桥因可远望群山而得名',
    story: '望山桥始建于宋代，因站在桥上可远望群山而得名。历代文人墨客在此留下许多诗篇，是苏堤六桥中最具诗意的一座。',
    dimensions: { length: '9m', width: '4.2m' }
  },
  {
    id: 19,
    name: '苏堤六桥-锁澜桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 1089,
    historicalEvents: [
      '苏轼建造',
      '明代重修'
    ],
    culturalSignificance: '苏堤六桥之一，桥名寓意锁住波澜',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['苏堤', '西湖'],
    bridgeRole: '苏堤中段桥梁',

    location: {
      lat: 30.2495,
      lng: 120.1395,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [5, 17],
    spatialPattern: '苏堤中段',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['桥名寓意深远', '湖水如镜', '宁静致远'],
    visualStyle: '宁静雅致',

    image: '/images/bridges/suolanqiao.jpg',
    description: '锁澜桥是苏堤六桥之一',
    story: '锁澜桥始建于宋代，桥名"锁澜"寓意锁住波澜，让湖面平静如镜。体现了古人对美好湖景的向往和守护。',
    dimensions: { length: '8.5m', width: '4m' }
  },
  {
    id: 20,
    name: '苏堤六桥-映波桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 1089,
    historicalEvents: [
      '苏轼建造',
      '清代重修'
    ],
    culturalSignificance: '苏堤六桥之一，桥名映照波光',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['苏堤', '西湖'],
    bridgeRole: '苏堤南段桥梁',

    location: {
      lat: 30.2440,
      lng: 120.1420,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [5, 6],
    spatialPattern: '苏堤南段',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['波光粼粼', '桥影倒映', '水光潋滟'],
    visualStyle: '灵动优美',

    image: '/images/bridges/yingboqiao.jpg',
    description: '映波桥是苏堤六桥之一',
    story: '映波桥始建于宋代，桥名"映波"意为映照波光。每当晨曦或黄昏，桥影倒映在湖面，与波光相映成趣，景色宜人。',
    dimensions: { length: '10m', width: '4.5m' }
  },
  {
    id: 21,
    name: '苏堤六桥-东浦桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 1089,
    historicalEvents: [
      '苏轼建造',
      '历代修缮'
    ],
    culturalSignificance: '苏堤六桥之一，东浦意为东岸渡口',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['苏堤', '西湖'],
    bridgeRole: '苏堤东段通道',

    location: {
      lat: 30.2510,
      lng: 120.1430,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [5, 20],
    spatialPattern: '苏堤东段',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['古渡口风貌', '水波荡漾', '鸥鹭飞鸣'],
    visualStyle: '古朴典雅',

    image: '/images/bridges/dongpuqiao.jpg',
    description: '东浦桥是苏堤六桥之一',
    story: '东浦桥横跨西湖东岸，为行人提供渡口。古时此处设有码头，舟楫往来，热闹非凡。现在是苏堤东端的重要通道。',
    dimensions: { length: '12m', width: '4.5m' }
  },
  {
    id: 22,
    name: '忠义桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 1214,
    historicalEvents: [
      '南宋嘉定七年建造',
      '明代重修',
      '清代维护'
    ],
    culturalSignificance: '单孔石拱桥代表，体现宋代造桥技术',

    river: '京杭运河',
    riverSystem: 'grandCanal',
    waterConnection: ['京杭运河', '拱墅区'],
    bridgeRole: '运河支流桥梁',

    location: {
      lat: 30.3250,
      lng: 120.1450,
      district: '拱墅区',
      area: '拱墅区'
    },
    nearbyBridges: [9, 10],
    spatialPattern: '运河支流',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['宋代工艺', '造型古朴', '历史厚重'],
    visualStyle: '古朴稳健',

    image: '/images/bridges/zhongyiqiao.jpg',
    description: '忠义桥是保存完好的宋代单孔石拱桥',
    story: '忠义桥始建于南宋嘉定七年，是杭州保存最完好的宋代单孔石拱桥之一。桥身采用宋代特有的并列砌筑法，展现了高超的造桥技术。',
    dimensions: { length: '15m', width: '4m' }
  },
  {
    id: 23,
    name: '洋关桥',
    dynasty: '清',
    dynastyOrder: 5,
    yearRange: [1644, 1911],
    yearBuilt: 1896,
    historicalEvents: [
      '清光绪二十二年建',
      '民国时期重修'
    ],
    culturalSignificance: '杭州开埠历史见证，海关旧址',

    river: '京杭运河',
    riverSystem: 'grandCanal',
    waterConnection: ['京杭运河', '湖州街'],
    bridgeRole: '运河通道，连接海关旧址',

    location: {
      lat: 30.3150,
      lng: 120.1520,
      district: '拱墅区',
      area: '拱宸桥地区'
    },
    nearbyBridges: [9, 11],
    spatialPattern: '拱宸桥北侧',

    type: '拱桥',
    materials: '石拱桥',
    structure: '三孔石拱桥',
    aestheticFeatures: ['近代建筑', '海关特色', '历史见证'],
    visualStyle: '近代风格',

    image: '/images/bridges/yangguanqiao.jpg',
    description: '洋关桥见证了杭州开埠历史',
    story: '洋关桥建于清光绪二十二年，位于杭州海关旧址附近，见证了杭州开埠的历史。桥名"洋关"即指海关，是杭州近代化的重要标志。',
    dimensions: { length: '35m', width: '6m' }
  },
  {
    id: 24,
    name: '潮王桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 1170,
    historicalEvents: [
      '南宋建造',
      '明清重修',
      '现代重建'
    ],
    culturalSignificance: '纪念潮王伍子胥，历史人物纪念桥',

    river: '京杭运河',
    riverSystem: 'grandCanal',
    waterConnection: ['京杭运河', '潮王路'],
    bridgeRole: '运河中段重要通道',

    location: {
      lat: 30.2980,
      lng: 120.1650,
      district: '拱墅区',
      area: '潮王地区'
    },
    nearbyBridges: [10, 12],
    spatialPattern: '运河北段',

    type: '拱桥',
    materials: '石拱桥',
    structure: '三孔石拱桥',
    aestheticFeatures: ['历史人物', '纪念意义', '桥身雄伟'],
    visualStyle: '庄重大气',

    image: '/images/bridges/chaowangqiao.jpg',
    description: '潮王桥为纪念春秋时期伍子胥而建',
    story: '潮王桥始建于南宋，为纪念春秋时期吴国大夫伍子胥而建。伍子胥被尊为"潮王"，此桥因此得名。历史上是运河重要通道。',
    dimensions: { length: '60m', width: '5m' }
  },
  {
    id: 25,
    name: '华光桥',
    dynasty: '明',
    dynastyOrder: 4,
    yearRange: [1368, 1644],
    yearBuilt: 1500,
    historicalEvents: [
      '明代建造',
      '清代重修',
      '现代重建'
    ],
    culturalSignificance: '寓意光彩照人，体现古人对美的追求',

    river: '京杭运河',
    riverSystem: 'grandCanal',
    waterConnection: ['京杭运河', '和睦路'],
    bridgeRole: '运河支流通道',

    location: {
      lat: 30.2950,
      lng: 120.1450,
      district: '拱墅区',
      area: '和睦地区'
    },
    nearbyBridges: [12, 24],
    spatialPattern: '运河支流',

    type: '拱桥',
    materials: '石拱桥',
    structure: '三孔石拱桥',
    aestheticFeatures: ['华美壮观', '光彩照人', '艺术性强'],
    visualStyle: '华丽精美',

    image: '/images/bridges/huaguangqiao.jpg',
    description: '华光桥横跨京杭运河，桥名寓意光彩照人',
    story: '华光桥始建于明代，因光彩照人而得名。历史上是重要的交通要道，见证了杭州的繁荣。',
    dimensions: { length: '70m', width: '4.8m' }
  },
  {
    id: 26,
    name: '德胜桥',
    dynasty: '明',
    dynastyOrder: 4,
    yearRange: [1368, 1644],
    yearBuilt: 1465,
    historicalEvents: [
      '明代建造',
      '清代重修',
      '现代扩建'
    ],
    culturalSignificance: '寓意德行胜利，传统美德象征',

    river: '京杭运河',
    riverSystem: 'grandCanal',
    waterConnection: ['京杭运河', '德胜路'],
    bridgeRole: '运河南段通道',

    location: {
      lat: 30.3050,
      lng: 120.1550,
      district: '拱墅区',
      area: '德胜地区'
    },
    nearbyBridges: [9, 10],
    spatialPattern: '运河南段',

    type: '拱桥',
    materials: '石拱桥',
    structure: '三孔石拱桥',
    aestheticFeatures: ['寓意深远', '雄伟壮观', '文化内涵'],
    visualStyle: '庄重大气',

    image: '/images/bridges/deshengqiao.jpg',
    description: '德胜桥横跨京杭运河，桥名寓意德行胜利',
    story: '德胜桥始建于明代，因德行胜利而得名。历史上是重要的交通要道，见证了杭州的繁荣。',
    dimensions: { length: '80m', width: '5.2m' }
  },
  {
    id: 27,
    name: '大关桥',
    dynasty: '明',
    dynastyOrder: 4,
    yearRange: [1368, 1644],
    yearBuilt: 1522,
    historicalEvents: [
      '明代建造',
      '清代重修',
      '现代重建'
    ],
    culturalSignificance: '运河重要关卡，商业繁荣见证',

    river: '京杭运河',
    riverSystem: 'grandCanal',
    waterConnection: ['京杭运河', '大关路'],
    bridgeRole: '运河中段通道',

    location: {
      lat: 30.3100,
      lng: 120.1600,
      district: '拱墅区',
      area: '大关地区'
    },
    nearbyBridges: [9, 26],
    spatialPattern: '运河中段',

    type: '拱桥',
    materials: '石拱桥',
    structure: '三孔石拱桥',
    aestheticFeatures: ['关卡建筑', '商业气息', '历史厚重'],
    visualStyle: '厚重稳健',

    image: '/images/bridges/daguanqiao.jpg',
    description: '大关桥横跨京杭运河，是杭州重要的交通要道',
    story: '大关桥始建于明代，因位于大关而得名。历史上是重要的关卡，见证了杭州的商业繁荣。',
    dimensions: { length: '85m', width: '5.5m' }
  },
  {
    id: 28,
    name: '北星桥',
    dynasty: '明',
    dynastyOrder: 4,
    yearRange: [1368, 1644],
    yearBuilt: 1580,
    historicalEvents: [
      '明代建造',
      '清代重修',
      '现代重建'
    ],
    culturalSignificance: '运河重要渡口，北星寓意北方星辰',

    river: '京杭运河',
    riverSystem: 'grandCanal',
    waterConnection: ['京杭运河', '湖州街'],
    bridgeRole: '运河北段通道',

    location: {
      lat: 30.3350,
      lng: 120.1480,
      district: '拱墅区',
      area: '湖州街地区'
    },
    nearbyBridges: [9, 23],
    spatialPattern: '运河北段',

    type: '拱桥',
    materials: '石拱桥',
    structure: '三孔石拱桥',
    aestheticFeatures: ['星辰寓意', '桥身雄伟', '北门户'],
    visualStyle: '雄伟壮观',

    image: '/images/bridges/beixingqiao.jpg',
    description: '北星桥寓意北方星辰，是运河重要渡口',
    story: '北星桥始建于明代，桥名"北星"寓意北方星辰，指引方向。历史上是运河重要渡口，连接南北交通。',
    dimensions: { length: '75m', width: '5m' }
  },
  {
    id: 29,
    name: '轻桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 1150,
    historicalEvents: [
      '南宋建造',
      '明代重修'
    ],
    culturalSignificance: '以轻巧著称，宋代桥梁美学代表',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['西湖', '北山街'],
    bridgeRole: '西湖西北通道',

    location: {
      lat: 30.2620,
      lng: 120.1350,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [1, 3],
    spatialPattern: '西湖西北岸',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['造型轻巧', '线条优美', '宋代美学'],
    visualStyle: '轻巧雅致',

    image: '/images/bridges/qingqiao.jpg',
    description: '轻桥以造型轻巧著称',
    story: '轻桥始建于南宋，以造型轻巧、线条优美著称。体现了宋代桥梁建筑的美学追求，是西湖桥梁艺术的代表作品之一。',
    dimensions: { length: '7m', width: '3.5m' }
  },
  {
    id: 30,
    name: '西泠桥',
    dynasty: '唐',
    dynastyOrder: 1,
    yearRange: [618, 907],
    yearBuilt: 618,
    historicalEvents: [
      '唐代始建',
      '宋代设渡口',
      '清代西泠印社成立'
    ],
    culturalSignificance: '西泠印社文化地标，文人雅集之地',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['西泠印社', '孤山', '西湖'],
    bridgeRole: '连接孤山与北山街',

    location: {
      lat: 30.2547,
      lng: 120.1424,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [1, 3],
    spatialPattern: '孤山西侧，连接孤山与陆地',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['六角石坊', '古木参天', '文化氛围'],
    visualStyle: '文人雅致',

    image: '/images/bridges/xilingqiao.jpg',
    description: '西泠印社入口，承载着深厚的文化底蕴',
    story: '西泠桥历史悠久，始建于唐代。宋元时期，桥边设有西泠渡，为行人提供便利。清代，西泠印社成立，桥因印社而得名。桥虽不大，却承载着杭州西泠的文脉。',
    dimensions: { length: '3.5m', width: '5m' }
  },
  {
    id: 31,
    name: '断桥残雪',
    dynasty: '唐',
    dynastyOrder: 1,
    yearRange: [618, 907],
    yearBuilt: 618,
    historicalEvents: [
      '唐代始建',
      '宋代重建',
      '明代修缮',
      '清代多次重修'
    ],
    culturalSignificance: '西湖十景之一，白蛇传爱情传说发生地',

    river: '西湖',
    riverSystem: 'westLake',
    waterConnection: ['白堤', '孤山路', '西湖'],
    bridgeRole: '连接白堤与孤山，西湖重要景点',

    location: {
      lat: 30.2592,
      lng: 120.1489,
      district: '西湖区',
      area: '西湖风景区'
    },
    nearbyBridges: [2, 3, 4],
    spatialPattern: '环西湖布局，位于白堤东端',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['残雪景观', '拱形优美', '与白堤相映'],
    visualStyle: '古典雅致',

    image: '/images/bridges/duanqiao.jpg',
    description: '断桥残雪是西湖十景之一，原名段家桥',
    story: '相传白蛇传中，白娘子与许仙在断桥相会，被法海和尚钵点破。后人为了纪念这一传说，便将桥称为断桥。每逢冬日雪后，远望此桥，桥身白雪皑皑，仿佛断了一般，故名断桥残雪，成为西湖十景之一。',
    dimensions: { length: '8.8m', width: '6.5m' }
  },
  {
    id: 32,
    name: '灵隐寺桥',
    dynasty: '东晋',
    dynastyOrder: 0,
    yearRange: [317, 420],
    yearBuilt: 326,
    historicalEvents: [
      '东晋咸和元年建',
      '历代重修',
      '现代重建'
    ],
    culturalSignificance: '杭州最古老的桥梁之一，灵隐寺重要组成',

    river: '钱塘江',
    riverSystem: 'qiantang',
    waterConnection: ['灵隐溪', '灵隐寺'],
    bridgeRole: '灵隐寺入口通道',

    location: {
      lat: 30.2410,
      lng: 120.0960,
      district: '西湖区',
      area: '灵隐寺景区'
    },
    nearbyBridges: [33, 34],
    spatialPattern: '灵隐寺景区内',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['古朴沧桑', '宗教氛围', '古木参天'],
    visualStyle: '古朴庄严',

    image: '/images/bridges/lingyinsiqiao.jpg',
    description: '灵隐寺桥是杭州最古老的桥梁之一',
    story: '灵隐寺桥始建于东晋咸和元年，与灵隐寺同时建造，是杭州现存最古老的桥梁之一。桥下溪水潺潺，桥畔古木参天，体现了佛教圣地的庄严与宁静。',
    dimensions: { length: '6m', width: '4m' }
  },
  {
    id: 33,
    name: '飞来峰桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 980,
    historicalEvents: [
      '北宋建造',
      '历代重修'
    ],
    culturalSignificance: '飞来峰景区重要桥梁，石刻艺术相伴',

    river: '钱塘江',
    riverSystem: 'qiantang',
    waterConnection: ['灵隐溪', '飞来峰'],
    bridgeRole: '连接飞来峰与灵隐寺',

    location: {
      lat: 30.2430,
      lng: 120.0980,
      district: '西湖区',
      area: '飞来峰景区'
    },
    nearbyBridges: [32, 34],
    spatialPattern: '飞来峰景区内',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['石刻相伴', '山景优美', '泉水清澈'],
    visualStyle: '山野雅趣',

    image: '/images/bridges/feilaiqiao.jpg',
    description: '飞来峰桥位于飞来峰景区',
    story: '飞来峰桥位于飞来峰景区，横跨灵隐溪。桥畔石刻林立，与飞来峰的佛教石刻艺术相得益彰，是连接灵隐寺与飞来峰的重要通道。',
    dimensions: { length: '8m', width: '4.5m' }
  },
  {
    id: 34,
    name: '三天竺桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 1020,
    historicalEvents: [
      '北宋建造',
      '历代重修'
    ],
    culturalSignificance: '三天竺寺重要通道，佛教文化载体',

    river: '钱塘江',
    riverSystem: 'qiantang',
    waterConnection: ['天竺溪', '三天竺寺'],
    bridgeRole: '三天竺寺入口桥梁',

    location: {
      lat: 30.2450,
      lng: 120.1000,
      district: '西湖区',
      area: '天竺景区'
    },
    nearbyBridges: [32, 33],
    spatialPattern: '天竺景区内',

    type: '拱桥',
    materials: '石拱桥',
    structure: '三孔石拱桥',
    aestheticFeatures: ['佛教氛围', '竹林掩映', '清幽宁静'],
    visualStyle: '清幽雅致',

    image: '/images/bridges/santianzhuqiao.jpg',
    description: '三天竺桥连接三天竺寺',
    story: '三天竺桥位于天竺景区，连接三天竺寺。桥畔竹林掩映，溪水清澈，体现了佛教圣地的清幽与宁静。香客往来，络绎不绝。',
    dimensions: { length: '20m', width: '4m' }
  },
  {
    id: 35,
    name: '虎跑泉桥',
    dynasty: '唐',
    dynastyOrder: 1,
    yearRange: [618, 907],
    yearBuilt: 820,
    historicalEvents: [
      '唐代建造',
      '宋代重修',
      '现代重建'
    ],
    culturalSignificance: '虎跑泉传说地，名泉相伴',

    river: '钱塘江',
    riverSystem: 'qiantang',
    waterConnection: ['虎跑溪', '虎跑泉'],
    bridgeRole: '虎跑泉景区通道',

    location: {
      lat: 30.2280,
      lng: 120.1200,
      district: '西湖区',
      area: '虎跑泉景区'
    },
    nearbyBridges: [36, 37],
    spatialPattern: '虎跑泉景区内',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['名泉相伴', '虎跑传说', '山林清幽'],
    visualStyle: '山林雅趣',

    image: '/images/bridges/hupaoqiao.jpg',
    description: '虎跑泉桥位于虎跑泉景区',
    story: '虎跑泉桥位于虎跑泉景区，相传有二虎跑地作穴，泉水涌出，故名虎跑泉。桥横跨虎跑溪，连接泉源与寺院，是虎跑传说的组成部分。',
    dimensions: { length: '5m', width: '3.5m' }
  },
  {
    id: 36,
    name: '九溪桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 1080,
    historicalEvents: [
      '北宋建造',
      '历代重修'
    ],
    culturalSignificance: '九溪十八涧核心景观，自然野趣',

    river: '钱塘江',
    riverSystem: 'qiantang',
    waterConnection: ['九溪', '十八涧'],
    bridgeRole: '九溪十八涧通道',

    location: {
      lat: 30.2200,
      lng: 120.1150,
      district: '西湖区',
      area: '九溪景区'
    },
    nearbyBridges: [35, 37],
    spatialPattern: '九溪十八涧',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['溪水潺潺', '古木参天', '自然野趣'],
    visualStyle: '自然野趣',

    image: '/images/bridges/jiuxiqiao.jpg',
    description: '九溪桥位于九溪十八涧景区',
    story: '九溪桥位于九溪十八涧景区，横跨九溪。两岸古木参天，溪水潺潺，是九溪十八涧的核心景观之一。体现了杭州山水园林的自然之美。',
    dimensions: { length: '6m', width: '3m' }
  },
  {
    id: 37,
    name: '龙井桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 1050,
    historicalEvents: [
      '北宋建造',
      '历代重修'
    ],
    culturalSignificance: '龙井茶文化载体，茶乡古道',

    river: '钱塘江',
    riverSystem: 'qiantang',
    waterConnection: ['龙井溪', '龙井村'],
    bridgeRole: '龙井村通道',

    location: {
      lat: 30.2300,
      lng: 120.1080,
      district: '西湖区',
      area: '龙井景区'
    },
    nearbyBridges: [35, 36],
    spatialPattern: '龙井茶乡',

    type: '拱桥',
    materials: '石拱桥',
    structure: '单孔石拱桥',
    aestheticFeatures: ['茶乡风情', '山泉清澈', '古道蜿蜒'],
    visualStyle: '茶乡雅趣',

    image: '/images/bridges/longjingqiao.jpg',
    description: '龙井桥位于龙井村',
    story: '龙井桥位于龙井村，横跨龙井溪。桥畔茶园青翠，泉水清澈，是龙井茶文化的重要组成部分。古道蜿蜒，连接着茶乡与外界。',
    dimensions: { length: '5.5m', width: '3m' }
  },
  {
    id: 38,
    name: '六和塔桥',
    dynasty: '宋',
    dynastyOrder: 2,
    yearRange: [960, 1279],
    yearBuilt: 970,
    historicalEvents: [
      '北宋建造',
      '历代重修',
      '现代重建'
    ],
    culturalSignificance: '六和塔重要组成，钱塘江胜景',

    river: '钱塘江',
    riverSystem: 'qiantang',
    waterConnection: ['钱塘江', '六和塔'],
    bridgeRole: '连接六和塔与钱塘江',

    location: {
      lat: 30.2100,
      lng: 120.1300,
      district: '西湖区',
      area: '六和塔景区'
    },
    nearbyBridges: [39, 40],
    spatialPattern: '钱塘江畔',

    type: '拱桥',
    materials: '石拱桥',
    structure: '三孔石拱桥',
    aestheticFeatures: ['江景壮阔', '塔桥相映', '气势恢宏'],
    visualStyle: '气势恢宏',

    image: '/images/bridges/liuhetaqiao.jpg',
    description: '六和塔桥连接六和塔与钱塘江',
    story: '六和塔桥位于六和塔前，连接六和塔与钱塘江。桥下江水浩渺，桥畔古塔耸立，构成了杭州城南的壮丽景观。钱塘江潮起潮落，与古塔古桥相映成趣。',
    dimensions: { length: '45m', width: '6m' }
  },
  {
    id: 39,
    name: '钱塘江大桥',
    dynasty: '现代',
    dynastyOrder: 6,
    yearRange: [1934, 1937],
    yearBuilt: 1937,
    historicalEvents: [
      '1934年开工建设',
      '1937年建成通车',
      '抗战时期被炸毁后重建'
    ],
    culturalSignificance: '中国人自己设计建造的第一座现代化大桥',

    river: '钱塘江',
    riverSystem: 'qiantang',
    waterConnection: ['钱塘江', '滨江区'],
    bridgeRole: '连接杭州南北两岸的交通要道',

    location: {
      lat: 30.2050,
      lng: 120.1450,
      district: '上城区',
      area: '钱塘江大桥'
    },
    nearbyBridges: [38, 40],
    spatialPattern: '钱塘江杭州段',

    type: '钢桥',
    materials: '钢筋混凝土桥',
    structure: '双层桁架桥',
    aestheticFeatures: ['双层结构', '工业美学', '历史意义'],
    visualStyle: '现代工业风',

    image: '/images/bridges/qiantangjiangdaqiao.jpg',
    description: '钱塘江大桥是第一座由中国人自己设计建造的现代化大桥',
    story: '钱塘江大桥于1934年开工建设，1937年建成通车，是第一座由中国人自己设计建造的现代化大桥。由著名桥梁专家茅以升主持设计。抗战时期为阻断日军进攻被炸毁，战后重建。大桥见证了中国人民的智慧和抗争精神。',
    dimensions: { length: '1453m', width: '9.1m' }
  },
  {
    id: 40,
    name: '复兴大桥',
    dynasty: '现代',
    dynastyOrder: 6,
    yearRange: [2002, 2004],
    yearBuilt: 2004,
    historicalEvents: [
      '2002年开工建设',
      '2004年建成通车'
    ],
    culturalSignificance: '21世纪杭州新地标，现代桥梁技术代表',

    river: '钱塘江',
    riverSystem: 'qiantang',
    waterConnection: ['钱塘江', '滨江区'],
    bridgeRole: '连接杭州南北两岸的城市主干道',

    location: {
      lat: 30.2000,
      lng: 120.1700,
      district: '上城区',
      area: '复兴大桥'
    },
    nearbyBridges: [38, 39],
    spatialPattern: '钱塘江杭州段',

    type: '悬索桥',
    materials: '钢索桥',
    structure: '双塔悬索桥',
    aestheticFeatures: ['双塔耸立', '现代造型', '夜景灯光'],
    visualStyle: '现代科技',

    image: '/images/bridges/fuxingdaqiao.jpg',
    description: '复兴大桥是21世纪杭州新地标',
    story: '复兴大桥于2004年建成通车，是杭州重要的跨江通道。双塔悬索结构，造型优美，夜晚灯光璀璨，成为钱塘江畔的新地标。代表了21世纪杭州的城市形象和桥梁技术水平。',
    dimensions: { length: '1376m', width: '26m' }
  }
]

// 获取连接关系
export function getBridgeConnections(bridgeId: number): BridgeData[] {
  const bridge = bridgeData.find(b => b.id === bridgeId)
  if (!bridge) return []
  return bridge.nearbyBridges
    .map(id => bridgeData.find(b => b.id === id))
    .filter((b): b is BridgeData => b !== undefined)
}

// 按朝代分组
export function groupByDynasty(): Map<string, BridgeData[]> {
  const groups = new Map<string, BridgeData[]>()
  bridgeData.forEach(bridge => {
    const existing = groups.get(bridge.dynasty) || []
    existing.push(bridge)
    groups.set(bridge.dynasty, existing)
  })
  return groups
}

// 按水系统分组
export function groupByRiverSystem(): Map<string, BridgeData[]> {
  const groups = new Map<string, BridgeData[]>()
  bridgeData.forEach(bridge => {
    const existing = groups.get(bridge.riverSystem) || []
    existing.push(bridge)
    groups.set(bridge.riverSystem, existing)
  })
  return groups
}

// 按类型分组
export function groupByType(): Map<string, BridgeData[]> {
  const groups = new Map<string, BridgeData[]>()
  bridgeData.forEach(bridge => {
    const existing = groups.get(bridge.type) || []
    existing.push(bridge)
    groups.set(bridge.type, existing)
  })
  return groups
}

// 时间线数据
export function getTimelineData(): Array<{ year: number; dynasty: string; bridge: BridgeData }> {
  return bridgeData
    .map(bridge => ({
      year: bridge.yearBuilt,
      dynasty: bridge.dynasty,
      bridge
    }))
    .sort((a, b) => a.year - b.year)
}
