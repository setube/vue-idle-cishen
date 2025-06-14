import { skillDatabase, SKILL_EXP_REQUIREMENTS, SKILL_SUMMON_RATES } from '../data/skillData.js'
import { summonRatesByLevel } from '../data/summonRates.js'

// 计算技能升级所需经验
export function calculateSkillExpRequired(skillId, level) {
  // 基础经验为2，每级+1，最高15
  const baseExp = 2 // 基础经验值
  const expPerLevel = Math.min(baseExp + (level - 1), 15) // 每级增加1点经验，最高15
  return expPerLevel
}

// 计算技能升级所需碎片
export function calculateSkillFragmentRequired(skillId, level) {
  // 固定返回2个碎片
  return 2
}

// 计算技能当前效果值
export function calculateSkillEffect(skillId, level) {
  const skill = skillDatabase[skillId]
  if (!skill) return 0

  return skill.baseEffect.value + (level - 1) * skill.levelMultiplier
}

// 检查技能是否可以升级
export function canUpgradeSkill(skill, fragments) {
  const skillData = skillDatabase[skill.id]
  if (!skillData) return false

  const requiredFragments = 2 // 固定2个碎片
  const availableFragments = fragments[skill.id] || 0

  return availableFragments >= requiredFragments
}

// 升级技能
export function upgradeSkill(gameStore, skillId) {
  const skill = gameStore.skills.ownedSkills.find(s => s.id === skillId)
  if (!skill) return false

  const requiredFragments = Math.min(skill.level + 1, 15) // 固定2个碎片
  const availableFragments = gameStore.skills.fragments[skillId] || 0

  if (availableFragments >= requiredFragments) {
    // 扣除碎片
    gameStore.skills.fragments[skillId] -= requiredFragments
    // 提升等级
    skill.level += 1
    skill.experience = 0
    return true
  }

  return false
}

// 批量升级技能
export function batchUpgradeSkills(gameStore) {
  let upgradedCount = 0

  for (const skill of gameStore.skills.ownedSkills) {
    while (canUpgradeSkill(skill, gameStore.skills.fragments)) {
      if (upgradeSkill(gameStore, skill.id)) {
        upgradedCount++
      } else {
        break
      }
    }
  }

  return upgradedCount
}

// 根据品质召唤技能
export function summonSkillByQuality(gameStore, quality) {
  // 从该品质中随机选择一个技能
  const skillsOfQuality = Object.values(skillDatabase).filter(skill => skill.quality === quality)
  if (skillsOfQuality.length === 0) return null
  const randomSkill = skillsOfQuality[Math.floor(Math.random() * skillsOfQuality.length)]
  // 检查是否已拥有该技能
  const existingSkill = gameStore.skills.ownedSkills.find(s => s.id === randomSkill.id)

  if (existingSkill) {
    // 已拥有，转换为碎片
    const fragmentsToAdd = Math.floor(randomSkill.fragments * 0.5)
    gameStore.skills.fragments[randomSkill.id] = (gameStore.skills.fragments[randomSkill.id] || 0) + fragmentsToAdd
  } else {
    // 新获得技能
    gameStore.skills.ownedSkills.push({
      id: randomSkill.id,
      level: 1,
      experience: 0
    })
  }
  return randomSkill
}

// 合成技能
export function synthesizeSkill(gameStore, skillId) {
  const skillData = skillDatabase[skillId]
  if (!skillData) return false

  const requiredFragments = skillData.fragments
  const availableFragments = gameStore.skills.fragments[skillId] || 0

  if (availableFragments >= requiredFragments) {
    // 检查是否已拥有
    const existingSkill = gameStore.skills.ownedSkills.find(s => s.id === skillId)
    if (existingSkill) return false

    // 扣除碎片
    gameStore.skills.fragments[skillId] -= requiredFragments

    // 添加技能
    gameStore.skills.ownedSkills.push({
      id: skillId,
      level: 1,
      experience: 0
    })

    return true
  }

  return false
}

// 装备技能
export function equipSkill(gameStore, skillId) {
  const maxSlots = gameStore.skills.unlockedSkillSlots
  const currentEquipped = gameStore.skills.equippedSkills.length

  if (currentEquipped >= maxSlots) return false
  if (gameStore.skills.equippedSkills.includes(skillId)) return false

  gameStore.skills.equippedSkills.push(skillId)
  return true
}

// 卸下技能
export function unequipSkill(gameStore, skillId) {
  const index = gameStore.skills.equippedSkills.indexOf(skillId)
  if (index > -1) {
    gameStore.skills.equippedSkills.splice(index, 1)
    return true
  }
  return false
}

// 检查技能槽位是否可以解锁
export function canUnlockSkillSlot(gameStore, slotNumber) {
  const requirement = gameStore.skills.slotUnlockRequirements[slotNumber]
  if (!requirement) return false

  // 这里需要根据实际的关卡进度系统来判断
  // 暂时返回 true，实际项目中需要检查玩家的关卡进度
  return true
}
