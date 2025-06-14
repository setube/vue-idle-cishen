<template>
  <div class="top-resource-bar">
    <div class="resource-item">
      <div class="resource-label">金币</div>
      <div class="resource-value primary">{{ formatLargeNumber(gameStore.resources.gold) }}</div>
    </div>
    <div class="resource-item">
      <div class="resource-label">宝石</div>
      <div class="resource-value secondary">{{ formatLargeNumber(gameStore.resources.soulStone) }}</div>
    </div>
    <div class="resource-item">
      <div class="resource-label">星钻</div>
      <div class="resource-value special">{{ formatLargeNumber(gameStore.resources.diamond) }}</div>
    </div>
  </div>
</template>

<script setup>
  import { useGameStore } from '../stores/gameStore'
  import { formatLargeNumber } from '../utils/numberFormat'

  const gameStore = useGameStore()
</script>

<style scoped>
  .top-resource-bar {
    display: flex;
    justify-content: space-around;
    padding: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 8px;
    margin-bottom: 16px;
  }

  .resource-item {
    text-align: center;
    flex: 1;
  }

  .resource-label {
    font-size: 12px;
    opacity: 0.8;
    margin-bottom: 4px;
  }

  .resource-value {
    font-size: 18px;
    font-weight: bold;
  }

  .resource-value.primary {
    color: #ffd700;
  }

  .resource-value.secondary {
    color: #87ceeb;
  }

  .resource-value.special {
    color: #ff69b4;
  }
</style>
