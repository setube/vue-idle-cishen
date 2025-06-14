// 宠物品质配置
export const PET_QUALITIES = {
  common: { name: '普通', color: '#6c757d', icon: '⚪' },
  advanced: { name: '高级', color: '#28a745', icon: '🟢' },
  rare: { name: '稀有', color: '#007bff', icon: '🔵' },
  epic: { name: '史诗', color: '#6f42c1', icon: '🟣' },
  legendary: { name: '传说', color: '#fd7e14', icon: '🟠' },
  mythical: { name: '神话', color: '#55EDC0', icon: '🔴' },
  transcendent: { name: '超越', color: '#dc3545', icon: '🟡' }
}

// 宠物标签
export const PET_TAGS = {
  bat: '蝙蝠',
  chicken: '鸡',
  fish: '鱼',
  bird: '鸟',
  mouse: '老鼠',
  snail: '蜗牛',
  spike: '刺刺团',
  dragon: '龙',
  mushroom: '蘑菇'
}

// 宠物基础数据
export const PET_DATA = {
  1: {
    id: 1,
    name: '红蝠',
    quality: 'common',
    tags: ['bat'],
    baseAttack: 4790,
    baseAttackSpeed: 0.6,
    attackBonus: 5, // 每级攻击力加成百分比
    fragmentsToSummon: 10,
    fragmentsToUpgrade: 5
  },
  2: {
    id: 2,
    name: '蛋仔',
    quality: 'common',
    tags: ['chicken'],
    baseAttack: 5510,
    baseAttackSpeed: 0.57,
    attackBonus: 4,
    fragmentsToSummon: 10,
    fragmentsToUpgrade: 5
  },
  3: {
    id: 3,
    name: '小绿鱼',
    quality: 'common',
    tags: ['fish'],
    baseAttack: 6230,
    baseAttackSpeed: 0.54,
    attackBonus: 8,
    fragmentsToSummon: 20,
    fragmentsToUpgrade: 10
  },
  4: {
    id: 4,
    name: '小粉鸟',
    quality: 'common',
    tags: ['bird'],
    baseAttack: 6950,
    baseAttackSpeed: 0.51,
    attackBonus: 12,
    fragmentsToSummon: 50,
    fragmentsToUpgrade: 20
  },
  5: {
    id: 5,
    name: '鼠鼠',
    quality: 'common',
    tags: ['mouse'],
    baseAttack: 7670,
    baseAttackSpeed: 0.49,
    attackBonus: 15,
    fragmentsToSummon: 100,
    fragmentsToUpgrade: 30
  },
  6: {
    id: 6,
    name: '时空蜗牛',
    quality: 'common',
    tags: ['snail', 'dragon', 'mushroom'],
    baseAttack: 600,
    baseAttackSpeed: 0.5,
    attackBonus: 20,
    fragmentsToSummon: 200,
    fragmentsToUpgrade: 50
  },
  7: {
    id: 7,
    name: '刺刺王',
    quality: 'mythical',
    tags: ['spike', 'dragon', 'mushroom', 'bat'],
    baseAttack: 1200,
    baseAttackSpeed: 1.8,
    attackBonus: 25,
    fragmentsToSummon: 500,
    fragmentsToUpgrade: 100
  },
  8: {
    id: 8,
    name: '超越龙',
    quality: 'transcendent',
    tags: ['dragon', 'bird', 'fish', 'mushroom', 'spike'],
    baseAttack: 2500,
    baseAttackSpeed: 2.5,
    attackBonus: 30,
    fragmentsToSummon: 1000,
    fragmentsToUpgrade: 200
  }
}
