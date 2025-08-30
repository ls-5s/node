// 从 mobx-miniprogram-bindings 导入 createStoreBindings 方法
import { createStoreBindings } from 'mobx-miniprogram-bindings'  
// 导入创建好的 Store 实例
import { store } from '../../store/store'  
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
// 按钮 tap 事件的处理函数
btnHandler1(e) {
  // 调用 Store 中绑定的 updateNum1 方法，传递 step 参数
  this.updateNum1(e.target.dataset.step)
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // 创建绑定关系：将 Store 的成员映射到当前页面
   this.storeBindings = createStoreBindings(this, {  
    store, // 关联的 Store 实例
    fields: ['numA', 'numB', 'sum'], // 绑定的 Store 数据字段
    actions: ['updateNum1'] // 绑定的 Store 方法（action）
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  // 销毁绑定，释放资源
  this.storeBindings.destroyStoreBindings()  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})