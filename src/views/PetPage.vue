<template>
  <div class="pet-page">
    <div class="page-header">
      <h2>宠物管理</h2>
      <div class="header-actions">
        <n-button type="primary" @click="batchUpgrade" :disabled="!canBatchUpgrade">一键升级</n-button>
      </div>
    </div>

    <n-tabs type="line" animated>
      <n-tab-pane name="list" tab="宠物列表">
        <div class="pet-slots">
          <h3>上阵宠物 ({{ gameStore.pets.activePets.length }}/{{ gameStore.pets.unlockedSlots }})</h3>
          <div class="active-pets">
            <div
              v-for="i in gameStore.pets.unlockedSlots"
              :key="i"
              class="pet-slot"
              :class="{ occupied: gameStore.pets.activePets[i - 1] }"
            >
              <div v-if="gameStore.pets.activePets[i - 1]" class="pet-in-slot">
                <div class="pet-icon">{{ getPetData(gameStore.pets.activePets[i - 1]).icon }}</div>
                <div class="pet-name">{{ getPetData(gameStore.pets.activePets[i - 1]).name }}</div>
                <n-button size="tiny" @click="undeployPet(gameStore.pets.activePets[i - 1])">下阵</n-button>
              </div>
              <div v-else class="empty-slot">
                <div class="slot-icon">+</div>
                <div class="slot-text">空槽位</div>
              </div>
            </div>
          </div>
        </div>

        <div class="pet-grid">
          <div
            v-for="petData in allPets"
            :key="petData.id"
            class="pet-card"
            :class="{ owned: isPetOwned(petData.id) }"
            @click="showPetDetail(petData)"
          >
            <div class="pet-quality" :style="{ backgroundColor: PET_QUALITIES[petData.quality].color }">
              {{ PET_QUALITIES[petData.quality].icon }}
            </div>
            <div class="pet-icon">{{ petData.icon }}</div>
            <div class="pet-name">{{ petData.name }}</div>
            <div class="pet-quality-text">{{ PET_QUALITIES[petData.quality].name }}</div>
            <div v-if="isPetOwned(petData.id)" class="pet-level">Lv.{{ getOwnedPet(petData.id).level }}</div>
            <div v-else class="pet-fragments">
              碎片: {{ gameStore.pets.fragments[petData.id] || 0 }}/{{ petData.fragmentsToSummon }}
            </div>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>

    <!-- 宠物详情弹窗 -->
    <n-modal v-model:show="showDetailModal" preset="card" style="width: 600px" title="宠物详情">
      <div v-if="selectedPet" class="pet-detail">
        <div class="detail-header">
          <div class="pet-avatar">
            <div class="pet-icon-large">{{ selectedPet.icon }}</div>
            <div class="pet-quality-badge" :style="{ backgroundColor: PET_QUALITIES[selectedPet.quality].color }">
              {{ PET_QUALITIES[selectedPet.quality].name }}
            </div>
          </div>
          <div class="pet-info">
            <h3>{{ selectedPet.name }}</h3>
            <div class="pet-tags">
              <n-tag v-for="tag in selectedPet.tags" :key="tag" size="small">
                {{ PET_TAGS[tag] }}
              </n-tag>
            </div>
          </div>
        </div>

        <div v-if="isPetOwned(selectedPet.id)" class="owned-pet-info">
          <div class="pet-stats">
            <div class="stat-row">
              <span>等级:</span>
              <span>{{ getOwnedPet(selectedPet.id).level }}</span>
            </div>
            <div class="stat-row">
              <span>攻击力:</span>
              <span>{{ formatLargeNumber(getOwnedPet(selectedPet.id).attack) }}</span>
            </div>
            <div class="stat-row">
              <span>攻击速度:</span>
              <span>{{ selectedPet.baseAttackSpeed }}</span>
            </div>
            <div class="stat-row">
              <span>攻击力加成:</span>
              <span>+{{ selectedPet.attackBonus * (getOwnedPet(selectedPet.id).level - 1) }}%</span>
            </div>
          </div>

          <div class="pet-actions">
            <n-button
              v-if="!gameStore.pets.activePets.includes(selectedPet.id)"
              type="primary"
              @click="deployPet(selectedPet.id)"
              :disabled="gameStore.pets.activePets.length >= gameStore.pets.unlockedSlots"
            >
              上阵
            </n-button>
            <n-button v-else type="warning" @click="undeployPet(selectedPet.id)">下阵</n-button>
            <n-button type="success" @click="upgradePet(selectedPet.id)" :disabled="!canUpgradePet(selectedPet.id)">
              升级 ({{ getPetUpgradeFragments(selectedPet, getOwnedPet(selectedPet.id).level) }}碎片)
            </n-button>
          </div>
        </div>

        <div v-else class="unowned-pet-info">
          <div class="fragments-info">
            <span>拥有碎片: {{ gameStore.pets.fragments[selectedPet.id] || 0 }}</span>
            <span>合成需要: {{ selectedPet.fragmentsToSummon }}</span>
          </div>
          <n-button
            type="primary"
            @click="synthesizePet(selectedPet.id)"
            :disabled="(gameStore.pets.fragments[selectedPet.id] || 0) < selectedPet.fragmentsToSummon"
          >
            合成
          </n-button>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { NTabs, NTabPane, NButton, NModal, NTag } from 'naive-ui'
  import { useGameStore } from '../stores/gameStore'
  import { PET_DATA, PET_QUALITIES, PET_TAGS } from '../data/petData'
  import {
    getPetUpgradeFragments,
    canUpgradePet as canUpgradePetUtil,
    upgradePet as upgradePetUtil,
    batchUpgradePets,
    synthesizePet as synthesizePetUtil,
    deployPet as deployPetUtil,
    undeployPet as undeployPetUtil
  } from '../utils/petUtils'
  import { formatLargeNumber } from '../utils/numberFormat'

  const gameStore = useGameStore()
  const showDetailModal = ref(false)
  const selectedPet = ref(null)

  const allPets = computed(() => Object.values(PET_DATA))

  const canBatchUpgrade = computed(() => {
    return gameStore.pets.ownedPets.some(pet => canUpgradePetUtil(pet, gameStore.pets.fragments[pet.id] || 0))
  })

  const isPetOwned = petId => {
    return gameStore.pets.ownedPets.some(pet => pet.id === petId)
  }

  const getOwnedPet = petId => {
    return gameStore.pets.ownedPets.find(pet => pet.id === petId)
  }

  const getPetData = petId => {
    return PET_DATA[petId]
  }

  const showPetDetail = petData => {
    selectedPet.value = petData
    showDetailModal.value = true
  }

  const canUpgradePet = petId => {
    const pet = getOwnedPet(petId)
    return pet && canUpgradePetUtil(pet, gameStore.pets.fragments[petId] || 0)
  }

  const upgradePet = petId => {
    const pet = getOwnedPet(petId)
    if (pet && upgradePetUtil(pet, gameStore)) {
      // 升级成功
    }
  }

  const synthesizePet = petId => {
    if (synthesizePetUtil(petId, gameStore)) {
      // 合成成功
    }
  }

  const deployPet = petId => {
    deployPetUtil(petId, gameStore)
  }

  const undeployPet = petId => {
    undeployPetUtil(petId, gameStore)
  }

  const batchUpgrade = () => {
    const upgradedCount = batchUpgradePets(gameStore)
    console.log(`批量升级了 ${upgradedCount} 只宠物`)
  }
</script>

<style scoped>
  .pet-page {
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

  .pet-slots {
    margin-bottom: 30px;
  }

  .active-pets {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }

  .pet-slot {
    width: 120px;
    height: 120px;
    border: 2px dashed #ddd;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
  }

  .pet-slot.occupied {
    border-color: #28a745;
    background: #d4edda;
  }

  .pet-in-slot {
    text-align: center;
  }

  .pet-in-slot .pet-icon {
    font-size: 24px;
    margin-bottom: 5px;
  }

  .pet-in-slot .pet-name {
    font-size: 12px;
    margin-bottom: 5px;
  }

  .empty-slot {
    text-align: center;
    color: #6c757d;
  }

  .slot-icon {
    font-size: 24px;
    margin-bottom: 5px;
  }

  .pet-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }

  .pet-card {
    border: 2px solid #e9ecef;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    background: #f8f9fa;
  }

  .pet-card:hover {
    border-color: #007bff;
    transform: translateY(-2px);
  }

  .pet-card.owned {
    border-color: #28a745;
    background: #d4edda;
  }

  .pet-quality {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 10px;
    font-size: 12px;
  }

  .pet-icon {
    font-size: 32px;
    margin-bottom: 10px;
  }

  .pet-name {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .pet-quality-text {
    font-size: 12px;
    color: #6c757d;
    margin-bottom: 5px;
  }

  .pet-level {
    color: #28a745;
    font-weight: bold;
  }

  .pet-fragments {
    color: #007bff;
    font-size: 12px;
  }

  .pet-detail {
    padding: 20px;
  }

  .detail-header {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }

  .pet-avatar {
    position: relative;
    text-align: center;
  }

  .pet-icon-large {
    font-size: 64px;
    margin-bottom: 10px;
  }

  .pet-quality-badge {
    padding: 4px 8px;
    border-radius: 4px;
    color: white;
    font-size: 12px;
    font-weight: bold;
  }

  .pet-info h3 {
    margin: 0 0 10px 0;
  }

  .pet-tags {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }

  .pet-stats {
    margin-bottom: 20px;
  }

  .stat-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 8px;
    background: #f8f9fa;
    border-radius: 4px;
  }

  .pet-actions {
    display: flex;
    gap: 10px;
  }

  .unowned-pet-info {
    text-align: center;
  }

  .fragments-info {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 4px;
  }
</style>
