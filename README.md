# yunUI（微信小程序自定义扩展组件库）
### 致力于“微信小程序”原生组件扩展组件开发 —— 功能更强大，使用更方便。

## 现在有
- 扩展微信小程序原生日期-时间组件【picker】，使选择时间可精确到分、秒；优化软键盘弹出问题。兼容iPhone/Android
- “头条信息”组件【coupon】，采用slot，使控制更轻松
- “日历”组件【calendar】：使日期选择更便捷！可以支持选中得到当前选中日期、星期几，突出显示当前日期模块及某一天标记，**新增弹出方式，使更接近原生组件**。
- “侧边栏字母导航”组件【alphabet】：使用便捷，查找方便！


## 如何使用（仅为测试示例，具体请参照pages/下相关使用）

(components中是组件 pages里是相关使用实例)

调用时需要先在对应文件夹的```.json```文件里的**usingComponents**字段添加ypicker组件路径，如：
```
"usingComponents": {
    "y-picker":"/components/yPicker/ypicker",
    "y-coupon":"/components/coupon/coupon",
    "y-calendar":"/components/calendar/calendar",
    "y-alphabet":"../../components/alphabet/alphabet"
 }
```

**其余组件亦是如此！**

然后即可在wxml中按如下格式调用：
```
<y-picker slot="midR" time="{{time}}" size="right" color="#888888" defaulttext="请选择时间" seo="0" bind:bindMultiPickerChange="bindMultiPickerChange"></y-picker>
<y-coupon>
    <image slot="l_img" src="/img/localSDK.png" mode="aspectFill"></image>
    <text slot="l_text">今日头条</text>
    <text slot="r_text">uagiuagfiuagf以按广东省覅蒛以爱的功夫撒个</text>
</y-coupon>
<view>
  <view class="select" bindtap="selected">选择时间</view>
  <y-calendar wx:if="{{selected}}" before_show="0" task_show="1" dateTimes="{{dateTimes}}" bind:timeload="timeload" bind:timechanged="timechanged"></y-calendar>
</view>
<y-alphabet list="{{list}}"></y-alphabet>
```
并传参！

## 参数说明
### yPicker（日期扩展组件）
- open：true / false —— 是否启用已定义的颜色、字体大小 —— 必选
- size：left / center / right —— 自定义组件展示位置（默认为right） —— 可选
- color：颜色值（支持rgb、rgba、十六进制） —— 自定义选中日期后的文字颜色 —— 必选
- seo：0 / 1 —— 是否支持“精确到秒” —— 不填默认为0：精确到“秒”（如果只精确到日，则用小程序自带picker即可。**本组件为微信小程序扩展组件！**），为1时“精确到分”
- holder：颜色值（支持rgb、rgba、十六进制） —— 自定义默认展示文字的颜色 ）—— 可选
- defaulttext: 默认展示文字，如果不填则会显示“请选择时间” —— 可选
- bind:bindMultiPickerChange：接收组件传回的事件名 —— 在其中接收参数e，直接取到“字符串”形式的选中日期，便于后续操作

### coupon（“头条信息”组件）
- 无

### calendar（“日历”组件）
- dateTimes：数组，可选 —— 如果填写的话则必须是数组-对象的形式，它用于为您提供在日历上显示某一天标记的功能：比如“10-1日显示国庆节” —— 强烈建议您注意格式：```[{day:'哪一天',target:'标记语'}]```
- before_show：Number，可选 —— 如果传0，则表示“要通过按钮事件触发弹出”，这种方式更接近原生组件弹出（从底部向上弹出，若传1则组件正常显示，你可以在组件引用外部包裹view标签并设置大小和位置！），更丝滑！**这时你要为自定义组件添加一个wx:if并通过事件改变其值**，注意：目前此组件只能通过if事件改变状态
- task_show：Number，可选 —— 控制遮罩层是否显示：为0时组件无遮罩层，为1时且在组件弹出时遮罩层显示——且当遮罩层被点击时组件收回。**我强烈建议您在选择弹出式组件显示时为此属性赋值为1！**

- 还有两个监听函数供调用：
- timeload：使用如：```bind:timeload="这里写函数名"```，用来在组件展示时即返回当前日期——接收一个参数e，其中包含有：当前年月日和当前为周几以及当前日期节日显示
- timechanged：使用同上，用来在选中某个日期时返回当前选中日期——接收一个参数e，其中包含有两个值：当前年月日和当前为周几以及当前日期节日显示

### alphabet
- list：数组，必填！其格式必须严格参照“pages/alphabet/alphabet.js”中list格式！
- bind:selector：接收组件传回的事件名 —— 用户点击的某一条数据值


## 展示
### yPicker
具体使用见page/notice/notice

![自定义日期-时间组件](https://img-blog.csdnimg.cn/20201014153356164.gif#pic_center)

### coupon
具体使用见page/coupon/coupon

### calendar
具体使用见page/calendar/calendar

![自定义日历组件-方式1](https://img-blog.csdnimg.cn/20201014153403313.gif#pic_center)
![自定义日历组件-方式2](https://img-blog.csdnimg.cn/20201014153325679.gif#pic_center)

### alphabet
具体使用见pages/alphabet/alphabet

![自定义侧边字母导航组件](https://img-blog.csdnimg.cn/20201014153342166.gif#pic_center)


## 联系作者

![wx](https://img-blog.csdnimg.cn/20200716101914321.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjI0ODc4,size_16,color_FFFFFF,t_70)
