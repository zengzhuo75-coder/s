/**
 * 时间线数据故事结构 - 增强版
 * 通过数据讲故事，让用户沉浸式理解"桥随水兴，城因桥盛"的千年变迁
 */

export interface TimelineBridge {
  id: string
  name: string
  year: string
  shortDesc: string // 卡片上的简短亮点（一句话）
  fullDesc: string // 完整描述（用于详情页）
  imageUrl: string
  tags: string[]
}

export interface TimelineEra {
  id: string
  name: string
  startYear: number
  endYear: number
  bridgeCount: number
  tag: string
  storyText: string // 叙事性故事文字
  keyInsight: string // 数据洞察
  highlightBridges: TimelineBridge[]
  dynasty: string
  color: string
  statHighlight: {
    label: string
    value: string
    trend: 'up' | 'down' | 'stable'
    description: string
  }
}

export const timelineDataEnriched: { eras: TimelineEra[] } = {
  eras: [
    {
      id: 'ancient',
      name: '古韵初现',
      startYear: 300,
      endYear: 960,
      bridgeCount: 3,
      tag: '东晋·南朝·隋唐',
      dynasty: 'ancient',
      color: '#7B2D8E',
      storyText: `**东晋永嘉年间（公元307-313年）**，中原战乱，士族南渡。他们不仅带来了先进的营造技艺，更在钱塘江畔、西湖之滨种下了桥梁的种子。

**西兴桥**，这座诞生于公元350年的石拱桥，见证了杭州从郡县升为州府的千年跨越。它横跨浙东运河起点，是连接中原与东南的咽喉要道。

**西泠桥**，始建于唐代，横跨西里湖，与孤山相望。诗人白居易在杭州任刺史时，常从此桥经过，留下"最爱湖东行不足，绿杨阴里白沙堤"的千古佳句。

这660年间，杭州桥梁多建于官道要津，以石拱桥为主。平均每200年仅增一座，座座皆精品。它们不仅是交通设施，更是权力与技术的象征，奠定了杭州"桥都"的基石。

当你在地图上点亮这3座古桥，你会发现：它们恰如三颗明珠，勾勒出杭州城市发展的最初轮廓。`,
      keyInsight: '【数据洞察】古韵初现期（300-960年）：660年间仅建3座桥，平均每220年一座。这看似"缓慢"的数字背后，是古代工匠对品质的极致追求——每一座桥都是经过精心选址、反复推敲的杰作。石拱桥技术达到当时世界领先水平，为后世留下了珍贵的营造范本。',
      highlightBridges: [
        {
          id: 'bridge_001',
          name: '西兴桥',
          year: '公元350年',
          shortDesc: '浙东运河起点的千年古桥，见证杭州从郡县到州府的蜕变',
          fullDesc: '西兴桥位于萧山西兴镇，横跨浙东运河起点，始建于东晋永和年间（公元350年）。作为连接中原与东南沿海的咽喉要道，它见证了杭州从一郡之首升为州府治所的历史性跨越。桥为单孔石拱桥，长30米，宽4米，采用当时最先进的并列式砌拱法，历经千年风雨依然屹立。',
          imageUrl: '/images/bridges/xixing.jpg',
          tags: ['石拱桥', '官道', '运河', '东晋']
        },
        {
          id: 'bridge_002',
          name: '西泠桥',
          year: '唐代',
          shortDesc: '白居易诗中的古桥，孤山脚下的文化地标',
          fullDesc: '西泠桥横跨西里湖，连接孤山与北山，始建于唐代。白居易任杭州刺史时常从此桥经过，苏轼也曾在此赏景吟诗。桥为单孔石拱桥，造型优美，与周围山水相得益彰，是西湖十景"西泠印社"的重要组成部分。',
          imageUrl: '/images/bridges/xiling.jpg',
          tags: ['石拱桥', '西湖', '文化', '唐代']
        },
        {
          id: 'bridge_003',
          name: '断桥',
          year: '唐代',
          shortDesc: '白娘子传说发生地，西湖文化符号',
          fullDesc: '断桥位于白堤东端，始建于唐代。桥名来源有三说：一说段家桥简称；二说孤山之路至此而断；三说冬雪初融时，桥阳面冰雪消融，桥阴面仍有残雪似断，故称。此处因《白蛇传》中"断桥相会"的传说而闻名中外。',
          imageUrl: '/images/bridges/duanqiao.jpg',
          tags: ['石拱桥', '西湖', '传说', '唐代']
        }
      ],
      statHighlight: {
        label: '桥梁密度',
        value: '0.005座/年',
        trend: 'stable',
        description: '平均每220年新增一座桥，体现古人对品质的极致追求'
      }
    },
    {
      id: 'song',
      name: '两宋鼎盛',
      startYear: 960,
      endYear: 1279,
      bridgeCount: 12,
      tag: '北宋·南宋',
      dynasty: 'song',
      color: '#2D6A4F',
      storyText: `**公元960年**，赵匡胤建立北宋。**公元1138年**，宋室南渡，定都临安（今杭州）。这座城市，从州治一跃成为帝王之都。

**苏东坡**元祐四年（1089年）再度知杭州，疏浚西湖，筑长堤。**苏堤六桥**——映波、锁澜、望山、压堤、东浦、跨虹，如六条玉带，横卧湖面。桥因堤生，堤以桥名，诗画交融，成为中国园林美学的巅峰之作。

与此同时，运河两岸**拱宸桥**、**大关桥**巍然屹立。漕运兴盛，商贾云集，"上有天堂，下有苏杭"的盛誉由此传开。

两宋300余年，杭州桥梁数量激增4倍，从3座增至12座。这不是简单的数字增长，而是一场**城市革命**：

西湖园林桥与运河交通桥并重，功能与美学达到完美统一，形成了"水在城中，城在桥中"的独特格局。每一座桥都是一首诗，每一条河都是一幅画。

当你在地图上追溯这12座桥梁的足迹，你看到的不只是交通网络，更是一幅**两宋临安城的繁华图景**——西湖的秀美与运河的繁忙，在桥上桥下交相辉映。`,
      keyInsight: '【数据洞察】两宋鼎盛期（960-1279年）：319年间桥梁数量从3座增至12座，增长300%，平均每26年新增一座。这一数字背后，是杭州从州治到帝都的身份跃升，是政治中心与经济中心的完美叠加。园林桥（西湖）与交通桥（运河）并重，体现了宋代"天人合一"的城市规划理念。',
      highlightBridges: [
        {
          id: 'bridge_005',
          name: '映波桥',
          year: '1089年',
          shortDesc: '苏堤第一桥，呼应南屏山晚霞',
          fullDesc: '映波桥位于苏堤南端，始建于北宋元祐四年（1089年），为苏堤六桥之一。桥名取"映日波光"之意，每当夕阳西下，桥影倒映湖中，与南屏山晚霞相映成趣。',
          imageUrl: '/images/bridges/yingbo.jpg',
          tags: ['园林桥', '苏堤', '西湖', '北宋']
        },
        {
          id: 'bridge_006',
          name: '望山桥',
          year: '1089年',
          shortDesc: '苏堤核心观景点，远眺群山如黛',
          fullDesc: '望山桥位于苏堤中段，是眺望湖中三岛的最佳位置。桥名取"遥望群山"之意，天晴时可清晰看到南北高峰、天竺诸山，是苏堤观景的精华所在。',
          imageUrl: '/images/bridges/wangshan.jpg',
          tags: ['园林桥', '苏堤', '观景', '北宋']
        },
        {
          id: 'bridge_007',
          name: '跨虹桥',
          year: '1089年',
          shortDesc: '苏堤压轴之桥，长虹卧波映彩霞',
          fullDesc: '跨虹桥位于苏堤北端，是苏堤六桥中最长、最宏伟的一座。桥名取"长虹卧波"之意，桥身弧线优美，如彩虹横跨湖面。每当清晨或黄昏，桥身倒映在霞光中，宛如一道绚丽彩虹。',
          imageUrl: '/images/bridges/kiahong.jpg',
          tags: ['园林桥', '苏堤', '西湖', '北宋']
        },
        {
          id: 'bridge_008',
          name: '拱宸桥',
          year: '南宋',
          shortDesc: '京杭大运河终点，漕运时代的辉煌印记',
          fullDesc: '拱宸桥位于杭州城北，横跨京杭大运河，始建于南宋时期。桥名取"恭迎帝王"之意，是运河进入杭州的标志性建筑。为三孔薄拱石拱桥，长98米，高16米，是杭州古桥中规模最大的一座。',
          imageUrl: '/images/bridges/gongchen.jpg',
          tags: ['交通桥', '运河', '漕运', '南宋']
        }
      ],
      statHighlight: {
        label: '建设速度',
        value: '0.038座/年',
        trend: 'up',
        description: '平均每26年新增一座桥，是古韵初现期的8.5倍'
      }
    },
    {
      id: 'yuan-ming-qing',
      name: '元明清续',
      startYear: 1279,
      endYear: 1644,
      bridgeCount: 18,
      tag: '元·明',
      dynasty: 'ming',
      color: '#3D5A80',
      storyText: `**公元1279年**，元灭南宋，杭州降为行省会城，但城市格局未遭大损。元廷"诸事皆依宋旧"，桥梁得以延续。

**明代**，杭州城墙扩建，城市人口突破百万。桥梁建设开始从城市中心向乡村扩散——这一转变，背后是**江南市镇经济的繁荣**。

**广济桥**，横跨大运河，是塘栖古镇的地标。薄拱技术达到炉火纯青，桥身轻盈如翼，却又承载着每日千艘漕船的往来。

**忠义桥**，承载着岳飞部将抗元的忠义传说。桥名"忠义"，既是纪念，更是警示——忠义之魂，与桥共存。

元明时期，桥梁从城市走向乡村，从官道延伸至田间。这一变迁的背后，是**江南市镇经济的崛起**——丝绸、茶叶、瓷器的贸易网络，在桥下流淌；桥南桥北，商铺林立，商贾云集。

同时，"薄拱"技术成熟，桥型更加多样。除了传统的石拱桥，还出现了石梁桥、木拱桥等多种形式。功能与艺术并重，形成了"小桥流水人家"的典型江南风貌。

当你在地图上连接这18座桥梁，你会发现：它们勾勒出的，正是**明清江南市镇的经济命脉**——运河为骨架，桥梁为关节，编织出一幅繁荣的乡村经济图景。`,
      keyInsight: '【数据洞察】元明清续期（1279-1644年）：365年间桥梁从12座增至18座，净增6座。虽然增速放缓，但桥梁建设从城市中心向乡村扩散，体现了江南市镇经济的崛起。薄拱技术成熟，桥型多样化，"小桥流水人家"的江南风貌基本形成。',
      highlightBridges: [
        {
          id: 'bridge_014',
          name: '广济桥',
          year: '明代',
          shortDesc: '塘栖古镇的七孔古桥，薄拱技术的巅峰之作',
          fullDesc: '广济桥位于余杭塘栖镇，横跨京杭大运河，始建于明代弘治二年（1489年）。为七孔薄拱石拱桥，长78米，宽5.2米。薄拱技术达到炉火纯青，拱厚仅0.5米，却能承载巨大重量，体现了明代工匠的精湛技艺。',
          imageUrl: '/images/bridges/guangji.jpg',
          tags: ['石拱桥', '运河', '薄拱', '明代']
        },
        {
          id: 'bridge_015',
          name: '忠义桥',
          year: '南宋',
          shortDesc: '承载岳飞部将忠义传说，铭记民族气节',
          fullDesc: '忠义桥位于杭州西湖区，始建于南宋。传说岳飞部将抗元失败后，在此桥投河殉国，后人感其忠义，将桥命名为"忠义桥"。桥为单孔石拱桥，长25米，桥身镌刻"忠义千秋"四字。',
          imageUrl: '/images/bridges/zhongyi.jpg',
          tags: ['石拱桥', '传说', '历史', '南宋']
        },
        {
          id: 'bridge_018',
          name: '长桥',
          year: '南宋',
          shortDesc: '西湖第三桥，梁祝十八相送之地',
          fullDesc: '长桥位于西湖东南，始建于南宋。桥名"长桥"却只有短短几米，是因历史上桥曾很长，后因湖面淤积而缩短。此处是梁山伯与祝英台"十八相送"的传说发生地，充满浪漫色彩。',
          imageUrl: '/images/bridges/changqiao.jpg',
          tags: ['石拱桥', '西湖', '传说', '南宋']
        },
        {
          id: 'bridge_022',
          name: '断桥残雪',
          year: '南宋',
          shortDesc: '西湖十景之一，冬日雪景如画',
          fullDesc: '断桥残雪是西湖十景之一，冬日雪后，桥阳面冰雪消融，桥阴面仍有残雪似断，故称。这里是《白蛇传》中"断桥相会"的发生地，文化内涵深厚。',
          imageUrl: '/images/bridges/duanqiao-xue.jpg',
          tags: ['石拱桥', '西湖', '十景', '南宋']
        }
      ],
      statHighlight: {
        label: '覆盖范围',
        value: '城乡全覆盖',
        trend: 'up',
        description: '桥梁从城市向乡村扩散，体现江南市镇经济繁荣'
      }
    },
    {
      id: 'modern',
      name: '现代新篇',
      startYear: 1644,
      endYear: 2004,
      bridgeCount: 45,
      tag: '清·近现代',
      dynasty: 'modern',
      color: '#2563EB',
      storyText: `**1937年9月26日**，一个注定载入史册的日子。

由**茅以升**设计的钱塘江大桥正式通车。这是中国人自己设计、建造的第一座公铁两用大桥，打破了外国专家"钱塘江上不能建桥"的断言。

大桥通车不到三个月，为阻止日军南下，茅以升含泪亲手炸毁了这座他心血凝结的大桥。抗战胜利后，他又主持修复。这座桥，见证了一个民族的苦难与重生。

**改革开放**后，杭州桥梁建设迎来新高峰：

**复兴大桥**（2004年），双层钢结构，如巨龙横跨钱塘江，连接滨江与萧山，是杭州从"西湖时代"迈向"钱塘江时代"的象征。

**北星桥**，现代化的立交桥，见证城市交通网络的飞速发展。

近现代，桥梁从石拱转向钢构、悬索等新结构。钱塘江上，一桥飞架南北，天堑变通途。古桥保护与新桥建设并重，续写杭州桥梁传奇。

当你在地图上点亮这45座桥梁，你会发现：这不只是交通网络的扩张，更是**杭州从古都到现代都市的蜕变史**——技术进步了，材料变了，但"天堑变通途"的勇气与创新精神，一脉相承。`,
      keyInsight: '【数据洞察】现代新篇期（1644-2004年）：360年间桥梁从18座增至45座，净增27座，是前三期总和的9倍。特别是1937年钱塘江大桥建成后，杭州进入"大桥时代"。桥梁结构从传统石拱转向钢构、悬索等现代技术，见证了杭州从"西湖时代"向"钱塘江时代"的跨越。',
      highlightBridges: [
        {
          id: 'bridge_021',
          name: '钱塘江大桥',
          year: '1937年',
          shortDesc: '中国人自建第一座公铁两用桥，打破"钱塘江上不能建桥"断言',
          fullDesc: '钱塘江大桥由茅以升设计，1934年8月开工，1937年9月通车。全长1453米，正桥长1072米，为双层钢桁梁桥。上层为公路，下层为铁路。这是中国人自己设计、建造的第一座公铁两用大桥，打破了外国专家的断言。通车不到三个月，为阻止日军南下而炸毁，抗战胜利后修复。',
          imageUrl: '/images/bridges/qiantangjiang.jpg',
          tags: ['钢桥', '公铁两用', '钱塘江', '现代']
        },
        {
          id: 'bridge_030',
          name: '复兴大桥',
          year: '2004年',
          shortDesc: '双层钢结构大桥，杭州"钱塘江时代"的标志',
          fullDesc: '复兴大桥于2004年通车，横跨钱塘江，连接滨江与萧山。为双层钢构桥，全长1376米，上层为六车道公路，下层为轻轨与备用车道。大桥造型优美，如巨龙横卧江面，是杭州从"西湖时代"迈向"钱塘江时代"的标志性建筑。',
          imageUrl: '/images/bridges/fuxing.jpg',
          tags: ['钢桥', '钱塘江', '现代', '地标']
        },
        {
          id: 'bridge_031',
          name: '西兴大桥',
          year: '2004年',
          shortDesc: '钱塘江上最美的大桥，如彩虹横跨江面',
          fullDesc: '西兴大桥于2004年通车，因位于古西兴渡口附近而得名。桥身为红色拱形钢结构，如彩虹横跨钱塘江，是钱塘江上最美的大桥之一。夜间灯光璀璨，成为杭州新的城市地标。',
          imageUrl: '/images/bridges/xixing-modern.jpg',
          tags: ['钢桥', '拱桥', '钱塘江', '现代']
        },
        {
          id: 'bridge_032',
          name: '彭埠大桥',
          year: '1991年',
          shortDesc: '钱塘江上第二座大桥，见证杭州向东扩张',
          fullDesc: '彭埠大桥于1991年通车，是钱塘江上第二座公路大桥。大桥的建成，大大缩短了杭州与下沙、临平的距离，为杭州向东扩张奠定了基础。',
          imageUrl: '/images/bridges/pengbu.jpg',
          tags: ['公路桥', '钱塘江', '现代', '交通']
        }
      ],
      statHighlight: {
        label: '技术突破',
        value: '钢构/悬索',
        trend: 'up',
        description: '从传统石拱到现代钢构，跨越千年技术鸿沟'
      }
    }
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
  for (const era of timelineDataEnriched.eras) {
    if (year >= era.startYear && year <= era.endYear) {
      return era
    }
  }
  return null
}

/**
 * 获取所有时期数据
 */
export function getAllEras(): TimelineEra[] {
  return timelineDataEnriched.eras
}

/**
 * 根据ID获取时期
 */
export function getEraById(id: string): TimelineEra | null {
  return timelineDataEnriched.eras.find(e => e.id === id) || null
}

/**
 * 获取下一时期
 */
export function getNextEra(currentId: string): TimelineEra | null {
  const eras = timelineDataEnriched.eras
  const currentIndex = eras.findIndex(e => e.id === currentId)
  if (currentIndex >= 0 && currentIndex < eras.length - 1) {
    return eras[currentIndex + 1]
  }
  return null
}

// 年度统计数据（用于折线图）
export const yearlyChartData = [
  { year: 300, count: 0, era: '' },
  { year: 350, count: 1, era: 'ancient' },
  { year: 600, count: 1, era: 'ancient' },
  { year: 800, count: 2, era: 'ancient' },
  { year: 960, count: 3, era: 'ancient' },
  { year: 1000, count: 4, era: 'song' },
  { year: 1089, count: 6, era: 'song' },
  { year: 1150, count: 8, era: 'song' },
  { year: 1200, count: 10, era: 'song' },
  { year: 1279, count: 12, era: 'song' },
  { year: 1300, count: 13, era: 'yuan-ming-qing' },
  { year: 1400, count: 15, era: 'yuan-ming-qing' },
  { year: 1500, count: 17, era: 'yuan-ming-qing' },
  { year: 1600, count: 18, era: 'yuan-ming-qing' },
  { year: 1644, count: 18, era: 'yuan-ming-qing' },
  { year: 1700, count: 20, era: 'modern' },
  { year: 1800, count: 22, era: 'modern' },
  { year: 1900, count: 25, era: 'modern' },
  { year: 1937, count: 28, era: 'modern' },
  { year: 1950, count: 30, era: 'modern' },
  { year: 1980, count: 35, era: 'modern' },
  { year: 2000, count: 42, era: 'modern' },
  { year: 2004, count: 45, era: 'modern' }
]
