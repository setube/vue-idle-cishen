<template>
  <div class="game-container">
    <router-view />
  </div>
</template>

<script setup></script>

<style scoped>
  .game-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 16px;
    background: #ffffff;
    min-height: 100vh;
  }
</style>
