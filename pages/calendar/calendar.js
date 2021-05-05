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
    DateColor:[]   // 心情签到用
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
    // 每次填写完心情要保存到本地，在进入页面时就拿到并填充到data中
    let dColor=wx.getStorageSync('DateColor')
    if(dColor){
      this.setData({
        DateColor:dColor
      })
    }

  },

  // 心情签到-模拟改变传值
  signIn(){
    // 这里用‘hehe’，你可以看做“用户签到时输入平静”然后在emotions关联表中发现开心对应的是hehe！
    let bgColor={day:'2021-5-8',serene:'hehe'};
    let dcolor=this.data.DateColor;
    dcolor.push(bgColor);
    
    wx.setStorage({
      key:'DateColor',
      data:dcolor,
      success:()=>{
        wx.showToast({
          title: '成功',
        })
        this.setData({
          DateColor:dcolor
        })
      }
    })
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
})