// pages/shopList/shopList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List: {},
    // 数据列表，初始为空数组
    shopList: [],
    // 当前页码，初始为1
    page: 1,
    // 每页数据条数，初始为10
    pageSize: 10,
    // 总数据量，初始为0
    total: 0,
    island: false
  },
  getshopList() {
    this.setData({
      island: true
    })
    wx.showLoading({
      title: '数据加载中....',
    })
    wx.request({
      url: `https://applet-base-api-t.itheima.net/categories/${Number(this.data.List.id)}/shops`,
      method: "GET",
      data: {
        _page: this.data.page - 0,
        _pageSize: this.data.pageSize - 0
      },
      success: (res) => {
        // 合并数据并更新到页面
        this.setData({
          shopList: [...this.data.shopList, ...res.data],
          total: res.header['X-Total-Count'] - 0 // -0 是将字符串转为数字的简洁写法
        })
        console.log("图片路径示例：", res.data[0].images[0]); // 假设图片字段是 image
  // ... 其他代码
        console.log("成功", res.data)
        console.log(this.data.total)
        console.log(this.data.page)
      },
      fail(err) {
        console.log(err)
      },
      complete:() =>{
        wx.hideLoading()
        this.setData({
          island: false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    console.log(options)
    this.setData({
      List: options
    })
    this.getshopList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.List.title,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      page: 1,
      shopList: [],
      total:0
    })
    this.getshopList()
    wx.stopPullDownRefresh()


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

    if (this.data.page * this.data.pageSize >= this.data.total) {
      // 证明没有下一页的数据了
      return wx.showToast({
        title: '数据加载完毕！',
        icon: 'none'
      })
    }
    if(this.data.island) return
    this.setData({
      page: this.data.page + 1
    })
   
    this.getshopList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})