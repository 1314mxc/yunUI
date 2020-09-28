# yunUI
### 致力于“微信小程序”原生组件扩展组件开发 —— 功能更强大，使用更方便。

## 现在有
- 扩展微信小程序原生日期-时间组件【picker】，使选择时间可精确到分、秒；优化软键盘弹出问题。兼容iPhone/Android
- “头条信息”组件【coupon】，采用slot，使控制更轻松
- “日历”组件【calendar】：使日期选择更便捷！可以支持选中得到当前选中日期、星期几，突出显示当前日期模块。


## 如何使用（仅为测试示例）

(components中是组件 pages里是相关使用实例)

调用时需要先在对应文件夹的```.json```文件里的**usingComponents**字段添加ypicker组件路径，如：
```
"usingComponents": {
    "y-picker":"/components/yPicker/ypicker",
    "y-coupon":"/components/coupon/coupon",
    "y-calendar":"/components/calendar/calendar"
 }
```

**其余组件亦是如此！**

然后即可在wxml中调用：
```
<y-picker slot="midR" time="{{time}}" size="right" color="#888888" defaulttext="请选择时间" seo="0" bind:bindMultiPickerChange="bindMultiPickerChange"></y-picker>
<y-coupon>
    <image slot="l_img" src="/img/localSDK.png" mode="aspectFill"></image>
    <text slot="l_text">今日头条</text>
    <text slot="r_text">uagiuagfiuagf以按广东省覅蒛以爱的功夫撒个</text>
</y-coupon>
<view style="width:50%;height:500rpx;border:1rpx solid red;">
  <y-calendar bind:timeload="timeload" bind:timechanged="timechanged"></y-calendar>
</view>
```
并传参！

## 参数说明
### yPicker（日期扩展组件）
- open：true / false —— 是否启用已定义的颜色、字体大小 —— 必选
- size：left / center / right —— 自定义组件展示位置（默认为right） —— 可选
- color：颜色值（支持rgb、rgba、十六进制） —— 自定义选中日期后的文字颜色 —— 必选
- seo：0 / 1 —— 是否支持“精确到秒” —— 不填默认为0：精确到“秒”（如果只精确到日，则用小程序自带picker即可。**本组件为微信小程序扩展组件！**）
- holder：颜色值（支持rgb、rgba、十六进制） —— 自定义默认展示文字的颜色 ）—— 可选
- defaulttext: 默认展示文字，如果不填则会显示“请选择时间” —— 可选
- bind:bindMultiPickerChange：接收组件传回的事件名 —— 在其中接收参数e，直接取到“字符串”形式的选中日期，便于后续操作

### coupon（“头条信息”组件）
- 无

### calendar（“日历”组件）
- 无，但有两个监听函数：
- timeload：使用如：```bind:timeload="这里写函数名"```，用来在组件展示时即返回当前日期——接收一个参数e，其中包含有两个值：当前年月日和当前为周几
- timechanged：使用同上，用来在选中某个日期时返回当前选中日期——接收一个参数e，其中包含有两个值：当前年月日和当前为周几



## 展示
### yPicker
具体使用见page/notice/notice

### coupon
具体使用见page/coupon/coupon

### calendar
具体使用见page/calendar/calendar——我强烈建议你在使用时为 ```<y-calendar></y-calendar>``` 标签外套一个组件（比如：view），并酌情为它设置应有的大小
