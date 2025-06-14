import { formatLargeNumber, calculateAttributeValue } from './numberFormat'
import { skillDatabase } from '../data/skillData'
import { heroDatabase, heroSkillDatabase } from '../data/heroData' // 导入 heroDatabase 和 heroSkillDatabase
import { calculateHeroStats } from './heroUtils' // 导入 calculateHeroStats

// 技能效果处理器
export class SkillEffectHandler {
  constructor(gameStore, battleLogRef) {
    this.gameStore = gameStore
    this.battleLog = battleLogRef // battleLog 是一个 ref
    this.activeEffects = [] // 活跃的持续性效果，如Buff/Debuff/DoT

    // 绑定 addBattleLog 方法，确保上下文正确
    this.addBattleLog = this.addBattleLog.bind(this)
  }

  addBattleLog(logEntry) {
    this.battleLog.value.push(logEntry)
    // 可以在这里添加滚动到底部的逻辑，如果需要
  }

  /**
   * 处理技能效果的主入口
   * @param {object} skill 完整的技能对象 (来自 skillData 或 heroSkillDatabase)
   * @param {number} level 技能等级
   * @param {object} context 技能上下文 { attackerType: 'player' | 'hero', heroId?: string }
   * @returns {boolean} 技能是否成功执行
   */
  async handleSkillEffect(skill, level, context = { attackerType: 'player' }) {
    if (!skill) {
      this.addBattleLog({ type: 'error', message: '尝试使用一个不存在的技能', timestamp: Date.now() })
      return false
    }

    let attackerAttack = 0
    let attackerMaxHealth = 0
    let attackerName = ''

    if (context.attackerType === 'player') {
      attackerAttack = calculateAttributeValue(
        this.gameStore.character.attributes.attack.baseValue,
        this.gameStore.character.attributes.attack.level
      )
      attackerMaxHealth = this.gameStore.character.maxHealth
      attackerName = '你'
    } else if (context.attackerType === 'hero' && context.heroId) {
      const hero = this.gameStore.heroes.ownedHeroes.find(h => h.id === context.heroId)
      if (!hero) {
        this.addBattleLog({ type: 'error', message: `英雄 ${context.heroId} 不存在`, timestamp: Date.now() })
        return false
      }
      const heroStats = calculateHeroStats(hero)
      attackerAttack = heroStats.attack
      attackerMaxHealth = heroStats.health // 英雄的最大生命值
      attackerName = hero.name
    } else {
      this.addBattleLog({ type: 'error', message: '未知的攻击者类型或缺少英雄ID', timestamp: Date.now() })
      return false
    }

    const effectValue = this.calculateSkillEffect(skill, level)
    const enemy = this.gameStore.battle.enemy

    switch (skill.effectType) {
      case 'damage':
      case 'damage_cc':
      case 'damage_buff_self':
      case 'passive_damage':
      case 'passive_damage_cc':
      case 'passive_damage_buff_self':
        this.handleDamageEffect(skill, effectValue, enemy, attackerAttack, attackerName)
        break
      case 'buff':
      case 'passive_buff':
      case 'buff_random':
      case 'passive_buff_self':
      case 'passive_debuff_buff': // 英雄技能特有，处理buff部分
        this.handleBuffEffect(skill, effectValue, attackerName, context.attackerType)
        break
      case 'debuff':
      case 'debuff_global':
        this.handleDebuffEffect(skill, effectValue, enemy, attackerName)
        break
      case 'summon':
        this.handleSummonEffect(skill, effectValue, attackerName, attackerAttack)
        break
      case 'passive_stat':
      case 'passive_stat_chance':
        // 被动属性加成通常在计算面板属性时处理，这里可以留空或记录日志
        this.addBattleLog({
          type: 'info',
          message: `${attackerName} 的被动技能 ${skill.name} 效果已激活`,
          timestamp: Date.now()
        })
        break
      case 'none': // 占位技能
        this.addBattleLog({
          type: 'info',
          message: `${attackerName} 使用了占位技能 ${skill.name}`,
          timestamp: Date.now()
        })
        break
      default:
        this.addBattleLog({ type: 'warning', message: `未知技能效果类型: ${skill.effectType}`, timestamp: Date.now() })
        return false
    }
    return true
  }

  /**
   * 根据技能等级计算实际效果值
   * @param {object} skill 技能数据
   * @param {number} level 技能当前等级
   * @returns {number} 计算后的效果值
   */
  calculateSkillEffect(skill, level) {
    if (!skill || !skill.baseEffect) return 0

    // 假设技能效果值是线性增长的
    // 可以根据需要调整这里的计算逻辑，例如：
    // effect = baseEffect.value + (level - 1) * levelMultiplier
    // 如果 baseEffect.value 是百分比 (如攻击力加成)，则直接使用
    return skill.baseEffect.value * (1 + (level - 1) * 0.1) // 假设每级提升10%
  }

  // 处理伤害效果
  handleDamageEffect(skill, effectValue, enemy, attackerAttack, attackerName) {
    let damage = 0
    let message = ''

    if (skill.baseEffect.type === 'attack') {
      damage = Math.floor(attackerAttack * effectValue)
      if (skill.baseEffect.hitCount) {
        damage *= skill.baseEffect.hitCount
        message = `${attackerName} 的 ${skill.name} 对 ${enemy.name} 造成了 ${skill.baseEffect.hitCount} 次攻击，总计 ${formatLargeNumber(damage)} 伤害`
      } else {
        message = `${attackerName} 的 ${skill.name} 对 ${enemy.name} 造成了 ${formatLargeNumber(damage)} 伤害`
      }
    } else if (skill.baseEffect.type === 'maxHealthDamage') {
      damage = Math.floor(enemy.maxHealth * effectValue)
      // 限制伤害不超过攻击力300% (这是根据郭嘉冰爆术描述的，实际需要更通用的逻辑)
      const maxDamageFromAttack = attackerAttack * 3 // 假设300%攻击力上限
      damage = Math.min(damage, maxDamageFromAttack)
      message = `${attackerName} 的 ${skill.name} 对 ${enemy.name} 造成了 ${formatLargeNumber(damage)} (基于最大生命值) 伤害`
    } else {
      message = `${attackerName} 的 ${skill.name} 触发了伤害效果，但类型未定义`
    }

    enemy.currentHealth -= damage
    this.addBattleLog({ type: 'skill-damage', message: message, timestamp: Date.now() })

    // 触发控制效果 (CC - Crowd Control)
    if (skill.baseEffect.cc) {
      this.handleCrowdControl(skill.baseEffect.cc, skill.baseEffect.ccDuration, enemy, attackerName)
    }

    // 触发自我治疗 (例如法老之眼)
    if (skill.baseEffect.selfHeal) {
      const healAmount = Math.floor(this.gameStore.character.maxHealth * skill.baseEffect.selfHeal)
      this.gameStore.character.currentHealth = Math.min(this.gameStore.character.maxHealth, this.gameStore.character.currentHealth + healAmount)
      this.addBattleLog({ type: 'skill-heal', message: `${attackerName} 的 ${skill.name} 使自身回复了 ${formatLargeNumber(healAmount)} 生命`, timestamp: Date.now() })
    }

    // 触发自我Buff (例如七进七出)
    if (skill.baseEffect.selfBuff && context.attackerType === 'player') {
      this.handleSelfBuff(skill.baseEffect.selfBuff, attackerName)
    }
  }

  // 处理增益效果 (Buff)
  handleBuffEffect(skill, effectValue, targetName, attackerType) {
    let message = `${targetName} 的 ${skill.name} 触发了增益效果`
    
    // 这里需要更精细的Buff管理系统，目前仅作日志记录
    switch (skill.baseEffect.type) {
      case 'attackSpeed':
        message = `${targetName} 的 ${skill.name} 提升了攻击速度！`
        // 实际需要添加到 gameStore.character.activeBuffs 或 hero.activeBuffs
        break
      case 'shield':
        message = `${targetName} 的 ${skill.name} 获得了护盾！`
        // 实际需要添加到角色护盾值
        break
      case 'cooldownReduction':
        message = `${targetName} 的 ${skill.name} 减少了技能冷却！`
        // 实际需要修改技能冷却时间
        break
      // ... 其他buff类型
    }
    this.addBattleLog({ type: 'skill-buff', message: message, timestamp: Date.now() })

    // 处理自我Buff (针对被动英雄技能中的自我Buff)
    if (skill.baseEffect.selfBuff && attackerType === 'hero') { // 确保是英雄技能且是自我Buff
        this.handleSelfBuff(skill.baseEffect.selfBuff, targetName)
    }
  }

  // 处理减益效果 (Debuff)
  handleDebuffEffect(skill, effectValue, targetEnemy, attackerName) {
    let message = `${attackerName} 的 ${skill.name} 对 ${targetEnemy.name} 施加了减益效果`
    
    // 这里需要更精细的Debuff管理系统，目前仅作日志记录
    switch (skill.baseEffect.type) {
      case 'stunResist':
        message = `${attackerName} 的 ${skill.name} 降低了 ${targetEnemy.name} 的眩晕抵抗！`
        // 实际需要添加到 gameStore.battle.enemy.activeDebuffs
        break
      case 'damage_taken_increase':
        message = `${attackerName} 的 ${skill.name} 降低了 ${targetEnemy.name} 的防御，使其受到伤害增加！`
        // 实际需要添加到 gameStore.battle.enemy.activeDebuffs
        break
      // ... 其他debuff类型
    }
    this.addBattleLog({ type: 'skill-debuff', message: message, timestamp: Date.now() })
  }

  // 处理召唤效果
  handleSummonEffect(skill, effectValue, attackerName, attackerAttack) {
    let message = `${attackerName} 的 ${skill.name} 召唤了随从！`
    // 这里可以根据 skill.baseEffect.minionId 召唤具体的随从
    // 简化处理：随从立即造成一次伤害
    if (skill.baseEffect.minionId) {
      const minionDamage = Math.floor(attackerAttack * skill.baseEffect.value)
      this.gameStore.battle.enemy.currentHealth -= minionDamage
      message += ` 随从对敌人造成了 ${formatLargeNumber(minionDamage)} 伤害。`
    }
    this.addBattleLog({ type: 'skill-summon', message: message, timestamp: Date.now() })
  }

  // 处理控制效果 (CC)
  handleCrowdControl(ccType, duration, targetEnemy, attackerName) {
    let message = ''
    switch (ccType) {
      case 'freeze':
        message = `${attackerName} 的技能使 ${targetEnemy.name} 冰冻了 ${duration} 秒！`
        // 实际需要暂停敌人行动
        break
      case 'stun':
        message = `${attackerName} 的技能使 ${targetEnemy.name} 眩晕了 ${duration} 秒！`
        // 实际需要暂停敌人行动
        break
      case 'knockback':
      case 'knockback_area':
        message = `${attackerName} 的技能击退了 ${targetEnemy.name}！`
        // 实际需要调整敌人位置
        break
      // ... 其他控制效果
    }
    this.addBattleLog({ type: 'skill-cc', message: message, timestamp: Date.now() })
  }

  // 处理自我增益（Buff）
  handleSelfBuff(buffEffect, attackerName) {
    let message = `${attackerName} 获得了增益：`
    switch (buffEffect.type) {
      case 'attackSpeed':
        message += `攻击速度提升${(buffEffect.value * 100).toFixed(0)}%`
        // 实际应用 buff 到 gameStore.character 或对应英雄属性
        break
      case 'block':
        message += `格挡率提升${(buffEffect.value * 100).toFixed(0)}%`
        // 实际应用 buff
        break
      // ... 其他自我buff类型
    }
    this.addBattleLog({ type: 'skill-self-buff', message: message, timestamp: Date.now() })
  }

  // 更新活跃效果（例如持续伤害、Buff/Debuff的倒计时）
  updateEffects() {
    // 遍历 activeEffects 数组，处理每个效果
    // 示例：这里可以处理持续伤害 DoT (Damage over Time)
    // this.activeEffects.forEach(effect => {
    //   if (effect.type === 'dot' && Date.now() - effect.lastTick >= effect.tickInterval) {
    //     this.gameStore.battle.enemy.currentHealth -= effect.damagePerTick;
    //     effect.lastTick = Date.now();
    //     this.addBattleLog(`敌人受到 ${effect.damagePerTick} 持续伤害`);
    //   }
    //   effect.duration -= 100; // 假设每100ms更新一次
    // });
    // this.activeEffects = this.activeEffects.filter(effect => effect.duration > 0);
  }
} 