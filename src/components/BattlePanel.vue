<template>
  <div class="battle-panel">
    <!-- <h3 class="panel-title">战斗区域</h3> -->
    <!-- 关卡信息显示 -->
    <div class="stage-info">
      <div class="stage-display">
        <div class="difficulty-name">
          {{ getDifficultyName() }}
          <span class="stage-number">{{ getStageDisplay() }}</span>
        </div>
      </div>
      <div class="stage-controls">
        <n-button size="small" @click="previousStage" :disabled="!canGoPrevious()">上一关</n-button>
        <n-button size="small" @click="nextStage" :disabled="!canGoNext()">下一关</n-button>
      </div>
    </div>
    <!-- Boss挑战危险按钮 -->
    <div v-if="gameStore.stages.bossDefeatState.showDangerButton" class="danger-button-container">
      <n-button type="error" size="large" circle @click="challengeBoss" class="danger-button">!</n-button>
      <div class="danger-text">挑战Boss</div>
    </div>
    <div class="pk-info">
      <!-- 角色信息 -->
      <div class="character-info">
        <div class="character-name">主角</div>
        <div class="health-bar">
          <div class="health-bar-bg">
            <div class="health-bar-fill character" :style="{ width: characterHealthPercent + '%' }">
              <div class="health-text">
                {{ formatLargeNumber(gameStore.character.currentHealth) }} /
                {{ formatLargeNumber(gameStore.character.maxHealth) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 敌人信息 -->
      <div class="enemy-info">
        <div class="enemy-name">
          {{ gameStore.battle.enemy.name }}
          <span class="enemy-type">{{ getEnemyType() }}</span>
        </div>
        <div class="health-bar">
          <div class="health-bar-bg">
            <div class="health-bar-fill enemy" :style="{ width: enemyHealthPercent + '%' }">
              <div class="health-text">
                {{ formatLargeNumber(gameStore.battle.enemy.currentHealth) }} /
                {{ formatLargeNumber(gameStore.battle.enemy.maxHealth) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 战斗控制 -->
    <!-- <div class="battle-controls">
      <n-button v-if="!gameStore.battle.isInBattle" type="primary" @click="startBattle" size="large">开始战斗</n-button>
      <n-button v-else type="warning" @click="stopBattle" size="large">停止战斗</n-button>
    </div> -->
    <!-- 战斗日志 -->
    <div class="battle-log">
      <!-- <div class="log-title">战斗日志</div> -->
      <div class="log-content">
        <div v-for="(log, index) in recentLogs" :key="index" class="log-item" :class="log.type">
          {{ log.message }}
        </div>
      </div>
    </div>
    <!-- 技能控制区域 -->
    <div class="skill-control-area">
      <div class="skill-boxes">
        <!-- 自动技能开关 -->
        <div class="skill-box auto-skill" @click="toggleAutoSkill">
          <div class="skill-icon">⚙️</div>
          <div class="skill-label">自动技能</div>
          <div class="skill-status" :class="{ active: autoSkillEnabled }">{{ autoSkillEnabled ? 'ON' : 'OFF' }}</div>
        </div>
        <!-- 技能CD状态框 -->
        <div
          v-for="(skillId, index) in equippedSkillsWithEmpty"
          :key="index"
          class="skill-box skill-cd"
          :class="{ empty: !skillId, cooling: skillId && isSkillCooling(skillId) }"
        >
          <div v-if="skillId" class="skill-content">
            <div class="skill-icon">{{ getSkillIcon(skillId) }}</div>
            <div class="skill-name">{{ getSkillName(skillId) }}</div>
            <div class="skill-cd-time" v-if="isSkillCooling(skillId)">{{ getSkillCooldownTime(skillId) }}s</div>
            <div class="skill-ready" v-else>就绪</div>
          </div>
          <div v-else class="empty-skill">
            <div class="empty-icon">🔒</div>
            <div class="empty-text">空槽位</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 出战角色显示区域 -->
    <div class="formation-display">
      <div class="formation-title">出战角色</div>
      <div class="hero-circles">
        <div
          v-for="position in formationPositions"
          :key="position.key"
          class="hero-circle"
          :class="{ empty: !position.heroId }"
        >
          <div v-if="position.heroId" class="hero-content">
            <div class="hero-avatar">{{ getHeroAvatar(position.heroId) }}</div>
            <div class="hero-name">{{ getHeroName(position.heroId) }}</div>
            <div class="hero-level">Lv.{{ getHeroLevel(position.heroId) }}</div>
          </div>
          <div v-else class="empty-hero">
            <div class="empty-icon">➕</div>
            <div class="position-name">{{ position.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import { NButton } from 'naive-ui'
  import { useGameStore } from '../stores/gameStore'
  import { formatLargeNumber, calculateAttributeValue } from '../utils/numberFormat'
  import { skillDatabase } from '../data/skillData'
  import { heroDatabase, heroSkillDatabase } from '../data/heroData'
  import { updateQuestProgress } from '../utils/questUtils'
  import { SkillEffectHandler } from '../utils/skillEffectHandler'
  import { calculateHeroStats, getHeroUnlockedSkills } from '../utils/heroUtils'

  const gameStore = useGameStore()
  const battleLog = ref([])
  let battleInterval = null

  // 技能相关状态
  const autoSkillEnabled = ref(true)
  const skillCooldowns = ref({})
  const heroSkillCooldowns = ref({})

  const enemyHealthPercent = computed(() => {
    const enemy = gameStore.battle.enemy
    return (enemy.currentHealth / enemy.maxHealth) * 100
  })

  const characterHealthPercent = computed(() => {
    const character = gameStore.character
    return (character.currentHealth / character.maxHealth) * 100
  })

  const recentLogs = computed(() => {
    return battleLog.value.slice(-5).reverse()
  })

  // 装备的技能（补齐到6个槽位）
  const equippedSkillsWithEmpty = computed(() => {
    const equipped = gameStore.skills?.equippedSkills || []
    const result = [...equipped]
    while (result.length < 6) {
      result.push(null)
    }
    return result
  })

  // 阵容位置配置
  const formationPositions = computed(() => {
    const formation = gameStore.heroes?.formation || {}
    return [
      { key: 'frontTank', name: '前排坦克', heroId: formation.frontTank },
      { key: 'frontDps', name: '前排输出', heroId: formation.frontDps },
      { key: 'backDps', name: '后排输出', heroId: formation.backDps },
      { key: 'backSupport', name: '后排辅助', heroId: formation.backSupport }
    ]
  })

  // 初始化技能效果处理器
  const skillEffectHandler = new SkillEffectHandler(gameStore, battleLog)

  // 技能相关方法
  const toggleAutoSkill = () => {
    autoSkillEnabled.value = !autoSkillEnabled.value
  }

  const getSkillIcon = skillId => {
    return skillDatabase[skillId]?.icon || '❓'
  }

  const getSkillName = skillId => {
    return skillDatabase[skillId]?.name || '未知技能'
  }

  const isSkillCooling = skillId => {
    return skillCooldowns.value[skillId] > 0
  }

  const getSkillCooldownTime = skillId => {
    return Math.ceil(skillCooldowns.value[skillId] / 1000)
  }

  const isHeroSkillCooling = (heroId, skillId) => {
    return heroSkillCooldowns.value[heroId] && heroSkillCooldowns.value[heroId][skillId] > 0
  }

  // 角色相关方法
  const getHeroAvatar = heroId => {
    return heroDatabase[heroId]?.avatar || '👤'
  }

  const getHeroName = heroId => {
    return heroDatabase[heroId]?.name || '未知角色'
  }

  const getHeroLevel = heroId => {
    const hero = gameStore.heroes?.ownedHeroes?.find(h => h.id === heroId)
    return hero?.level || 1
  }

  // 计算主角实际攻击力
  const getCharacterAttack = () => {
    const baseAttack = calculateAttributeValue(
      gameStore.character.attributes.attack.baseValue,
      gameStore.character.attributes.attack.level
    )
    // 暴击计算
    const criticalChance = (gameStore.character.attributes.critical.level - 1) * 0.01
    const isCritical = Math.random() < criticalChance
    let damage = baseAttack
    if (isCritical) {
      const criticalMultiplier = 1.2 + (gameStore.character.attributes.criticalDamage.level - 1) * 0.01
      damage *= criticalMultiplier
    }
    return { damage: Math.floor(damage), isCritical }
  }

  // 计算英雄实际攻击力
  const getHeroAttack = heroId => {
    const hero = gameStore.heroes.ownedHeroes.find(h => h.id === heroId)
    if (!hero) return { damage: 0, isCritical: false }
    const heroStats = calculateHeroStats(hero)
    const baseAttack = heroStats.attack

    return { damage: Math.floor(baseAttack), isCritical: false }
  }

  // 更新技能冷却
  const updateSkillCooldowns = () => {
    for (const skillId in skillCooldowns.value) {
      if (skillCooldowns.value[skillId] > 0) {
        skillCooldowns.value[skillId] = Math.max(0, skillCooldowns.value[skillId] - 100)
      }
    }
    for (const heroId in heroSkillCooldowns.value) {
      for (const skillId in heroSkillCooldowns.value[heroId]) {
        if (heroSkillCooldowns.value[heroId][skillId] > 0) {
          heroSkillCooldowns.value[heroId][skillId] = Math.max(0, heroSkillCooldowns.value[heroId][skillId] - 100)
        }
      }
    }
  }

  // 修改使用主角技能的方法
  const useSkill = async (skillObject, skillLevel) => {
    if (isSkillCooling(skillObject.id)) return false

    skillCooldowns.value[skillObject.id] = skillObject.cooldown * 1000

    const success = await skillEffectHandler.handleSkillEffect(skillObject, skillLevel, { attackerType: 'player' })

    if (success) {
      skillEffectHandler.addBattleLog({
        type: 'skill-use',
        message: `你使用了技能：${skillObject.name}`,
        timestamp: Date.now()
      })
    }
    return success
  }

  // 使用英雄技能的方法
  const useHeroSkill = async (hero, skillObject) => {
    if (!heroSkillCooldowns.value[hero.id]) {
      heroSkillCooldowns.value[hero.id] = {}
    }
    if (isHeroSkillCooling(hero.id, skillObject.id)) return false

    heroSkillCooldowns.value[hero.id][skillObject.id] = skillObject.cooldown * 1000

    const success = skillEffectHandler.handleSkillEffect(skillObject, hero.level, {
      attackerType: 'hero',
      heroId: hero.id
    })

    if (success) {
      skillEffectHandler.addBattleLog({
        type: 'hero-skill-use',
        message: `${hero.name} 使用了技能：${skillObject.name}`,
        timestamp: Date.now()
      })
    }
    return success
  }

  // 根据关卡生成敌人
  const generateStageEnemy = () => {
    const { difficulty, chapter, stage, enemy } = gameStore.stages.currentStage

    // 防御性检查，防止关卡数据损坏
    if (!difficulty || !chapter || !stage || !enemy) {
      // 重置到安全状态以避免游戏崩溃
      gameStore.stages.currentStage = { difficulty: 'normal', chapter: 1, stage: 1, enemy: 1 }
    }

    const currentStageData = gameStore.stages.currentStage

    // 计算敌人等级
    const difficultyMultipliers = {
      normal: 1,
      hard: 2,
      super: 4,
      terror: 8,
      nightmare: 16,
      hell: 32
    }
    const multiplier = difficultyMultipliers[currentStageData.difficulty] || 1
    let baseLevel = (currentStageData.chapter - 1) * 10 + currentStageData.stage
    baseLevel *= multiplier
    // Boss额外加成
    const isBoss = currentStageData.enemy === 5
    let level = isBoss ? Math.floor(baseLevel * 1.5) : Math.floor(baseLevel)
    // 确保等级至少为1，避免0属性
    if (level < 1) {
      level = 1
    }
    // 敌人名称
    const normalEnemies = ['哥布林', '兽人', '骷髅', '巨魔']
    const bossEnemies = ['哥布林王', '兽人酋长', '骷髅领主', '巨魔王', '恶魔领主']
    let name
    if (isBoss) {
      name = bossEnemies[Math.floor(Math.random() * bossEnemies.length)]
    } else {
      name = normalEnemies[Math.floor(Math.random() * normalEnemies.length)]
    }
    // 生成敌人属性
    const healthMultiplier = isBoss ? 3 : 1
    const attackMultiplier = isBoss ? 2 : 1
    gameStore.battle.enemy = {
      name,
      level,
      maxHealth: 500 * level * healthMultiplier,
      currentHealth: 500 * level * healthMultiplier,
      attack: 50 * level * attackMultiplier,
      goldReward: 100 * level * (isBoss ? 5 : 1),
      expReward: 10 * level * (isBoss ? 3 : 1)
    }
  }

  // 敌人被击败
  const enemyDefeated = () => {
    const enemy = gameStore.battle.enemy
    gameStore.resources.gold += enemy.goldReward
    gameStore.resources.experience += enemy.expReward
    const { difficulty, chapter, stage, enemy: enemyNum } = gameStore.stages.currentStage
    skillEffectHandler.addBattleLog({
      type: 'victory',
      message: `击败了 ${enemy.name}！获得 ${formatLargeNumber(enemy.goldReward)} 金币和 ${enemy.expReward} 经验`,
      timestamp: Date.now()
    })
    gameStore.character.currentHealth = gameStore.character.maxHealth
    // 更新关卡进度
    if (enemyNum < 5) {
      // 不是boss，继续下一个敌人
      if (!gameStore.stages.bossDefeatState.showDangerButton) {
        gameStore.stages.currentStage.enemy++
      }
    } else {
      // 击败boss，进入下一关
      let newStage = stage
      let newChapter = chapter
      let newDifficulty = difficulty
      const maxStages = ['normal', 'hard', 'super'].includes(difficulty) ? 10 : 100
      const maxChapters = ['normal', 'hard', 'super'].includes(difficulty) ? 10 : 12

      if (stage < maxStages) {
        newStage++
      } else if (chapter < maxChapters) {
        newChapter++
        newStage = 1
      } else {
        // 当前难度已通关，进入下一个难度
        const difficulties = ['normal', 'hard', 'super', 'terror', 'nightmare', 'hell']
        const currentIndex = difficulties.indexOf(difficulty)
        if (currentIndex < difficulties.length - 1) {
          newDifficulty = difficulties[currentIndex + 1]
          newChapter = 1
          newStage = 1
        }
      }

      gameStore.stages.currentStage = {
        difficulty: newDifficulty,
        chapter: newChapter,
        stage: newStage,
        enemy: 1
      }

      // 更新进度记录
      const progress = gameStore.stages.progress[newDifficulty]
      if (newChapter > progress.maxChapter || (newChapter === progress.maxChapter && newStage > progress.maxStage)) {
        gameStore.stages.progress[newDifficulty] = {
          maxChapter: newChapter,
          maxStage: newStage
        }
      }

      // 更新任务进度
      updateQuestProgress(gameStore, {
        type: 'stage_clear',
        difficulty: gameStore.stages.currentStage.difficulty,
        chapter: gameStore.stages.currentStage.chapter,
        stage: gameStore.stages.currentStage.stage
      })
    }
    generateStageEnemy()
  }

  // 角色被击败
  const characterDefeated = () => {
    const { enemy: enemyNum } = gameStore.stages.currentStage
    const isBoss = enemyNum === 5
    if (isBoss) {
      // Boss战败，退回到上一个小怪
      gameStore.stages.currentStage.enemy = 4
      gameStore.stages.bossDefeatState.isDefeated = true
      gameStore.stages.bossDefeatState.showDangerButton = true
      gameStore.stages.bossDefeatState.canChallengeBoss = false
      skillEffectHandler.addBattleLog({
        type: 'defeat',
        message: 'Boss战败！退回到上一个敌人，点击危险按钮重新挑战Boss',
        timestamp: Date.now()
      })
    } else {
      skillEffectHandler.addBattleLog({
        type: 'defeat',
        message: '你被击败了！自动复活中...',
        timestamp: Date.now()
      })
    }
    // 自动复活
    setTimeout(() => {
      gameStore.character.currentHealth = gameStore.character.maxHealth
      if (!isBoss) {
        skillEffectHandler.addBattleLog({
          type: 'revive',
          message: '复活成功！',
          timestamp: Date.now()
        })
      }
    }, 1000)
    if (isBoss) {
      generateStageEnemy()
    }
  }

  // 战斗逻辑
  const processBattle = () => {
    if (!gameStore.battle.isInBattle) return
    updateSkillCooldowns()
    skillEffectHandler.updateEffects()
    const now = Date.now()
    const baseAttackSpeed = 1000 // 基础攻击间隔1000ms
    const attackSpeedBonus = gameStore.character.attributes.attackSpeed.unlocked
      ? (gameStore.character.attributes.attackSpeed.level - 1) * 0.001 // 每级+0.1%
      : 0
    const attackSpeed = baseAttackSpeed / (1 + attackSpeedBonus)
    if (autoSkillEnabled.value) {
      const equippedSkills = gameStore.skills?.equippedSkills || []
      for (const skillId of equippedSkills) {
        const skill = skillDatabase[skillId]
        if (skill && skill.cooldown > 0 && !isSkillCooling(skillId)) {
          useSkill(skill, gameStore.skills.ownedSkills.find(s => s.id === skillId)?.level || 1)
          break
        }
      }
    }
    const activeHeroesInFormation = formationPositions.value
      .map(pos => gameStore.heroes.ownedHeroes.find(h => h.id === pos.heroId))
      .filter(Boolean)
    for (const hero of activeHeroesInFormation) {
      const unlockedHeroSkills = getHeroUnlockedSkills(hero)
      for (const skill of unlockedHeroSkills) {
        if (skill && skill.cooldown > 0 && !isHeroSkillCooling(hero.id, skill.id)) {
          useHeroSkill(hero, skill)
        }
      }
    }
    if (now - gameStore.battle.lastAttackTime >= attackSpeed) {
      const performAttack = (attackCount, isMultiShot = false, isTripleShot = false) => {
        for (let i = 0; i < attackCount; i++) {
          if (gameStore.battle.enemy.currentHealth > 0) {
            const { damage, isCritical } = getCharacterAttack()
            gameStore.battle.enemy.currentHealth -= damage
            let logMessage = isCritical
              ? `你造成了 ${formatLargeNumber(damage)} 暴击伤害！`
              : `你造成了 ${formatLargeNumber(damage)} 伤害`

            if (isMultiShot) logMessage += ' (连射)'
            if (isTripleShot) logMessage += ' (三连射)'

            skillEffectHandler.addBattleLog({
              type: 'player-attack',
              message: logMessage,
              timestamp: now
            })
          }
        }
      }
      // 默认进行一次攻击
      performAttack(1)
      // 检查是否触发三连射
      const tripleShotChance = (gameStore.character.attributes.tripleShot.level - 1) * 0.01
      if (gameStore.character.attributes.tripleShot.unlocked && Math.random() < tripleShotChance) {
        performAttack(2, false, true) // 额外攻击两次
        skillEffectHandler.addBattleLog({
          type: 'skill-use',
          message: '触发了三连射！',
          timestamp: now
        })
      }
      // 检查是否触发连射
      const multiShotChance = (gameStore.character.attributes.multiShot.level - 1) * 0.01
      if (gameStore.character.attributes.multiShot.unlocked && Math.random() < multiShotChance) {
        performAttack(1, true, false) // 额外攻击一次
        skillEffectHandler.addBattleLog({
          type: 'skill-use',
          message: '触发了连射！',
          timestamp: now
        })
      }
      gameStore.battle.lastAttackTime = now
      if (gameStore.battle.enemy.currentHealth <= 0) {
        enemyDefeated()
        return
      }
    }
    if (now - gameStore.battle.lastEnemyAttackTime >= 1000) {
      const damage = gameStore.battle.enemy.attack
      gameStore.character.currentHealth -= damage
      skillEffectHandler.addBattleLog({
        type: 'enemy-attack',
        message: `${gameStore.battle.enemy.name} 对你造成了 ${formatLargeNumber(damage)} 伤害`,
        timestamp: now
      })
      gameStore.battle.lastEnemyAttackTime = now
      if (gameStore.character.currentHealth <= 0) {
        characterDefeated()
        return
      }
    }
  }

  const getDifficultyName = () => {
    const difficultyNames = {
      normal: '普通',
      hard: '困难',
      super: '超难',
      terror: '恐怖',
      nightmare: '噩梦',
      hell: '地狱'
    }
    return difficultyNames[gameStore.stages.currentStage.difficulty]
  }

  const getStageDisplay = () => {
    const { difficulty, chapter, stage } = gameStore.stages.currentStage
    if (['normal', 'hard', 'super'].includes(difficulty)) {
      return `${chapter}-${stage}`
    } else {
      const romanNumerals = ['', 'Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ', 'Ⅺ', 'Ⅻ']
      return `${romanNumerals[chapter]} ${Math.floor((stage - 1) / 10) + 1}-${((stage - 1) % 10) + 1}`
    }
  }

  const getEnemyType = () => {
    return gameStore.stages.currentStage.enemy === 5 ? '(Boss)' : ''
  }

  const canGoPrevious = () => {
    const { difficulty, chapter, stage } = gameStore.stages.currentStage
    return !(difficulty === 'normal' && chapter === 1 && stage === 1)
  }

  const canGoNext = () => {
    const { difficulty, chapter, stage } = gameStore.stages.currentStage
    const progress = gameStore.stages.progress[difficulty]
    return chapter < progress.maxChapter || (chapter === progress.maxChapter && stage < progress.maxStage)
  }

  const previousStage = () => {
    if (!canGoPrevious()) return

    let { difficulty, chapter, stage } = gameStore.stages.currentStage

    if (stage > 1) {
      stage--
    } else if (chapter > 1) {
      chapter--
      const maxStages = ['normal', 'hard', 'super'].includes(difficulty) ? 10 : 100
      stage = maxStages
    } else {
      const difficulties = ['normal', 'hard', 'super', 'terror', 'nightmare', 'hell']
      const currentIndex = difficulties.indexOf(difficulty)
      if (currentIndex > 0) {
        difficulty = difficulties[currentIndex - 1]
        const progress = gameStore.stages.progress[difficulty]
        chapter = progress.maxChapter
        stage = progress.maxStage
      }
    }

    gameStore.stages.currentStage = { difficulty, chapter, stage, enemy: 1 }
    gameStore.stages.bossDefeatState.showDangerButton = false
    generateStageEnemy()
  }

  const nextStage = () => {
    if (!canGoNext()) return

    let { difficulty, chapter, stage } = gameStore.stages.currentStage
    const maxStages = ['normal', 'hard', 'super'].includes(difficulty) ? 10 : 100
    const maxChapters = ['normal', 'hard', 'super'].includes(difficulty) ? 10 : 12

    if (stage < maxStages) {
      stage++
    } else if (chapter < maxChapters) {
      chapter++
      stage = 1
    } else {
      const difficulties = ['normal', 'hard', 'super', 'terror', 'nightmare', 'hell']
      const currentIndex = difficulties.indexOf(difficulty)
      if (currentIndex < difficulties.length - 1) {
        difficulty = difficulties[currentIndex + 1]
        chapter = 1
        stage = 1
      }
    }
    gameStore.stages.currentStage = { difficulty, chapter, stage, enemy: 1 }
    gameStore.stages.bossDefeatState.showDangerButton = false
    generateStageEnemy()
  }

  const challengeBoss = () => {
    gameStore.stages.currentStage.enemy = 5
    gameStore.stages.bossDefeatState.showDangerButton = false
    gameStore.stages.bossDefeatState.canChallengeBoss = true
    generateStageEnemy()
  }

  const startBattle = () => {
    gameStore.battle.isInBattle = true
    generateStageEnemy()
    battleInterval = setInterval(processBattle, 100)
  }

  const stopBattle = () => {
    gameStore.battle.isInBattle = false
    if (battleInterval) {
      clearInterval(battleInterval)
      battleInterval = null
    }
  }

  onMounted(() => {
    startBattle()
  })

  onUnmounted(() => {
    if (battleInterval) {
      clearInterval(battleInterval)
    }
  })
</script>

<style scoped>
  .battle-panel {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 16px;
    border: 2px solid #e9ecef;
    margin-bottom: 16px;
  }

  .panel-title {
    margin: 0 0 16px 0;
    color: #495057;
    font-size: 18px;
    text-align: center;
  }

  .pk-info {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .enemy-info,
  .character-info {
    width: calc(50% - 10px);
    margin: 0 5px;
  }

  .enemy-name,
  .character-name {
    font-weight: bold;
    margin-bottom: 8px;
    text-align: center;
  }

  .enemy-name {
    color: #dc3545;
  }

  .character-name {
    color: #007bff;
  }

  .health-bar {
    margin-bottom: 8px;
  }

  .health-bar-bg {
    width: 100%;
    height: 20px;
    background: #e9ecef;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 4px;
  }

  .health-bar-fill {
    height: 100%;
    transition: width 0.3s ease;
  }

  .health-bar-fill.enemy {
    background: linear-gradient(90deg, #dc3545, #fd7e14);
  }

  .health-bar-fill.character {
    background: linear-gradient(90deg, #28a745, #20c997);
  }

  .health-text {
    text-align: center;
    font-size: 12px;
    color: #fff;
  }

  .battle-controls {
    text-align: center;
    margin-bottom: 16px;
  }

  .battle-log {
    max-height: 150px;
    overflow-y: auto;
    margin-bottom: 20px;
  }

  .log-title {
    font-weight: bold;
    margin-bottom: 8px;
    color: #495057;
  }

  .log-content {
    background: #ffffff;
    border-radius: 4px;
    padding: 8px;
    border: 1px solid #dee2e6;
  }

  .log-item {
    font-size: 12px;
    margin-bottom: 4px;
    padding: 2px 4px;
    border-radius: 2px;
  }

  .log-item.player-attack {
    color: #007bff;
    background: #e3f2fd;
  }

  .log-item.enemy-attack {
    color: #dc3545;
    background: #ffebee;
  }

  .log-item.victory {
    color: #28a745;
    background: #e8f5e8;
    font-weight: bold;
  }

  .log-item.defeat {
    color: #dc3545;
    background: #ffebee;
    font-weight: bold;
  }

  .log-item.revive {
    color: #17a2b8;
    background: #e0f7fa;
    font-weight: bold;
  }

  .log-item.skill-use {
    color: #6f42c1;
    background: #f3e5f5;
    font-weight: bold;
  }

  .log-item.hero-skill-use {
    color: #8b008b;
    background: #f7e0f7;
    font-weight: bold;
  }

  /* 技能控制区域样式 */
  .skill-control-area {
    margin-bottom: 20px;
  }

  .skill-boxes {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
  }

  .skill-box {
    border: 2px solid #dee2e6;
    border-radius: 8px;
    padding: 8px;
    text-align: center;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
  }

  .skill-box:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .skill-box.auto-skill {
    border-color: #28a745;
    background: #f8f9fa;
  }

  .skill-box.auto-skill:hover {
    background: #e9ecef;
  }

  .skill-box.skill-cd {
    border-color: #007bff;
  }

  .skill-box.skill-cd.empty {
    border-color: #6c757d;
    background: #f8f9fa;
    cursor: default;
  }

  .skill-box.skill-cd.cooling {
    border-color: #dc3545;
    background: #ffebee;
  }

  .skill-icon {
    font-size: 20px;
    margin-bottom: 4px;
  }

  .skill-label {
    font-size: 10px;
    font-weight: bold;
    margin-bottom: 2px;
  }

  .skill-status {
    font-size: 8px;
    padding: 2px 4px;
    border-radius: 2px;
    background: #dc3545;
    color: white;
  }

  .skill-status.active {
    background: #28a745;
  }

  .skill-name {
    font-size: 10px;
    font-weight: bold;
    margin-bottom: 2px;
  }

  .skill-cd-time {
    font-size: 12px;
    font-weight: bold;
    color: #dc3545;
  }

  .skill-ready {
    font-size: 8px;
    color: #28a745;
    font-weight: bold;
  }

  .empty-skill {
    color: #6c757d;
  }

  .empty-text {
    font-size: 8px;
  }

  /* 阵容显示区域样式 */
  .formation-display {
    margin-top: 20px;
  }

  .formation-title {
    font-weight: bold;
    margin-bottom: 12px;
    color: #495057;
    text-align: center;
  }

  .hero-circles {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .hero-circle {
    width: 80px;
    height: 80px;
    border: 3px solid #007bff;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    cursor: pointer;
    transition: all 0.3s;
    margin: 0 auto;
  }

  .hero-circle:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }

  .hero-circle.empty {
    border-color: #6c757d;
    background: #f8f9fa;
    border-style: dashed;
  }

  .hero-content {
    text-align: center;
  }

  .hero-avatar {
    font-size: 24px;
    margin-bottom: 2px;
  }

  .hero-name {
    font-size: 8px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
  }

  .hero-level {
    font-size: 6px;
    color: #007bff;
    font-weight: bold;
  }

  .empty-hero {
    color: #6c757d;
    text-align: center;
  }

  .empty-hero .empty-icon {
    font-size: 20px;
    margin-bottom: 2px;
  }

  .position-name {
    font-size: 6px;
    line-height: 1;
  }

  /* 关卡信息样式 */
  .stage-info {
    background: #ffffff;
    border: 2px solid #007bff;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stage-display {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .difficulty-name {
    font-size: 14px;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 4px;
  }

  .stage-number {
    color: #495057;
    margin-bottom: 2px;
  }

  .enemy-progress {
    font-size: 12px;
    color: #6c757d;
  }

  .stage-controls {
    display: flex;
    gap: 8px;
  }

  /* 危险按钮样式 */
  .danger-button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
  }

  .danger-button {
    width: 60px;
    height: 60px;
    font-size: 24px;
    margin-bottom: 8px;
    animation: pulse 2s infinite;
  }

  .danger-text {
    font-size: 12px;
    color: #dc3545;
    font-weight: bold;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7);
    }
    70% {
      transform: scale(1.05);
      box-shadow: 0 0 0 10px rgba(220, 53, 69, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(220, 53, 69, 0);
    }
  }

  .enemy-type {
    color: #dc3545;
    font-weight: bold;
  }

  @media screen and (max-width: 768px) {
    .hero-circle {
      width: 60px;
      height: 60px;
    }

    .hero-avatar {
      font-size: 14px;
    }

    .empty-hero .empty-icon {
      font-size: 14px;
      margin-bottom: 5px;
    }

    .hero-name,
    .hero-level,
    .position-name {
      font-size: 10px;
    }
  }

  /* 技能动画样式 */
  .skill-animation {
    position: absolute;
    pointer-events: none;
  }

  @keyframes magicBall {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }

  @keyframes lightning {
    0% {
      transform: scaleY(0);
      opacity: 0;
    }
    50% {
      transform: scaleY(1);
      opacity: 1;
    }
    100% {
      transform: scaleY(0);
      opacity: 0;
    }
  }
</style>
