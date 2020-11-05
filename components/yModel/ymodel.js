// components/yModel/ymodel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    md:{
      type:String,
      value:'86%'
    },
    title:{
      type:String,
      value:'提示'
    },
    center:{
      type:Number,
      value:0
    },
    fail:{
      type:String,
      value:'取消'
    },
    suc:{
      type:String,
      value:'确定'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    back:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    trigger(){
      // 根据是否有这个值（true）让模态框消失
      setTimeout(()=>{
        this.triggerEvent('modelClosed',true)
      },300)
    },
    closed(){
      // 点击了取消按钮
      this.setData({
        back:true
      })
      this.triggerEvent('modelcomplete',0)
    },
    completed(){
      // 点击了确定按钮
      this.setData({
        back:true
      })
      this.triggerEvent('modelcomplete',1)
    }
  }
})
