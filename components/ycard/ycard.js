// components/ycard/ycard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blog:{
      type:Object,
      value:{
        avatarUrl:'',
        createTime:'',
        nickName:'',
        content:'',
        img:[]
      }
    },
    txtIndent:{
      type:Number,
      value:0
    }
  },

  // 监听器
  observers: {
    ['blog.createTime'](val) {
      if (val) {
        this.setData({
          _createTime: this.formatTime(new Date(val))
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPreviewImage(event) {
      const ds = event.target.dataset
      wx.previewImage({
        urls: ds.imgs,
        current: ds.imgsrc,
      })
    },
    formatTime(date){
      let fmt = 'yyyy-MM-dd hh:mm:ss'
      const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分钟
        's+': date.getSeconds(), // 秒
      }
      
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, date.getFullYear())
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, o[k].toString().length == 1 ? '0' + o[k] : o[k])
        }
      }
      return fmt
    }
  }
})
