import {Particle,Snow} from '../../utils/effect'
let Rain=Particle
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shown:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        let width = res.windowWidth
        this.setData({
          width,
          scale: width / 375
        })
      }
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
    const ctx = wx.createCanvasContext('effect')
    const ctxx = wx.createCanvasContext('effect')
    let {width, scale} = this.data
    // 768 为 CSS 中设置的 rpx 值
    let height = 768 / 2 * scale
    // 下雨
    let rains = new Rain(ctxx, width, height, {
      amount: 100,
      speedFactor: 0.03
    })
    // 下雪
    let rain=new Snow(ctx, width, height, {
      amount: 100,
      speedFactor: 0.03
    })
    // 跑起来
    rains.run()
    rain.run()
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