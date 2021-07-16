let ifs=true;//这里添加一个开关，因为在设置一个scroll的滑动距离的时候会触发这个scroll的滑动事件，从而执行里面的事件，这样会做很多多余的操作，影响性能
Page({
  data: {
    title_x:0
  },
  handleTouchmove(e){
    this.setData({
      title_x:e.title_x
    })
  },
  onLoad: function (options) {
  
  }

})