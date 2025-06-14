<template>
  <div class="quest-panel">
    <!-- <h3 class="panel-title">任务系统</h3> -->
    <div class="quest-stats">
      <div class="completed-count">已完成: {{ gameStore.quests.completedCount }}</div>
    </div>
    <div class="quest-list">
      <div
        v-for="quest in gameStore.quests.currentQuests"
        :key="quest.id"
        class="quest-item"
        :class="{ completed: quest.completed }"
      >
        <div class="quest-header">
          <div class="quest-name">{{ quest.name }}</div>
          <div class="quest-type-badge" :class="quest.type">{{ getQuestTypeName(quest.type) }}</div>
        </div>
        <div class="quest-description">
          {{ quest.description }}
          <div class="quest-progress">
            <span class="normal-progress">({{ quest.currentProgress }}/{{ quest.totalProgress }})</span>
          </div>
        </div>
        <div class="quest-reward">奖励: {{ quest.reward.amount }} {{ getRewardTypeName(quest.reward.type) }}</div>
        <div v-if="quest.completed" class="quest-completed">✅ 已完成</div>
        <div class="quest-progress-bar">
          <div class="progress-bg">
            <div class="progress-fill" :style="{ width: getProgressPercentage(quest) + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useGameStore } from '../stores/gameStore'
  import { initializeQuests } from '../utils/questUtils'

  const gameStore = useGameStore()

  // 任务类型名称映射
  const questTypeNames = {
    upgrade: '升级属性',
    stage: '闯关卡',
    summon: '召唤次数'
  }

  // 奖励类型名称映射
  const rewardTypeNames = {
    soulStone: '宝石',
    gold: '金币',
    experience: '经验'
  }

  const getQuestTypeName = type => {
    return questTypeNames[type] || '未知'
  }

  const getRewardTypeName = type => {
    return rewardTypeNames[type] || '未知'
  }

  const getProgressPercentage = quest => {
    if (quest.type === 'summon') {
      const skillProgress = quest.currentProgress.skill / quest.totalProgress
      const petProgress = quest.currentProgress.pet / quest.totalProgress
      const equipmentProgress = quest.currentProgress.equipment / quest.totalProgress
      return Math.min(100, ((skillProgress + petProgress + equipmentProgress) / 3) * 100)
    } else {
      return Math.min(100, (quest.currentProgress / quest.totalProgress) * 100)
    }
  }

  // 初始化任务系统
  onMounted(() => {
    initializeQuests(gameStore)
  })
</script>

<style scoped>
  .quest-panel {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 16px;
    border: 2px solid #e9ecef;
  }

  .panel-title {
    margin: 0 0 12px 0;
    color: #495057;
    font-size: 16px;
    text-align: center;
  }

  .quest-stats {
    text-align: center;
    margin-bottom: 16px;
    padding: 8px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #dee2e6;
  }

  .completed-count {
    font-size: 14px;
    font-weight: bold;
    color: #28a745;
  }

  .quest-list {
    space-y: 12px;
  }

  .quest-item {
    background: #ffffff;
    border: 2px solid #dee2e6;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
    transition: all 0.3s;
  }

  .quest-item:hover {
    border-color: #007bff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .quest-item.completed {
    border-color: #28a745;
    background: #f8fff8;
  }

  .quest-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .quest-name {
    font-size: 14px;
    font-weight: bold;
    color: #495057;
  }

  .quest-type-badge {
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 12px;
    color: white;
    font-weight: bold;
  }

  .quest-type-badge.upgrade {
    background: #007bff;
  }

  .quest-type-badge.stage {
    background: #dc3545;
  }

  .quest-type-badge.summon {
    background: #6f42c1;
  }

  .quest-description {
    font-size: 12px;
    color: #495057;
    margin-bottom: 8px;
    line-height: 1.4;
  }

  .quest-progress {
    margin-top: 4px;
  }

  .normal-progress {
    color: #28a745;
    font-weight: bold;
  }

  .summon-progress {
    color: #6f42c1;
    font-weight: bold;
    font-size: 10px;
  }

  .quest-reward {
    font-size: 11px;
    color: #fd7e14;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .quest-completed {
    font-size: 12px;
    color: #28a745;
    font-weight: bold;
    text-align: center;
    margin-bottom: 8px;
  }

  .quest-progress-bar {
    width: 100%;
    height: 6px;
  }

  .progress-bg {
    width: 100%;
    height: 100%;
    background: #e9ecef;
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #28a745, #20c997);
    transition: width 0.3s ease;
  }
</style>
