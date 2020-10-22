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
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}
//获取小时
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i);
}
//获取分钟
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i);
}
//获取秒数
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  seconds.push("" + i);
}
Component({
  lifetimes:{
    // 这时节点树已创建完成，开始可以用setData渲染节点，但还无法操作节点
    attached:function(){
      this.appd()
      //设置默认的年份
      this.setData({
        choose_year: this.data.multiArray[0][0]
      })
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    seo:{
      type:Number,
      value:0
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
      console.log(this.properties.seo)
      this.setData({
        multiArray: (!this.properties.seo==1)?[years, months, days, hours, minutes]:[years, months, days, hours, minutes,seconds],
        multiIndex: (!this.properties.seo==1)?[10, meng_date.getMonth(), meng_date.getDate()-1, meng_date.getHours(), meng_date.getMinutes()]:[10, meng_date.getMonth(), meng_date.getDate()-1, meng_date.getHours(), meng_date.getMinutes(),meng_date.getSeconds()],
      })
    },
    //获取时间日期 - 点进picker组件而什么也不干 && 每次触发完成后 -> 每次点击“确定”时携带值
  bindMultiPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
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
        time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
      })
    }else{
      this.setData({
        time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute
      })
    }
    
    
    this.triggerEvent('bindMultiPickerChange',this.data.time)
    
  },
  //监听picker组件的每一列列表滚动事件
  bindMultiPickerColumnChange: function(e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      
      this.setData({
        choose_year
      })
    }
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp   //天数更新（根据月份）
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
      // console.log(this.data.multiArray[2]);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  }
})

