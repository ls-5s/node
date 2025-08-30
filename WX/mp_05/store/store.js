// 导入MobX核心API
import { observable, action } from 'mobx-miniprogram'

// 创建并导出响应式Store实例
export const store = observable({
  // 定义响应式数据（状态）
  numA: 1,
  numB: 2,

  // 计算属性（依赖numA和numB，自动响应数据变化）
  get sum() {
    return this.numA + this.numB
  },

  // 定义修改数据的action方法（确保数据更新能触发响应）
  updateNum1: action(function (step) {
    this.numA += step
  }),
  updateNum2: action(function (step) {
    this.numB += step
  })
})
