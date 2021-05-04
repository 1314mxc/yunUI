// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateTimes:[{day:'10-1',target:'国庆节'},{day:'10-2',target:'中秋节'},{day:'2020-10-24',target:'程序员节'},{day:'2021-5-1',target:'劳动节'}],
    selected:false,
    now_date:'',
    now_week:'',
    emotions: {
      '开心':'serene',
      '平静':'hehe',
      '难过':'sad'
    },  // 开心、平静、伤心、难过....设置一个值，这个值是下面colors里面的映射名。比如用户选择“开心”，你传的是“serene”和当前日期之类的
    colors: {
      serene: '#64d9fe',
      hehe: '#d3fc1e',
      ecstatic: '#f7dc0e',
      sad: '#ec238a',
      terrified: '#ee1aea'
    },
    DateColor:{
      day:'2021-5-1',
      serene:'serene'
    }
  },

  selected(){
    this.setData({
      selected:!this.data.selected,
      now_date:this.selectedDate,
      now_week:this.selectedWeek
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  timeload(e){
    console.log(e.detail)
    // 保存到变量中，在刚打开组件时显示到页面上初始值
    this.selectedDate=e.detail.selectedDate
    this.selectedWeek=e.detail.selectedWeek
  },

  timechanged(e){
    console.log(e.detail)
    this.setData({
      now_date:e.detail.selectedDate,
      now_week:e.detail.selectedWeek
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