<template>
  <div class="game-container">
    <router-view />
  </div>
  <FeaturePanel />
</template>

<script setup>
  import FeaturePanel from './components/FeaturePanel.vue'
</script>

<style scoped>
  .game-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 16px;
    margin-bottom: 75px;
  }
</style>
