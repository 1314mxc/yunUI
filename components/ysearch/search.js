// components/search/search.js
let keyword=''
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
      type:String,
      value:'false'
    },
    but_title:{
      type:String,
      value:'搜索'
    },
    y_bgcolor_bar:{
      type:String,
      value:'#f5f5f5'
    },
    y_bgcolor_but:{
      type:String,
      value:'#d43c33'
    },
    y_color:{
      type:String,
      value:'black'
    },
    y_center:{
      type:String,
      value:'true'
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
    text_center:true   //文字居中控制
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(event){
      keyword=event.detail.value
      if(this.properties.button=="false"){
        this.triggerEvent('search',{
          keyword
        })
      }
    },
    onSearch(){
      this.triggerEvent('mousetap',{
        keyword:this.data.y_value
      })
      if(this.properties.y_vshow){
        this.setData({
          y_value:''
        })
      }
    },
    onFucus(){
      this.setData({
        icon_center:false
      })
      setTimeout(()=>{
        this.setData({
          text_center:false
        })
      },350)
    }
  }
})
