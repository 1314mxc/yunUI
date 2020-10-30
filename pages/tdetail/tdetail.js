// pages/tdetail/tdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    showed:false,   //第二个展示用弹窗控制变量
    center:1,
    md:'60%'
  },
  showone(){
    this.setData({
      show:true,
      fail:'取消',
      suc:'确定',
      title:'提示',
      md:'60%'
    })
  },
  showtwo(){
    this.setData({
      show:true,
      center:0,   //注意：这里只是为了减少展示wxml的代码，真实使用中不传此参数即可达到效果
      fail:'取消',
      suc:'确定',
      title:'提示',
      md:'60%'
    })
  },
  showthr(){
    this.setData({
      show:true,
      center:1,
      title:'我是云小梦',   //注意：这里只是为了减少展示wxml的代码，真实使用中不传此参数即可达到效果
      fail:'取消',
      suc:'确定',
      md:'60%'
    })
  },
  showfou(){
    this.setData({
      show:true,
      center:1,
      title:'提示',
      fail:'我知道了',   //注意：这里只是为了减少展示wxml的代码，真实使用中不传此参数即可达到效果
      suc:'OK',   //注意：这里只是为了减少展示wxml的代码，真实使用中不传此参数即可达到效果
      md:'60%'
    })
  },
  showfiv(){
    this.setData({
      md:'86%',
      show:true,
      center:1,
      title:'提示',
      fail:'我知道了',   //注意：这里只是为了减少展示wxml的代码，真实使用中不传此参数即可达到效果
      suc:'OK',   //注意：这里只是为了减少展示wxml的代码，真实使用中不传此参数即可达到效果
    })
  },
  showsix(){
    this.setData({
      showed:true,
    })
  },

  modelClosed(e){
    console.log(e.detail)
    if(e.detail){
      this.setData({
        show:false,
        showed:false   //这里只是为了展示，事实上：这两个变量都是控制显示与否的!
      })
    }
  },
  modelcomplete(e){
    console.log(e.detail)
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