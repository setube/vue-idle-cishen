// 技能品质配置
export const SKILL_QUALITIES = {
  common: { name: '普通', color: '#6c757d', icon: '⚪' },
  advanced: { name: '高级', color: '#28a745', icon: '🟢' },
  rare: { name: '稀有', color: '#007bff', icon: '🔵' },
  epic: { name: '史诗', color: '#6f42c1', icon: '🟣' },
  legendary: { name: '传说', color: '#fd7e14', icon: '🟠' },
  mythical: { name: '神话', color: '#55EDC0', icon: '🔴' },
  transcendent: { name: '超越', color: '#dc3545', icon: '🟡' }
}

// 技能数据库
export const skillDatabase = {
  // 普通技能
  skill_001: {
    id: 'skill_001',
    name: '魔球',
    quality: 'common',
    description: '召唤持续1.5秒的魔球，魔球共造成5次伤害，每次造成120%攻击力的伤害',
    cooldown: 5,
    effectType: 'damage',
    damageType: 'magic',
    hitCount: 5,
    hitInterval: 0.3,
    baseEffect: { type: 'attack', value: 1.2 },
    levelMultiplier: 0.1,
    fragments: 2,
    animation: 'magicBall'
  },
  skill_002: {
    id: 'skill_002',
    name: '金币导弹',
    quality: 'common',
    description: '发射9枚金币，每次造成50%攻击力的伤害',
    cooldown: 7,
    effectType: 'damage',
    damageType: 'physical',
    hitCount: 9,
    hitInterval: 0.2,
    baseEffect: { type: 'attack', value: 0.5 },
    levelMultiplier: 0.1,
    fragments: 2,
    animation: 'coinMissile'
  },
  skill_003: {
    id: 'skill_003',
    name: '史莱姆重压',
    quality: 'common',
    description: '掉落大型史莱姆，造成280%攻击力的范围伤害',
    cooldown: 6,
    effectType: 'damage',
    damageType: 'physical',
    hitCount: 1,
    hitInterval: 0,
    baseEffect: { type: 'attack', value: 2.8 },
    levelMultiplier: 0.1,
    fragments: 2,
    animation: 'slimeDrop'
  },
  skill_004: {
    id: 'skill_004',
    name: '愤怒',
    quality: 'advanced',
    description: '友方全体角色提升41.6%攻击速度，持续10秒',
    cooldown: 10,
    effectType: 'buff',
    buffType: 'attackSpeed',
    duration: 10,
    baseEffect: { type: 'attackSpeed', value: 0.416 },
    levelMultiplier: 0.08,
    fragments: 2,
    animation: 'rage'
  },
  skill_005: {
    id: 'skill_005',
    name: '扔炸弹',
    quality: 'advanced',
    description: '投掷5个炸弹，每次造成120%攻击力的伤害',
    cooldown: 5,
    baseEffect: { type: 'attack', value: 0.45 },
    levelMultiplier: 0.5,
    fragments: 2
  },
  skill_006: {
    id: 'skill_006',
    name: '闪电',
    quality: 'advanced',
    description: '用闪电攻击敌人4次，每次造成200%攻击力的伤害',
    cooldown: 6,
    baseEffect: { type: 'attack', value: 0.45 },
    levelMultiplier: 0.15,
    fragments: 2
  },
  skill_007: {
    id: 'skill_007',
    name: '死神',
    quality: 'rare',
    description: '死神出现，造成相当于1100%攻击力的范围伤害',
    cooldown: 11,
    baseEffect: { type: 'attack', value: 2.03 },
    levelMultiplier: 0.25,
    fragments: 2
  },
  skill_008: {
    id: 'skill_008',
    name: '召唤火蜥',
    quality: 'rare',
    description: '召唤火蜥发射火球3次，每次造成260%攻击力的范围伤害',
    cooldown: 10,
    baseEffect: { type: 'attack', value: 2.03 },
    levelMultiplier: 0.5,
    fragments: 2
  },
  skill_009: {
    id: 'skill_009',
    name: '野猪冲撞',
    quality: 'rare',
    description: '召唤1只野猪，每只造成2500%攻击力的伤害',
    cooldown: 12,
    baseEffect: { type: 'attack', value: 2.03 },
    levelMultiplier: 0.5,
    fragments: 2
  },
  skill_010: {
    id: 'skill_010',
    name: '流星雨',
    quality: 'epic',
    description: '随机掉落8颗流星，每次造成700%攻击力的范围伤害',
    cooldown: 9,
    baseEffect: { type: 'attack', value: 911 },
    levelMultiplier: 0.5,
    fragments: 2
  },
  skill_011: {
    id: 'skill_011',
    name: '炸弹蝙蝠',
    quality: 'epic',
    description: '召唤蝙蝠掉落8次炸弹，每次造成650%攻击力的范围伤害',
    cooldown: 10,
    baseEffect: { type: 'attack', value: 911 },
    levelMultiplier: 0.5,
    fragments: 2
  },
  skill_012: {
    id: 'skill_012',
    name: '爆炸青蛙',
    quality: 'epic',
    description: '掉落3只青蛙撞击地面，每次造成2000%攻击力的范围伤害',
    cooldown: 12,
    baseEffect: { type: 'attack', value: 911 },
    levelMultiplier: 0.5,
    fragments: 2
  },
  skill_013: {
    id: 'skill_013',
    name: '烈焰',
    quality: 'legendary',
    description: '引起4次大火，每次造成3000%攻击力的范围伤害',
    cooldown: 12,
    baseEffect: { type: 'attack', value: 4100 },
    levelMultiplier: 0.5,
    fragments: 2
  },
  skill_014: {
    id: 'skill_014',
    name: '恶灵之眼',
    quality: 'legendary',
    description: '召唤恶灵之眼释放12只恶灵，每次造成1540%攻击力的范围伤害',
    cooldown: 14,
    baseEffect: { type: 'attack', value: 4100 },
    levelMultiplier: 0.5,
    fragments: 2
  },
  skill_015: {
    id: 'skill_015',
    name: '妖草曼德拉',
    quality: 'legendary',
    description: '召唤1只曼德拉草，每次对所有敌人造成8500%攻击力的伤害',
    cooldown: 10,
    baseEffect: { type: 'attack', value: 4100 },
    levelMultiplier: 0.5,
    fragments: 2
  },
  skill_016: {
    id: 'skill_016',
    name: '暴风雪',
    quality: 'mythical',
    description: '召唤暴风雪造成10次伤害，每次对所有敌人造成5500%攻击力的伤害',
    cooldown: 11,
    baseEffect: { type: 'attack', value: 18500 },
    levelMultiplier: 0.5,
    fragments: 2
  },
  skill_017: {
    id: 'skill_017',
    name: '镜中小丑',
    quality: 'mythical',
    description: '从魔镜中出现惊爆小丑，对所有敌人造成57000%攻击力的伤害',
    cooldown: 13,
    baseEffect: { type: 'attack', value: 18500 },
    levelMultiplier: 0.5,
    fragments: 2
  },
  skill_018: {
    id: 'skill_018',
    name: '飓风',
    quality: 'mythical',
    description: '召唤飓风造成5次伤害，每次对所有敌人造成12000%攻击力的伤害',
    cooldown: 14,
    baseEffect: { type: 'attack', value: 18500 },
    levelMultiplier: 0.5,
    fragments: 2
  },
  skill_019: {
    id: 'skill_019',
    name: '毁灭圣光',
    quality: 'transcendent',
    description: '召唤毁灭圣光造成4次伤害，每次对所有敌人造成22500%攻击力的伤害',
    cooldown: 15,
    baseEffect: { type: 'attack', value: 83000 },
    levelMultiplier: 0.5,
    fragments: 2
  },
  skill_020: {
    id: 'skill_020',
    name: '熔岩领主',
    quality: 'transcendent',
    description: '唤醒沉睡的熔岩魔，对所有敌人造成100000%攻击力的伤害',
    cooldown: 16,
    baseEffect: { type: 'attack', value: 83000 },
    levelMultiplier: 0.5,
    fragments: 2
  },
  skill_021: {
    id: 'skill_021',
    name: '蘑菇蘑菇',
    quality: 'transcendent',
    description: '召唤1只巨大蘑菇砸向地面，对所有敌人造成170000%攻击力的伤害',
    cooldown: 15,
    baseEffect: { type: 'attack', value: 83000 },
    levelMultiplier: 0.5,
    fragments: 2
  }
}

// 技能召唤概率配置
export const SKILL_SUMMON_RATES = {
  common: 0.45, // 45%
  advanced: 0.3, // 30%
  rare: 0.15, // 15%
  epic: 0.07, // 7%
  legendary: 0.025, // 2.5%
  mythical: 0.004, // 0.4%
  transcendent: 0.001 // 0.1%
}

// 技能升级经验需求
export const SKILL_EXP_REQUIREMENTS = {
  common: level => Math.floor(50 * Math.pow(1.2, level - 1)),
  advanced: level => Math.floor(100 * Math.pow(1.25, level - 1)),
  rare: level => Math.floor(200 * Math.pow(1.3, level - 1)),
  epic: level => Math.floor(500 * Math.pow(1.35, level - 1)),
  legendary: level => Math.floor(1000 * Math.pow(1.4, level - 1)),
  mythical: level => Math.floor(2000 * Math.pow(1.45, level - 1)),
  transcendent: level => Math.floor(5000 * Math.pow(1.5, level - 1))
}
