// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url_two:'https://github.com/1314mxc/yunUI'
  },

  gonotice(){
    wx.navigateTo({
      url: '../notices/notices',
    })
  },

  gocoupon(){
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  },

  gotime(){
    wx.navigateTo({
      url: '../calendar/calendar',
    })
  },

  alphabetshow(){
    wx.navigateTo({
      url: '../alphabet/alphabet',
    })
  },

  modelshow(){
    wx.navigateTo({
      url: '../tdetail/tdetail',
    })
  },

  searchshow(){
    wx.navigateTo({
      url: '../search/search',
    })
  },

  cardshow(){
    wx.navigateTo({
      url: '../card/card',
    })
  },

  effectshow(){
    wx.navigateTo({
      url: '../RainSnow/rainsnow',
    })
  },

  butshow(){
    wx.navigateTo({
      url: '../ybutton/ybutton',
    })
  },

  ldshow(){
    wx.navigateTo({
      url: '../liandong/ld',
    })
  },

  pgshow(){
    wx.navigateTo({
      url: '../yImgShow/picture',
    })
  },

  noticeshow() {
    wx.navigateTo({
      url: '../notice/index',
    })
  },

  msgshow() {
    wx.navigateTo({
      url: '../message/index',
    })
  },

  longlistshow() {
    wx.navigateTo({
      url: '../ylistscroll/listscroll',
    })
  },

  cliptwo(){
    this.setclip(this.data.url_two)
  },

  setclip(data){
    wx.setClipboardData({
      //准备复制的数据内容
      data: data,
      success: function (res) {
        wx.showToast({
          title: '链接复制成功',
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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