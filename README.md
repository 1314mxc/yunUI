# yunUI（微信小程序自定义功能组件库）
### 致力于“微信小程序”原生组件扩展开发 —— 功能更强大，使用更方便。

## 现收录有：
- 扩展微信小程序原生日期-时间组件【picker】，使选择时间可精确到分、秒；完美解决iPhone/Android软键盘弹出问题。
- “头条信息”组件【coupon】，采用slot，使控制更轻松
- “日历”组件【calendar】：使日期选择更便捷！可以支持选中得到当前选中日期、星期几，突出显示当前日期模块及某一天标记，可以实现“心情签到”的功能，**现有直接使用和弹出两种方式，使更接近原生组件**。
- “侧边栏字母导航”组件【alphabet】：使用便捷，查找方便，更顺滑！
- “自定义弹窗”组件【ymodel】：自定义程度高，使用更便捷，体验更流畅！
- “自定义搜索栏”组件【ysearch】：支持多种搜索方式，高自定义程度，使用更流畅！
- “自定义卡片”组件【ycard】：支持图片、短文、图文三种形式，自定义展示样式，使用方便。
- **下雨/下雪js插件：位于utils文件夹下，使用(自带)canvas组件在页面中调用！**（具体效果见pages/RainSnow/）
- “自定义按钮button”组件【ybutton】：支持以图片覆盖原样式，支持倒计时按钮。（可应对常见“倒计时完成后才能触发按钮”的场景）


## 如何使用（仅为测试示例，具体请参照pages/下相关使用）

(components中是组件 pages里是相关使用实例)

调用时需要先在对应文件夹的```.json```文件里的**usingComponents**字段添加ypicker组件路径，如：
```
"usingComponents": {
    "y-picker":"/components/yPicker/ypicker",
    "y-coupon":"/components/coupon/coupon",
    "y-calendar":"/components/calendar/calendar",
    "y-alphabet":"/components/alphabet/alphabet",
    "y-model":"/components/yModel/ymodel",
    "y-search":"/components/ysearch/search",
    "y-card":"/components/ycard/ycard",
    "y-button":"/components/ybutton/ybutton"
 }
```
```
//对于js插件来说
import xxx from '../../utils/effect'   //路径需自己改下
```

**其余组件亦是如此！**

然后即可在wxml中按如下格式传参调用：
```
<y-picker slot="midR" time="{{time}}" size="right" color="#888888" defaulttext="请选择时间" seo="0" bind:bindMultiPickerChange="bindMultiPickerChange"></y-picker>
<y-coupon>
    <image slot="l_img" src="/img/localSDK.png" mode="aspectFill"></image>
    <text slot="l_text">今日头条</text>
    <text slot="r_text">uagiuagfiuagf以按广东省覅蒛以爱的功夫撒个</text>
</y-coupon>
<view>
  <view class="select" bindtap="selected">选择时间</view>
  <y-calendar wx:if="{{selected}}" before_show="0" task_show="1" yDateTimes="{{dateTimes}}" yEmotions="{{colors}}" yDayColor="{{DateColor}}" bind:timeload="timeload" bind:timechanged="timechanged"></y-calendar>
</view>
<y-alphabet list="{{list}}"></y-alphabet>
<y-model wx:if="{{show}}" center="{{center}}" md="{{md}}" title="{{title}}" fail="{{fail}}" suc="{{suc}}" bind:modelClosed="modelClosed" bind:modelcomplete="modelcomplete">
  <view>
    <view>sadas</view>
  </view>
</y-model>
<y-search y_button="true" bind:search="Onsearch" bind:mousetap="Insearch" />
<y-card txtIndent="{{txtIndent}}" blog="{{blog}}"></y-card>

<canvas canvas-id="effect" id="effects"></canvas>

<y-button t_title="倒计时" times="7" title="开始决战吧" bind:click="bindleTap"></y-button>
```


## 参数说明
### yPicker（日期扩展组件）
- open：true / false —— 是否启用已定义的颜色、字体大小 —— 必选
- size：left / center / right —— 自定义组件展示位置（默认为right） —— 可选
- color：颜色值（支持rgb、rgba、十六进制） —— 自定义选中日期后的文字颜色 —— 必选
- seo：0 / 1 —— 是否支持“精确到秒” —— 不填或默认为0：精确到“分”（如果只精确到日，则用小程序自带picker即可。**本组件为微信小程序扩展组件！**），若为1时表示“精确到秒”！
- holder：颜色值（支持rgb、rgba、十六进制） —— 自定义默认展示文字的颜色 ）—— 可选
- defaulttext: 默认展示文字，如果不填则会显示“请选择时间” —— 可选
- bind:bindMultiPickerChange：接收组件传回的事件名 —— 在其中接收参数e，直接取到“字符串”形式的选中日期，便于后续操作

### coupon（“头条信息”组件）
- 无

### calendar（“日历”组件）
- yDateTimes：数组，可选 —— 如果填写的话则必须是数组-对象的形式，它用于为您提供在日历上显示某一天标记的功能：比如“10-1日显示国庆节” —— 强烈建议您注意格式如：```[{day:'哪一天',target:'标记语'}]```（注意：day既可指“不带年份的某一天”也可指“具体哪一年哪一月哪一天”）
- yDayColor：数组Array，可选 —— ```DateColor:[{day:'2021-5-1',serene:'serene'}]```，对象中第一个参数是当前签到日期，第二个是颜色对象中的键名。**注意：考虑到具体场景：一般签到后通过事件改变心情！还有就是一般都是在onload中读取本地保存的心情日期缓存（对，这个需要您每次触发时手动缓存）**（具体应用场景请看pages/calendar/calendar.js文件）
- yEmotions：对象Object，可选 —— 颜色映射表。```colors: {serene: '#64d9fe'}```，使用yDayColor和yEmotions时注意场景，比如你想要获取用户“开心”心情时标注不同颜色在日历上，此时你要在调用组件page中添加将“开心”和colors中的“serene”对应起来，然后通过上一个参数传入自定义组件！（具体应用场景请看pages/calendar/calendar.js文件第12行）
- before_show：Number，可选 —— 如果传0，则表示“要通过按钮事件触发弹出”，这种方式更接近原生组件弹出（从底部向上弹出，若传1则组件正常显示，你可以在组件引用外部包裹view标签并设置大小和位置！），更丝滑！**这时你要为自定义组件添加一个wx:if并通过事件改变其值**，注意：目前此组件只能通过if事件改变状态
- task_show：Number，可选 —— 控制遮罩层是否显示：为0时组件无遮罩层，为1时且在组件弹出时遮罩层显示——且当遮罩层被点击时组件收回。**我强烈建议您在选择弹出式组件显示时为此属性赋值为1！**

- 还有两个监听函数供调用：
- timeload：使用如：```bind:timeload="这里写函数名"```，用来在组件展示时即返回当前日期——接收一个参数e，其中包含有：当前年月日和当前为周几以及当前日期节日显示
- timechanged：使用同上，用来在选中某个日期时返回当前选中日期——接收一个参数e，其中包含有两个值：当前年月日和当前为周几以及当前日期节日显示

### alphabet
- list：数组，必填！其格式必须严格参照“pages/alphabet/alphabet.js”中list格式！（当数组第一项的alphabet属性值为top或Top时，触发显示为“回到页面顶部”）
- bind:selector：接收组件传回的事件名 —— 用户点击的某一条数据值

### ymodel
- center：0/1（number），可选。不传此参数时默认为0——内容以靠左展示（仿原生sheet弹窗），传值为1时表示内容部分居中展示
- title：String，可选。不传此参数时默认为“提示”（仿原生sheet弹窗标题部分）
- fail：String，可选。不传此参数时默认为“取消”，灰黑色（仿原生sheet弹窗取消按钮部分）
- suc：String，可选。不传此参数时默认为“确定”，鲜绿色（仿原生sheet弹窗确定按钮部分）
- md：String，可选。表示弹窗的宽度（由于内容部分允许传入，所以高度自适应），**其格式为“数字+百分号%”**，不传此参数时默认为“86%”
- **重点：** 此组件采用slot方式接收开发者传入“内容部分”，即：此组件允许子组件（子元素）的存在！而且不止一个！其格式参见上面“如何使用”中的```<y-model></y-model>```，您可以通过wx:if来控制组件的显示与隐藏（并且我强烈推荐用wx:if而不是hidden！）

### ysearch
- y_placeholder：String，可选。为无聚焦情况下搜索框中提示文字
- y_button：String（“true”/“false”），可选。默认为“false”（不传），此参数意义为“是否有input后面的button按钮”，当此参数为true时。代表你需要用点击“搜索”按钮的方式来查询，为false时表示需要用“监听键盘实时搜索”的方式查询
- but_title：String，可选。为右边按钮出现时按钮中文字，默认为“搜索”
- y_bgcolor_but：String，可选。为右边按钮背景颜色，默认为“#d43c33”：红色
- y_bgcolor_bar：String，可选。为搜索框背景颜色，默认为“#f5f5f5”：灰白色
- y_color：String，可选。为搜索框中用户输入文字颜色，默认为“black”：黑色
- y_center：String（“true”/“false”），可选。此参数决定初始是否采用居中形式。若传“true”（字符串），则在“聚焦”时会有一个动画效果（参见下面对应展示的效果三）
- y_vshow：Number，可选。此参数决定触发“提交”按钮后是否清空input框。**此参数在but_title为“false”时无效！（因为此时查询方式为“监听输入实时触发”）**
- bind:search：监听：search事件。在其中你接收一个event（或e），event（或e）.detail.keyword值为用户在input中输入的“查询条件”。**此参数在button传值为false时存在！**
- bind:mousetap：监听：mousetap事件。在其中你接收一个event（或e），event（或e）.detail.keyword值为用户在input中输入的“查询条件”。**此参数在button传值为true时存在！**
（当然，你可以让两个函数都存在，反正值是一样的，它们在组件中“被认为是不共存的”！你可以放心使用！）


### ycard
- txtIndent：0/1，可选。不填或传值为0时默认，表示“以短句形式展示”，即头部对其；若传值为1，表示“首行头部有缩进”
- blog：{} 对象格式，必填。它的属性有：avatarUrl：发帖人头像，可选，String类型（若传值为空会显示“暂无头像”的占位图）、createTime：发帖时间，必填，String类型，可传时间戳或标准格式（yyyy-MM-dd hh:mm:ss）、nickName：用户名，必填，String类型、content：短文内容，可选，String类型、img：图片，可选，Array类型，可有多张图片（**但建议都用网络图片！**），若用网络图片则可预览。
- ani：String类型，可选。此参数通常不写或为```ani="ani"```，若传值，则卡片有一个自下而上的动画过程。
- **blog对象的属性名必须保持一致！**

### js插件之“雨雪特效”
首先需要在onLoad中引入如下代码：获取宽度 —— 为了兼容机型
```
wx.getSystemInfo({
  success: (res) => {
    let width = res.windowWidth
    this.setData({
      width,
      scale: width / 375
    })
  }
})
```
然后在比如检测到当前城市是下雪天气时在对应函数中引入如下代码：
```
const ctx = wx.createCanvasContext('effect')
let {width, scale} = this.data
// 768 为 CSS 中设置的 rpx 值
let height = 768 / 2 * scale
// 下雪
let rain=new Snow(ctx, width, height, {
  amount: 100,
  speedFactor: 0.03
})
// 跑起来
rain.run()
```
其中`new Snow()`那里是要传入参数：canvas对象、宽度、高度、以及对象{雨雪个数、下雨/下雪的速度}
最后调用run方法使特效出现！

### ybutton
- t_title：String类型。可选。默认值为“阅读倒计时”，这是显示倒计时时间时展示出来的文字（注意：这个参数只有在times参数存在时才有效）
- title：String类型。可选。默认值为“点击”，参数控制如果有倒计时则倒计时结束后按钮上展示的文字（无倒计时时直接展示在按钮上）
- inline：true/false，Bool类型。可选。此参数控制button元素是否以inline-block（行内块）形式展示
- times：String类型。可选。参数控制倒计时时间，无默认值。不传此参数时和原生button组件表现无异。且只支持String-数字形式的参数
- 其余参数及回调函数和原生button组件一致，请参见官方文档：https://developers.weixin.qq.com/miniprogram/dev/component/button.html



## 展示

![wx-yunUI](https://img-blog.csdnimg.cn/20201024121550490.png#pic_center)

### yPicker
具体使用见page/notice/notice

![自定义日期-时间组件](https://img-blog.csdnimg.cn/20201105191139777.gif#pic_center)

### coupon
具体使用见page/coupon/coupon

### calendar
具体使用见page/calendar/calendar
<br />
（1）

![自定义日历组件-方式1](https://img-blog.csdnimg.cn/20201014153403313.gif#pic_center)

（2）

![自定义日历组件-方式2](https://img-blog.csdnimg.cn/20201014153325679.gif#pic_center)

### alphabet
具体使用见pages/alphabet/alphabet

![自定义侧边字母导航组件](https://img-blog.csdnimg.cn/20201014153342166.gif#pic_center)

### ymodel
具体使用见pages/tdetail/tdetail

![自定义弹窗组件ymodel](https://img-blog.csdnimg.cn/20201030174513521.gif#pic_center)

### ysearch
具体使用见pages/search/search

（1）

![ysearch_one](https://img-blog.csdnimg.cn/20201101092957967.gif#pic_center)

（2）

![ysearch_two](https://img-blog.csdnimg.cn/20201101093016495.gif#pic_center)

（3）

![ysearch_thr](https://img-blog.csdnimg.cn/20201111192358158.gif#pic_center)


### ycard
具体使用见pages/card/card

![y_card](https://img-blog.csdnimg.cn/20201105191121536.gif#pic_center)


### ybutton
具体使用见pages/ybutton/ybutton

![u_button](https://img-blog.csdnimg.cn/20210425185454207.gif#pic_center)



## 联系作者

![wx](https://img-blog.csdnimg.cn/20200716101914321.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjI0ODc4,size_16,color_FFFFFF,t_70)
