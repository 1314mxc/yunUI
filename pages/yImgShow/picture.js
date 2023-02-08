Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnText: "图片选择排序（普通）",
    selOne: true
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
  change() {
    if(this.data.btnText == "图片选择排序（普通）") {
      this.setData({
        btnText: "增强图片排序",
        selOne: false
      })
    } else {
      this.setData({
        btnText: "图片选择排序（普通）",
        selOne: true
      })
    }
  }
})