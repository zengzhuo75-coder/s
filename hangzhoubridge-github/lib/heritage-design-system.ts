/**
 * 中国非遗风格设计系统
 * China Intangible Cultural Heritage Design System
 */

/**
 * 颜色系统 - Color Palette
 */
export const heritageColors = {
  // 主色调 - Primary Palette
  ivory: '#F7F3EA',           // 象牙白
  ricePaper: '#EFE6D2',       // 宣纸米白
  inkBlack: '#1F1A17',        // 墨黑
  darkTea: '#5C4635',         // 深茶棕
  bronzeGold: '#A67C52',      // 青铜金
  vermilion: '#A63D2F',       // 朱砂红（重点色）
  celadon: '#6E8B74',         // 青瓷绿（次要重点色）
  mistGray: '#D9D1C3',        // 雾灰

  // 功能色 - Functional Colors
  text: {
    primary: '#1F1A17',      // 主要文字
    secondary: '#5C4635',    // 次要文字
    tertiary: '#8B7B68',     // 三级文字
    muted: '#A69B8E',        // 柔和文字
  },

  // 背景色 - Background Colors
  bg: {
    primary: '#F7F3EA',      // 主背景（象牙白）
    secondary: '#EFE6D2',    // 次背景（宣纸米白）
    tertiary: '#F2EBE0',     // 三级背景
    card: '#FAF7F2',         // 卡片背景
    elevated: '#FFFFFF',     // 悬浮背景
  },

  // 边框色 - Border Colors
  border: {
    light: 'rgba(166, 124, 82, 0.15)',    // 金边（浅）
    medium: 'rgba(166, 124, 82, 0.25)',    // 金边（中）
    dark: 'rgba(166, 124, 82, 0.35)',     // 金边（深）
    subtle: 'rgba(31, 26, 23, 0.08)',     // 细边框
  },

  // 阴影色 - Shadow Colors
  shadow: {
    sm: '0 1px 3px rgba(31, 26, 23, 0.06)',
    md: '0 2px 8px rgba(31, 26, 23, 0.08)',
    lg: '0 8px 24px rgba(31, 26, 23, 0.10)',
    xl: '0 16px 48px rgba(31, 26, 23, 0.12)',
  },

  // 渐变色 - Gradients
  gradient: {
    // 纸张纹理渐变
    paper: 'linear-gradient(135deg, #F7F3EA 0%, #EFE6D2 100%)',
    // 墨韵渐变
    ink: 'linear-gradient(180deg, rgba(31, 26, 23, 0.03) 0%, rgba(31, 26, 23, 0.08) 100%)',
    // 金色渐变
    gold: 'linear-gradient(135deg, #A67C52 0%, #C9966F 100%)',
    // 朱砂渐变
    vermilion: 'linear-gradient(135deg, #A63D2F 0%, #C9563F 100%)',
    // 青瓷渐变
    celadon: 'linear-gradient(135deg, #6E8B74 0%, #8BA898 100%)',
  },

  // 时期色 - Era Colors
  era: {
    ancient: '#7B2D8E',     // 古韵初现（紫）
    song: '#2D6A4F',        // 两宋鼎盛（墨绿）
    yuanMingQing: '#3D5A80', // 元明清续（蓝灰）
    modern: '#2563EB',       // 现代新篇（蓝）
  },
}

/**
 * 字体系统 - Typography System
 */
export const typography = {
  // 字体族
  fontFamily: {
    serif: "'Noto Serif SC', 'Source Han Serif SC', 'SimSun', serif",
    sansSerif: "'Noto Sans SC', 'Source Han Sans SC', 'Microsoft YaHei', sans-serif",
    mono: "'Courier New', 'SimSun', monospace",
  },

  // 字号 - Font Sizes
  fontSize: {
    // 标题
    hero: 'clamp(2.5rem, 6vw, 4rem)',           // 主标题
    h1: 'clamp(2rem, 4vw, 3rem)',              // 一级标题
    h2: 'clamp(1.5rem, 3vw, 2rem)',            // 二级标题
    h3: 'clamp(1.25rem, 2vw, 1.5rem)',        // 三级标题
    h4: '1.125rem',                             // 四级标题

    // 正文
    body: '1rem',                                // 正文
    small: '0.875rem',                           // 小字
    tiny: '0.75rem',                             // 微小字

    // 数据
    data: '0.875rem',                            // 数据标签
    number: '1.125rem',                           // 数字高亮
  },

  // 字重 - Font Weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // 行高 - Line Heights
  lineHeight: {
    tight: 1.25,
    normal: 1.6,
    relaxed: 1.8,
    loose: 2,
  },

  // 字间距 - Letter Spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.05em',
    wider: '0.1em',
  },
}

/**
 * 间距系统 - Spacing System
 */
export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
  '5xl': '8rem',    // 128px
}

/**
 * 圆角系统 - Border Radius
 */
export const borderRadius = {
  none: '0',
  sm: '0.25rem',     // 4px
  md: '0.5rem',      // 8px
  lg: '0.75rem',     // 12px
  xl: '1rem',        // 16px
  full: '9999px',
}

/**
 * 阴影系统 - Shadow System
 */
export const shadows = {
  paper: '0 1px 3px rgba(31, 26, 23, 0.04), 0 1px 2px rgba(31, 26, 23, 0.02)',
  card: '0 2px 8px rgba(31, 26, 23, 0.06), 0 1px 3px rgba(31, 26, 23, 0.04)',
  elevated: '0 8px 24px rgba(31, 26, 23, 0.08), 0 2px 6px rgba(31, 26, 23, 0.04)',
  floating: '0 16px 48px rgba(31, 26, 23, 0.12), 0 4px 12px rgba(31, 26, 23, 0.06)',
  glow: {
    gold: '0 0 20px rgba(166, 124, 82, 0.3)',
    vermilion: '0 0 20px rgba(166, 61, 47, 0.3)',
  },
}

/**
 * 动画系统 - Animation System
 */
export const animations = {
  // 淡入
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },

  // 上浮淡入
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },

  // 缓慢上浮
  slowFadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },

  // 缩放淡入
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },

  // 墨韵扩散
  inkSpread: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 0.1, scale: 1.2 },
    transition: { duration: 3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 },
  },

  // 悬浮
  float: {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 3, ease: 'easeInOut', repeat: Infinity }
    }
  },

  // 脉冲
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: { duration: 2, ease: 'easeInOut', repeat: Infinity }
    }
  },
}

/**
 * 纹理 - Textures (as React style objects)
 */
export const textures = {
  // 宣纸纹理
  ricePaper: {
    backgroundColor: '#EFE6D2',
    backgroundImage: `
      radial-gradient(ellipse at 20% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(230, 220, 200, 0.03) 0%, transparent 50%),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")
    `.trim()
  },

  // 墨韵纹理
  inkWash: {
    background: 'linear-gradient(180deg, rgba(31, 26, 23, 0.02) 0%, rgba(31, 26, 23, 0.05) 100%)'
  },

  // 金箔纹理
  goldFoil: {
    background: `linear-gradient(135deg,
      rgba(166, 124, 82, 0.1) 0%,
      rgba(201, 150, 111, 0.15) 50%,
      rgba(166, 124, 82, 0.1) 100%)`
  },
}

/**
 * 装饰元素 - Decorative Elements
 */
export const decorations = {
  // 祥印
  seal: {
    border: '2px solid #A63D2F',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '10px',
    fontWeight: 600,
    color: '#A63D2F',
    fontFamily: typography.fontFamily.serif,
  },

  // 细线分隔符
  fineDivider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(166, 124, 82, 0.3), transparent)',
  },

  // 金色分隔符
  goldDivider: {
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #A67C52, transparent)',
  },

  // 书名号
  bookTitleMark: {
    fontSize: '0.875rem',
    color: '#5C4635',
    fontFamily: typography.fontFamily.serif,
    letterSpacing: '0.05em',
  },
}

/**
 * 导出完整设计系统
 */
export const heritageDesignSystem = {
  colors: heritageColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  textures,
  decorations,
}
