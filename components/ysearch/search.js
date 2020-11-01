// components/search/search.js
let keyword=''
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder:{
      type:String,
      value:'请输入关键字(左边按钮为发布短文)'
    },
    button:{
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
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    y_value:''
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
    }
  }
})
