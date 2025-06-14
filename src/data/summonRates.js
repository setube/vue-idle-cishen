// 召唤概率配置 - 根据等级
export const summonRatesByLevel = {
  1: {
    common: 100.0000,
    advanced: 0.0000,
    rare: 0.0000,
    epic: 0.0000,
    legendary: 0.0000,
    mythic: 0.0000,
    transcendent: 0.0000
  },
  2: {
    common: 75.0000,
    advanced: 25.0000,
    rare: 0.0000,
    epic: 0.0000,
    legendary: 0.0000,
    mythic: 0.0000,
    transcendent: 0.0000
  },
  3: {
    common: 47.0000,
    advanced: 43.0000,
    rare: 10.0000,
    epic: 0.0000,
    legendary: 0.0000,
    mythic: 0.0000,
    transcendent: 0.0000
  },
  4: {
    common: 19.0000,
    advanced: 56.0000,
    rare: 23.0000,
    epic: 2.0000,
    legendary: 0.0000,
    mythic: 0.0000,
    transcendent: 0.0000
  },
  5: {
    common: 20.2400,
    advanced: 45.0000,
    rare: 28.7000,
    epic: 6.0000,
    legendary: 0.0600,
    mythic: 0.0000,
    transcendent: 0.0000
  },
  6: {
    common: 19.8900,
    advanced: 31.0000,
    rare: 37.0000,
    epic: 12.0000,
    legendary: 0.0900,
    mythic: 0.0200,
    transcendent: 0.0000
  },
  7: {
    common: 19.8399,
    advanced: 22.0000,
    rare: 34.0000,
    epic: 24.0000,
    legendary: 0.1200,
    mythic: 0.0400,
    transcendent: 0.0001
  },
  8: {
    common: 7.6795,
    advanced: 18.0000,
    rare: 29.0000,
    epic: 45.0000,
    legendary: 0.2400,
    mythic: 0.0800,
    transcendent: 0.0005
  },
  9: {
    common: 7.3580,
    advanced: 10.0000,
    rare: 22.0000,
    epic: 60.0000,
    legendary: 0.4800,
    mythic: 0.1600,
    transcendent: 0.0020
  },
  10: {
    common: 9.2100,
    advanced: 9.5000,
    rare: 10.0000,
    epic: 70.0000,
    legendary: 0.9600,
    mythic: 0.3200,
    transcendent: 0.0100
  }
}

// 获取指定等级的召唤概率
export const getSummonRates = (level) => {
  return summonRatesByLevel[Math.min(level, 10)] || summonRatesByLevel[1]
}

// 根据概率进行召唤抽取
export const rollQuality = (level) => {
  const rates = getSummonRates(level)
  const random = Math.random() * 100
  let cumulativeRate = 0

  for (const [quality, rate] of Object.entries(rates)) {
    cumulativeRate += rate
    if (random <= cumulativeRate) {
      return quality
    }
  }

  return 'common' // 默认返回普通品质
}