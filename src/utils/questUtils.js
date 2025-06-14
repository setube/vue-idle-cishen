// 任务生成和管理工具函数

// 任务类型配置
const QUEST_TYPES = {
  UPGRADE: 'upgrade',
  STAGE: 'stage',
  SUMMON: 'summon'
}

// 属性名称映射
const ATTRIBUTE_NAMES = {
  attack: '攻击',
  health: '生命',
  critical: '暴击',
  criticalDamage: '暴击伤害',
  attackSpeed: '攻击速度',
  multiShot: '多重射击',
  tripleShot: '三重射击',
  healthRecover: '生命恢复'
}

// 难度名称映射
const DIFFICULTY_NAMES = {
  normal: '普通',
  hard: '困难',
  super: '超难',
  terror: '恐怖',
  nightmare: '噩梦',
  hell: '地狱'
}

// 根据任务ID生成任务类型
export const getQuestTypeByTaskId = taskId => {
  const typeIndex = (taskId - 1) % 3
  return [QUEST_TYPES.UPGRADE, QUEST_TYPES.STAGE, QUEST_TYPES.SUMMON][typeIndex]
}

// 生成升级属性任务
export const generateUpgradeQuest = taskId => {
  const attributes = Object.keys(ATTRIBUTE_NAMES)
  const targetAttribute = attributes[(taskId - 1) % attributes.length]
  const difficulty = Math.floor((taskId - 1) / 10) + 1
  const totalProgress = Math.min(5 + Math.floor(difficulty / 2), 20)

  return {
    id: taskId,
    type: QUEST_TYPES.UPGRADE,
    name: `任务${taskId}`,
    description: `升级${ATTRIBUTE_NAMES[targetAttribute]}`,
    target: targetAttribute,
    currentProgress: 0,
    totalProgress,
    reward: {
      type: 'soulStone',
      amount: 150
    },
    completed: false
  }
}

// 生成闯关任务
export const generateStageQuest = taskId => {
  const difficulty = Math.floor((taskId - 1) / 30)
  const difficultyKeys = Object.keys(DIFFICULTY_NAMES)
  const targetDifficulty = difficultyKeys[Math.min(difficulty, difficultyKeys.length - 1)]

  const chapter = (Math.floor((taskId - 1) / 10) % 10) + 1
  const stage = ((taskId - 1) % 10) + 1

  return {
    id: taskId,
    type: QUEST_TYPES.STAGE,
    name: `任务${taskId}`,
    description: `挑战${DIFFICULTY_NAMES[targetDifficulty]}${chapter}-${stage}`,
    target: {
      difficulty: targetDifficulty,
      chapter,
      stage
    },
    currentProgress: 0,
    totalProgress: 1,
    reward: {
      type: 'soulStone',
      amount: 150
    },
    completed: false
  }
}

// 生成召唤任务
export const generateSummonQuest = taskId => {
  const difficulty = Math.floor((taskId - 1) / 50) + 1
  const totalProgress = Math.min(10 + difficulty * 10, 100)

  // 根据任务ID决定召唤类型
  const summonTypes = ['skill', 'pet', 'equipment']
  const summonTypeIndex = Math.floor((taskId - 1) / 3) % 3
  const summonType = summonTypes[summonTypeIndex]

  const summonTypeNames = {
    skill: '召唤技能',
    pet: '召唤宠物',
    equipment: '召唤装备'
  }

  return {
    id: taskId,
    type: QUEST_TYPES.SUMMON,
    name: `任务${taskId}`,
    description: summonTypeNames[summonType],
    target: summonType,
    currentProgress: 0,
    totalProgress,
    reward: {
      type: 'soulStone',
      amount: 150
    },
    completed: false
  }
}

// 生成新任务
export const generateQuest = taskId => {
  const questType = getQuestTypeByTaskId(taskId)

  switch (questType) {
    case QUEST_TYPES.UPGRADE:
      return generateUpgradeQuest(taskId)
    case QUEST_TYPES.STAGE:
      return generateStageQuest(taskId)
    case QUEST_TYPES.SUMMON:
      return generateSummonQuest(taskId)
    default:
      return generateUpgradeQuest(taskId)
  }
}

// 检查任务是否完成
export const checkQuestCompletion = (quest, gameStore) => {
  switch (quest.type) {
    case QUEST_TYPES.UPGRADE:
      const currentLevel = gameStore.character.attributes[quest.target]?.level || 1
      quest.currentProgress = Math.max(0, currentLevel - 1)
      return quest.currentProgress >= quest.totalProgress

    case QUEST_TYPES.STAGE:
      // 检查是否通过了指定关卡
      const { difficulty, chapter, stage } = quest.target
      const progress = gameStore.stages?.progress?.[difficulty]
      if (progress) {
        const cleared = progress.maxChapter > chapter || (progress.maxChapter === chapter && progress.maxStage >= stage)
        quest.currentProgress = cleared ? 1 : 0
        return cleared
      }
      return false

    case QUEST_TYPES.SUMMON:
      const stats = gameStore.quests.stats.summonCounts
      quest.currentProgress = stats[quest.target] || 0
      return quest.currentProgress >= quest.totalProgress

    default:
      return false
  }
}

// 完成任务并给予奖励
export const completeQuest = (quest, gameStore) => {
  if (quest.completed) return false

  quest.completed = true
  gameStore.quests.completedCount++

  // 给予奖励
  if (quest.reward.type === 'soulStone') {
    gameStore.resources.soulStone += quest.reward.amount
  } else if (quest.reward.type === 'gold') {
    gameStore.resources.gold += quest.reward.amount
  }

  return true
}

// 更新任务进度
export const updateQuestProgress = (gameStore, action) => {
  const quests = gameStore.quests.currentQuests

  // 根据行动类型更新统计
  switch (action.type) {
    case 'attribute_upgrade':
      gameStore.quests.stats.attributeUpgrades++
      break
    case 'stage_clear':
      gameStore.quests.stats.stagesCleared++
      break
    case 'summon':
      if (action.summonType) {
        gameStore.quests.stats.summonCounts[action.summonType]++
      }
      break
  }

  // 检查所有任务完成状态
  quests.forEach(quest => {
    if (!quest.completed) {
      const isCompleted = checkQuestCompletion(quest, gameStore)
      if (isCompleted) {
        completeQuest(quest, gameStore)
      }
    }
  })

  // 移除已完成的任务并生成新任务
  const completedQuests = quests.filter(q => q.completed)
  completedQuests.forEach(() => {
    const completedIndex = quests.findIndex(q => q.completed)
    if (completedIndex !== -1) {
      quests.splice(completedIndex, 1)

      // 生成新任务
      const newQuest = generateQuest(gameStore.quests.nextTaskId)
      quests.push(newQuest)
      gameStore.quests.nextTaskId++
    }
  })
}

// 初始化任务系统
export const initializeQuests = gameStore => {
  if (gameStore.quests.currentQuests.length === 0) {
    // 生成初始3个任务
    for (let i = 0; i < 3; i++) {
      const quest = generateQuest(gameStore.quests.nextTaskId)
      gameStore.quests.currentQuests.push(quest)
      gameStore.quests.nextTaskId++
    }
  }
}
