import {Time} from '../../utils/date_time';
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
    },
    ani:{
      type:String,
      value:''
    }
  },

  // 监听器
  observers: {
    ['blog.createTime'](val) {
      if (val) {
        let k=1
        for(let i in val){
          if(isNaN(val[i])){
            k=0
            break
          }
        }
        // 判断接收的是不是“非法日期”
        val=k?(+val):val
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
      return Time.getFormatTime(date);
    }
  }
})
