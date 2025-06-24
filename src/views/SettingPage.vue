<template>
  <div>
    <h1>设置</h1>
    <n-button @click="clearSave">清空存档</n-button>
    <n-button @click="openSource">开源地址</n-button>
  </div>
</template>

<script setup>
  const clearSave = () => {
    if (confirm('你确定要清空存档吗?')) {
      confirm('存档已清空')
      localStorage.clear('game')
      location.reload()
    }
  }

  const openSource = () => {
    window.open('https://github.com/setube/vue-idle-cishen', '_blank')
  }
</script>

<style scoped>
  .setting-page {
    padding: 20px;
  }
</style>
