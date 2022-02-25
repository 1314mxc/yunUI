// components/calendar/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ySelData: {
      type: String,
      value: ""
    },
    yDateTimes:{
      type:Array,
      value:[]
    },
    // 设置哪一天为什么颜色
    yDayColor:{
      type:Array,
      value:[]
    },
    // 颜色映射表
    yEmotions:{
      type:Object,
      value:{}
    },
    before_show:{   //是否作为日期组件由按钮触发弹出（为true时是）
      type:Boolean,
      value:false
    },
    // task_show:{   //只有这个为1时，“和遮罩层有关的事件才会响应”
    //   type:Boolean,
    //   value:true
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    now_selectedDate:'',   //当前是几月几号
    selectedDate:'',   //选中的几月几号
    selectedWeek:'',   //选中的是星期几
    curYear:2017,   //当前年份
    curMonth:0,   //当前月份
    daysCountArr:[31,28,31,30,31,30,31,31,30,31,30,31],
    weekArr:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
    dateList:[],
    now_event:"",
  },

  observers:{
    "yDayColor"(val){
      if(val.length){
        this.getDateList(this.data.curYear,this.data.curMonth-1,this.data.now_date);
      }
    }
  },

  lifetimes:{
    // 在这个生命周期中只能拿到传参的初始值(就是页面data中的值)
    attached(){
      var today=new Date();
      var curYear=today.getFullYear();
      var curMonth=today.getMonth()+1;
      var d=today.getDate();
      var i=today.getDay();
      var selData = curYear+'-'+curMonth+'-'+d;
      var selectedDate=this.properties.ySelData?this.properties.ySelData:selData;
      var now_date=curMonth+'-'+d;
      var selectedWeek=this.data.weekArr[i];
      this.setData({
        curYear,
        curMonth,
        selectedDate,
        selectedWeek,
        now_date,
        now_selectedDate:selData,
        closed:true
      })
      // // 初始化事件、传来的节日标注、style
      this.getDateList(curYear,curMonth-1,now_date);
      this.triggerEvent('timeload',{selectedDate,selectedWeek,event:this.data.now_event})
    },
    ready(){
      // 初始化事件、传来的节日标注、style
      // this.getDateList(this.data.curYear,this.data.curMonth-1,this.data.now_date);
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getDateList(y,mon,now_date){
      var vm=this;
      let _year=new Date();
      let _dayColor=this.data.yDayColor;
      let _emotion=this.data.yEmotions;
      let daysCountArr=this.data.daysCountArr;
      let _ydateTimes=this.data.yDateTimes;
      let _new_days=`${_year.getFullYear()}-(${_year.getMonth()}+1)-${_year.getDate()}`;
      // 判断闰年
      daysCountArr[1]=(y%4==0 && y%100!=0 || y%400==0)?29:28
      let dateList=[]
      dateList[0]=[]
      let weekIndex=0;
      for(var i=0;i<daysCountArr[mon];i++){
        var week=new Date(Date.UTC(y,mon,i+1)).getDay();
        dateList[weekIndex].push({
          value:y+'-'+(mon+1)+'-'+(i+1),
          dateTime:(mon+1)+'-'+(i+1),
          date:i+1,
          week:week
        });
        for(let j in dateList[weekIndex]){
          for(let k in _ydateTimes){
            if(dateList[weekIndex][j].dateTime==_ydateTimes[k].day){
              dateList[weekIndex][j].event=_ydateTimes[k].target
            }
            if(dateList[weekIndex][j].value==_ydateTimes[k].day){
              dateList[weekIndex][j].event=_ydateTimes[k].target
            }
            if(now_date==_ydateTimes[k].day){
              vm.setData({
                now_event:_ydateTimes[k].target
              })
            }
          }
          // 心情签到独立于特殊日期标记设计
          // 判断当前日期是不是设置了心情的日期
          for(let m of _dayColor){
            (dateList[weekIndex][j].value==m.day || dateList[weekIndex][j].value==_new_days) && !dateList[weekIndex][j].colors && (dateList[weekIndex][j].colors=_emotion[m.serene])
          }
        }
        if(week==6){
          weekIndex++;
          dateList[weekIndex]=[]
        }
      }
      vm.setData({
        dateList
      })

    },
    // 选中日期
    selectDate(e){
      var vm=this;
      vm.setData({
        selectedDate:e.currentTarget.dataset.date.value,
        selectedWeek:vm.data.weekArr[e.currentTarget.dataset.date.week]
      })
      this.triggerEvent('timechanged',{
        selectedDate:e.currentTarget.dataset.date.value,
        selectedWeek:vm.data.weekArr[e.currentTarget.dataset.date.week],
        event:(e.currentTarget.dataset.date.event?e.currentTarget.dataset.date.event:"")
      })
    },
    // 上个月
    preMonth(){
      var vm=this;
      var curYear=vm.data.curYear;
      var curMonth=vm.data.curMonth;
      curYear=curMonth-1?curYear:curYear-1;
      curMonth=curMonth-1?curMonth-1:12;
      vm.setData({
        curYear,
        curMonth
      });
      vm.getDateList(curYear,curMonth-1,this.data.now_date);
    },
    // 上年
    preYear(){
      var vm=this;
      var curYear=vm.data.curYear;
      var curMonth=vm.data.curMonth;
      curYear-=1;
      vm.setData({
        curYear,
        curMonth
      });
      vm.getDateList(curYear,curMonth-1,this.data.now_date);
    },
    // 下个月
    nextMonth(){
      var vm=this;
      var curYear=vm.data.curYear;
      var curMonth=vm.data.curMonth;
      curYear=curMonth+1==13?curYear+1:curYear;
      curMonth=curMonth+1==13?1:curMonth+1;
      vm.setData({
        curYear,
        curMonth
      });
      vm.getDateList(curYear,curMonth-1,this.data.now_date);
    },
    // 下年
    nextYear(){
      var vm=this;
      var curYear=vm.data.curYear;
      var curMonth=vm.data.curMonth;
      curYear+=1;
      vm.setData({
        curYear,
        curMonth
      });
      vm.getDateList(curYear,curMonth-1,this.data.now_date);
    },
    // 在弹出式场景下关闭日历
    closed(){
      if(this.properties.before_show){
        this.setData({
          closed:false
        })
      }
    }
  }
})
