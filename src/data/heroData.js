// 角色品质配置
export const HERO_QUALITIES = {
  A: { name: 'A级', color: '#28a745', icon: '🟢' },
  S: { name: 'S级', color: '#007bff', icon: '🔵' },
  SS: { name: 'SS级', color: '#6f42c1', icon: '🟣' },
  SSS: { name: 'SSS级', color: '#fd7e14', icon: '🟠' }
}

// 英雄技能数据库
// 这里存放所有英雄技能的详细定义，包括名称、描述、冷却时间、效果类型等
export const heroSkillDatabase = {
  skill_001: {
    id: 'skill_001',
    name: '冲击波',
    description: '周围有敌方前排角色时，释放冲击波，对周围敌方前排角色每秒造成100%攻击力的伤害',
    cooldown: 0, // 假设是被动或持续效果，无主动冷却
    effectType: 'damage',
    damageType: 'physical',
    baseEffect: { type: 'attack', value: 1.0 }, // 100%攻击力
    animation: 'wave',
    icon: '💥'
  },
  skill_002: {
    id: 'skill_002',
    name: '斯巴达冲锋',
    description: '每隔13秒召唤斯巴达勇士向前冲锋，对敌方前排角色造成3000%攻击力的伤害',
    cooldown: 13,
    effectType: 'damage',
    damageType: 'physical',
    baseEffect: { type: 'attack', value: 30.0 }, // 3000%攻击力
    animation: 'charge',
    icon: '🐎'
  },
  skill_002_1: {
    id: 'skill_002_1',
    name: '强化斯巴达冲锋', // 强化后技能名称可以有区分
    description: '每隔5秒召唤2道闪电，每道闪电对敌方前排角色造成450%攻击力的小范围伤害，伤害间隔0.3秒',
    cooldown: 5,
    effectType: 'damage',
    damageType: 'magic',
    baseEffect: { type: 'attack', value: 4.5, hitCount: 2 }, // 450%攻击力 * 2次伤害
    animation: 'lightning',
    icon: '⚡'
  },
  skill_003: {
    id: 'skill_003',
    name: '法老之眼',
    description: '每隔10秒召唤法老之眼释放光线，对敌方前排角色造成1500%攻击力的伤害，自身回复30%最大生命值',
    cooldown: 10,
    effectType: 'damage',
    damageType: 'magic',
    baseEffect: { type: 'attack', value: 15.0, selfHeal: 0.3 },
    animation: 'laser',
    icon: '👁️'
  },
  skill_003_1: {
    id: 'skill_003_1',
    name: '强化法老之眼',
    description: '每隔10秒召唤法老之眼释放光线，对敌方前排角色造成2250%攻击力的伤害，自身回复30%最大生命值',
    cooldown: 10,
    effectType: 'damage',
    damageType: 'magic',
    baseEffect: { type: 'attack', value: 22.5, selfHeal: 0.3 },
    animation: 'laser',
    icon: '👁️'
  },
  skill_004: {
    id: 'skill_004',
    name: '火炬手',
    description: '每隔9秒召唤火炬手，对敌方前排角色造成1800%攻击力的伤害',
    cooldown: 9,
    effectType: 'damage',
    damageType: 'physical',
    baseEffect: { type: 'attack', value: 18.0 },
    animation: 'fire',
    icon: '🔥'
  },
  skill_004_1: {
    id: 'skill_004_1',
    name: '强化火炬手',
    description: '每隔9秒召唤火炬手，对敌方前排角色造成2700%攻击力的伤害',
    cooldown: 9,
    effectType: 'damage',
    damageType: 'physical',
    baseEffect: { type: 'attack', value: 27.0 },
    animation: 'fire',
    icon: '🔥'
  },
  skill_005: {
    id: 'skill_005',
    name: '召唤闪电',
    description: '每隔5秒召唤2道闪电，每道闪电对敌方前排角色造成300%攻击力的小范围伤害，伤害间隔0.3秒',
    cooldown: 5,
    effectType: 'damage',
    damageType: 'magic',
    baseEffect: { type: 'attack', value: 3.0, hitCount: 2 },
    animation: 'lightning',
    icon: '⚡'
  },
  skill_005_1: {
    id: 'skill_005_1',
    name: '强化召唤闪电',
    description: '每隔5秒召唤2道闪电，每道闪电对敌方前排角色造成450%攻击力的小范围伤害，伤害间隔0.3秒',
    cooldown: 5,
    effectType: 'damage',
    damageType: 'magic',
    baseEffect: { type: 'attack', value: 4.5, hitCount: 2 },
    animation: 'lightning',
    icon: '⚡'
  },
  skill_006: {
    id: 'skill_006',
    name: '毒液溅射',
    description: '每隔8秒召唤泥浆怪，对敌方前排角色造成1500%攻击力的伤害',
    cooldown: 8,
    effectType: 'damage',
    damageType: 'poison',
    baseEffect: { type: 'attack', value: 15.0 },
    animation: 'poison',
    icon: '🧪'
  },
  skill_006_1: {
    id: 'skill_006_1',
    name: '强化毒液溅射',
    description: '每隔8秒召唤泥浆怪，对敌方前排角色造成2250%攻击力的伤害',
    cooldown: 8,
    effectType: 'damage',
    damageType: 'poison',
    baseEffect: { type: 'attack', value: 22.5 },
    animation: 'poison',
    icon: '🧪'
  },
  skill_007: {
    id: 'skill_007',
    name: '菜刀乱舞',
    description: '每隔8秒挥舞菜刀，对敌方前排角色造成1500%攻击力的伤害',
    cooldown: 8,
    effectType: 'damage',
    damageType: 'physical',
    baseEffect: { type: 'attack', value: 15.0 },
    animation: 'slash',
    icon: '🔪'
  },
  skill_007_1: {
    id: 'skill_007_1',
    name: '强化菜刀乱舞',
    description: '每隔8秒挥舞菜刀，对敌方前排角色造成2250%攻击力的伤害',
    cooldown: 8,
    effectType: 'damage',
    damageType: 'physical',
    baseEffect: { type: 'attack', value: 22.5 },
    animation: 'slash',
    icon: '🔪'
  },
  skill_008: {
    id: 'skill_008',
    name: '蛟龙出海',
    description: '每隔9秒召唤蛟龙突袭，对敌方前排角色造成1800%攻击力的伤害',
    cooldown: 9,
    effectType: 'damage',
    damageType: 'physical',
    baseEffect: { type: 'attack', value: 18.0 },
    animation: 'dragon',
    icon: '🐉'
  },
  skill_008_1: {
    id: 'skill_008_1',
    name: '强化蛟龙出海',
    description: '每隔9秒召唤蛟龙突袭，对敌方前排角色造成2700%攻击力的伤害',
    cooldown: 9,
    effectType: 'damage',
    damageType: 'physical',
    baseEffect: { type: 'attack', value: 27.0 },
    animation: 'dragon',
    icon: '🐉'
  },
  skill_009: {
    id: 'skill_009',
    name: '万佛朝宗',
    description: '每隔8秒化身圣佛进行3段神掌攻击，每段攻击对敌方前排角色造成宠物总攻击力100%的伤害，伤害间隔0.5秒，首段攻击伤害命中对敌方全体角色造成0.5秒击飞（击飞效果不会被驱散），第二段攻击伤害命中对敌方前排角色附加"超度"效果。拥有"超度效果的敌方角色被击飞时触发爆炸，移除"超度"效果并对目标造成其5%最大生命值但不超过宠物总攻击力150%的无视护盾伤害',
    cooldown: 8,
    effectType: 'damage',
    damageType: 'holy',
    baseEffect: { type: 'attack', value: 1.0, hitCount: 3 },
    animation: 'divine',
    icon: '🧘'
  },
  skill_012: {
    id: 'skill_012',
    name: '风火轮',
    description: '每隔7秒发射风火轮，对敌方前排角色造成1200%攻击力的伤害。',
    cooldown: 7,
    effectType: 'damage',
    damageType: 'magic',
    baseEffect: { type: 'attack', value: 12.0 },
    animation: 'firewheel',
    icon: '🎡'
  },
  skill_012_1: {
    id: 'skill_012_1',
    name: '强化风火轮',
    description: '每隔7秒发射风火轮，对敌方前排角色造成1800%攻击力的伤害。',
    cooldown: 7,
    effectType: 'damage',
    damageType: 'magic',
    baseEffect: { type: 'attack', value: 18.0 },
    animation: 'firewheel',
    icon: '🎡'
  },
  skill_013: {
    id: 'skill_013',
    name: '混天绫',
    description: '每隔12秒召唤混天绫缠绕敌方前排，使其眩晕3秒。',
    cooldown: 12,
    effectType: 'debuff',
    baseEffect: { type: 'stun', duration: 3 },
    animation: 'bind',
    icon: '🎗️'
  },
  skill_013_1: {
    id: 'skill_013_1',
    name: '强化混天绫',
    description: '每隔12秒召唤混天绫缠绕敌方前排，使其眩晕4秒。',
    cooldown: 12,
    effectType: 'debuff',
    baseEffect: { type: 'stun', duration: 4 },
    animation: 'bind',
    icon: '🎗️'
  },
  skill_013_2: {
    id: 'skill_013_2',
    name: '超级混天绫',
    description: '每隔12秒召唤混天绫缠绕敌方前排，使其眩晕5秒，并造成少量伤害。',
    cooldown: 12,
    effectType: 'debuff_damage',
    baseEffect: { type: 'stun', duration: 5, damage: 0.5 },
    animation: 'bind',
    icon: '🎗️'
  },
  skill_014: {
    id: 'skill_014',
    name: '乾坤圈',
    description: '每次攻击有15%几率投掷乾坤圈，对目标造成额外100%攻击力的伤害。',
    cooldown: 0,
    effectType: 'passive_damage',
    baseEffect: { type: 'chance_attack', chance: 0.15, value: 1.0 },
    animation: 'ring',
    icon: '⭕'
  },
  skill_014_1: {
    id: 'skill_014_1',
    name: '强化乾坤圈',
    description: '每次攻击有20%几率投掷乾坤圈，对目标造成额外150%攻击力的伤害。',
    cooldown: 0,
    effectType: 'passive_damage',
    baseEffect: { type: 'chance_attack', chance: 0.2, value: 1.5 },
    animation: 'ring',
    icon: '⭕'
  },
  skill_014_2: {
    id: 'skill_014_2',
    name: '究极乾坤圈',
    description: '每次攻击有25%几率投掷乾坤圈，对目标造成额外200%攻击力的伤害，并附带击退效果。',
    cooldown: 0,
    effectType: 'passive_damage_cc',
    baseEffect: { type: 'chance_attack', chance: 0.25, value: 2.0, cc: 'knockback' },
    animation: 'ring',
    icon: '⭕'
  },
  skill_015: {
    id: 'skill_015',
    name: '天眼通',
    description: '每隔15秒开启天眼，暴露所有敌人的弱点，使其受到伤害增加10%，持续5秒。',
    cooldown: 15,
    effectType: 'debuff_global',
    baseEffect: { type: 'damage_taken_increase', value: 0.1, duration: 5 },
    animation: 'eye',
    icon: '👁️'
  },
  skill_015_1: {
    id: 'skill_015_1',
    name: '强化天眼通',
    description: '每隔15秒开启天眼，暴露所有敌人的弱点，使其受到伤害增加15%，持续7秒。',
    cooldown: 15,
    effectType: 'debuff_global',
    baseEffect: { type: 'damage_taken_increase', value: 0.15, duration: 7 },
    animation: 'eye',
    icon: '👁️'
  },
  skill_016: {
    id: 'skill_016',
    name: '哮天犬',
    description: '每隔10秒召唤哮天犬协助作战，哮天犬每次攻击造成英雄攻击力50%的伤害。',
    cooldown: 10,
    effectType: 'summon',
    baseEffect: { type: 'minion_attack', value: 0.5, minionId: 'xiaotianquan' },
    animation: 'summon',
    icon: '🐶'
  },
  skill_016_1: {
    id: 'skill_016_1',
    name: '强化哮天犬',
    description: '每隔10秒召唤哮天犬协助作战，哮天犬每次攻击造成英雄攻击力75%的伤害，并有几率附加流血效果。',
    cooldown: 10,
    effectType: 'summon',
    baseEffect: { type: 'minion_attack', value: 0.75, minionId: 'xiaotianquan', dot: 'bleed' },
    animation: 'summon',
    icon: '🐶'
  },
  skill_016_2: {
    id: 'skill_016_2',
    name: '狂暴哮天犬',
    description: '每隔10秒召唤狂暴哮天犬协助作战，狂暴哮天犬每次攻击造成英雄攻击力100%的伤害，且攻击速度提升。',
    cooldown: 10,
    effectType: 'summon',
    baseEffect: { type: 'minion_attack', value: 1.0, minionId: 'xiaotianquan_berserk', attackSpeedBonus: 0.2 },
    animation: 'summon',
    icon: '🐕'
  },
  skill_017: {
    id: 'skill_017',
    name: '三尖两刃刀精通',
    description: '提升三尖两刃刀的伤害，英雄攻击力额外增加20%。',
    cooldown: 0,
    effectType: 'passive_stat',
    baseEffect: { type: 'attack_flat', value: 0.2 },
    animation: 'none',
    icon: '🔱'
  },
  skill_017_1: {
    id: 'skill_017_1',
    name: '强化三尖两刃刀精通',
    description: '提升三尖两刃刀的伤害，英雄攻击力额外增加35%。',
    cooldown: 0,
    effectType: 'passive_stat',
    baseEffect: { type: 'attack_flat', value: 0.35 },
    animation: 'none',
    icon: '🔱'
  },
  skill_017_2: {
    id: 'skill_017_2',
    name: '究极三尖两刃刀精通',
    description: '大幅提升三尖两刃刀的伤害，英雄攻击力额外增加50%，且攻击有几率造成双倍伤害。',
    cooldown: 0,
    effectType: 'passive_stat_chance',
    baseEffect: { type: 'attack_flat', value: 0.5, doubleDamageChance: 0.1 },
    animation: 'none',
    icon: '🔱'
  },
  skill_018: {
    id: 'skill_018',
    name: '七十二变',
    description: '每隔20秒随机变身，获得一项临时增益（攻击、防御、生命）。',
    cooldown: 20,
    effectType: 'buff_random',
    baseEffect: { type: 'random_stat', duration: 10 },
    animation: 'transform',
    icon: '🐵'
  },
  skill_018_1: {
    id: 'skill_018_1',
    name: '强化七十二变',
    description: '每隔20秒随机变身，获得一项临时增益（攻击、防御、生命），增益效果更强。',
    cooldown: 20,
    effectType: 'buff_random',
    baseEffect: { type: 'random_stat', duration: 10, value: 0.15 },
    animation: 'transform',
    icon: '🐵'
  },
  skill_019: {
    id: 'skill_019',
    name: '筋斗云',
    description: '被动：提升英雄移动速度15%。',
    cooldown: 0,
    effectType: 'passive_stat',
    baseEffect: { type: 'moveSpeed', value: 0.15 },
    animation: 'none',
    icon: '☁️'
  },
  skill_019_1: {
    id: 'skill_019_1',
    name: '强化筋斗云',
    description: '被动：提升英雄移动速度25%，且有几率闪避敌方攻击。',
    cooldown: 0,
    effectType: 'passive_stat',
    baseEffect: { type: 'moveSpeed', value: 0.25, dodgeChance: 0.05 },
    animation: 'none',
    icon: '☁️'
  },
  skill_019_2: {
    id: 'skill_019_2',
    name: '究极筋斗云',
    description: '被动：大幅提升英雄移动速度40%，且有较高几率闪避敌方攻击。',
    cooldown: 0,
    effectType: 'passive_stat',
    baseEffect: { type: 'moveSpeed', value: 0.4, dodgeChance: 0.1 },
    animation: 'none',
    icon: '☁️'
  },
  skill_020: {
    id: 'skill_020',
    name: '定海神针',
    description: '每隔15秒召唤定海神针砸向敌人，对大范围敌人造成英雄攻击力200%的伤害并击退。',
    cooldown: 15,
    effectType: 'damage_cc',
    damageType: 'physical',
    baseEffect: { type: 'attack', value: 2.0, cc: 'knockback_area' },
    animation: 'smash',
    icon: '棍'
  },
  skill_020_1: {
    id: 'skill_020_1',
    name: '强化定海神针',
    description: '每隔15秒召唤定海神针砸向敌人，对大范围敌人造成英雄攻击力300%的伤害并击退。',
    cooldown: 15,
    effectType: 'damage_cc',
    damageType: 'physical',
    baseEffect: { type: 'attack', value: 3.0, cc: 'knockback_area' },
    animation: 'smash',
    icon: '棍'
  },
  skill_020_2: {
    id: 'skill_020_2',
    name: '究极定海神针',
    description: '每隔15秒召唤定海神针砸向敌人，对大范围敌人造成英雄攻击力400%的伤害并长时间击退。',
    cooldown: 15,
    effectType: 'damage_cc',
    damageType: 'physical',
    baseEffect: { type: 'attack', value: 4.0, cc: 'knockback_area', duration: 2 },
    animation: 'smash',
    icon: '棍'
  },
  skill_021: {
    id: 'skill_021',
    name: '龙胆',
    description: '被动：生命值低于50%时，防御力提升20%。',
    cooldown: 0,
    effectType: 'passive_buff',
    baseEffect: { type: 'defense_conditional', value: 0.2, condition: 'lowHealth' },
    animation: 'none',
    icon: '❤️‍🩹'
  },
  skill_021_1: {
    id: 'skill_021_1',
    name: '强化龙胆',
    description: '被动：生命值低于60%时，防御力提升35%。',
    cooldown: 0,
    effectType: 'passive_buff',
    baseEffect: { type: 'defense_conditional', value: 0.35, condition: 'lowHealth', threshold: 0.6 },
    animation: 'none',
    icon: '❤️‍🩹'
  },
  skill_022: {
    id: 'skill_022',
    name: '七进七出',
    description: '每隔8秒冲锋，对路径上的敌人造成英雄攻击力150%的伤害，并短暂提升自身攻击速度。',
    cooldown: 8,
    effectType: 'damage_buff_self',
    damageType: 'physical',
    baseEffect: { type: 'attack', value: 1.5, selfBuff: { type: 'attackSpeed', value: 0.2, duration: 3 } },
    animation: 'dash',
    icon: '💨'
  },
  skill_022_1: {
    id: 'skill_022_1',
    name: '强化七进七出',
    description: '每隔8秒冲锋，对路径上的敌人造成英雄攻击力225%的伤害，并提升自身攻击速度。',
    cooldown: 8,
    effectType: 'damage_buff_self',
    damageType: 'physical',
    baseEffect: { type: 'attack', value: 2.25, selfBuff: { type: 'attackSpeed', value: 0.3, duration: 4 } },
    animation: 'dash',
    icon: '💨'
  },
  skill_022_2: {
    id: 'skill_022_2',
    name: '究极七进七出',
    description: '每隔8秒冲锋，对路径上的敌人造成英雄攻击力300%的伤害，并大幅提升自身攻击速度和暴击率。',
    cooldown: 8,
    effectType: 'damage_buff_self',
    damageType: 'physical',
    baseEffect: { type: 'attack', value: 3.0, selfBuff: { type: 'attackSpeed', value: 0.4, critRate: 0.1, duration: 5 } },
    animation: 'dash',
    icon: '💨'
  },
  skill_023: {
    id: 'skill_023',
    name: '酣战',
    description: '敌方角色每次受到异常状态（冰冻/眩晕/致盲/沉默）时，自身增加一层7.5%最大生命值的护盾。',
    cooldown: 0,
    effectType: 'passive_buff',
    baseEffect: { type: 'shield_on_cc', value: 0.075 },
    animation: 'shield',
    icon: '🛡️'
  },
  skill_023_1: {
    id: 'skill_023_1',
    name: '酣战',
    description: '敌方角色每次受到异常状态（冰冻/眩晕/致盲/沉默）时，自身增加一层7.5%最大生命值的护盾。如果是自身造成异常状态（冰冻/眩晕/致盲/沉默），额外增加一层7.5%最大生命值的护盾。该护盾无层数限制且持续时间无限',
    cooldown: 0,
    effectType: 'passive_buff',
    baseEffect: { type: 'shield_on_cc', value: 0.075, bonus: 0.075 },
    animation: 'shield',
    icon: '🛡️'
  },
  skill_023_2: {
    id: 'skill_023_2',
    name: '强化酣战',
    description: '敌方角色每次受到异常状态（冰冻/眩晕/致盲/沉默）时，自身增加一层10%最大生命值的护盾。如果是自身造成异常状态冰冻/眩晕/致盲/沉默），额外增加一层10%最大生命值的护盾。该护盾无层数限制且持续时间无限',
    cooldown: 0,
    effectType: 'passive_buff',
    baseEffect: { type: 'shield_on_cc', value: 0.1, bonus: 0.1 },
    animation: 'shield',
    icon: '🛡️'
  },
  skill_024: {
    id: 'skill_024',
    name: '万人敌',
    description: '“咆哮"伤害命中后，降低敌方全体角色10%眩晕抵抗，持续5秒。自身每层护盾碎裂后，自身提升10%格挡，持续3秒，该格挡效果无层数上限。',
    cooldown: 0,
    effectType: 'passive_debuff_buff',
    baseEffect: { type: 'stunResist_debuff', value: 0.1, duration: 5, selfBuff: { type: 'block', value: 0.1, duration: 3 } },
    animation: 'debuff',
    icon: '⬇️'
  },
  skill_024_1: {
    id: 'skill_024_1',
    name: '万人敌',
    description: '“咆哮"伤害命中后，降低敌方全体角色20%眩晕抵抗，持续5秒。自身每层护盾碎裂后，自身提升15%格挡，持续3秒，该格挡效果无层数上限。',
    cooldown: 0,
    effectType: 'passive_debuff_buff',
    baseEffect: { type: 'stunResist_debuff', value: 0.2, duration: 5, selfBuff: { type: 'block', value: 0.15, duration: 3 } },
    animation: 'debuff',
    icon: '⬇️'
  },
  skill_024_2: {
    id: 'skill_024_2',
    name: '万人敌',
    description: '“咆哮"伤害命中后，降低敌方全体角色30%眩晕抵抗，持续5秒。自身每层护盾碎裂后，自身提升20%格挡，持续3秒，该格挡效果无层数上限。',
    cooldown: 0,
    effectType: 'passive_debuff_buff',
    baseEffect: { type: 'stunResist_debuff', value: 0.3, duration: 5, selfBuff: { type: 'block', value: 0.2, duration: 3 } },
    animation: 'debuff',
    icon: '⬇️'
  },
  skill_025: {
    id: 'skill_025',
    name: '遗计奇谋',
    description: '每隔10秒召唤寒冰碎片，对敌方前排角色造成宠物总攻击力500%的伤害，伤害命中后对敌方全体角色造成1秒冰冻',
    cooldown: 10,
    effectType: 'damage',
    damageType: 'magic',
    baseEffect: { type: 'attack', value: 5.0, cc: 'freeze', ccDuration: 1 },
    animation: 'ice',
    icon: '❄️'
  },
  skill_025_1: {
    id: 'skill_025_1',
    name: '遗计奇谋',
    description: '每隔10秒召唤寒冰碎片，对敌方前排角色造成宠物总攻击力750%的伤害，伤害命中后对敌方全体角色造成2秒冰冻',
    cooldown: 10,
    effectType: 'damage',
    damageType: 'magic',
    baseEffect: { type: 'attack', value: 7.5, cc: 'freeze', ccDuration: 2 },
    animation: 'ice',
    icon: '❄️'
  },
  skill_026: {
    id: 'skill_026',
    name: '强化暴风雪',
    description: '友方角色释放"暴风雪"背包技能冷却时间减少15%。友方角色释放的"暴风雪"背包技能伤害命中后降低敌方全体角色30%移动速度和30%攻击速度，持续5秒，该效果不可叠加。',
    cooldown: 0,
    effectType: 'passive_buff',
    baseEffect: { type: 'cooldownReduction', value: 0.15 },
    animation: 'buff',
    icon: '⬆️'
  },
  skill_026_1: {
    id: 'skill_026_1',
    name: '强化暴风雪',
    description: '友方角色释放"暴风雪"背包技能冷却时间减少30%。友方角色释放的"暴风雪"背包技能伤害命中后降低敌方全体角色40%移动速度和30%攻击速度，持续6秒，该效果不可叠加。',
    cooldown: 0,
    effectType: 'passive_buff',
    baseEffect: { type: 'cooldownReduction', value: 0.3 },
    animation: 'buff',
    icon: '⬆️'
  },
  skill_026_2: {
    id: 'skill_026_2',
    name: '强化暴风雪',
    description: '友方角色释放"暴风雪"背包技能冷却时间减少45%。友方角色释放的"暴风雪"背包技能伤害命中后降低敌方全体角色50%移动速度和30%攻击速度，持续7秒，该效果不可叠加。',
    cooldown: 0,
    effectType: 'passive_buff',
    baseEffect: { type: 'cooldownReduction', value: 0.45 },
    animation: 'buff',
    icon: '⬆️'
  },
  skill_027: {
    id: 'skill_027',
    name: '冰爆术',
    description: '敌方角色每次受到冰冻效果时，释放冰爆对敌方前排角色造成其10%最大生命值但不超过宠物总攻击力300%的无视护盾伤害',
    cooldown: 0,
    effectType: 'passive_damage',
    damageType: 'true',
    baseEffect: { type: 'maxHealthDamage', value: 0.1 },
    animation: 'explosion',
    icon: '🧊💥'
  },
  skill_027_1: {
    id: 'skill_027_1',
    name: '冰爆术',
    description: '敌方角色每次受到冰冻效果时，释放冰爆对敌方前排角色造成其15%最大生命值但不超过宠物总攻击力450%的无视护盾伤害',
    cooldown: 0,
    effectType: 'passive_damage',
    damageType: 'true',
    baseEffect: { type: 'maxHealthDamage', value: 0.15 },
    animation: 'explosion',
    icon: '🧊💥'
  },
  skill_027_2: {
    id: 'skill_027_2',
    name: '冰爆术',
    description: '敌方角色每次受到冰冻效果时，释放冰爆对敌方前排角色造成其20%最大生命值但不超过宠物总攻击力600%的无视护盾伤害',
    cooldown: 0,
    effectType: 'passive_damage',
    damageType: 'true',
    baseEffect: { type: 'maxHealthDamage', value: 0.2 },
    animation: 'explosion',
    icon: '🧊💥'
  },
  skill_dummy: {
    id: 'skill_dummy',
    name: '占位技能',
    description: '这是一个占位技能。',
    cooldown: 0,
    effectType: 'none',
    baseEffect: {},
    animation: 'none',
    icon: '❓'
  }
}

export const heroDatabase = {
  hero_001: {
    id: 'hero_001',
    name: '哈姆雷特',
    quality: 'A',
    position: 'frontDps',
    baseStats: { attack: 120, health: 800, defense: 60 },
    avatar: '⚔️', // 添加头像
    skills: [
      { skillId: 'skill_001', levelUnlock: 35 } // 引用 heroSkillDatabase
    ],
    bonds: ['warrior', 'human'],
    fragments: 10
  },
  hero_002: {
    id: 'hero_002',
    name: '斯巴达',
    quality: 'S',
    position: 'backDps',
    baseStats: { attack: 100, health: 600, defense: 40 },
    avatar: '🛡️',
    skills: [
      { skillId: 'skill_002', levelUnlock: 1 },
      { skillId: 'skill_002_1', levelUnlock: 140 }
    ],
    bonds: ['archer', 'human'],
    fragments: 10
  },
  hero_003: {
    id: 'hero_003',
    name: '法老',
    quality: 'S',
    position: 'frontTank',
    baseStats: { attack: 80, health: 1200, defense: 100 },
    avatar: '👑',
    skills: [
      { skillId: 'skill_003', levelUnlock: 1 },
      { skillId: 'skill_003_1', levelUnlock: 140 }
    ],
    bonds: ['paladin', 'human', 'holy'],
    fragments: 20
  },
  hero_004: {
    id: 'hero_004',
    name: '阿兹特克',
    quality: 'S',
    position: 'backDps',
    baseStats: { attack: 150, health: 500, defense: 30 },
    avatar: '🗿',
    skills: [
      { skillId: 'skill_004', levelUnlock: 1 },
      { skillId: 'skill_004_1', levelUnlock: 140 }
    ],
    bonds: ['mage', 'human', 'elemental'],
    fragments: 20
  },
  hero_005: {
    id: 'hero_005',
    name: '杨教授',
    quality: 'SS', // 修正品质
    position: 'frontDps',
    baseStats: { attack: 200, health: 1000, defense: 80 },
    avatar: '👨‍🏫',
    skills: [
      { skillId: 'skill_005', levelUnlock: 1 },
      { skillId: 'skill_005_1', levelUnlock: 140 }
    ],
    bonds: ['dragon', 'knight', 'legendary'],
    fragments: 50
  },
  hero_006: {
    id: 'hero_006',
    name: 'YY',
    quality: 'SS', // 修正品质
    position: 'backDps',
    baseStats: { attack: 180, health: 700, defense: 50 },
    avatar: '🎶',
    skills: [
      { skillId: 'skill_006', levelUnlock: 1 },
      { skillId: 'skill_006_1', levelUnlock: 140 }
    ],
    bonds: ['assassin', 'shadow', 'legendary'],
    fragments: 50
  },
  hero_007: {
    id: 'hero_007',
    name: '小当家',
    quality: 'SS', // 修正品质
    position: 'backSupport',
    baseStats: { attack: 120, health: 800, defense: 60 },
    avatar: '🍜',
    skills: [
      { skillId: 'skill_007', levelUnlock: 1 },
      { skillId: 'skill_007_1', levelUnlock: 140 }
    ],
    bonds: ['divine', 'support', 'mythical'],
    fragments: 100
  },
  hero_008: {
    // 保留一个 hero_008 条目
    id: 'hero_008',
    name: '敖丙',
    quality: 'S',
    position: 'backDps',
    baseStats: { attack: 300, health: 600, defense: 40 },
    avatar: '🐉',
    skills: [
      { skillId: 'skill_008', levelUnlock: 1 },
      { skillId: 'skill_008_1', levelUnlock: 140 }
    ],
    bonds: ['demon', 'dark', 'mythical'],
    fragments: 100
  },
  hero_009: {
    id: 'hero_009',
    name: '唐僧',
    quality: 'SS',
    position: 'backDps',
    baseStats: { attack: 300, health: 600, defense: 40 },
    avatar: '🐒',
    skills: [
      { skillId: 'skill_009', levelUnlock: 1 },
      { skillId: 'skill_023', levelUnlock: 160 },
      { skillId: 'skill_023_1', levelUnlock: 180 },
      { skillId: 'skill_023_2', levelUnlock: 180 },
      { skillId: 'skill_024', levelUnlock: 200 },
      { skillId: 'skill_024_1', levelUnlock: 220 },
      { skillId: 'skill_024_2', levelUnlock: 240 }
    ],
    bonds: ['demon', 'dark', 'mythical'],
    fragments: 100
  },
  hero_010: {
    id: 'hero_010',
    name: '哪吒',
    quality: 'SS',
    position: 'backDps',
    baseStats: { attack: 300, health: 600, defense: 40 },
    avatar: '👶',
    skills: [
      { skillId: 'skill_012', levelUnlock: 1 },
      { skillId: 'skill_012_1', levelUnlock: 140 },
      { skillId: 'skill_013', levelUnlock: 160 },
      { skillId: 'skill_013_1', levelUnlock: 180 },
      { skillId: 'skill_013_2', levelUnlock: 180 },
      { skillId: 'skill_014', levelUnlock: 200 },
      { skillId: 'skill_014_1', levelUnlock: 220 },
      { skillId: 'skill_014_2', levelUnlock: 240 }
    ],
    bonds: ['demon', 'dark', 'mythical'],
    fragments: 100
  },
  hero_011: {
    id: 'hero_011',
    name: '杨戳',
    quality: 'SS',
    position: 'backDps',
    baseStats: { attack: 300, health: 600, defense: 40 },
    avatar: '👨‍🏫',
    skills: [
      { skillId: 'skill_015', levelUnlock: 1 },
      { skillId: 'skill_015_1', levelUnlock: 140 },
      { skillId: 'skill_016', levelUnlock: 160 },
      { skillId: 'skill_016_1', levelUnlock: 180 },
      { skillId: 'skill_016_2', levelUnlock: 180 },
      { skillId: 'skill_017', levelUnlock: 200 },
      { skillId: 'skill_017_1', levelUnlock: 220 },
      { skillId: 'skill_017_2', levelUnlock: 240 }
    ],
    bonds: ['demon', 'dark', 'mythical'],
    fragments: 100
  },
  hero_012: {
    id: 'hero_012',
    name: '孙悟空',
    quality: 'SS',
    position: 'backDps',
    baseStats: { attack: 300, health: 600, defense: 40 },
    avatar: '🐒',
    skills: [
      { skillId: 'skill_018', levelUnlock: 1 },
      { skillId: 'skill_018_1', levelUnlock: 140 },
      { skillId: 'skill_019', levelUnlock: 160 },
      { skillId: 'skill_019_1', levelUnlock: 180 },
      { skillId: 'skill_019_2', levelUnlock: 180 },
      { skillId: 'skill_020', levelUnlock: 200 },
      { skillId: 'skill_020_1', levelUnlock: 220 },
      { skillId: 'skill_020_2', levelUnlock: 240 }
    ],
    bonds: ['demon', 'dark', 'mythical'],
    fragments: 100
  },
  hero_013: {
    id: 'hero_013',
    name: '赵云',
    quality: 'SS',
    position: 'backDps',
    baseStats: { attack: 300, health: 600, defense: 40 },
    avatar: '🛡️',
    skills: [
      { skillId: 'skill_021', levelUnlock: 1 },
      { skillId: 'skill_021_1', levelUnlock: 140 },
      { skillId: 'skill_022', levelUnlock: 160 },
      { skillId: 'skill_022_1', levelUnlock: 180 },
      { skillId: 'skill_022_2', levelUnlock: 180 },
      { skillId: 'skill_023', levelUnlock: 200 },
      { skillId: 'skill_023_1', levelUnlock: 220 },
      { skillId: 'skill_023_2', levelUnlock: 240 }
    ],
    bonds: ['demon', 'dark', 'mythical'],
    fragments: 100
  },
  hero_014: {
    id: 'hero_014',
    name: '张飞',
    quality: 'SS',
    position: 'backDps',
    baseStats: { attack: 300, health: 600, defense: 40 },
    avatar: '👊',
    skills: [
      { skillId: 'skill_022', levelUnlock: 1 },
      { skillId: 'skill_022_1', levelUnlock: 140 },
      { skillId: 'skill_023', levelUnlock: 160 },
      { skillId: 'skill_023_1', levelUnlock: 180 },
      { skillId: 'skill_023_2', levelUnlock: 180 },
      { skillId: 'skill_024', levelUnlock: 200 },
      { skillId: 'skill_024_1', levelUnlock: 220 },
      { skillId: 'skill_024_2', levelUnlock: 240 }
    ],
    bonds: ['demon', 'dark', 'mythical'],
    fragments: 100
  },
  hero_015: {
    id: 'hero_015',
    name: '郭嘉',
    quality: 'SS',
    position: 'backDps',
    baseStats: { attack: 300, health: 600, defense: 40 },
    avatar: '🧊',
    skills: [
      { skillId: 'skill_025', levelUnlock: 1 },
      { skillId: 'skill_025_1', levelUnlock: 140 },
      { skillId: 'skill_026', levelUnlock: 160 },
      { skillId: 'skill_026_1', levelUnlock: 180 },
      { skillId: 'skill_026_2', levelUnlock: 180 },
      { skillId: 'skill_027', levelUnlock: 200 },
      { skillId: 'skill_027_1', levelUnlock: 220 },
      { skillId: 'skill_027_2', levelUnlock: 240 }
    ],
    bonds: ['demon', 'dark', 'mythical'],
    fragments: 100
  },
  hero_016: {
    // 新增英雄条目
    id: 'hero_016',
    name: '周瑜',
    quality: 'SS',
    position: 'backDps',
    baseStats: { attack: 300, health: 600, defense: 40 },
    avatar: '🔥',
    skills: [
      { skillId: 'skill_dummy', levelUnlock: 1 } // 示例技能
    ],
    bonds: ['mage', 'elemental', 'legendary'],
    fragments: 100
  }
}

// 羁绊配置
export const bondConfig = {
  warrior: {
    name: '战士',
    2: { type: 'attack', value: 0.1, description: '攻击力+10%' },
    4: { type: 'attack', value: 0.25, description: '攻击力+25%' }
  },
  archer: {
    name: '弓箭手',
    2: { type: 'critRate', value: 0.15, description: '暴击率+15%' },
    4: { type: 'critRate', value: 0.3, description: '暴击率+30%' }
  },
  mage: {
    name: '法师',
    2: { type: 'magicDamage', value: 0.2, description: '法术伤害+20%' },
    4: { type: 'magicDamage', value: 0.4, description: '法术伤害+40%' }
  },
  human: {
    name: '人类',
    3: { type: 'health', value: 0.15, description: '生命值+15%' },
    6: { type: 'health', value: 0.35, description: '生命值+35%' }
  },
  holy: {
    name: '神圣',
    2: { type: 'healing', value: 0.25, description: '治疗效果+25%' },
    4: { type: 'healing', value: 0.5, description: '治疗效果+50%' }
  },
  elemental: {
    name: '元素',
    2: { type: 'elementalDamage', value: 0.2, description: '元素伤害+20%' },
    4: { type: 'elementalDamage', value: 0.45, description: '元素伤害+45%' }
  },
  dragon: {
    name: '龙族',
    2: { type: 'allStats', value: 0.1, description: '全属性+10%' },
    4: { type: 'allStats', value: 0.25, description: '全属性+25%' }
  },
  knight: {
    name: '骑士',
    2: { type: 'defense', value: 0.2, description: '防御力+20%' },
    4: { type: 'defense', value: 0.4, description: '防御力+40%' }
  },
  legendary: {
    name: '传说',
    2: { type: 'pvpDamage', value: 0.15, description: 'PVP伤害+15%' },
    4: { type: 'pvpDamage', value: 0.3, description: 'PVP伤害+30%' }
  },
  assassin: {
    name: '刺客',
    2: { type: 'critDamage', value: 0.25, description: '暴击伤害+25%' },
    4: { type: 'critDamage', value: 0.5, description: '暴击伤害+50%' }
  },
  shadow: {
    name: '暗影',
    2: { type: 'dodgeRate', value: 0.1, description: '闪避率+10%' },
    4: { type: 'dodgeRate', value: 0.2, description: '闪避率+20%' }
  },
  divine: {
    name: '神圣',
    2: { type: 'supportPower', value: 0.3, description: '辅助效果+30%' },
    4: { type: 'supportPower', value: 0.6, description: '辅助效果+60%' }
  },
  support: {
    name: '辅助',
    2: { type: 'healingReceived', value: 0.2, description: '受到治疗+20%' },
    4: { type: 'healingReceived', value: 0.4, description: '受到治疗+40%' }
  },
  mythical: {
    name: '神话',
    2: { type: 'allDamage', value: 0.2, description: '全伤害+20%' },
    4: { type: 'allDamage', value: 0.5, description: '全伤害+50%' }
  },
  demon: {
    name: '恶魔',
    2: { type: 'darkDamage', value: 0.25, description: '暗属性伤害+25%' },
    4: { type: 'darkDamage', value: 0.6, description: '暗属性伤害+60%' }
  },
  dark: {
    name: '黑暗',
    2: { type: 'debuffPower', value: 0.3, description: '负面效果强度+30%' },
    4: { type: 'debuffPower', value: 0.6, description: '负面效果强度+60%' }
  },
  paladin: {
    name: '圣骑士',
    2: { type: 'pvpDefense', value: 0.15, description: 'PVP防御+15%' },
    4: { type: 'pvpDefense', value: 0.3, description: 'PVP防御+30%' }
  }
}

// 将 bondConfig 重新导出为 bondDatabase 以保持兼容性
export const bondDatabase = bondConfig

// 突破等级配置
export const breakthroughLevels = {
  star: { name: '星星', maxLevel: 5, requiredLevel: 1 },
  moon: { name: '月亮', maxLevel: 5, requiredLevel: 50 },
  sun: { name: '太阳', maxLevel: 5, requiredLevel: 100 }
}

// 等级增益配置
export const levelBuffs = {
  5: { type: 'health', value: 0.2, description: '全体角色生命+20%' },
  25: { type: 'attack', value: 0.25, description: '全体角色攻击+25%' },
  50: { type: 'health', value: 0.4, description: '全体角色生命+40%' },
  75: { type: 'attack', value: 0.6, description: '全体角色攻击+60%' },
  100: { type: 'health', value: 0.6, description: '全体角色生命+60%' }
}
