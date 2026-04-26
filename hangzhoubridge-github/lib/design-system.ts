/**
 * 江南水墨风格 + 现代数据可视化设计系统
 */

// ==================== 颜色系统 ====================

export const colors = {
  // 基础色 - 江南水墨风格
  background: {
    primary: '#F5F0E6',      // 米白色 - 宣纸底色
    secondary: '#E8E4DA',    // 浅灰色 - 淡墨
    tertiary: '#DCD8CF',     // 灰色 - 浓墨
  },

  // 主色 - 桥梁绿
  primary: {
    main: '#2D6A4F',         // 墨绿
    light: '#4A8A9E',        // 浅绿
    lighter: '#6BA8B5',      // 极浅绿
    dark: '#1A4A3E',         // 深绿
  },

  // 强调色 - 朱砂红
  accent: {
    main: '#C82A2A',          // 朱砂红
    light: '#E85D5D',         // 浅红
    dark: '#9B1C1C',          // 深红
  },

  // 水墨色系
  ink: {
    black: '#1A1A2E',         // 墨黑
    gray: '#6B7280',          // 灰墨
    light: '#9CA3AF',         // 浅墨
    white: '#F3F4F6',         // 宣白
  },

  // 年份渐变色
  year: {
    ancient: '#7B2D8E',      // 东晋 - 紫色
    tang: '#C82A2A',          // 唐 - 朱红
    song: '#2D6A4F',          // 宋 - 墨绿
    yuan: '#D4A547',          // 元 - 金黄
    ming: '#3D5A80',          // 明 - 蓝灰
    qing: '#8B4513',          // 清 - 褐色
    modern: '#2563EB',        // 现代 - 蓝色
  },

  // 状态色
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  // 文字色
  text: {
    primary: '#1A1A2E',
    secondary: '#4B5563',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },
}

// ==================== 动画配置 ====================

export const animations = {
  durations: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    slower: 0.8,
    slowest: 1.2,
  },

  // GSAP easing (for GSAP animations)
  gsapEasings: {
    easeOut: 'power2.out',
    easeInOut: 'power2.inOut',
    easeOutBack: 'back.out(1.7)',
    easeOutElastic: 'elastic.out(1, 0.5)',
    easeInOutCubic: 'power2.inOut',
  },

  easings: {
    // 缓动函数 (Framer Motion compatible)
    easeOut: [0.25, 0.1, 0.25, 1],       // Similar to power2.out
    easeInOut: [0.45, 0, 0.55, 1],      // Similar to power2.inOut
    easeOutBack: [0.34, 1.56, 0.64, 1], // Similar to back.out(1.7)
    easeOutElastic: 'easeOut',          // Framer Motion simplified elastic
    easeInOutCubic: [0.65, 0, 0.35, 1], // cubic-bezier equivalent
  },
}

// ==================== 视觉效果配置 ====================

export const visualEffects = {
  // 节点效果
  node: {
    baseScale: 1,
    hoverScale: 1.15,
    selectedScale: 1.3,
    glowSize: 20,
    glowBlur: 10,
  },

  // 连接线效果
  connection: {
    baseOpacity: 0.3,
    selectedOpacity: 0.8,
    strokeWidth: 2,
    particleSize: 3,
    particleSpeed: 2,
    dashLength: 10,
    gapLength: 5,
  },

  // 面板效果
  panel: {
    slideInDuration: 0.4,
    fadeInDelay: 0.1,
    staggerDelay: 0.05,
  },

  // 涟漪效果
  ripple: {
    duration: 0.6,
    maxRadius: 100,
    strokeWidth: 2,
  },

  // 水墨晕染效果
  inkWash: {
    spread: 20,
    opacity: 0.1,
    duration: 0.8,
  },
}

// ==================== 设计 Token ====================

export const designTokens = {
  // 间距
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  // 圆角
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  // 阴影
  shadow: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
  },

  // 水墨晕染阴影
  inkShadow: {
    light: '0 2px 8px rgba(42, 58, 74, 0.08)',
    medium: '0 4px 16px rgba(42, 58, 74, 0.12)',
    heavy: '0 8px 32px rgba(42, 58, 74, 0.16)',
  },
}

// ==================== 字体配置 ====================

export const typography = {
  fontFamily: {
    serif: "'Noto Serif SC', 'Songti SC', 'SimSun', serif",
    sansSerif: "'Inter', system-ui, 'sans-serif'",
    mono: "'Fira Code', 'Consolas', monospace",
  },

  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',       // 48px
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
}

// ==================== Z-index 层级 ====================

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
}

// ==================== 响应式断点 ====================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// ==================== 水墨风格渐变 ====================

export const inkGradients = {
  // 水墨晕染渐变
  wash: {
    light: 'radial-gradient(circle at center, transparent 0%, rgba(42, 58, 74, 0.03) 50%, transparent 70%)',
    medium: 'radial-gradient(circle at center, transparent 0%, rgba(42, 58, 74, 0.08) 40%, transparent 60%)',
    heavy: 'radial-gradient(circle at center, transparent 0%, rgba(42, 58, 74, 0.12) 30%, transparent 50%)',
  },

  // 连接线渐变
  connection: {
    temporal: 'linear-gradient(90deg, #7B2D8E, #C82A2A, #2D6A4F)',
    river: 'linear-gradient(90deg, #4A8A9E, #2D5A6B, #5A8F7E)',
    function: 'linear-gradient(90deg, #C9A961, #8B7355, #3D5A80)',
    structure: 'linear-gradient(90deg, #3D5A80, #2D6A4F, #8B4513)',
  },

  // 背景渐变
  background: {
    paper: 'linear-gradient(180deg, #F5F0E6 0%, #E8E4DA 50%, #DCD8CF 100%)',
    ink: 'linear-gradient(135deg, rgba(42, 58, 74, 0.02) 0%, rgba(42, 58, 74, 0.05) 100%)',
    water: 'linear-gradient(180deg, rgba(74, 138, 158, 0.1) 0%, rgba(45, 90, 107, 0.05) 100%)',
  },

  // 年份渐变
  yearGradient: 'linear-gradient(90deg, #7B2D8E, #C82A2A, #2D6A4F, #D4A547, #3D5A80, #8B4513, #2563EB)',
}

// ==================== 组件样式 Token ====================

export const componentStyles = {
  // 玻璃卡片
  glassCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(74, 138, 158, 0.1)',
    borderRadius: '12px',
    boxShadow: designTokens.shadow.md,
  },

  // 水墨卡片
  inkCard: {
    background: 'rgba(245, 240, 230, 0.9)',
    border: '1px solid rgba(42, 58, 74, 0.08)',
    borderRadius: '12px',
    boxShadow: designTokens.inkShadow.light,
  },

  // 桥梁节点
  bridgeNode: {
    base: {
      borderRadius: '50%',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    hover: {
      transform: 'scale(1.1)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
    },
    selected: {
      boxShadow: '0 0 0 4px rgba(45, 138, 158, 0.3), 0 6px 20px rgba(0, 0, 0, 0.2)',
    },
  },

  // 连接线
  connectionLine: {
    base: {
      strokeLinecap: 'round' as const,
      fill: 'none',
      strokeWidth: 2,
    },
    flowing: {
      strokeDasharray: '10, 5',
      animation: 'flow 2s linear infinite',
    },
  },

  // 面板
  panel: {
    container: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(74, 138, 158, 0.15)',
      borderRadius: '16px',
      boxShadow: designTokens.shadow.xl,
    },
    header: {
      borderBottom: '1px solid rgba(74, 138, 158, 0.1)',
      padding: '16px 20px',
    },
    content: {
      padding: '20px',
    },
  },
}

// ==================== 动画 Keyframes ====================

export const keyframes = {
  // 流动粒子动画
  flow: {
    name: 'flow',
    styles: `
      @keyframes flow {
        0% {
          stroke-dashoffset: 0;
        }
        100% {
          stroke-dashoffset: -30;
        }
      }
    `
  },

  // 脉冲动画
  pulse: {
    name: 'pulse',
    styles: `
      @keyframes pulse {
        0%, 100% {
          opacity: 0.6;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.05);
        }
      }
    `
  },

  // 涟漪扩散
  ripple: {
    name: 'ripple',
    styles: `
      @keyframes ripple {
        0% {
          transform: scale(0);
          opacity: 0.6;
        }
        100% {
          transform: scale(4);
          opacity: 0;
        }
      }
    `
  },

  // 水墨晕染
  inkSpread: {
    name: 'inkSpread',
    styles: `
      @keyframes inkSpread {
        0% {
          transform: scale(0.8);
          opacity: 0.8;
        }
        50% {
          transform: scale(1.1);
          opacity: 0.4;
        }
        100% {
          transform: scale(1);
          opacity: 0.1;
        }
      }
    `
  },

  // 节点出现
  nodeAppear: {
    name: 'nodeAppear',
    styles: `
      @keyframes nodeAppear {
        0% {
          opacity: 0;
          transform: scale(0);
        }
        60% {
          opacity: 1;
          transform: scale(1.1);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `
  },

  // 连线绘制
  lineDraw: {
    name: 'lineDraw',
    styles: `
      @keyframes lineDraw {
        0% {
          stroke-dasharray: 0, 1000;
          stroke-dashoffset: 1000;
        }
        100% {
          stroke-dasharray: 1000, 0;
          stroke-dashoffset: 0;
        }
      }
    `
  },
}

// ==================== CSS 类生成器 ====================

export const generateCSSClasses = () => {
  return `
    /* 江南水墨风格基础样式 */
    .jiangnan-theme {
      background: ${colors.background.primary};
      background-image: ${inkGradients.background.paper};
      font-family: ${typography.fontFamily.serif};
    }

    /* 水墨晕染效果 */
    .ink-wash-light {
      position: relative;
      overflow: hidden;
    }
    .ink-wash-light::after {
      content: '';
      position: absolute;
      inset: 0;
      background: ${inkGradients.wash.light};
      pointer-events: none;
    }

    .ink-wash-medium::after {
      background: ${inkGradients.wash.medium};
    }

    .ink-wash-heavy::after {
      background: ${inkGradients.wash.heavy};
    }

    /* 玻璃卡片 */
    .glass-card {
      ${componentStyles.glassCard}
    }

    /* 水墨卡片 */
    .ink-card {
      ${componentStyles.inkCard}
    }

    /* 桥梁节点 */
    .bridge-node {
      ${componentStyles.bridgeNode.base}
    }
    .bridge-node:hover {
      ${componentStyles.bridgeNode.hover}
    }
    .bridge-node.selected {
      ${componentStyles.bridgeNode.selected}
    }

    /* 连接线 */
    .connection-line {
      ${componentStyles.connectionLine.base}
    }
    .connection-line.flowing {
      ${componentStyles.connectionLine.flowing}
    }

    /* 动画类 */
    .animate-node-appear {
      animation: nodeAppear ${animations.durations.slow} ${animations.easings.easeOutBack} forwards;
    }

    .animate-line-draw {
      animation: lineDraw ${animations.durations.slow} ${animations.easings.easeInOutCubic} forwards;
    }

    .animate-ripple {
      animation: ripple ${visualEffects.ripple.duration} ease-out forwards;
    }

    .animate-pulse-soft {
      animation: pulse ${animations.durations.slow} ease-in-out infinite;
    }

    /* 粒子流动 */
    @keyframes particleFlow {
      0% {
        transform: translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateX(100px);
        opacity: 0;
      }
    }

    .connection-particle {
      animation: particleFlow ${visualEffects.connection.particleSpeed}s linear infinite;
    }

    /* 水墨扩散效果 */
    @keyframes inkDiffusion {
      0% {
        transform: scale(1);
        opacity: 0.8;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }

    .ink-diffusion {
      animation: inkDiffusion ${visualEffects.inkWash.duration} ease-out forwards;
    }

    /* 玻璃态效果 */
    .glass-effect {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* 印章效果 */
    .seal-stamp {
      width: 40px;
      height: 40px;
      border: 3px solid #C82A2A;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: ${typography.fontFamily.serif};
      color: #C82A2A;
      font-weight: bold;
      font-size: 12px;
      box-shadow: 0 2px 8px rgba(200, 42, 42, 0.3);
    }

    /* 水墨纹理 */
    .ink-texture {
      position: relative;
    }
    .ink-texture::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      opacity: 0.5;
      pointer-events: none;
    }
  `
}

// 生成并注入 CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = generateCSSClasses()
  document.head.appendChild(style)
}

export default {
  colors,
  animations,
  visualEffects,
  designTokens,
  typography,
  zIndex,
  breakpoints,
  inkGradients,
  componentStyles,
  keyframes,
}
