<template>
  <div class="attribute-upgrade">
    <!-- <h3 class="panel-title">数值升级</h3> -->
    <!-- 战斗力显示 -->
    <div class="combat-power">
      <div class="power-label">战斗力</div>
      <div class="power-value">{{ formatLargeNumber(totalCombatPower) }}</div>
    </div>
    <!-- 属性列表 -->
    <div class="attributes-list">
      <div
        v-for="(attr, key) in gameStore.character.attributes"
        :key="key"
        class="attribute-item"
        :class="{ disabled: !attr.unlocked && (key === 'attackSpeed' || key === 'tripleShot' || key === 'multiShot') }"
      >
        <div class="attr-header">
          <div class="attr-info">
            <span class="attr-name">{{ getAttributeName(key) }}</span>
            <span class="attr-level">Lv.{{ attr.level }}</span>
            <span
              v-if="!attr.unlocked && (key === 'attackSpeed' || key === 'tripleShot' || key === 'multiShot')"
              class="unlock-hint"
            >
              ({{ getUnlockHint(key) }})
            </span>
          </div>
        </div>
        <div class="attr-value">
          {{ formatAttributeValue(key, attr) }}
        </div>
        <div class="attr-upgrade">
          <n-button
            :disabled="
              !canUpgrade(key, attr) ||
              (!attr.unlocked && (key === 'attackSpeed' || key === 'tripleShot' || key === 'multiShot'))
            "
            type="primary"
            size="small"
            @click="upgradeAttribute(key)"
          >
            升级 {{ formatLargeNumber(getUpgradeCost(key, attr)) }}
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { NButton } from 'naive-ui'
  import { useGameStore } from '../stores/gameStore'
  import { formatLargeNumber, calculateUpgradeCost, calculateAttributeValue } from '../utils/numberFormat'
  import { updateQuestProgress } from '../utils/questUtils'

  const gameStore = useGameStore()

  // 计算总战斗力
  const totalCombatPower = computed(() => {
    const attrs = gameStore.character.attributes
    let power = 0
    power += calculateAttributeValue(attrs.attack.baseValue, attrs.attack.level) * 1
    power += calculateAttributeValue(attrs.health.baseValue, attrs.health.level) * 0.1
    power += calculateAttributeValue(attrs.healthRecover.baseValue, attrs.healthRecover.level) * 10
    power += attrs.critical.level * 100
    power += attrs.criticalDamage.level * 50
    power += attrs.multiShot.level * 500
    if (attrs.attackSpeed.unlocked) {
      power += attrs.attackSpeed.level * 200
    }
    if (attrs.tripleShot.unlocked) {
      power += attrs.tripleShot.level * 2000
    }
    return Math.floor(power)
  })

  const getAttributeName = key => {
    // 属性名称映射
    const attributeNames = {
      attack: '攻击',
      health: '生命',
      healthRecover: '生命恢复',
      attackSpeed: '攻击速度',
      critical: '暴击',
      criticalDamage: '暴击伤害',
      multiShot: '连射',
      tripleShot: '三连射'
    }
    return attributeNames[key] || key
  }

  const getUnlockHint = key => {
    if (key === 'attackSpeed') return '攻击200级解锁'
    if (key === 'multiShot') return '攻击速度200级解锁'
    if (key === 'tripleShot') return '连射1000级解锁'
    return ''
  }

  const formatAttributeValue = (key, attr) => {
    if (!attr.unlocked && (key === 'attackSpeed' || key === 'tripleShot' || key === 'multiShot')) {
      return '未解锁'
    }
    switch (key) {
      case 'attack':
      case 'health':
      case 'healthRecover':
        return formatLargeNumber(calculateAttributeValue(attr.baseValue, attr.level))
      case 'attackSpeed':
        return `${attr.level * 0.1}%`
      case 'critical':
        return `${attr.level - 1}%`
      case 'criticalDamage':
        return `${attr.level + 119}%`
      case 'multiShot':
      case 'tripleShot':
        return `${attr.level}%`
      default:
        return attr.level.toString()
    }
  }

  const getUpgradeCost = (key, attr) => {
    const baseCosts = {
      attack: 100,
      health: 80,
      healthRecover: 50,
      attackSpeed: 200,
      critical: 150,
      criticalDamage: 300,
      multiShot: 500,
      tripleShot: 2000
    }
    return calculateUpgradeCost(1, attr.level, baseCosts[key] || 10)
  }

  const canUpgrade = (key, attr) => {
    const cost = getUpgradeCost(key, attr)
    return gameStore.resources.gold >= cost
  }

  const upgradeAttribute = key => {
    const attr = gameStore.character.attributes
    const cost = getUpgradeCost(key, attr[key])
    // 检查解锁条件
    if (key === 'attack' && !attr.attackSpeed.unlocked && attr.attack.level >= 200) {
      attr.attackSpeed.unlocked = true
    }
    if (key === 'attackSpeed' && !attr.multiShot.unlocked && attr.attackSpeed.level >= 200) {
      attr.multiShot.unlocked = true
    }
    if (key === 'multiShot' && !attr.multiShot.unlocked && attr.multiShot.level >= 1000) {
      attr.multiShot.unlocked = true
    }
    // 执行升级
    gameStore.resources.gold -= cost
    attr[key].level += 1
    // 更新任务进度
    updateQuestProgress(gameStore, {
      type: 'attribute_upgrade',
      attribute: attr[key]
    })
    // 更新角色最大生命值
    if (key === 'health') {
      const newMaxHealth = calculateAttributeValue(attr[key].baseValue, attr[key].level)
      const healthRatio = gameStore.character.currentHealth / gameStore.character.maxHealth
      gameStore.character.maxHealth = newMaxHealth
      gameStore.character.currentHealth = Math.floor(newMaxHealth * healthRatio)
    }
  }
</script>

<style scoped>
  .attribute-upgrade {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 16px;
    border: 2px solid #e9ecef;
  }

  .panel-title {
    margin: 0 0 16px 0;
    color: #495057;
    font-size: 16px;
    text-align: center;
  }

  .combat-power {
    text-align: center;
    margin-bottom: 20px;
    padding: 12px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 8px;
    color: white;
  }

  .power-label {
    font-size: 14px;
    opacity: 0.9;
    margin-bottom: 4px;
  }

  .power-value {
    font-size: 24px;
    font-weight: bold;
    color: #ffd700;
  }

  .attributes-list {
    display: flex;
    flex-wrap: wrap;
  }

  .attribute-item {
    background: white;
    border-radius: 6px;
    padding: 12px;
    border: 1px solid #dee2e6;
    transition: all 0.2s ease;
    width: calc(50% - 36px);
    margin: 5px;
  }

  .attribute-item:hover:not(.disabled) {
    border-color: #007bff;
    box-shadow: 0 2px 4px rgba(0, 123, 255, 0.1);
  }

  .attribute-item.disabled {
    opacity: 0.6;
    background: #f8f9fa;
  }

  .attr-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .attr-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .attr-level {
    background: #007bff;
    color: white;
    padding: 2px 6px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: bold;
  }

  .attr-name {
    font-weight: bold;
    color: #495057;
  }

  .unlock-hint {
    font-size: 10px;
    color: #6c757d;
    font-style: italic;
  }

  .attr-value {
    font-size: 16px;
    font-weight: bold;
    color: #28a745;
    margin-bottom: 8px;
  }

  .attr-upgrade {
    text-align: right;
  }
</style>
