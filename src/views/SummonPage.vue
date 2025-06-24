<template>
  <div class="summon-page">
    <div v-for="summonType in summonTypes" :key="summonType" class="summon-panel">
      <div class="summon-header">
        <h3>{{ getSummonTypeName(summonType) }}</h3>
        <div class="level-info">
          <div class="summon-level">
            <span>召唤等级: {{ getLevelInfo(summonType).level }}</span>
            <div class="exp-bar">
              <div class="exp-progress" :style="{ width: getLevelInfo(summonType).expProgress + '%' }"></div>
              <span>{{ getLevelInfo(summonType).experience }}/{{ getLevelInfo(summonType).expRequired }}</span>
            </div>
          </div>
        </div>
        <div class="resources">
          <span>宝石: {{ formatLargeNumber(gameStore.resources.soulStone) }}</span>
        </div>
      </div>
      <!-- 召唤概率显示 -->
      <div class="rates-display">
        <h4>当前召唤概率 (等级 {{ getLevelInfo(summonType).level }})</h4>
        <div class="rates-grid">
          <div v-for="(rate, quality) in getCurrentRates(summonType)" :key="quality" class="rate-item">
            <span class="quality-name" :style="{ color: getQualityColor(quality) }">
              {{ getQualityName(quality) }}
            </span>
            <span class="rate-value">{{ rate.toFixed(4) }}%</span>
          </div>
        </div>
      </div>
      <div class="summon-cards">
        <div class="summon-card">
          <h4>召唤10次</h4>
          <n-button type="primary" @click="singleSummon(summonType)" :disabled="!canSingleSummon">500 宝石</n-button>
        </div>
        <div class="summon-card">
          <h4>召唤35次</h4>
          <n-button type="success" @click="tenSummon(summonType)" :disabled="!canTenSummon">1500 宝石</n-button>
        </div>
      </div>
    </div>
    <!-- 召唤结果弹窗 -->
    <n-modal v-model:show="showResultModal" preset="card" style="width: 600px" title="召唤结果">
      <div class="summon-results">
        <div v-for="result in summonResults" :key="result.id" class="result-item">
          <div class="result-icon">{{ result.icon }}</div>
          <div class="result-info">
            <div class="result-name">{{ result.name }}</div>
            <div class="result-quality" :style="{ color: getQualityColor(result.quality) }">
              {{ getQualityName(result.quality) }}
            </div>
            <div class="result-type">{{ result.isNew ? '新获得' : '转换为碎片' }}</div>
          </div>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { NButton, NModal } from 'naive-ui'
  import { useGameStore } from '../stores/gameStore'
  import { formatLargeNumber } from '../utils/numberFormat'
  import { getSummonLevelInfo, performSummonByType } from '../utils/summonUtils'
  import { equipmentQualities } from '../data/equipmentData'
  import { PET_QUALITIES } from '../data/petData'
  import { SKILL_QUALITIES } from '../data/skillData'
  import { getSummonRates } from '../data/summonRates'
  import { updateQuestProgress } from '../utils/questUtils'

  const gameStore = useGameStore()
  const showResultModal = ref(false)
  const summonResults = ref([])

  // 定义三个召唤类型
  const summonTypes = ['skill', 'pet', 'equipment']

  // 获取召唤类型名称
  const getSummonTypeName = type => {
    const names = {
      skill: '技能召唤',
      pet: '宠物召唤',
      equipment: '装备召唤'
    }
    return names[type] || '未知召唤'
  }

  // 获取召唤等级信息
  const getLevelInfo = type => {
    return (
      getSummonLevelInfo(gameStore, type) || {
        level: 1,
        experience: 0,
        expRequired: 10,
        expProgress: 0,
        isMaxLevel: false
      }
    )
  }

  // 获取当前等级的召唤概率
  const getCurrentRates = type => {
    const levelInfo = getLevelInfo(type)
    return getSummonRates(levelInfo.level)
  }

  const canSingleSummon = computed(() => {
    return gameStore.resources.soulStone >= 500
  })

  const canTenSummon = computed(() => {
    return gameStore.resources.soulStone >= 1500
  })

  const getQualityColor = quality => {
    // 根据不同类型获取品质颜色
    const allQualities = { ...equipmentQualities, ...PET_QUALITIES, ...SKILL_QUALITIES }
    return allQualities[quality]?.color || '#6c757d'
  }

  const getQualityName = quality => {
    // 根据不同类型获取品质名称
    const allQualities = { ...equipmentQualities, ...PET_QUALITIES, ...SKILL_QUALITIES }
    return allQualities[quality]?.name || '未知'
  }

  const performSummon = (type, count) => {
    console.log(type, count)
    const results = performSummonByType(gameStore, type, count)
    summonResults.value = results
    showResultModal.value = true

    // 更新任务进度
    updateQuestProgress(
      gameStore,
      {
        type: 'summon',
        summonType: type
      },
      count
    )
  }

  const singleSummon = type => {
    if (gameStore.resources.soulStone >= 500) {
      gameStore.resources.soulStone -= 500
      performSummon(type, 10)
    }
  }

  const tenSummon = type => {
    if (gameStore.resources.soulStone >= 1500) {
      gameStore.resources.soulStone -= 1500
      performSummon(type, 35)
    }
  }
</script>

<style scoped>
  .summon-page {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .summon-panel {
    border: 2px solid #e9ecef;
    border-radius: 12px;
    padding: 20px;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .summon-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e9ecef;
  }

  .resources {
    display: flex;
    gap: 20px;
    font-size: 14px;
    color: #6c757d;
  }

  .summon-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .summon-card {
    border: 2px solid #e9ecef;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    background: #f8f9fa;
  }

  .summon-card h4 {
    margin: 0 0 10px 0;
    color: #495057;
  }

  .summon-results {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    max-height: 400px;
    overflow-y: auto;
  }

  .result-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    background: #f8f9fa;
  }

  .result-icon {
    font-size: 32px;
  }

  .result-info {
    flex: 1;
  }

  .result-name {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .result-quality {
    font-size: 12px;
    margin-bottom: 5px;
  }

  .result-type {
    font-size: 12px;
    color: #6c757d;
  }

  .level-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 20px;
  }

  .summon-level {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .exp-bar {
    width: 200px;
    height: 20px;
    background: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .exp-progress {
    height: 100%;
    background: linear-gradient(90deg, #28a745, #20c997);
    transition: width 0.3s ease;
  }

  .exp-bar span {
    color: #ccc;
    position: absolute;
    top: 0px;
    right: 50%;
    left: 42%;
    text-align: center;
  }

  .rates-display {
    margin-bottom: 20px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .rates-display h4 {
    margin: 0 0 10px 0;
    text-align: center;
  }

  .rates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }

  .rate-item {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    background: white;
    border-radius: 4px;
    border: 1px solid #e9ecef;
  }

  .quality-name {
    font-weight: bold;
  }

  .rate-value {
    color: #6c757d;
  }
</style>
