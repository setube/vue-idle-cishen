<template>
  <div class="equipment-page">
    <div class="page-header">
      <h2>装备系统</h2>
      <n-button type="primary" @click="batchUpgrade" size="large">一键升级</n-button>
    </div>

    <!-- 当前装备显示 -->
    <div class="equipped-section">
      <h3>当前装备</h3>
      <div class="equipped-slots">
        <div class="equipment-slot weapon">
          <div class="slot-label">武器</div>
          <div v-if="equippedWeapon" class="equipped-item" @click="showEquipmentDetail(equippedWeapon)">
            <div class="equipment-name">{{ getEquipmentName(equippedWeapon.id) }}</div>
            <div class="equipment-level">Lv.{{ equippedWeapon.level }}</div>
          </div>
          <div v-else class="empty-slot">
            <div class="empty-text">未装备</div>
          </div>
        </div>

        <div class="equipment-slot armor">
          <div class="slot-label">防具</div>
          <div v-if="equippedArmor" class="equipped-item" @click="showEquipmentDetail(equippedArmor)">
            <div class="equipment-name">{{ getEquipmentName(equippedArmor.id) }}</div>
            <div class="equipment-level">Lv.{{ equippedArmor.level }}</div>
          </div>
          <div v-else class="empty-slot">
            <div class="empty-text">未装备</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 装备分类标签 -->
    <n-tabs v-model:value="activeTab" type="line" animated>
      <n-tab-pane name="weapons" tab="武器">
        <div class="equipment-grid">
          <div
            v-for="weapon in weapons"
            :key="weapon.id"
            class="equipment-card"
            :class="{ owned: isOwned(weapon.id) }"
            @click="showEquipmentDetail(weapon)"
          >
            <div class="equipment-name" :style="{ color: getQualityColor(weapon.quality) }">
              {{ weapon.name }}
            </div>
            <div class="equipment-quality">{{ getQualityName(weapon.quality) }}</div>
            <div v-if="isOwned(weapon.id)" class="owned-badge">已拥有</div>
            <div v-else class="fragments-info">
              碎片: {{ getFragmentCount(weapon.id) }}/{{ getRequiredFragments(weapon.quality) }}
            </div>
          </div>
        </div>
      </n-tab-pane>
      <n-tab-pane name="armors" tab="防具">
        <div class="equipment-grid">
          <div
            v-for="armor in armors"
            :key="armor.id"
            class="equipment-card"
            :class="{ owned: isOwned(armor.id) }"
            @click="showEquipmentDetail(armor)"
          >
            <div class="equipment-name" :style="{ color: getQualityColor(armor.quality) }">
              {{ armor.name }}
            </div>
            <div class="equipment-quality">{{ getQualityName(armor.quality) }}</div>
            <div v-if="isOwned(armor.id)" class="owned-badge">已拥有</div>
            <div v-else class="fragments-info">
              碎片: {{ getFragmentCount(armor.id) }}/{{ getRequiredFragments(armor.quality) }}
            </div>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
    <!-- 装备详情弹窗 -->
    <n-modal v-model:show="showDetailModal" preset="card" style="width: 400px">
      <template #header>
        <span :style="{ color: getQualityColor(selectedEquipment?.quality) }">
          {{ selectedEquipment?.name }}
        </span>
      </template>
      <div v-if="selectedEquipment" class="equipment-detail">
        <div class="detail-header">
          <div class="equipment-info">
            <div class="equipment-name">{{ selectedEquipment.name }}</div>
            <div class="equipment-quality">{{ getQualityName(selectedEquipment.quality) }}</div>
            <div class="owned-status">
              {{ isOwned(selectedEquipment.id) ? '已拥有' : '未拥有' }}
            </div>
          </div>
        </div>
        <div v-if="ownedEquipmentData" class="equipment-stats">
          <div class="stat-row">
            <span>等级:</span>
            <span>{{ ownedEquipmentData.level }}</span>
          </div>
          <div class="stat-row">
            <span>经验:</span>
            <span>{{ ownedEquipmentData.experience }}/2</span>
          </div>
          <div class="exp-bar">
            <div class="exp-bg">
              <div class="exp-fill" :style="{ width: getExpPercentage() + '%' }"></div>
            </div>
          </div>
        </div>

        <div class="equipment-effects">
          <div class="effect-section">
            <h4>拥有效果</h4>
            <div class="effect-text">
              {{ getEffectDescription(selectedEquipment, 'base') }}
            </div>
          </div>
          <div class="effect-section">
            <h4>装备效果</h4>
            <div class="effect-text">
              {{ getEffectDescription(selectedEquipment, 'equip') }}
            </div>
          </div>
        </div>

        <div class="fragment-info">
          <div class="fragment-count">碎片: {{ getFragmentCount(selectedEquipment.id) }}</div>
        </div>

        <div class="action-buttons">
          <template v-if="isOwned(selectedEquipment.id)">
            <n-button v-if="!isEquipped(selectedEquipment.id)" type="primary" @click="equipItem" block>装备</n-button>
            <n-button v-else type="warning" @click="unequipItem" block>卸下</n-button>
            <n-button v-if="canUpgrade()" type="success" @click="upgradeItem" block style="margin-top: 8px">
              升级 (需要{{ getUpgradeFragments() }}碎片)
            </n-button>
          </template>
          <template v-else>
            <n-button v-if="canSynthesize()" type="primary" @click="synthesizeItem" block>
              合成 (需要{{ getRequiredFragments(selectedEquipment.quality) }}碎片)
            </n-button>
            <n-button v-else disabled block>碎片不足</n-button>
          </template>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { NButton, NTabs, NTabPane, NModal } from 'naive-ui'
  import { useGameStore } from '../stores/gameStore'
  import {
    getWeapons,
    getArmors,
    getAllEquipment,
    calculateEquipmentEffect,
    calculateEquipmentFragmentsRequired,
    canUpgradeEquipment,
    upgradeEquipment,
    batchUpgradeEquipment,
    synthesizeEquipment,
    equipEquipment,
    unequipEquipment
  } from '../utils/equipmentUtils'
  import { equipmentQualities, equipmentFragmentRequirements } from '../data/equipmentData'
  import { formatLargeNumber } from '../utils/numberFormat'

  const gameStore = useGameStore()
  const activeTab = ref('weapons')
  const showDetailModal = ref(false)
  const selectedEquipment = ref(null)

  const weapons = computed(() => getWeapons())
  const armors = computed(() => getArmors())

  const equippedWeapon = computed(() => {
    const weaponId = gameStore.equipment?.equippedEquipment?.weapon
    if (!weaponId) return null
    return gameStore.equipment.ownedEquipment.find(eq => eq.id === weaponId)
  })

  const equippedArmor = computed(() => {
    const armorId = gameStore.equipment?.equippedEquipment?.armor
    if (!armorId) return null
    return gameStore.equipment.ownedEquipment.find(eq => eq.id === armorId)
  })

  const ownedEquipmentData = computed(() => {
    if (!selectedEquipment.value) return null
    return gameStore.equipment?.ownedEquipment?.find(eq => eq.id === selectedEquipment.value.id)
  })

  const getEquipmentIcon = equipmentId => {
    const equipment = getAllEquipment()[equipmentId]
    return equipment?.icon || '❓'
  }

  const getEquipmentName = equipmentId => {
    const equipment = getAllEquipment()[equipmentId]
    return equipment?.name || '未知装备'
  }

  const getQualityColor = quality => {
    return equipmentQualities[quality]?.color || '#6c757d'
  }

  const getQualityName = quality => {
    return equipmentQualities[quality]?.name || '未知'
  }

  const isOwned = equipmentId => {
    return gameStore.equipment?.ownedEquipment?.some(eq => eq.id === equipmentId) || false
  }

  const isEquipped = equipmentId => {
    const equipped = gameStore.equipment?.equippedEquipment
    return equipped?.weapon === equipmentId || equipped?.armor === equipmentId
  }

  const getFragmentCount = equipmentId => {
    return gameStore.equipment?.fragments?.[equipmentId] || 0
  }

  const getRequiredFragments = quality => {
    return equipmentFragmentRequirements[quality]?.summon || 10
  }

  const showEquipmentDetail = equipment => {
    selectedEquipment.value = equipment
    showDetailModal.value = true
  }

  const getExpPercentage = () => {
    if (!ownedEquipmentData.value) return 0
    return (ownedEquipmentData.value.experience / 2) * 100
  }

  const getEffectDescription = (equipment, type) => {
    if (!ownedEquipmentData.value) {
      // 显示基础效果
      if (type === 'base') {
        return `${equipment.baseEffect.type.includes('attack') ? '攻击力' : '生命力'}+${formatLargeNumber(equipment.baseEffect.value * 100)}%`
      } else {
        return `${equipment.equipEffect.type.includes('attack') ? '攻击力' : '生命力'}+${formatLargeNumber(equipment.equipEffect.value * 100)}`
      }
    }

    const effects = calculateEquipmentEffect(ownedEquipmentData.value)
    if (type === 'base') {
      return `${effects.baseType.includes('attack') ? '攻击力' : '生命力'}+${formatLargeNumber(effects.baseEffect * 100)}%`
    } else {
      return `+${effects.equipType.includes('attack') ? '攻击力' : '生命力'}${formatLargeNumber(effects.equipEffect * 100)}%`
    }
  }

  const canUpgrade = () => {
    if (!ownedEquipmentData.value) return false
    return canUpgradeEquipment(ownedEquipmentData.value, gameStore)
  }

  const getUpgradeFragments = () => {
    if (!ownedEquipmentData.value) return 0
    return calculateEquipmentFragmentsRequired(ownedEquipmentData.value, ownedEquipmentData.value.level)
  }

  const canSynthesize = () => {
    if (!selectedEquipment.value) return false
    const required = getRequiredFragments(selectedEquipment.value.quality)
    const available = getFragmentCount(selectedEquipment.value.id)
    return available >= required
  }

  const equipItem = () => {
    if (selectedEquipment.value) {
      equipEquipment(selectedEquipment.value.id, gameStore)
    }
  }

  const unequipItem = () => {
    if (selectedEquipment.value) {
      unequipEquipment(selectedEquipment.value.type, gameStore)
    }
  }

  const upgradeItem = () => {
    if (ownedEquipmentData.value) {
      upgradeEquipment(ownedEquipmentData.value, gameStore)
    }
  }

  const synthesizeItem = () => {
    if (selectedEquipment.value) {
      synthesizeEquipment(selectedEquipment.value.id, gameStore)
    }
  }

  const batchUpgrade = () => {
    const upgradedCount = batchUpgradeEquipment(gameStore)
    // 可以添加提示消息
  }
</script>

<style scoped>
  .equipment-page {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .equipped-section {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 20px;
  }

  .equipped-slots {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 12px;
  }

  .equipment-slot {
    border: 2px solid #dee2e6;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    background: white;
  }

  .slot-label {
    font-weight: bold;
    margin-bottom: 8px;
    color: #495057;
  }

  .equipped-item {
    cursor: pointer;
    transition: transform 0.2s;
  }

  .equipped-item:hover {
    transform: scale(1.05);
  }

  .equipment-name {
    font-weight: bold;
    margin-bottom: 4px;
  }

  .equipment-level {
    font-size: 12px;
    color: #6c757d;
  }

  .empty-slot {
    color: #6c757d;
  }

  .equipment-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 16px;
  }

  .equipment-card {
    border: 2px solid #dee2e6;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    background: white;
  }

  .equipment-card:hover {
    border-color: #007bff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .equipment-card.owned {
    border-color: #28a745;
    background: #f8fff8;
  }

  .equipment-quality {
    font-size: 12px;
    color: #6c757d;
    margin-bottom: 8px;
  }

  .owned-badge {
    background: #28a745;
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: bold;
  }

  .fragments-info {
    font-size: 10px;
    color: #6c757d;
  }

  .equipment-detail {
    space-y: 16px;
  }

  .detail-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }

  .equipment-info {
    flex: 1;
  }

  .owned-status {
    font-size: 12px;
    color: #6c757d;
  }

  .equipment-stats {
    background: #f8f9fa;
    border-radius: 4px;
    padding: 12px;
    margin-bottom: 16px;
  }

  .stat-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;
  }

  .exp-bar {
    width: 100%;
    height: 8px;
    margin-top: 8px;
  }

  .exp-bg {
    width: 100%;
    height: 100%;
    background: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
  }

  .exp-fill {
    height: 100%;
    background: linear-gradient(90deg, #007bff, #0056b3);
    transition: width 0.3s ease;
  }

  .equipment-effects {
    margin-bottom: 16px;
  }

  .effect-section {
    margin-bottom: 12px;
  }

  .effect-section h4 {
    margin: 0 0 4px 0;
    font-size: 14px;
    color: #495057;
  }

  .effect-text {
    font-size: 12px;
    color: #007bff;
    font-weight: bold;
  }

  .fragment-info {
    text-align: center;
    margin-bottom: 16px;
  }

  .fragment-count {
    font-size: 14px;
    color: #6c757d;
  }

  .action-buttons {
    space-y: 8px;
  }
</style>
