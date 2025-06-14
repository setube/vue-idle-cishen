import { heroDatabase, heroSkillDatabase, bondDatabase, levelBuffs } from '../data/heroData'

// 计算角色等级所需经验
export function calculateExpRequired(level) {
  return Math.floor(100 * Math.pow(1.1, level - 1))
}

// 计算角色属性值
export function calculateHeroStats(hero) {
  const baseHero = heroDatabase[hero.id]
  if (!baseHero) return { attack: 0, health: 0, defense: 0 }

  const levelMultiplier = 1 + (hero.level - 1) * 0.1
  const breakthroughLevel = hero.breakthrough?.level || 0
  const breakthroughMultiplier = 1 + breakthroughLevel * 0.2

  return {
    attack: Math.floor(baseHero.baseStats.attack * levelMultiplier * breakthroughMultiplier),
    health: Math.floor(baseHero.baseStats.health * levelMultiplier * breakthroughMultiplier),
    defense: Math.floor(baseHero.baseStats.defense * levelMultiplier * breakthroughMultiplier)
  }
}

// 检查是否可以突破
export function canBreakthrough(hero, fragments) {
  if (!hero || hero.level === undefined || !hero.breakthrough) return false
  if (hero.level < 100) return false

  const requiredFragments = getBreakthroughFragmentCost(hero.breakthrough.level || 0)
  const heroFragments = fragments[hero.id] || 0

  return heroFragments >= requiredFragments
}

// 获取突破所需碎片数量
export function getBreakthroughFragmentCost(breakthroughLevel) {
  const costs = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200]
  return costs[breakthroughLevel] || 200
}

// 获取突破阶段名称
export function getBreakthroughStageName(breakthroughStage) {
  if (breakthroughStage <= 5) return '星星'
  if (breakthroughStage <= 10) return '月亮'
  return '太阳'
}

// 计算羁绊效果
export function calculateBondEffects(ownedHeroes) {
  const bondEffects = {
    attack: 0,
    health: 0,
    pvpDamage: 0,
    pvpDefense: 0,
    critRate: 0,
    magicDamage: 0,
    healing: 0,
    elementalDamage: 0,
    allStats: 0,
    defense: 0,
    critDamage: 0,
    dodgeRate: 0,
    supportPower: 0,
    healingReceived: 0,
    allDamage: 0,
    darkDamage: 0,
    debuffPower: 0
  }

  const bondCounts = {}
  ownedHeroes.forEach(hero => {
    const heroData = heroDatabase[hero.id]
    if (heroData && heroData.bonds) {
      heroData.bonds.forEach(bondName => {
        bondCounts[bondName] = (bondCounts[bondName] || 0) + 1
      })
    }
  })

  Object.entries(bondDatabase).forEach(([bondKey, bondInfo]) => {
    const count = bondCounts[bondKey] || 0
    Object.entries(bondInfo).forEach(([threshold, effect]) => {
      const numThreshold = parseInt(threshold, 10)
      if (!isNaN(numThreshold) && count >= numThreshold && effect && effect.type) {
        if (bondEffects[effect.type] !== undefined) {
          bondEffects[effect.type] += effect.value
        }
      }
    })
  })

  return bondEffects
}

// 计算等级增益效果
export function calculateLevelBuffs(ownedHeroes) {
  const buffs = {
    attack: 0,
    health: 0
  }

  ownedHeroes.forEach(hero => {
    Object.entries(levelBuffs).forEach(([level, buff]) => {
      if (hero.level >= parseInt(level)) {
        if (buff.type === 'attack') {
          buffs.attack += buff.value
        } else if (buff.type === 'health') {
          buffs.health += buff.value
        }
      }
    })
  })

  return buffs
}

// 召唤角色
export function summonHero() {
  const heroes = Object.keys(heroDatabase)
  const weights = {
    'A': 50,
    'S': 30,
    'SS': 15,
    'SSS': 5
  }

  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0)
  const random = Math.random() * totalWeight

  let currentWeight = 0
  let selectedQuality = 'A'

  for (const [quality, weight] of Object.entries(weights)) {
    currentWeight += weight
    if (random <= currentWeight) {
      selectedQuality = quality
      break
    }
  }

  const qualityHeroes = heroes.filter(heroId => heroDatabase[heroId].quality === selectedQuality)
  const randomHero = qualityHeroes[Math.floor(Math.random() * qualityHeroes.length)]

  return randomHero
}

/**
 * 获取指定ID的英雄技能详细信息
 * @param {string} skillId 技能ID
 * @returns {object} 技能详细信息
 */
export function getHeroSkillDetails(skillId) {
  return heroSkillDatabase[skillId] || null
}

/**
 * 获取英雄当前等级解锁的所有技能
 * @param {object} hero 英雄对象 (包含id和level)
 * @returns {Array<object>} 已解锁技能的详细信息数组
 */
export function getHeroUnlockedSkills(hero) {
  const heroData = heroDatabase[hero.id]
  if (!heroData || !heroData.skills) {
    return []
  }

  return heroData.skills
    .filter(skillLink => hero.level >= skillLink.levelUnlock)
    .map(skillLink => getHeroSkillDetails(skillLink.skillId))
    .filter(skill => skill !== null)
}