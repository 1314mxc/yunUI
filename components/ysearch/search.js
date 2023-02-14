// components/search/search.js
let keyword = ''
let cacheSize = {}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    y_placeholder:{
      type:String,
      value:'请输入查询关键字'
    },
    y_button:{
      type: Boolean,
      value: false
    },
    btnSize: {
      type: Number,
      value: 108
    },
    aniBtn: {
      type: Boolean,
      value: false
    },
    y_bgcolor_bar:{
      type:String,
      value:'#f5f5f5'
    },
    y_color:{
      type:String,
      value:'black'
    },
    y_center:{
      type: Boolean,
      value: true
    },
    y_vshow:{
      type:Number,
      value:1
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    y_value:'',
    icon_center:true,  //图标居中控制
    text_center:true,   //文字居中控制
    show_text_c: true,
    sizeBtn: 0,
    sizeFont: 27,
    btnAni: false
  },

  lifetimes:{
    // 在这个生命周期中只能拿到传参的初始值(就是页面data中的值)
    attached(){
      if(this.properties.y_button && this.properties.aniBtn) {
        cacheSize = this.properties.btnSize
        this.setData({
          btnAni: this.properties.aniBtn
        })
      } else {
        this.setData({
          sizeBtn: this.properties.btnSize
        })
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(event){
      keyword=event.detail.value
      this.setData({
        show_text_c: keyword ? false : true
      })
      if(!this.properties.y_button){
        this.triggerEvent('search',{
          keyword
        })
      }
    },
    onSearch(){
      this.triggerEvent('mousetap',{
        keyword:this.data.y_value
      })
      if(this.properties.aniBtn) {
        this.setData({
          y_value: '',
          sizeBtn: 0,
          icon_center: true,
          text_center: true,
          show_text_c: true
        })
      }else if(this.properties.y_vshow){
        this.setData({
          y_value:'',
          icon_center: true,
          text_center: true,
          show_text_c: true
        })
      }
    },
    onBlur() {
      this.triggerEvent('blur', {})
    },
    onFucus(){
      if(this.properties.aniBtn) {
        this.setData({
          icon_center:false,
          sizeBtn: cacheSize
        })
      }else {
        this.setData({
          icon_center:false
        })
      }
      setTimeout(()=>{
        this.setData({
          text_center:false
        })
      },350)
    }
  }
})
