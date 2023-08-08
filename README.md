# yunUI（微信小程序自定义功能组件库）
### 致力于“微信小程序”原生组件扩展开发 —— 功能更强大，使用更方便。

### npm地址

- [yun-ui-micro](https://www.npmjs.com/package/yun-ui-micro)

## 使用

### npm使用(此方式调用，所有引用组件名都是小写字母且没有“y”前缀，且最后一级都是index)
```
npm install yun-ui-micro
```

在项目全局的 app.json 或者页面与组件的 .json 中，按需求引入组件即可使用，示例如下：
```
"usingComponents": {
    "y-button": "yun-ui-micro/button/index",
}
```

### clone使用(推荐！)
直接从github中下载全部或单个组件文件，然后二次修改并使用。


## 体验

![wx-yunUI](https://img-blog.csdnimg.cn/20201024121550490.png#pic_center)


## 现收录有：

### 组件
- <a href="#picker">扩展微信小程序原生日期-时间组件【picker】</a>：使选择时间可精确到分、秒；完美解决iPhone/Android软键盘弹出问题。
- “头条信息”组件【coupon】，采用slot，使控制更轻松
- <a href="#calender">“日历”组件【calendar】</a>：使日期选择更便捷！可以支持选中得到当前选中日期、星期几。可支持切换上一月、下一月；上一年、下一年（预计下一提交新增年份快速选择）。突出显示当前日期模块及某一天标记，可以实现“心情签到”的功能，**现有直接使用和弹出两种方式，使更接近原生组件**。
- <a href="#alphabet">“侧边栏字母导航”组件【alphabet】</a>：使用便捷，查找方便，更顺滑！
- <a href="#model">“自定义弹窗”组件【ymodel】</a>：基于原生，比原生modal自定义程度高，使用便捷，体验更流畅！
- <a href="#search">“自定义搜索栏”组件【ysearch】</a>：支持多种搜索方式，高自定义程度，使用更流畅！(search组件更新了！动画效果&自定义按钮)
- <a href="#card">“自定义卡片”组件【ycard】</a>：支持图片、短文、图文三种形式，自定义展示样式，配合 util 下时间插件使用，让展示随心所欲！可自定义是否预览图片。
- <a href="#button">“自定义按钮button”组件【ybutton】</a>：支持以图片覆盖原样式，支持倒计时按钮。（可应对常见“倒计时完成后才能触发按钮”的场景）
- <a href="#img">“自定义图片上传img”组件【yImg】</a>：支持最多九张图片，支持长按删除和拖动排序!
- <a href="#img-pro">“增强图片排序img”组件【yImgPro】</a>：yImg组件的增强版，动画真正流畅！使用起来像朋友圈一样适应！【<font color="red">新！</font>】
- <a href="#cell-group">“展示集cell-group”组件</a>：和下面cell组件一起使用
- “单个展示cell”组件：建议如果有多个，请和cell-group一起使用
- <a href="#popup">“底部弹层”组件</a>：从底部弹出，更丝滑、更高效。自定义内容与样式。未来将支持上下左右四边弹出。
- <a href="#atinput">“@输入框”组件</a>：支持@功能的输入框。可结合popup组件实现人员选择功能！
- <a href="#emoji">“emoji”组件</a>：目前以popup形式存在。选择emoji表情。一般和input输入框一起使用

### 插件
- 日期时间转化插件：位于utils文件夹下，以import {Time} from '路径';方式调用
- **下雨/下雪js插件：位于utils文件夹下，使用(自带)canvas组件在页面中调用！**（具体效果见pages/RainSnow/）



## 如何使用（仅clone下载方式的测试示例！具体请参照pages/下相关test文件使用）

**请注意：**如果是npm方式调用，所有组件名都是小写字母且没有“y”前缀！

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
    "y-button":"/components/ybutton/ybutton",
    "y-img":"/components/yImg/index",
    "y-img-pro":"/components/yImgPro/index",
    "y-input":"/components/atinput/index"
 }
```

js插件使用：

```
import xxx from '../../utils/effect';   // 路径需自己改下
import {Time} from '../../utils/date_time';   // 路径需自己改下
```

**其余组件亦是如此！**

然后即可在wxml中按如下格式传参调用：
```
<y-picker slot="midR" time="{{time}}" size="right" color="#888888" defaulttext="请选择时间" yseo bind:bindMultiPickerChange="bindMultiPickerChange"></y-picker>
<y-coupon>
    <image slot="l_img" src="/img/localSDK.png" mode="aspectFill"></image>
    <text slot="l_text">今日头条</text>
    <text slot="r_text">uagiuagfiuagf以按广东省覅蒛以爱的功夫撒个</text>
</y-coupon>
<view>
  <view class="select" bindtap="selected">选择时间</view>
  <y-calendar wx:if="{{selected}}" before_show yDateTimes="{{dateTimes}}" yEmotions="{{colors}}" yDayColor="{{DateColor}}" bind:timeload="timeload" bind:timechanged="timechanged"></y-calendar>
</view>
<y-alphabet list="{{list}}"></y-alphabet>
<y-model wx:if="{{show}}" ycenter md="{{md}}" title="{{title}}" fail="{{fail}}" suc="{{suc}}" bind:modelClosed="modelClosed" bind:modelcomplete="modelcomplete">
  <view>
    <view>sadas</view>
  </view>
</y-model>
<y-search y_button bind:search="Onsearch" bind:mousetap="Insearch" />
<y-card txtIndent="{{txtIndent}}" blog="{{blog}}"></y-card>

<canvas canvas-id="effect" id="effects"></canvas>

<y-button t_title="倒计时" times="7" title="开始决战吧" bind:click="bindleTap"></y-button>

<y-img yMovable bind:chooseImg="chooseImg"></y-img>
<y-img-pro bind:chooseImg="chooseImg"></y-img-pro>

<y-cell-group title="布局组件" border card custom-class="border-box">
  <y-cell title="侧边栏字母导航" url="/pages/alphabet/alphabet" />
  <y-cell title="自定义search搜索" value="动画过渡，自定义按钮" url="/pages/search/search" />
</y-cell-group>

<y-input name="{{member}}" custom-input="input-class" bind:at="onSelectItem"></y-input>
```


## 参数说明
<div id="picker"> </div>

### yPicker（日期扩展组件）
- open：true / false —— 是否启用已定义的颜色、字体大小 —— 必选
- size：left / center / right —— 自定义组件展示位置（默认为right） —— 可选
- color：颜色值（支持rgb、rgba、十六进制） —— 自定义选中日期后的文字颜色 —— 必选
- yseo：false / true —— 是否支持“精确到秒” —— 不填或默认为false：精确到“分”（如果只精确到日，则用小程序自带picker即可。**本组件为微信小程序扩展组件！**），传入参数名即表示true-“精确到秒”！
- holder：颜色值（支持rgb、rgba、十六进制） —— 自定义默认展示文字的颜色 ）—— 可选
- defaulttext: 默认展示文字，如果不填则会显示“请选择时间” —— 可选
- bind:bindMultiPickerChange：接收组件传回的事件名 —— 在其中接收参数e，直接取到“字符串”形式的选中日期，便于后续操作

### coupon（“头条信息”组件）
- 无

<div id="calender"> </div>

### calendar（“日历”组件）
- yDateTimes：数组，可选 —— 如果填写的话则必须是数组-对象的形式，它用于为您提供在日历上显示某一天标记的功能：比如“10-1日显示国庆节” —— 强烈建议您注意格式如：```[{day:'哪一天',target:'标记语'}]```（注意：day既可指“不带年份的某一天”也可指“具体哪一年哪一月哪一天”）
- yDayColor：数组Array，可选 —— ```DateColor:[{day:'2021-5-1',serene:'serene'}]```，对象中第一个参数是当前签到日期，第二个是颜色对象中的键名。**注意：考虑到具体场景：一般签到后通过事件改变心情！还有就是一般都是在onload中读取本地保存的心情日期缓存（对，这个需要您每次触发时手动缓存）**（颜色映射表也需要你手动创建）（具体应用场景请看pages/calendar/calendar.js文件）
- yEmotions：对象Object，可选 —— 颜色映射表。```colors: {serene: '#64d9fe'}```，使用yDayColor和yEmotions时注意场景，比如你想要获取用户“开心”心情时标注不同颜色在日历上，此时你要在调用组件page中添加将“开心”和colors中的“serene”对应起来，然后通过上一个参数传入自定义组件！（具体应用场景请看pages/calendar/calendar.js文件第12、51行）
- before_show：Boolean，可选 —— 如果传参数名，即表示“要通过按钮事件触发弹出”，这种方式更接近原生组件弹出（从底部向上弹出，若传1则组件正常显示，你可以在组件引用外部包裹view标签并设置大小和位置！），更丝滑！**这时你要为自定义组件添加一个wx:if并通过事件改变其值**，注意：目前此组件只能通过if事件改变状态
- task_show：Number，可选 —— 控制遮罩层是否显示：为0时组件无遮罩层，为1时且在组件弹出时遮罩层显示——且当遮罩层被点击时组件收回。我强烈建议您在选择弹出式组件显示时为此属性赋值为1！**(此属性已被删除，不必再传，此声明保留一个版本)**

- 还有两个监听函数供调用：
- timeload：使用如：```bind:timeload="这里写函数名"```，用来在组件展示时即返回当前日期——接收一个参数e，其中包含有：当前年月日和当前为周几以及当前日期节日显示
- timechanged：使用同上，用来在选中某个日期时返回当前选中日期——接收一个参数e，其中包含有两个值：当前年月日和当前为周几以及当前日期节日显示

<div id="alphabet"> </div>

### alphabet
- list：数组，必填！其格式必须严格参照“pages/alphabet/alphabet.js”中list格式！（当数组第一项的alphabet属性值为top或Top时，触发显示为“回到页面顶部”）

- 还有一个监听函数供调用：
- bind:selector：接收组件传回的事件名 —— 用户点击的某一条数据值

<div id="model"> </div>

### ymodel
- center：false/true（Boolean），可选。不传此参数时默认为0——内容以靠左展示（仿原生sheet弹窗），传参数名即表示内容部分居中展示
- title：String，可选。不传此参数时默认为“提示”（仿原生sheet弹窗标题部分）
- fail：String，可选。不传此参数时默认为“取消”，灰黑色（仿原生sheet弹窗取消按钮部分）
- suc：String，可选。不传此参数时默认为“确定”，鲜绿色（仿原生sheet弹窗确定按钮部分）
- md：String，可选。表示弹窗的宽度（由于内容部分允许传入，所以高度自适应），**其格式为“数字+百分号%”**，不传此参数时默认为“86%”
- **重点：** 此组件采用slot方式接收开发者传入“内容部分”，即：此组件允许子组件（子元素）的存在！而且不止一个！其格式参见上面“如何使用”中的```<y-model></y-model>```，您可以通过wx:if来控制组件的显示与隐藏（并且我强烈推荐用wx:if而不是hidden！）

<div id="search"> </div>

### ysearch
- y_placeholder：String，可选。为无聚焦情况下搜索框中提示文字
- y_button：Boolean（true/false），可选。默认为“false”（不传），此参数意义为“是否有input后面的button按钮”，当此参数为true时。代表你需要用点击“搜索”按钮的方式来查询，为false时表示需要用“监听键盘实时搜索”的方式查询
- btnSize：Number，可选。当y_button参数为true时传入，为右侧按钮区域的宽度
- aniBtn：Boolean（true/false），可选。聚焦时是否按钮以动画效果展示。当此参数为false而且y_button参数为true时表示按钮一直存在，与聚焦事件无关。
- but_title：String，可选。为右边按钮出现时按钮中文字，默认为“搜索”
- y_bgcolor_but：String，可选。为右边按钮背景颜色，默认为“#d43c33”：红色
- y_bgcolor_bar：String，可选。为搜索框背景颜色，默认为“#f5f5f5”：灰白色
- y_color：String，可选。为搜索框中用户输入文字颜色，默认为“black”：黑色
- y_center：Boolean（true/false），可选。此参数决定初始是否采用居中形式。若传此参数或值为true，则在“聚焦”时会有一个动画效果（参见下面对应展示的效果三）
- y_vshow：Number，可选。此参数决定触发“提交”按钮后是否清空input框。**此参数在but_title为“false”时无效！（因为此时查询方式为“监听输入实时触发”）**

- 还有两个监听函数供调用：
- bind:search：监听：search事件。在其中你接收一个event（或e），event（或e）.detail.keyword值为用户在input中输入的“查询条件”。**此参数在button传值为false时存在！**
- bind:mousetap：监听：mousetap事件。在其中你接收一个event（或e），event（或e）.detail.keyword值为用户在input中输入的“查询条件”。**此参数在button传值为true时存在！**
（当然，你可以让两个函数都存在，反正值是一样的，它们在组件中“被认为是不共存的”！你可以放心使用！）

<div id="card"> </div>

### ycard
- txtIndent：0/1，可选。不填或传值为0时默认，表示“以短句形式展示”，即头部对其；若传值为1，表示“首行头部有缩进”
- blog：{} 对象格式，必填。它的属性有：avatarUrl：发帖人头像，可选，String类型（若传值为空会显示“暂无头像”的占位图）、createTime：发帖时间，必填，String类型，可传时间戳或标准格式（yyyy-MM-dd hh:mm:ss）、nickName：用户名，必填，String类型、content：短文内容，可选，String类型、img：图片，可选，Array类型，可有多张图片（**但建议都用网络图片！**），若用网络图片则可预览。
- ani：String类型，可选。此参数通常不写或为```ani="ani"```，若传值，则卡片有一个自下而上的动画过程。
- **blog对象的属性名必须保持一致！**


<div id="button"> </div>

### ybutton
- t_title：String类型。可选。默认值为“阅读倒计时”，这是显示倒计时时间时展示出来的文字（注意：这个参数只有在times参数存在时才有效）
- title：String类型。可选。默认值为“点击”，参数控制如果有倒计时则倒计时结束后按钮上展示的文字（无倒计时时直接展示在按钮上）
- inline：true/false，Bool类型。可选。此参数控制button元素是否以inline-block（行内块）形式展示
- zeroTime：true/false，Bool类型。可选。此参数控制按钮上是否显示“0s”。默认为false，不显示
- times：String类型。可选。参数控制倒计时时间，无默认值。不传此参数时和原生button组件表现无异。且只支持String-数字形式的参数
- 其余参数及回调函数和原生button组件一致，请参见官方文档：https://developers.weixin.qq.com/miniprogram/dev/component/button.html

<div id="img"> </div>

### yImg
- yMovable: Boolean。不传即为默认值false。此时没有拖动排序功能，只有长按提示删除操作。传参数名即为true，此时长按可以拖拽图片进行删除。
- maxLen: Number。不传默认为9。表示最多可以选择的图片数量

- 还有一个监听函数供调用：
- bind:chooseImg 回调事件，监听组件中的添加和删除以及排序事件。得到每一步操作最终的图片集合（表现为数组）。可以在此进行下一步操作。接收两个参数：1.images，图片数组；2.key，当前操作code，比如删除时key为“delete-img”，可供开发者区别。

<div id="img-pro"> </div>

### yImgPro
- yTDel: Boolean。不传即为默认值false。为true时删除后会有动画排序效果。默认删除后直接是新的。
- maxLen: Number。不传默认为9。表示最多可以选择的图片数量
- defaultImgList: Array。默认为`[]`空数组。当您需要页面上默认就存在一些图片时，您可以传入它！结构为：`['xxx', 'xxx']`
- default_add：Bool。默认为false。为true时“添加图片”按钮是一个插槽。由外部以普通slot方式传入按钮
- 外部样式customImg-del。调用方自定义图片上“删除”按钮样式。使用：`customImg-del="xxx"`
- scrollOffset: Number。默认为0。如果你的页面会有滚动行为，而且此组件并不是“第一时间”出现在页面上，建议传入此参数！此时值应当为外部某组件的滚动距离。您可以用官方 API 得到它：
```
query.selectViewport().scrollOffset((res) => {
    res.scrollTop
})
```

- 有一个监听函数供调用：
- bind:chooseImg 回调事件，监听组件中的添加和删除以及排序事件。得到每一步操作最终的图片集合（表现为数组）。可以在此进行下一步操作。接收两个参数：1.images，图片数组；2.key，当前操作code，比如删除时key为“delete-img”，可供开发者区别。

<div id="cell-group"> </div>

### cell&cell-group
```
<y-cell-group title="布局组件" border card custom-class="border-box"> <!-- border-box为外部样式，可以由开发者决定边框、阴影、背景色这些细节点 -->
  <y-cell title="侧边栏字母导航" url="/pages/alphabet/alphabet" />
  <y-cell title="自定义search搜索" value="动画过渡，自定义按钮" url="/pages/search/search" />
</y-cell-group>
```

<div id="popup"> </div>

### popup
- showPop: Boolean。不传即为默认值false。此参数表示弹层是否显示。一般由调用方动态控制。注意：在关闭回调中应当将其恢复初始值
- default_layout：Bool。默认为true。此时表示在弹层中使用默认的“顶部区域”内容和样式
- title：String。默认为“弹层”。当default_layout为true时的顶部标题
- bg_closed: Bool。不传默认为false。此参数控制是否可以通过点击遮罩层关闭弹层
- popHeight：String。默认为“60%”。此参数控制弹层体的高度，可以传入百分比或“rpx”单位字符串
- maxWidth：String。默认为“100%”。此参数控制弹层体的宽度，可以传入百分比或“rpx”单位字符串
- bg_opacity：Number。默认为“0.1”。控制遮罩层的透明度。注意：可以且仅可以传入小于0的值“-1”此时没有遮罩层
- site：String（“bottom”/“right”）。默认为“bottom”。控制弹窗从底部弹出还是侧边弹出（注：为“right”时default_layout参数强制为false）
- 外部样式popup-class。由调用方自定义弹层体样式，比如border-radius、background等。使用方式：`popup-class="xxx"`
- 外部样式poptop-class。当default_layout参数为true（使用默认顶部样式和内容）时由调用方自定义弹层中顶部状态栏样式，比如height、background等。使用方式：`poptop-class="xxx"`

- 还有一个监听函数供调用：
- bind:onCancel 回调事件，监听关闭事件。此时开发者务必将外部传入的“开关参数”showPop恢复初始值！

<div id="atinput"> </div>

### atinput
- name: String。不传即为默认值空。此参数专门用来表示被艾特的人员名字，外部调用无需自行处理尾部空格。外部可动态更改
- yText: String。不传即为默认值空。此参数表示一开始就要存在的文字，或是外部需要动态传入的字符串（比如“emoji表情”）
- showEmoji：Boolean。默认为false。是否为输入框添加“emoji表情”功能，如果为true，则可以以slot形式传入emoji唤起按钮唤起emoji组件弹层
- placeholder：String。默认为“请输入”。输入框默认文字
- maxlength：Number。默认为140。输入框最大可输入文字个数

- 外部样式custom-input。由调用方自定义输入框整体样式，比如border、border-radius、height、background等（width默认100%，不建议更改，可以在外部添加父元素控制）。使用方式：`custom-input="xxx"`
- 外部样式custom-emoji。当showEmoji为true时可以由调用方自定义emoji表情按钮。使用方式：`custom-emoji="xxx"`

- 还有三个监听函数供调用：
- bind:at 回调事件，监听输入框输入@。此时开发者可以唤起人员选择弹窗/跳转页面人员选择
- bind:focus 回调事件，监听输入框聚焦
- bind:blur 回调事件，监听输入框失焦。接收两个参数cursorIndex，表示失焦时的光标位置，text表示当前文本框内容。

<div id="cell-group"> </div>

### emoji
和 popup 组件传参、使用方式一致



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
**具体使用见pages/RainSnow/rainsnow.js文件**


### js插件之时间转化
作用为将一个时间戳或者标准格式（yyyy-MM-dd hh:mm:ss）转化为“刚刚”、“几分钟前”、“几小时前”、“几天前”或具体日期（精确到秒）。主要用于发表文章/卡片。
使用直接引入后调用并传入参数即可：
```
Time.getFormatTime(date);
```
**具体使用见【自定义卡片card组件】（components/ycard/ycard.js）文件**



## 展示


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

（3）

![自定义日历组件-心情签到](https://img-blog.csdnimg.cn/20210505145702226.gif#pic_center)

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

![y_card](https://img-blog.csdnimg.cn/20210508175343444.gif#pic_center)


### ybutton
具体使用见pages/ybutton/ybutton

![u_button](https://img-blog.csdnimg.cn/20210425185454207.gif#pic_center)


### yImg
具体使用件pages/YImgShow/picture

![y_img](https://img-blog.csdnimg.cn/e9022feafe644945a1f154457c262e1e.gif#pic_center)


### yImgPro
具体使用件pages/YImgShow/picture。效果和上面一样，但是有更强的动画！

### atinput
![atinput](https://s27.aconvert.com/convert/p3r68-cdx67/4ulo9-fp0iw.gif)


## 联系作者

![wx](https://img-blog.csdnimg.cn/20200716101914321.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjI0ODc4,size_16,color_FFFFFF,t_70)


## 打赏

![wxzf]([https://img-blog.csdnimg.cn/1731613a2aec4f15a75dec89bebfb4bf.jpeg](https://img-blog.csdnimg.cn/50a0a1840a9f4748b9e2f47838da42cd.png#pic_center)https://img-blog.csdnimg.cn/50a0a1840a9f4748b9e2f47838da42cd.png#pic_center)
