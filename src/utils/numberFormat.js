// 大数显示转换函数 - 使用26位字母作为千分制单位
export function formatLargeNumber(num) {
  if (num < 1000) return Math.floor(num).toString()
  // 26位字母单位系统
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const units = []
  // 生成单位：A=1e3, B=1e6, C=1e9, ..., Z=1e78, AA=1e81, AB=1e84...
  for (let i = 0; i < 100; i++) { // 支持到100个单位
    let symbol = ''
    let temp = i
    if (temp < 26) {
      symbol = alphabet[temp]
    } else {
      // 双字母单位：AA, AB, AC...
      const first = Math.floor(temp / 26) - 1
      const second = temp % 26
      symbol = alphabet[first] + alphabet[second]
    }
    const value = Math.pow(1000, i + 1)
    units.unshift({ value, symbol })
  }
  for (let unit of units) {
    if (num >= unit.value) {
      const value = (num / unit.value).toFixed(2)
      return `${value}${unit.symbol}`
    }
  }
  return Math.floor(num).toString()
}

// 计算升级费用
export function calculateUpgradeCost(baseLevel, currentLevel, baseCost = 100) {
  return Math.floor(baseCost * Math.pow(1.15, currentLevel))
}

// 计算属性值
export function calculateAttributeValue(baseValue, level, growthRate = 1.1) {
  return Math.floor(baseValue * Math.pow(growthRate, level))
}