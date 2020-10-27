// components/alphabet/alphabet.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[],
      topNum:0
    }
  },

  lifetimes:{
    attached:function(){
      try{
        var res=wx.getSystemInfoSync()
        this.apHeight=16
        this.offsetTop=80
        this.setData({
          windowHeight:res.windowHeight+'px'
        })
      }catch(e){}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    alpha:'',
    windowHeight:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlerAlphaTap(e){
      let {ap,index} = e.target.dataset
      if(index==0 && (ap=="Top" || ap=="top")){
        this.setData({
          topNum:this.data.topNum=0
        })
        return
      }
      this.setData({
        alpha:ap
      })
    },
    handlerMove(e){
      let {list}=this.properties
      let moveY=e.touches[0].clientY
      let rY=moveY-this.offsetTop
      if(rY>=0){
        let index=Math.ceil((rY-this.apHeight)/this.apHeight)
        if(0<=index<list.length){
          let nonwAp=list[index]
          nonwAp && this.setData({alpha:nonwAp.alphabet})
        }
      }
    },
    selector(e){
      this.triggerEvent('selector',{
        city_data:e.currentTarget.dataset.city
      })
    }
  }
})
