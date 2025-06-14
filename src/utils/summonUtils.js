import { rollQuality, getSummonRates } from '../data/summonRates'
import { summonPetByQuality } from './petUtils'
import { summonEquipmentByQuality } from './equipmentUtils'
import { summonSkillByQuality } from './skillUtils'

const expRequirements = {
  1: 0,
  2: 35,
  3: 70,
  4: 105,
  5: 201,
  6: 420,
  7: 1260,
  8: 4000,
  9: 10000,
  10: 20000
}

// 增加召唤经验并检查升级
export const addSummonExp = (gameStore, summonType) => {
  const summonData = gameStore.summon.levels[summonType]
  if (!summonData) return

  summonData.experience += 1

  // 检查是否可以升级
  const currentLevel = summonData.level
  const nextLevel = currentLevel + 1
  const expRequired = expRequirements[nextLevel]

  if (expRequired && summonData.experience >= expRequired && currentLevel < 10) {
    summonData.level = nextLevel
    summonData.experience = 0
    return { levelUp: true, newLevel: nextLevel }
  }

  return { levelUp: false }
}

// 获取召唤等级信息
export const getSummonLevelInfo = (gameStore, summonType) => {
  const summonData = gameStore.summon.levels[summonType]
  if (!summonData) return null

  const currentLevel = summonData.level
  const currentExp = summonData.experience
  const nextLevel = currentLevel + 1
  const expRequired = expRequirements[nextLevel] || 0
  const expProgress = currentLevel >= 10 ? 100 : (currentExp / expRequired) * 100

  return {
    level: currentLevel,
    experience: currentExp,
    expRequired,
    expProgress,
    isMaxLevel: currentLevel >= 10
  }
}

// 根据召唤类型和等级进行召唤
export const performSummonByType = (gameStore, summonType, count = 1) => {
  const results = []
  const summonLevel = gameStore.summon.levels[summonType]?.level || 1

  for (let i = 0; i < count; i++) {
    const quality = rollQuality(summonLevel)

    // 根据召唤类型调用对应的召唤函数
    let result
    switch (summonType) {
      case 'pet':
        result = summonPetByQuality(gameStore, quality)
        break
      case 'skill':
        result = summonSkillByQuality(gameStore, quality)
        break
      case 'equipment':
        result = summonEquipmentByQuality(gameStore, quality)
        break
      default:
        continue
    }

    if (result) {
      results.push(result)
    }

    // 增加召唤经验
    addSummonExp(gameStore, summonType)
  }

  return results
}
