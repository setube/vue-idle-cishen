import {
  weaponDatabase,
  armorDatabase,
  equipmentQualities,
  equipmentSummonRates,
  equipmentFragmentRequirements
} from '../data/equipmentData.js'
import { formatLargeNumber } from './numberFormat.js'

// 获取所有装备数据库
export const getAllEquipment = () => {
  return { ...weaponDatabase, ...armorDatabase }
}

// 获取武器列表
export const getWeapons = () => {
  return Object.values(weaponDatabase)
}

// 获取防具列表
export const getArmors = () => {
  return Object.values(armorDatabase)
}

// 计算装备升级所需碎片
export const calculateEquipmentFragmentsRequired = (equipment, currentLevel, targetLevel = null) => {
  if (targetLevel === null) targetLevel = currentLevel + 1
  const equipmentData = getAllEquipment()[equipment.id]
  if (!equipmentData) return 0
  return Math.min(2 + currentLevel, 15)
}

// 计算装备效果值
export const calculateEquipmentEffect = equipment => {
  const equipmentData = getAllEquipment()[equipment.id]
  if (!equipmentData) return { baseEffect: 0, equipEffect: 0 }

  const qualityMultiplier = equipmentQualities[equipmentData.quality]?.multiplier || 1
  const levelMultiplier = 1 + (equipment.level - 1) * 0.1

  const baseEffect = equipmentData.baseEffect.value * qualityMultiplier * levelMultiplier
  const equipEffect = equipmentData.equipEffect.value * qualityMultiplier * levelMultiplier
  return {
    baseEffect,
    equipEffect,
    baseType: equipmentData.baseEffect.type,
    equipType: equipmentData.equipEffect.type
  }
}

// 检查是否可以升级装备
export const canUpgradeEquipment = (equipment, gameStore) => {
  const equipmentData = getAllEquipment()[equipment.id]
  if (!equipmentData) return false
  const fragmentsRequired = calculateEquipmentFragmentsRequired(equipment, equipment.level)
  const availableFragments = gameStore.equipment?.fragments?.[equipment.id] || 0
  return availableFragments >= fragmentsRequired
}

// 升级装备
export const upgradeEquipment = (equipment, gameStore) => {
  if (!canUpgradeEquipment(equipment, gameStore)) return false
  const fragmentsRequired = calculateEquipmentFragmentsRequired(equipment, equipment.level)
  equipment.experience = 0
  equipment.level++
  gameStore.equipment.fragments[equipment.id] -= fragmentsRequired

  return false
}

// 批量升级装备
export const batchUpgradeEquipment = gameStore => {
  let upgradedCount = 0
  const ownedEquipment = gameStore.equipment?.ownedEquipment || []

  ownedEquipment.forEach(equipment => {
    while (canUpgradeEquipment(equipment, gameStore)) {
      if (upgradeEquipment(equipment, gameStore)) {
        upgradedCount++
      } else {
        break
      }
    }
  })

  return upgradedCount
}

// 召唤装备
export const summonEquipment = gameStore => {
  const random = Math.random() * 100
  let cumulativeRate = 0
  let selectedQuality = 'common'

  for (const [quality, rate] of Object.entries(equipmentSummonRates)) {
    cumulativeRate += rate
    if (random <= cumulativeRate) {
      selectedQuality = quality
      break
    }
  }
}

// 根据品质召唤装备
export const summonEquipmentByQuality = (gameStore, quality) => {
  // 随机选择武器或防具
  const isWeapon = Math.random() < 0.5
  const equipmentPool = isWeapon ? getWeapons() : getArmors()
  const qualityEquipment = equipmentPool.filter(eq => eq.quality === quality)

  if (qualityEquipment.length === 0) return null

  const selectedEquipment = qualityEquipment[Math.floor(Math.random() * qualityEquipment.length)]

  // 检查是否已拥有
  const ownedEquipment = gameStore.equipment?.ownedEquipment || []
  const existingEquipment = ownedEquipment.find(eq => eq.id === selectedEquipment.id)

  if (existingEquipment) {
    // 已拥有，给予碎片
    const fragmentReward = equipmentFragmentRequirements[quality]?.summon || 10
    gameStore.equipment.fragments[selectedEquipment.id] =
      (gameStore.equipment.fragments[selectedEquipment.id] || 0) + fragmentReward
  } else {
    // 新装备
    const newEquipment = {
      id: selectedEquipment.id,
      level: 1,
      experience: 0
    }
    gameStore.equipment.ownedEquipment.push(newEquipment)
  }
  return selectedEquipment
}

// 合成装备
export const synthesizeEquipment = (equipmentId, gameStore) => {
  const equipmentData = getAllEquipment()[equipmentId]
  if (!equipmentData) return false

  const requiredFragments = equipmentFragmentRequirements[equipmentData.quality]?.summon || 10
  const availableFragments = gameStore.equipment?.fragments?.[equipmentId] || 0

  if (availableFragments < requiredFragments) return false

  // 检查是否已拥有
  const ownedEquipment = gameStore.equipment?.ownedEquipment || []
  const existingEquipment = ownedEquipment.find(eq => eq.id === equipmentId)

  if (existingEquipment) return false // 已拥有无法合成

  // 消耗碎片并添加装备
  gameStore.equipment.fragments[equipmentId] -= requiredFragments
  const newEquipment = {
    id: equipmentId,
    level: 1,
    experience: 0
  }
  gameStore.equipment.ownedEquipment.push(newEquipment)

  return true
}

// 装备装备
export const equipEquipment = (equipmentId, gameStore) => {
  const equipmentData = getAllEquipment()[equipmentId]
  if (!equipmentData) return false

  const ownedEquipment = gameStore.equipment?.ownedEquipment || []
  const equipment = ownedEquipment.find(eq => eq.id === equipmentId)
  if (!equipment) return false

  if (equipmentData.type === 'weapon') {
    gameStore.equipment.equippedEquipment.weapon = equipmentId
  } else if (equipmentData.type === 'armor') {
    gameStore.equipment.equippedEquipment.armor = equipmentId
  }

  return true
}

// 卸下装备
export const unequipEquipment = (type, gameStore) => {
  if (type === 'weapon') {
    gameStore.equipment.equippedEquipment.weapon = null
  } else if (type === 'armor') {
    gameStore.equipment.equippedEquipment.armor = null
  }

  return true
}
