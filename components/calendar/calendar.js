// components/calendar/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dateTimes:{
      type:Array,
      value:[]
    }
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
    // dateTimes:[{day:'10-1',target:'国庆节'},{day:'10-2',target:'中秋节'}],
    dateList:[],
    now_event:""
  },

  lifetimes:{
    attached(){
      var today=new Date();
      var curYear=today.getFullYear();
      var curMonth=today.getMonth()+1;
      var d=today.getDate();
      var i=today.getDay();
      var selectedDate=curYear+'-'+curMonth+'-'+d;
      var now_date=curMonth+'-'+d;
      var selectedWeek=this.data.weekArr[i];
      this.setData({
        curYear,
        curMonth,
        selectedDate,
        now_selectedDate:selectedDate,
        selectedWeek,
        now_date
      })
      this.getDateList(curYear,curMonth-1,now_date);
      this.triggerEvent('timeload',{selectedDate,selectedWeek,event:this.data.now_event})
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getDateList(y,mon,now_date){
      var vm=this;
      var daysCountArr=this.data.daysCountArr;
      if(y%4===0 && y%100!=0){
        this.data.daysCountArr[1]=29;
        this.setData({
          daysCountArr
        })
      }
      var dateList=[]
      dateList[0]=[]
      var weekIndex=0;
      for(var i=0;i<vm.data.daysCountArr[mon];i++){
        var week=new Date(Date.UTC(y,mon,i+1)).getDay();
        dateList[weekIndex].push({
          value:y+'-'+(mon+1)+'-'+(i+1),
          dateTime:(mon+1)+'-'+(i+1),
          date:i+1,
          week:week
        });
        // console.log(this.properties.dateTimes)
        for(let k in vm.data.dateTimes){
          for(let j in dateList[weekIndex]){
            if(dateList[weekIndex][j].dateTime==vm.properties.dateTimes[k].day){
              dateList[weekIndex][j].event=vm.properties.dateTimes[k].target
            }
            if(now_date==vm.properties.dateTimes[k].day){
              vm.setData({
                now_event:vm.properties.dateTimes[k].target
              })
            }
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
    }
  }
})
