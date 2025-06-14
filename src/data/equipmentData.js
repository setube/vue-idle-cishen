// 装备品质配置
export const equipmentQualities = {
  common: { name: '普通', color: '#6c757d', multiplier: 1 },
  advanced: { name: '高级', color: '#28a745', multiplier: 1.5 },
  rare: { name: '稀有', color: '#007bff', multiplier: 2 },
  epic: { name: '史诗', color: '#6f42c1', multiplier: 3 },
  legendary: { name: '传说', color: '#fd7e14', multiplier: 5 },
  mythic: { name: '神话', color: '#55EDC0', multiplier: 8 },
  transcendent: { name: '超越', color: '#FF4040', multiplier: 12 }
}

// 武器数据库
export const weaponDatabase = {
  weapon_001: {
    id: 'weapon_001',
    name: '石斧',
    type: 'weapon',
    quality: 'common',
    baseEffect: {
      type: 'attack_percent',
      value: 0.0749 // 7.49%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 0.368 // 36.8%
    }
  },
  weapon_002: {
    id: 'weapon_002',
    name: '木棍',
    type: 'weapon',
    quality: 'common',
    baseEffect: {
      type: 'attack_percent',
      value: 0.0749 // 7.49%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 0.446 // 44.6%
    }
  },
  weapon_003: {
    id: 'weapon_003',
    name: '短弓',
    type: 'weapon',
    quality: 'common',
    baseEffect: {
      type: 'attack_percent',
      value: 0.0749 // 7.49%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 0.525 // 52.5%
    }
  },
  weapon_004: {
    id: 'weapon_004',
    name: '镰刀',
    type: 'weapon',
    quality: 'common',
    baseEffect: {
      type: 'attack_percent',
      value: 0.0749 // 7.49%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 0.604 // 60.4%
    }
  },
  weapon_005: {
    id: 'weapon_005',
    name: '木剑',
    type: 'weapon',
    quality: 'common',
    baseEffect: {
      type: 'attack_percent',
      value: 0.0749 // 7.49%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 0.683 // 68.3%
    }
  },
  weapon_006: {
    id: 'weapon_006',
    name: '匕首',
    type: 'weapon',
    quality: 'advanced',
    baseEffect: {
      type: 'attack_percent',
      value: 0.338 // 33.8%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 1.65 // 165%
    }
  },
  weapon_007: {
    id: 'weapon_007',
    name: '矛',
    type: 'weapon',
    quality: 'advanced',
    baseEffect: {
      type: 'attack_percent',
      value: 0.338 // 33.8%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 2.01 // 201%
    }
  },
  weapon_008: {
    id: 'weapon_008',
    name: '法杖',
    type: 'weapon',
    quality: 'advanced',
    baseEffect: {
      type: 'attack_percent',
      value: 0.338 // 33.8%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 2.36 // 236%
    }
  },
  weapon_009: {
    id: 'weapon_009',
    name: '铁锤',
    type: 'weapon',
    quality: 'advanced',
    baseEffect: {
      type: 'attack_percent',
      value: 0.338 // 33.8%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 2.72 // 272%
    }
  },
  weapon_010: {
    id: 'weapon_010',
    name: '餐叉',
    type: 'weapon',
    quality: 'advanced',
    baseEffect: {
      type: 'attack_percent',
      value: 0.338 // 33.8%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 3.07 // 307%
    }
  },
  weapon_011: {
    id: 'weapon_011',
    name: '精弓',
    type: 'weapon',
    quality: 'rare',
    baseEffect: {
      type: 'attack_percent',
      value: 1.52 // 152%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 7.44 // 744%
    }
  },
  weapon_012: {
    id: 'weapon_012',
    name: '狼牙棒',
    type: 'weapon',
    quality: 'rare',
    baseEffect: {
      type: 'attack_percent',
      value: 1.52 // 152%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 9.04 // 904%
    }
  },
  weapon_013: {
    id: 'weapon_013',
    name: '魔法杖',
    type: 'weapon',
    quality: 'rare',
    baseEffect: {
      type: 'attack_percent',
      value: 1.52 // 152%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 10.06 // 1006%
    }
  },
  weapon_014: {
    id: 'weapon_014',
    name: '剑',
    type: 'weapon',
    quality: 'rare',
    baseEffect: {
      type: 'attack_percent',
      value: 1.52 // 152%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 12.20 // 1220%
    }
  },
  weapon_015: {
    id: 'weapon_015',
    name: '鱼叉',
    type: 'weapon',
    quality: 'rare',
    baseEffect: {
      type: 'attack_percent',
      value: 1.52 // 152%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 13.80 // 1380%
    }
  },
  weapon_016: {
    id: 'weapon_016',
    name: '喇叭枪',
    type: 'weapon',
    quality: 'epic',
    baseEffect: {
      type: 'attack_percent',
      value: 6.85 // 685%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 33.50 // 3350%
    }
  },
  weapon_017: {
    id: 'weapon_017',
    name: '寒霜首',
    type: 'weapon',
    quality: 'epic',
    baseEffect: {
      type: 'attack_percent',
      value: 6.85 // 685%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 40.70 // 4070%
    }
  },
  weapon_018: {
    id: 'weapon_018',
    name: '长爪',
    type: 'weapon',
    quality: 'epic',
    baseEffect: {
      type: 'attack_percent',
      value: 6.85 // 685%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 47.80 // 4780%
    }
  },
  weapon_019: {
    id: 'weapon_019',
    name: '火弩',
    type: 'weapon',
    quality: 'epic',
    baseEffect: {
      type: 'attack_percent',
      value: 6.85 // 685%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 50.50 // 5500%
    }
  },
  weapon_020: {
    id: 'weapon_020',
    name: '水晶法杖',
    type: 'weapon',
    quality: 'epic',
    baseEffect: {
      type: 'attack_percent',
      value: 6.85 // 685%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 62.20 // 6220%
    }
  },
  weapon_021: {
    id: 'weapon_021',
    name: '逗猫棒',
    type: 'weapon',
    quality: 'legendary',
    baseEffect: {
      type: 'attack_percent',
      value: 30.80 // 3080%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 151.00 // 15100%
    }
  },
  weapon_022: {
    id: 'weapon_022',
    name: '回旋镖',
    type: 'weapon',
    quality: 'legendary',
    baseEffect: {
      type: 'attack_percent',
      value: 30.80 // 3080%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 183.00 // 18300%
    }
  },
  weapon_023: {
    id: 'weapon_023',
    name: '面包棍',
    type: 'weapon',
    quality: 'legendary',
    baseEffect: {
      type: 'attack_percent',
      value: 30.80 // 3080%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 215.00 // 21500%
    }
  },
  weapon_024: {
    id: 'weapon_024',
    name: '磨刀石',
    type: 'weapon',
    quality: 'legendary',
    baseEffect: {
      type: 'attack_percent',
      value: 30.80 // 3080%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 248.00 // 24800%
    }
  },
  weapon_025: {
    id: 'weapon_025',
    name: '牡鹿角',
    type: 'weapon',
    quality: 'legendary',
    baseEffect: {
      type: 'attack_percent',
      value: 30.80 // 3080%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 281.00 // 28100%
    }
  },
  weapon_026: {
    id: 'weapon_026',
    name: '熔岩利爪',
    type: 'weapon',
    quality: 'mythic',
    baseEffect: {
      type: 'attack_percent',
      value: 139.00 // 13900%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 678.00 // 67800%
    }
  },
  weapon_027: {
    id: 'weapon_027',
    name: '邪恶典籍',
    type: 'weapon',
    quality: 'mythic',
    baseEffect: {
      type: 'attack_percent',
      value: 139.00 // 13900%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 823.00 // 82300%
    }
  },
  weapon_028: {
    id: 'weapon_028',
    name: '毒牙',
    type: 'weapon',
    quality: 'mythic',
    baseEffect: {
      type: 'attack_percent',
      value: 139.00 // 13900%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 969.00 // 96900%
    }
  },
  weapon_029: {
    id: 'weapon_029',
    name: '独角兽角剑',
    type: 'weapon',
    quality: 'mythic',
    baseEffect: {
      type: 'attack_percent',
      value: 139.00 // 13900%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 1111.00 // 111100%
    }
  },
  weapon_030: {
    id: 'weapon_030',
    name: '烈焰之刃',
    type: 'weapon',
    quality: 'mythic',
    baseEffect: {
      type: 'attack_percent',
      value: 139.00 // 13900%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 1260.00 // 126000%
    }
  },
  weapon_031: {
    id: 'weapon_031',
    name: '龙牙匕首',
    type: 'weapon',
    quality: 'transcendent',
    baseEffect: {
      type: 'attack_percent',
      value: 624.00 // 13900%
    },
    equipEffect: {
      type: 'attack_flat',
      value: 3050.00 // 305000%
    }
  }
}

// 防具数据库
export const armorDatabase = {
  armor_001: {
    id: 'armor_001',
    name: '贝壳',
    type: 'armor',
    quality: 'common',
    baseEffect: {
      type: 'health_percent',
      value: 0.0749 // 7.49%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 0.368 // 36.8%生命力
    }
  },
  armor_002: {
    id: 'armor_002',
    name: '龟壳',
    type: 'armor',
    quality: 'common',
    baseEffect: {
      type: 'health_percent',
      value: 0.0749 // 7.49%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 0.446 // 44.6%生命力
    }
  },
  armor_003: {
    id: 'armor_003',
    name: '椰子壳',
    type: 'armor',
    quality: 'common',
    baseEffect: {
      type: 'health_percent',
      value: 0.0749 // 7.49%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 0.525 // 52.5%生命力
    }
  },
  armor_004: {
    id: 'armor_004',
    name: '蛋壳',
    type: 'armor',
    quality: 'common',
    baseEffect: {
      type: 'health_percent',
      value: 0.0749 // 7.49%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 0.604 // 60.4%生命力
    }
  },
  armor_005: {
    id: 'armor_005',
    name: '纹石',
    type: 'armor',
    quality: 'common',
    baseEffect: {
      type: 'health_percent',
      value: 0.0749 // 7.49%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 0.683 // 68.3%生命力
    }
  },
  armor_006: {
    id: 'armor_006',
    name: '藤蔓',
    type: 'armor',
    quality: 'advanced',
    baseEffect: {
      type: 'health_percent',
      value: 0.338 // 33.8%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 1.65 // 165%生命力
    }
  },
  armor_007: {
    id: 'armor_007',
    name: '羽毛',
    type: 'armor',
    quality: 'advanced',
    baseEffect: {
      type: 'health_percent',
      value: 0.338 // 33.8%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 2.01 // 201%生命力
    }
  },
  armor_008: {
    id: 'armor_008',
    name: '盘子',
    type: 'armor',
    quality: 'advanced',
    baseEffect: {
      type: 'health_percent',
      value: 0.338 // 33.8%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 2.36 // 236%生命力
    }
  },
  armor_009: {
    id: 'armor_009',
    name: '木轮',
    type: 'armor',
    quality: 'advanced',
    baseEffect: {
      type: 'health_percent',
      value: 0.338 // 33.8%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 2.72 // 272%生命力
    }
  },
  armor_010: {
    id: 'armor_010',
    name: '皮夹',
    type: 'armor',
    quality: 'advanced',
    baseEffect: {
      type: 'health_percent',
      value: 0.338 // 33.8%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 3.07 // 307%生命力
    }
  },
  armor_011: {
    id: 'armor_011',
    name: '木盾',
    type: 'armor',
    quality: 'rare',
    baseEffect: {
      type: 'health_percent',
      value: 1.52 // 152%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 7.44 // 744%生命力
    }
  },
  armor_012: {
    id: 'armor_012',
    name: '眼镜',
    type: 'armor',
    quality: 'rare',
    baseEffect: {
      type: 'health_percent',
      value: 1.52 // 152%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 9.04 // 904%生命力
    }
  },
  armor_013: {
    id: 'armor_013',
    name: '四叶草',
    type: 'armor',
    quality: 'rare',
    baseEffect: {
      type: 'health_percent',
      value: 1.52 // 152%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 10.60 // 1060%生命力
    }
  },
  armor_014: {
    id: 'armor_014',
    name: '榴莲壳',
    type: 'armor',
    quality: 'rare',
    baseEffect: {
      type: 'health_percent',
      value: 1.52 // 152%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 12.20 // 1220%生命力
    }
  },
  armor_015: {
    id: 'armor_015',
    name: '大骨',
    type: 'armor',
    quality: 'rare',
    baseEffect: {
      type: 'health_percent',
      value: 1.52 // 152%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 13.80 // 1380%生命力
    }
  },
  armor_016: {
    id: 'armor_016',
    name: '犀牛角',
    type: 'armor',
    quality: 'epic',
    baseEffect: {
      type: 'health_percent',
      value: 6.85 // 685%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 33.50 // 3350%生命力
    }
  },
  armor_017: {
    id: 'armor_017',
    name: '符咒',
    type: 'armor',
    quality: 'epic',
    baseEffect: {
      type: 'health_percent',
      value: 6.85 // 685%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 40.70 // 4070%生命力
    }
  },
  armor_018: {
    id: 'armor_018',
    name: '反光镜',
    type: 'armor',
    quality: 'epic',
    baseEffect: {
      type: 'health_percent',
      value: 6.85 // 685%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 47.80 // 4780%生命力
    }
  },
  armor_019: {
    id: 'armor_019',
    name: '尖刺盾牌',
    type: 'armor',
    quality: 'epic',
    baseEffect: {
      type: 'health_percent',
      value: 6.85 // 685%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 55.00 // 5500%生命力
    }
  },
  armor_020: {
    id: 'armor_020',
    name: '龙鳞',
    type: 'armor',
    quality: 'epic',
    baseEffect: {
      type: 'health_percent',
      value: 6.85 // 685%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 62.20 // 6220%生命力
    }
  },
  armor_021: {
    id: 'armor_021',
    name: '刺猬',
    type: 'armor',
    quality: 'legendary',
    baseEffect: {
      type: 'health_percent',
      value: 30.80 // 3080%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 151.00 // 15100%生命力
    }
  },
  armor_022: {
    id: 'armor_022',
    name: '骑士头盔',
    type: 'armor',
    quality: 'legendary',
    baseEffect: {
      type: 'health_percent',
      value: 30.80 // 3080%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 183.00 // 18300%生命力
    }
  },
  armor_023: {
    id: 'armor_023',
    name: '坚硬宝石',
    type: 'armor',
    quality: 'legendary',
    baseEffect: {
      type: 'health_percent',
      value: 30.80 // 3080%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 215.00 // 21500%生命力
    }
  },
  armor_024: {
    id: 'armor_024',
    name: '荆棘盾',
    type: 'armor',
    quality: 'legendary',
    baseEffect: {
      type: 'health_percent',
      value: 30.80 // 3080%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 248.00 // 24800%生命力
    }
  },
  armor_025: {
    id: 'armor_025',
    name: '龙虾壳',
    type: 'armor',
    quality: 'legendary',
    baseEffect: {
      type: 'health_percent',
      value: 30.80 // 3080%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 281.00 // 28100%生命力
    }
  },
  armor_026: {
    id: 'armor_026',
    name: '铁皮甲',
    type: 'armor',
    quality: 'mythic',
    baseEffect: {
      type: 'health_percent',
      value: 139.00 // 13900%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 678.00 // 67800%生命力
    }
  },
  armor_027: {
    id: 'armor_027',
    name: '占星法袍',
    type: 'armor',
    quality: 'mythic',
    baseEffect: {
      type: 'health_percent',
      value: 139.00 // 13900%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 823.00 // 82300%生命力
    }
  },
  armor_028: {
    id: 'armor_028',
    name: '穿山甲',
    type: 'armor',
    quality: 'mythic',
    baseEffect: {
      type: 'health_percent',
      value: 139.00 // 13900%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 969.00 // 96900%生命力
    }
  },
  armor_029: {
    id: 'armor_029',
    name: '金盾',
    type: 'armor',
    quality: 'mythic',
    baseEffect: {
      type: 'health_percent',
      value: 139.00 // 13900%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 1111.00 // 111100%生命力
    }
  },
  armor_030: {
    id: 'armor_030',
    name: '游侠轻甲',
    type: 'armor',
    quality: 'mythic',
    baseEffect: {
      type: 'health_percent',
      value: 139.00 // 13900%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 1260.00 // 126000%生命力
    }
  },
  armor_031: {
    id: 'armor_031',
    name: '圣盾',
    type: 'armor',
    quality: 'transcendent',
    baseEffect: {
      type: 'health_percent',
      value: 624.00 // 62400%生命力
    },
    equipEffect: {
      type: 'health_flat',
      value: 3050.00 // 305000%生命力
    }
  }
}

// 装备召唤概率配置
export const equipmentSummonRates = {
  common: 50,
  advanced: 25,
  rare: 15,
  epic: 7,
  legendary: 2.5,
  mythic: 0.4,
  transcendent: 0.1
}

// 装备碎片需求
export const equipmentFragmentRequirements = {
  common: { summon: 2, upgrade: 2 },
  advanced: { summon: 2, upgrade: 2 },
  rare: { summon: 2, upgrade: 2 },
  epic: { summon: 2, upgrade: 2 },
  legendary: { summon: 2, upgrade: 2 },
  mythic: { summon: 2, upgrade: 2 },
  transcendent: { summon: 2, upgrade: 2 }
}