/**
 * 日期转为固定格式插件
 * 暴露函数：getFormatTime()
 * date:2021/5/8
 * author:孟笑晨（恪愚）
 * 
 */
let Time={
  // 获取当前时间戳
  getUnix:function(){
    let date=new Date();
    return date.getTime();
  },
  // 获取今天0点0分0秒的时间戳
  getTodayUnix:function(){
    let date=new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  // 获取今年1月1日0点0分0秒的时间戳
  getYearUnix:function(){
    let date=new Date();
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  // 获取标准年月日时分秒
  getLastDate:function(date){
    let fmt = 'yyyy-MM-dd hh:mm:ss'
      const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分钟
        's+': date.getSeconds(), // 秒
      }
      
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, date.getFullYear())
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, o[k].toString().length == 1 ? '0' + o[k] : o[k])
        }
      }
      return fmt
  },
  // 转换时间函数
  getFormatTime:function(timestamp){
    let now=this.getUnix();
    let today=this.getTodayUnix();
    let year=this.getYearUnix();
    let timer=(now-timestamp)/1000;   // 转换为秒级时间戳
    let tip='';

    if(timer<=0){
      tip='刚刚';
    }else if(Math.floor(timer/60)<=0){
      tip='刚刚';
    }else if(timer<3600){
      tip=`${Math.floor(timer/60)}分钟前`;
    }else if(timer>=3600 && (timestamp-today>=0)){
      tip=`${Math.floor(timer/3600)}小时前`;
    }else if(timer/86400<=31){
      tip=`${Math.ceil(timer/86400)}天前`;
    }else{
      tip=this.getLastDate(timestamp);
    }
    return tip;
  }
}
export{
  Time
}
