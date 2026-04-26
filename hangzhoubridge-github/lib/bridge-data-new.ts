/**
 * 杭州古桥数据 - 新数据结构
 * 支持四种连接模式：时间、河流、功能、结构
 */

export interface BridgeNode {
  id: string
  name: string
  year: number
  type: 'arch' | 'beam' | 'suspension' | 'pontoon' | 'cantilever'
  material: 'stone' | 'wood' | 'steel' | 'mixed' | 'brick'
  function: 'trade' | 'transport' | 'military' | 'ceremonial' | 'irrigation'
  river: string
  location: [number, number] // [lng, lat]
  importance: number // 0.0 - 1.0
  description: string
  dynasty: string
}

// 45座杭州古桥数据
export const bridgeNodes: BridgeNode[] = [
  // 西湖水系 - 古代桥梁
  {
    id: "bridge_001",
    name: "断桥",
    year: 618,
    type: "arch",
    material: "stone",
    function: "transport",
    river: "西湖",
    location: [120.1489, 30.2592],
    importance: 1.0,
    description: "残雪未消时，断桥如银链横卧湖面。白娘子与许仙在此借伞定情，一段千古佳话让此桥成为中国爱情文学的象征性地标。",
    dynasty: "唐"
  },
  {
    id: "bridge_002",
    name: "西泠桥",
    year: 618,
    type: "arch",
    material: "stone",
    function: "transport",
    river: "西湖",
    location: [120.1424, 30.2547],
    importance: 0.85,
    description: "古称西陵桥，连接孤山与北山街。桥头便是百年名社西泠印社，文人墨客往来不绝，诗画印石之美在此交相辉映。",
    dynasty: "唐"
  },
  {
    id: "bridge_003",
    name: "锦带桥",
    year: 822,
    type: "arch",
    material: "stone",
    function: "transport",
    river: "西湖",
    location: [120.1381, 30.2528],
    importance: 0.75,
    description: "白居易疏浚西湖时所建，桥身如锦绣丝带飘于碧波之上。春日桃花映水，秋月如钩垂栏，四时景色皆成画卷。",
    dynasty: "唐"
  },
  {
    id: "bridge_004",
    name: "玉带桥",
    year: 822,
    type: "arch",
    material: "stone",
    function: "transport",
    river: "西湖",
    location: [120.1379, 30.2548],
    importance: 0.75,
    description: "白堤三桥之一，弧形桥孔如玉带环湖。相传乾隆皇帝南巡时曾在此驻足，观湖光山色，赞叹不已。",
    dynasty: "唐"
  },
  {
    id: "bridge_005",
    name: "跨虹桥",
    year: 1089,
    type: "arch",
    material: "stone",
    function: "transport",
    river: "西湖",
    location: [120.1415, 30.2523],
    importance: 0.8,
    description: "苏堤六桥中最长的一座，桥身如长虹卧波。雨后初晴，桥影倒映水中，恍若双虹相接，美不胜收。",
    dynasty: "宋"
  },
  {
    id: "bridge_006",
    name: "东浦桥",
    year: 1089,
    type: "arch",
    material: "stone",
    function: "transport",
    river: "西湖",
    location: [120.1428, 30.2534],
    importance: 0.7,
    description: "苏堤东端门户，旧时为东岸渡口要津。晨曦初照，桥上行人匆匆，桥下游船如织，一派江南水乡繁华景象。",
    dynasty: "宋"
  },
  {
    id: "bridge_007",
    name: "压堤桥",
    year: 1089,
    type: "arch",
    material: "stone",
    function: "irrigation",
    river: "西湖",
    location: [120.1380, 30.2500],
    importance: 0.65,
    description: "苏堤六桥中最为矮小，却担负着重要的水利功能。桥身低矮贴近水面，既能调节湖水，又方便渔民作业，体现古人智慧。",
    dynasty: "宋"
  },
  {
    id: "bridge_008",
    name: "望山桥",
    year: 1089,
    type: "arch",
    material: "stone",
    function: "transport",
    river: "西湖",
    location: [120.1360, 30.2480],
    importance: 0.7,
    description: "立于桥上，西望群山起伏，南眺雷峰塔影。苏东坡曾在此观湖赋诗，留下千古名句。",
    dynasty: "宋"
  },
  {
    id: "bridge_009",
    name: "锁澜桥",
    year: 1089,
    type: "arch",
    material: "stone",
    function: "transport",
    river: "西湖",
    location: [120.1395, 30.2495],
    importance: 0.68,
    description: "桥名取锁住波澜之意，护佑苏堤安然。风起时，桥下波涛汹涌；风止后，湖面如镜，动静之间尽显诗意。",
    dynasty: "宋"
  },
  {
    id: "bridge_010",
    name: "映波桥",
    year: 1089,
    type: "arch",
    material: "stone",
    function: "transport",
    river: "西湖",
    location: [120.1420, 30.2440],
    importance: 0.72,
    description: "苏堤南端第一桥，紧邻南屏晚钟。每当夕阳西下，桥孔中倒映着粼粼波光，如梦似幻。",
    dynasty: "宋"
  },
  {
    id: "bridge_011",
    name: "长桥",
    year: 1174,
    type: "arch",
    material: "stone",
    function: "ceremonial",
    river: "西湖",
    location: [120.1380, 30.2350],
    importance: 0.9,
    description: "梁山伯与祝英台十八相送之地，长桥不长却情意绵长。桥身曲折如蛇行，恋人们在此流连忘返，不愿分别。",
    dynasty: "宋"
  },
  {
    id: "bridge_012",
    name: "西泠印社桥",
    year: 1903,
    type: "arch",
    material: "stone",
    function: "ceremonial",
    river: "西湖",
    location: [120.1410, 30.2550],
    importance: 0.6,
    description: "西泠印社园林内的点睛之笔，连接孤山与印社亭台。百年印魂在此传承，桥上每一步都踏着金石之音。",
    dynasty: "清"
  },

  // 京杭运河水系
  {
    id: "bridge_013",
    name: "拱宸桥",
    year: 1631,
    type: "arch",
    material: "stone",
    function: "trade",
    river: "京杭运河",
    location: [120.1500, 30.3200],
    importance: 1.0,
    description: "杭州最宏伟的古石拱桥，三孔薄墩联拱，横跨运河主航道。拱宸取拱卫宸居之意，是运河到达杭州的终点标志，见证南北漕运千年繁华。",
    dynasty: "明"
  },
  {
    id: "bridge_014",
    name: "大关桥",
    year: 1522,
    type: "arch",
    material: "stone",
    function: "trade",
    river: "京杭运河",
    location: [120.1600, 30.3100],
    importance: 0.75,
    description: "明清杭州北门要塞，桥下设关卡查验过往商船。桥上行人络绎，桥下舟楫如梭，一派商贾云集的盛景。",
    dynasty: "明"
  },
  {
    id: "bridge_015",
    name: "德胜桥",
    year: 1465,
    type: "arch",
    material: "stone",
    function: "trade",
    river: "京杭运河",
    location: [120.1550, 30.3050],
    importance: 0.78,
    description: "明代军事要地，将士凯旋必经此桥，故名德胜。和平年代转为商贸要道，寓意德行胜利，商道昌盛。",
    dynasty: "明"
  },
  {
    id: "bridge_016",
    name: "江涨桥",
    year: 1320,
    type: "arch",
    material: "stone",
    function: "trade",
    river: "京杭运河",
    location: [120.1500, 30.3000],
    importance: 0.7,
    description: "元代古桥，记录钱塘江与运河交汇处的水位变化。桥名江涨，见证潮汐涨落与运河水运的千年兴衰。",
    dynasty: "元"
  },
  {
    id: "bridge_017",
    name: "华光桥",
    year: 1500,
    type: "arch",
    material: "stone",
    function: "trade",
    river: "京杭运河",
    location: [120.1450, 30.2950],
    importance: 0.65,
    description: "明代石拱桥，华光意为光彩照人。桥身精雕细琢，月光下桥孔如明珠串联，照亮运河夜航。",
    dynasty: "明"
  },
  {
    id: "bridge_018",
    name: "广济桥",
    year: 1498,
    type: "arch",
    material: "stone",
    function: "trade",
    river: "京杭运河",
    location: [120.1800, 30.4400],
    importance: 0.95,
    description: "塘栖古镇的标志性建筑，京杭运河上唯一的七孔石拱桥。桥长八十米，气势恢宏，如长龙卧波，被誉为运河第一桥。",
    dynasty: "明"
  },
  {
    id: "bridge_019",
    name: "洋关桥",
    year: 1896,
    type: "arch",
    material: "stone",
    function: "trade",
    river: "京杭运河",
    location: [120.1520, 30.3150],
    importance: 0.6,
    description: "清代杭州开埠后所建，邻近海关旧址。见证西方商品涌入与传统手工业的碰撞，是近代杭州商业转型的实物见证。",
    dynasty: "清"
  },
  {
    id: "bridge_020",
    name: "潮王桥",
    year: 1170,
    type: "arch",
    material: "stone",
    function: "military",
    river: "京杭运河",
    location: [120.1650, 30.2980],
    importance: 0.7,
    description: "纪念忠臣伍子胥的古桥，传说是钱塘江潮神的化身。桥下潮水涨落，仿佛诉说着春秋时期的忠义故事。",
    dynasty: "宋"
  },
  {
    id: "bridge_021",
    name: "北星桥",
    year: 1580,
    type: "arch",
    material: "stone",
    function: "trade",
    river: "京杭运河",
    location: [120.1480, 30.3350],
    importance: 0.68,
    description: "明代运河渡口，桥名取北方星辰之意，为夜航船只指引方向。桥上石狮守护，桥下灯火通明，运河夜归人的温暖港湾。",
    dynasty: "明"
  },
  {
    id: "bridge_022",
    name: "忠义桥",
    year: 1214,
    type: "arch",
    material: "stone",
    function: "ceremonial",
    river: "京杭运河",
    location: [120.1450, 30.3250],
    importance: 0.72,
    description: "南宋单孔石拱桥的杰出代表，桥身轻盈如练。忠义二字铭刻桥头，纪念历代守土卫国的将士，浩气长存。",
    dynasty: "宋"
  },

  // 钱塘江水系
  {
    id: "bridge_023",
    name: "灵隐寺桥",
    year: 326,
    type: "arch",
    material: "stone",
    function: "ceremonial",
    river: "钱塘江",
    location: [120.0960, 30.2410],
    importance: 0.95,
    description: "东晋古桥，杭州现存最古老的桥梁之一。连接灵隐寺山门与天王殿，千年香客踏此桥入寺，每一步都踏着佛国的禅意。",
    dynasty: "东晋"
  },
  {
    id: "bridge_024",
    name: "飞来峰桥",
    year: 980,
    type: "arch",
    material: "stone",
    function: "ceremonial",
    river: "钱塘江",
    location: [120.0980, 30.2430],
    importance: 0.7,
    description: "跨越飞来峰溪涧，与宋元石刻相伴。桥下泉水潺潺，桥上佛像庄严，自然与人文在此完美融合。",
    dynasty: "宋"
  },
  {
    id: "bridge_025",
    name: "三天竺桥",
    year: 1020,
    type: "arch",
    material: "stone",
    function: "ceremonial",
    river: "钱塘江",
    location: [120.1000, 30.2450],
    importance: 0.65,
    description: "通往三天竺寺的必经之路，桥上香火不绝。每年观音诞辰，数万信众踏此桥朝拜，场面蔚为壮观。",
    dynasty: "宋"
  },
  {
    id: "bridge_026",
    name: "虎跑泉桥",
    year: 820,
    type: "beam",
    material: "wood",
    function: "transport",
    river: "钱塘江",
    location: [120.1200, 30.2280],
    importance: 0.6,
    description: "横跨虎跑泉溪流，相传二虎跑地成泉的传说就在此地。桥边古木参天，泉水清冽，品茗听泉，心旷神怡。",
    dynasty: "唐"
  },
  {
    id: "bridge_027",
    name: "九溪桥",
    year: 1080,
    type: "arch",
    material: "stone",
    function: "transport",
    river: "钱塘江",
    location: [120.1150, 30.2200],
    importance: 0.58,
    description: "九溪十八涧的核心景观桥，溪流汇合处。雨后溪水暴涨，桥下浪花飞溅，如九龙戏水，气势磅礴。",
    dynasty: "宋"
  },
  {
    id: "bridge_028",
    name: "龙井桥",
    year: 1050,
    type: "arch",
    material: "stone",
    function: "transport",
    river: "钱塘江",
    location: [120.1080, 30.2300],
    importance: 0.62,
    description: "通往龙井村茶山的要道，桥下便是龙井泉。清明时节，茶农背着新茶踏桥而过，茶香与泉香交织，沁人心脾。",
    dynasty: "宋"
  },
  {
    id: "bridge_029",
    name: "六和塔桥",
    year: 970,
    type: "arch",
    material: "stone",
    function: "ceremonial",
    river: "钱塘江",
    location: [120.1300, 30.2100],
    importance: 0.85,
    description: "六和塔的重要组成部分，塔桥相连，浑然一体。登桥远眺钱塘江潮，观潮胜地自古便是文人墨客流连之所。",
    dynasty: "宋"
  },
  {
    id: "bridge_030",
    name: "钱塘江大桥",
    year: 1937,
    type: "suspension",
    material: "steel",
    function: "transport",
    river: "钱塘江",
    location: [120.1450, 30.2050],
    importance: 1.0,
    description: "茅以升设计建造的中国人自己建造的第一座现代化大桥，打破外国人断言钱塘江上不能建桥的神话。虽曾为抗日而炸毁，却如凤凰涅槃浴火重生，是中国桥梁史上的丰碑。",
    dynasty: "现代"
  },
  {
    id: "bridge_031",
    name: "复兴大桥",
    year: 2004,
    type: "suspension",
    material: "steel",
    function: "transport",
    river: "钱塘江",
    location: [120.1700, 30.2000],
    importance: 0.88,
    description: "二十一世纪杭州的新地标，双层钢桁梁拱桥结构。夜幕降临，桥上灯光璀璨，如彩虹横跨钱塘，展现杭州走向世界的雄心。",
    dynasty: "现代"
  },

  // 老城内河水系
  {
    id: "bridge_032",
    name: "古新桥",
    year: 1368,
    type: "arch",
    material: "stone",
    function: "trade",
    river: "中河",
    location: [120.1700, 30.2500],
    importance: 0.55,
    description: "明代老城区南北要道，连接繁华商业区。桥下河水中舟楫往来，桥上车水马龙，是杭州城市生活百态的缩影。",
    dynasty: "明"
  },
  {
    id: "bridge_033",
    name: "丰乐桥",
    year: 960,
    type: "arch",
    material: "stone",
    function: "trade",
    river: "东河",
    location: [120.1320, 30.2420],
    importance: 0.5,
    description: "北宋时期粮食交易市场的中心地带，桥名寄托丰收快乐之意。每逢秋收，桥上桥下满是载着稻谷的船只，一派丰收景象。",
    dynasty: "宋"
  },
  {
    id: "bridge_034",
    name: "三元桥",
    year: 960,
    type: "arch",
    material: "stone",
    function: "ceremonial",
    river: "西河",
    location: [120.1300, 30.2400],
    importance: 0.52,
    description: "紧邻南宋贡院，桥名取解元、会元、状元三元及第的吉兆。历朝历代，无数读书人踏此桥赴考，祈求金榜题名。",
    dynasty: "宋"
  },
  {
    id: "bridge_035",
    name: "宝善桥",
    year: 1368,
    type: "arch",
    material: "stone",
    function: "trade",
    river: "中河",
    location: [120.1750, 30.2550],
    importance: 0.5,
    description: "明代商贸要道，桥名寓意宝货与善行并重。商人们在此交易货物，也在此积德行善，体现儒商精神。",
    dynasty: "明"
  },
  {
    id: "bridge_036",
    name: "盐桥",
    year: 960,
    type: "beam",
    material: "wood",
    function: "trade",
    river: "东河",
    location: [120.1280, 30.2380],
    importance: 0.48,
    description: "宋代官盐转运的重要通道，桥因盐运而得名。盐船往来不绝，白色盐包在阳光下闪着银光，成为一道独特风景。",
    dynasty: "宋"
  },
  {
    id: "bridge_037",
    name: "横河桥",
    year: 1271,
    type: "arch",
    material: "stone",
    function: "transport",
    river: "横河",
    location: [120.1350, 30.2850],
    importance: 0.45,
    description: "元代古桥，简单朴实的单孔石拱。横跨东西向河流，是城东居民出行的必经之路，见证无数日常悲欢。",
    dynasty: "元"
  },
  {
    id: "bridge_038",
    name: "曲桥",
    year: 960,
    type: "arch",
    material: "stone",
    function: "ceremonial",
    river: "西湖",
    location: [120.1260, 30.2360],
    importance: 0.55,
    description: "西湖园林中的经典曲桥，桥身三折九转。漫步桥上，移步换景，每一步都能看到不同的湖光山色，尽显中国园林造景之美。",
    dynasty: "宋"
  },
  {
    id: "bridge_039",
    name: "烟水桥",
    year: 960,
    type: "arch",
    material: "stone",
    function: "ceremonial",
    river: "西湖",
    location: [120.1240, 30.2340],
    importance: 0.5,
    description: "得名于烟水茫茫的意境，清晨雾气缭绕时，桥身若隐若现，宛如仙境。诗画江南的绝美写照。",
    dynasty: "宋"
  },
  {
    id: "bridge_040",
    name: "秋雪桥",
    year: 960,
    type: "beam",
    material: "wood",
    function: "transport",
    river: "西溪",
    location: [120.1220, 30.2320],
    importance: 0.48,
    description: "西溪湿地的标志性景观，桥下芦苇如海。深秋时节，芦花似雪随风飘扬，踏桥而过如入雪海，意境悠远。",
    dynasty: "宋"
  },
  {
    id: "bridge_041",
    name: "八字桥",
    year: 960,
    type: "arch",
    material: "stone",
    function: "transport",
    river: "西溪",
    location: [120.1200, 30.2300],
    importance: 0.52,
    description: "因桥身如八字而得名，独特造型在中国桥梁史上罕见。不仅实用，更蕴含中国传统文化中八字吉利的寓意。",
    dynasty: "宋"
  },
  {
    id: "bridge_042",
    name: "永福桥",
    year: 960,
    type: "arch",
    material: "stone",
    function: "ceremonial",
    river: "西溪",
    location: [120.1180, 30.2280],
    importance: 0.5,
    description: "宋代古桥，桥名寄托永远幸福的美好祝愿。当地百姓每逢婚嫁喜庆，必踏此桥祈福，祈求美满姻缘。",
    dynasty: "宋"
  },
  {
    id: "bridge_043",
    name: "碧波桥",
    year: 1368,
    type: "arch",
    material: "stone",
    function: "transport",
    river: "西溪",
    location: [120.1200, 30.2700],
    importance: 0.48,
    description: "明代石拱桥，横跨西溪支流。桥下水清见底，碧绿如玉，桥身倒映其中，如水底宫阙，美不胜收。",
    dynasty: "明"
  },
  {
    id: "bridge_044",
    name: "欢喜永宁桥",
    year: 1644,
    type: "arch",
    material: "stone",
    function: "ceremonial",
    river: "西溪",
    location: [120.1300, 30.2800],
    importance: 0.55,
    description: "明末清初的古桥，桥名蕴含欢喜与永宁双重祝福。每逢春节，桥上挂满红灯笼，百姓在此祈福纳祥，热闹非凡。",
    dynasty: "清"
  },
  {
    id: "bridge_045",
    name: "荐福桥",
    year: 1271,
    type: "arch",
    material: "stone",
    function: "ceremonial",
    river: "京杭运河",
    location: [120.1400, 30.2900],
    importance: 0.5,
    description: "元代所建，桥名意为推荐福运。临近运河码头，南来北往的客商在此下船后，踏桥而过祈求一路平安，福星高照。",
    dynasty: "元"
  }
]

// 连接类型
export type ConnectionMode = 'temporal' | 'river' | 'function' | 'structure'

// 连接关系
export interface BridgeConnection {
  source: string
  target: string
  type: ConnectionMode
  strength: number // 0-1, 连接强度
  reason: string // 连接原因
}

// 获取年份颜色（渐变）
export function getYearColor(year: number): string {
  const minYear = 300
  const maxYear = 2004
  const ratio = (year - minYear) / (maxYear - minYear)

  // 从橙红色(古代)到蓝色(现代)的渐变
  const r = Math.round(200 - ratio * 150)
  const g = Math.round(100 + ratio * 100)
  const b = Math.round(50 + ratio * 200)

  return `rgb(${r}, ${g}, ${b})`
}

// 时间模式连接 - 每个桥连接前2个最近的和后1个
export function getTemporalConnections(bridges: BridgeNode[]): BridgeConnection[] {
  const connections: BridgeConnection[] = []
  const sortedByYear = [...bridges].sort((a, b) => a.year - b.year)

  sortedByYear.forEach((bridge, index) => {
    // 前面的桥 - 找最近的2个
    const previous = sortedByYear
      .slice(0, index)
      .sort((a, b) => Math.abs(a.year - bridge.year) - Math.abs(b.year - bridge.year))
      .slice(0, 2)

    previous.forEach(target => {
      const yearDiff = Math.abs(target.year - bridge.year)
      connections.push({
        source: bridge.id,
        target: target.id,
        type: 'temporal',
        strength: Math.max(0.3, 1 - yearDiff / 500),
        reason: `相隔 ${yearDiff} 年`
      })
    })

    // 后面的桥 - 找最近的1个
    const next = sortedByYear
      .slice(index + 1)
      .sort((a, b) => Math.abs(a.year - bridge.year) - Math.abs(b.year - bridge.year))
      .slice(0, 1)

    next.forEach(target => {
      const yearDiff = Math.abs(target.year - bridge.year)
      connections.push({
        source: bridge.id,
        target: target.id,
        type: 'temporal',
        strength: Math.max(0.3, 1 - yearDiff / 500),
        reason: `相隔 ${yearDiff} 年`
      })
    })
  })

  return connections
}

// 河流模式连接 - 同一河流的桥连接最近的3个
export function getRiverConnections(bridges: BridgeNode[]): BridgeConnection[] {
  const connections: BridgeConnection[] = []

  bridges.forEach(bridge => {
    const sameRiver = bridges.filter(b => b.river === bridge.river && b.id !== bridge.id)

    // 计算距离
    const withDistance = sameRiver.map(target => {
      const distance = Math.sqrt(
        Math.pow(bridge.location[0] - target.location[0], 2) +
        Math.pow(bridge.location[1] - target.location[1], 2)
      )
      return { bridge: target, distance }
    })

    // 取最近的3个
    const nearest = withDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)

    nearest.forEach(({ bridge: target, distance }) => {
      connections.push({
        source: bridge.id,
        target: target.id,
        type: 'river',
        strength: Math.max(0.3, 1 - distance / 0.1),
        reason: `同属${bridge.river}，相距${(distance * 100).toFixed(1)}公里`
      })
    })
  })

  return connections
}

// 功能模式连接 - 相同功能的桥互相连接
export function getFunctionConnections(bridges: BridgeNode[]): BridgeConnection[] {
  const connections: BridgeConnection[] = []

  bridges.forEach(bridge => {
    const sameFunction = bridges.filter(b => b.function === bridge.function && b.id !== bridge.id)

    // 计算距离，限制连接数量避免混乱
    const withDistance = sameFunction.map(target => {
      const distance = Math.sqrt(
        Math.pow(bridge.location[0] - target.location[0], 2) +
        Math.pow(bridge.location[1] - target.location[1], 2)
      )
      return { bridge: target, distance }
    })

    // 取最近的2个，避免过度连接
    const nearest = withDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 2)

    nearest.forEach(({ bridge: target, distance }) => {
      connections.push({
        source: bridge.id,
        target: target.id,
        type: 'function',
        strength: Math.max(0.3, 1 - distance / 0.15),
        reason: `同为${bridge.function === 'trade' ? '贸易' : bridge.function === 'transport' ? '交通' : bridge.function === 'military' ? '军事' : bridge.function === 'ceremonial' ? '礼仪' : '水利'}用途`
      })
    })
  })

  return connections
}

// 结构模式连接 - 相同类型的桥连接，使用简洁的几何线条
export function getStructureConnections(bridges: BridgeNode[]): BridgeConnection[] {
  const connections: BridgeConnection[] = []

  bridges.forEach(bridge => {
    const sameType = bridges.filter(b => b.type === bridge.type && b.id !== bridge.id)

    // 只连接较近的同类型桥
    const withDistance = sameType.map(target => {
      const distance = Math.sqrt(
        Math.pow(bridge.location[0] - target.location[0], 2) +
        Math.pow(bridge.location[1] - target.location[1], 2)
      )
      return { bridge: target, distance }
    })

    // 取最近的2个
    const nearest = withDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 2)

    nearest.forEach(({ bridge: target, distance }) => {
      connections.push({
        source: bridge.id,
        target: target.id,
        type: 'structure',
        strength: Math.max(0.3, 1 - distance / 0.12),
        reason: `同为${bridge.type === 'arch' ? '拱桥' : bridge.type === 'beam' ? '梁桥' : bridge.type === 'suspension' ? '悬索桥' : '浮桥'}结构`
      })
    })
  })

  return connections
}

// 根据模式获取连接
export function getConnectionsByMode(bridges: BridgeNode[], mode: ConnectionMode): BridgeConnection[] {
  switch (mode) {
    case 'temporal':
      return getTemporalConnections(bridges)
    case 'river':
      return getRiverConnections(bridges)
    case 'function':
      return getFunctionConnections(bridges)
    case 'structure':
      return getStructureConnections(bridges)
    default:
      return []
  }
}

// 获取桥梁的连接关系
export function getRelatedBridges(bridgeId: string, bridges: BridgeNode[], mode: ConnectionMode): BridgeNode[] {
  const connections = getConnectionsByMode(bridges, mode)
  const relatedIds = connections
    .filter(c => c.source === bridgeId || c.target === bridgeId)
    .map(c => c.source === bridgeId ? c.target : c.source)

  return bridges.filter(b => relatedIds.includes(b.id))
}

// 生成关系说明文字
export function generateRelationshipExplanation(source: BridgeNode, target: BridgeNode, connection: BridgeConnection): string {
  const yearDiff = Math.abs(source.year - target.year)

  let explanation = ''

  switch (connection.type) {
    case 'temporal':
      explanation = `${source.name}（${source.year}年）与${target.name}（${target.year}年）在历史上相隔${yearDiff}年。`
      if (yearDiff < 50) {
        explanation += ' 两桥建造年代相近，反映了同一时期的建筑风格和技术水平。'
      } else if (yearDiff < 200) {
        explanation += ' 两桥跨越了不同的历史时期，体现了建筑技术的演变。'
      } else {
        explanation += ' 两桥见证了杭州跨越朝代的建筑传承与发展。'
      }
      break

    case 'river':
      explanation = `${source.name}与${target.name}同属${source.river}水系。`
      if (source.type === target.type) {
        explanation += ` 两桥均为${source.type === 'arch' ? '拱桥' : '梁桥'}结构，展现了该水系桥梁的统一风格。`
      } else {
        explanation += ` 两桥分别采用${source.type}和${target.type}结构，丰富了水系桥梁的形式多样性。`
      }
      break

    case 'function':
      explanation = `${source.name}与${target.name}都具有${source.function === 'trade' ? '贸易' : source.function === 'transport' ? '交通' : source.function === 'military' ? '军事' : source.function === 'ceremonial' ? '礼仪' : '水利'}功能。`
      explanation += ' 这种功能关联反映了当时杭州城市规划的整体性和系统性。'
      break

    case 'structure':
      explanation = `${source.name}与${target.name}同为${source.type === 'arch' ? '拱桥' : source.type === 'beam' ? '梁桥' : '悬索桥'}。`
      explanation += ' 相同的结构类型表明它们可能采用了相似的建造技术和设计理念。'
      break
  }

  return explanation
}

// 朝代颜色映射（兼容旧数据）
export const dynastyColors = {
  '东晋': '#7b2d8e',
  '唐': '#c82a2a',
  '宋': '#2d6a4f',
  '元': '#d4a547',
  '明': '#3d5a80',
  '清': '#8b4513',
  '现代': '#2563eb'
}

// 朝代顺序
export const dynastyOrder: { [key: string]: number } = {
  '东晋': 0,
  '唐': 1,
  '宋': 2,
  '元': 3,
  '明': 4,
  '清': 5,
  '现代': 6
}
