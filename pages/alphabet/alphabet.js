// pages/alphabet/alphabet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {alphabet:'Top',datas:['a','a1']},
      {alphabet:'A',datas:['a','a1']},
      {alphabet:'B',datas:['b','b1','b2']},
      {alphabet:'C',datas:['c','c1','c2']},
      {alphabet:'D',datas:['d','d1','d2']},
      {alphabet:'E',datas:['e','e1','e2']},
      {alphabet:'F',datas:['f','f1','f2']},
      {alphabet:'G',datas:['g','g1','g2']},
      {alphabet:'H',datas:['h','h1','h2']},
      {alphabet:'I',datas:['i','i1','i2']},
      {alphabet:'J',datas:['j','j1','j2']},
      {alphabet:'K',datas:['k','k1','k2']},
      {alphabet:'L',datas:['l','l1','l2']},
      {alphabet:'M',datas:['m','m1','m2']},
      {alphabet:'N',datas:['n','n1','n2']},
      {alphabet:'O',datas:['o','o1','o2']},
      {alphabet:'P',datas:['p','p1','p2']},
      {alphabet:'Q',datas:['q','q1','q2']},
      {alphabet:'R',datas:['r','r1','r2']},
      {alphabet:'S',datas:['s','a1','a2']},
      {alphabet:'T',datas:['t','t1','t2']},
      {alphabet:'U',datas:['u','u1','u2']},
      {alphabet:'V',datas:['v','v1','v2']},
      {alphabet:'W',datas:['w','w1','w2']},
      {alphabet:'X',datas:['a','x1','x2']},
      {alphabet:'Y',datas:['b','y1','y2']},
      {alphabet:'Z',datas:['c','z1','z2']}
    ]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  selector(e){
    console.log(e.detail.city_data)
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