import { PET_DATA, PET_QUALITIES } from '../data/petData'

// 计算宠物升级所需经验
export function getPetUpgradeExp(level) {
  return Math.floor(100 * Math.pow(1.2, level - 1))
}

// 计算宠物当前攻击力
export function getPetAttack(petData, level) {
  const baseAttack = petData.baseAttack
  const attackBonus = petData.attackBonus
  return Math.floor(baseAttack * (1 + (attackBonus * (level - 1)) / 100))
}

// 计算宠物升级所需碎片
export function getPetUpgradeFragments(petData, level) {
  return Math.floor(petData.fragmentsToUpgrade * Math.pow(1.5, Math.floor((level - 1) / 10)))
}

// 检查是否可以升级宠物
export function canUpgradePet(pet, fragments) {
  const petData = PET_DATA[pet.id]
  const requiredFragments = getPetUpgradeFragments(petData, pet.level)
  return fragments >= requiredFragments
}

// 升级宠物
export function upgradePet(pet, gameStore) {
  const petData = PET_DATA[pet.id]
  const requiredFragments = getPetUpgradeFragments(petData, pet.level)

  if (gameStore.pets.fragments[pet.id] >= requiredFragments) {
    gameStore.pets.fragments[pet.id] -= requiredFragments
    pet.level += 1
    pet.attack = getPetAttack(petData, pet.level)
    return true
  }
  return false
}

// 批量升级所有可升级的宠物
export function batchUpgradePets(gameStore) {
  let upgradedCount = 0

  gameStore.pets.ownedPets.forEach(pet => {
    while (canUpgradePet(pet, gameStore.pets.fragments[pet.id] || 0)) {
      if (upgradePet(pet, gameStore)) {
        upgradedCount++
      } else {
        break
      }
    }
  })

  return upgradedCount
}

// 合成宠物
export function synthesizePet(petId, gameStore) {
  const petData = PET_DATA[petId]
  const requiredFragments = petData.fragmentsToSummon

  if ((gameStore.pets.fragments[petId] || 0) >= requiredFragments) {
    gameStore.pets.fragments[petId] -= requiredFragments

    // 检查是否已拥有该宠物
    const existingPet = gameStore.pets.ownedPets.find(pet => pet.id === petId)
    if (!existingPet) {
      // 创建新宠物
      const newPet = {
        id: petId,
        level: 1,
        attack: petData.baseAttack,
        experience: 0,
        nextLevelExp: getPetUpgradeExp(1)
      }
      gameStore.pets.ownedPets.push(newPet)
    }
    return true
  }
  return false
}

// 上阵宠物
export function deployPet(petId, gameStore) {
  if (gameStore.pets.activePets.length >= gameStore.pets.unlockedSlots) {
    return false // 槽位已满
  }

  if (gameStore.pets.activePets.includes(petId)) {
    return false // 已经上阵
  }

  gameStore.pets.activePets.push(petId)
  return true
}

// 下阵宠物
export function undeployPet(petId, gameStore) {
  const index = gameStore.pets.activePets.indexOf(petId)
  if (index > -1) {
    gameStore.pets.activePets.splice(index, 1)
    return true
  }
  return false
}


// 根据品质召唤宠物
export function summonPetByQuality(gameStore, quality) {
  // 根据品质筛选宠物
  const petsOfQuality = Object.values(PET_DATA).filter(pet => pet.quality === quality)
  if (petsOfQuality.length === 0) return null

  const randomPet = petsOfQuality[Math.floor(Math.random() * petsOfQuality.length)]
  console.log(randomPet)
  
  // 检查是否已拥有该宠物
  const existingPet = gameStore.pets.ownedPets.find(pet => pet.id === randomPet.id)
  let data
  if (existingPet) {
    // 已拥有，转换为碎片
    const fragmentsToAdd = Math.floor(randomPet.fragmentsToSummon * 0.5)
    gameStore.pets.fragments[randomPet.id] = (gameStore.pets.fragments[randomPet.id] || 0) + fragmentsToAdd
  } else {
    // 新获得宠物
    const newPet = {
      id: randomPet.id,
      level: 1,
      attack: getPetAttack(randomPet, 1)
    }
    gameStore.pets.ownedPets.push(newPet)
  }
  return randomPet
}