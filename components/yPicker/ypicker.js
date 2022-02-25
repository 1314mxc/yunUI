const meng_date = new Date();
let years = [];
let months = [];
let days = [];
let hours = [];
let minutes = [];
let seconds=[]
//获取年
for (let i = meng_date.getFullYear()-10; i <= meng_date.getFullYear() + 10; i++) {
  years.push("" + i);
}
//获取月份
for (let i = 1; i <= 12; i++) {
  months.push((i<10)?"0"+i:""+i);
}
//获取日期
for (let i = 1; i <= 31; i++) {
  days.push((i<10)?"0"+i:""+i);
}
//获取小时
for (let i = 0; i < 24; i++) {
  hours.push((i<10)?"0"+i:""+i);
}
//获取分钟
for (let i = 0; i < 60; i++) {
  minutes.push((i<10)?"0"+i:""+i);
}
//获取秒数
for (let i = 0; i < 60; i++) {
  seconds.push((i<10)?"0"+i:""+i);
}
Component({
  lifetimes:{
    // 这时节点树已创建完成，开始可以用setData渲染节点，但还无法操作节点
    attached:function(){
      this.appd()
      //设置刚开始默认的年份
      this.setData({
        choose_year: meng_date.getFullYear()
      })
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    yseo:{
      type:Boolean,
      value:false
    },
    open:Boolean,
    size:{
        type:String,
        value:'right'
    },
    color:String,
    time:String,
    defaulttext:{
        type:String,
        value:'请选择时间'
    },
    holder:String
  },
  /**
   * 组件的自身数据
   */
  data: {
    time: '',
    multiArray: [],
    multiIndex: [],
    choose_year:''
  },
  /**
   * 组件的方法列表
   */
  methods: {
    appd(){
      this.setData({
        multiArray: (!this.properties.yseo)?[years, months, days, hours, minutes]:[years, months, days, hours, minutes,seconds],
        multiIndex: (!this.properties.yseo)?[10, meng_date.getMonth(), meng_date.getDate()-1, meng_date.getHours(), meng_date.getMinutes()]:[10, meng_date.getMonth(), meng_date.getDate()-1, meng_date.getHours(), meng_date.getMinutes(),meng_date.getSeconds()],
      })
    },
    //获取时间日期 - 点进picker组件而什么也不干 && 每次触发完成后 -> 每次点击“确定”时携带值
    bindMultiPickerChange: function(e) {
      this.setData({
        multiIndex: e.detail.value
      })
      const index = this.data.multiIndex;
      const year = this.data.multiArray[0][index[0]];
      const month = this.data.multiArray[1][index[1]];
      const day = this.data.multiArray[2][index[2]];
      const hour = this.data.multiArray[3][index[3]];
      const minute = this.data.multiArray[4][index[4]];
      if(this.data.multiArray.length==6){
        const second=this.data.multiArray[5][index[4]]
        this.setData({
          time: `${year}-${month}-${day} ${hour}:${minute}:${second}`
        })
      }else{
        this.setData({
          time: `${year}-${month}-${day} ${hour}:${minute}`
        })
      }
      
      this.triggerEvent('bindMultiPickerChange',this.data.time)
      
    },
    //监听picker组件的每一列列表滚动事件
    bindMultiPickerColumnChange: function(e) {
      const multiArray=this.data.multiArray,
            multiIndex=this.data.multiIndex;
      
      //获取年份
      if (e.detail.column == 0) {
        let choose_year = multiArray[e.detail.column][e.detail.value];
        let choose_year_month=multiArray[1][multiIndex[1]]
        this._drive(choose_year,choose_year_month)
        this.setData({
          choose_year
        })
      }
      if (e.detail.column == 1) {
        let _month = parseInt(multiArray[e.detail.column][e.detail.value]);
        this._drive(this.data.choose_year,_month)
      }
      var data = {
        multiArray: multiArray,
        multiIndex: multiIndex
      };
      data.multiIndex[e.detail.column] = e.detail.value;
      this.setData(data);
    },
    // 表驱动优化if-else嵌套
    _drive:function(choose_year,_month){
      let temp = [];
      
      const _year=choose_year,
            _isLeapYear=_year%4==0 && _year%100!=0 || _year%400==0;
      const monthDays=[31,_isLeapYear?29:28,31,30,31,30,31,31,30,31,30,31];
      const _days=monthDays[_month-1];
      for(let i=1;i<=_days;i++){
        temp.push((i<10)?"0"+i:""+i);
      }
      this.setData({
        ['multiArray[2]']: temp
      })
    }
  }
})

