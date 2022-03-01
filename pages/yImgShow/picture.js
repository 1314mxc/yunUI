const MAX_IMG_NUM=9;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[],
    selectPhoto:true,
    showMenuImg: false,
    flag: false,
    hidden:true,
    x:0,
    y:0,
    disabled: true,
    elements:[],
    doubleImg: "",
    yMovable: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //   this.initMove();
  },

  chooseImg(e) {
      console.log(e.detail)
  },
})