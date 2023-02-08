// pages/ylistscroll/listscroll.js
let items = [];
for(let i=0; i<1000; i++) {
    items.push({id: i, value: i})
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items,
        size: 40,
        remain: 8,

        vHeight: 0,
        scrollHeight: 0,
        start: 0,
        end: 0,
        // list: [],
        // columns: 3,
        // listData: [],
        // touch: false,
        // itemWrapHeight: 0,
        // selSite: {tranX: 0, tranY: 0}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.setData({
            end: this.data.remain,
            vHeight: this.data.size * this.data.remain,
            scrollHeight: this.data.items.length * this.data.size
        })
    },

//     onChooseImage() {
//     let images = this.data.listData;
//       let imageLen = images.length;
//       let max = MAX_IMG_NUM - imageLen;
//       wx.chooseImage({
//         count: max,
//         sizeType: ['original', 'compressed'],
//         sourceType: ['album', 'camera'],
//         success: (res) => {
//           max -= res.tempFilePaths.length;
//           console.log(images, res.tempFilePaths)
//           images = images.concat(res.tempFilePaths)
//           this.setData({
//             listData: images,
//           })
//           this.init()
//         },
//         fail: (res) => {
//         }
//       })
//     },

//     init() {
//         // 遍历数据源增加扩展项, 以用作排序使用
//         let list = this.data.listData.map((item, index) => {
//             let data = {
//                 key: index,
//                 tranX: 0,
//                 tranY: 0,
//                 data: item
//             }
//             return data
//         });
    
//         this.setData({
//             list: list,
//             itemTransition: false
//         });
    
//         // 获取每一项的宽高等属性
//         this.createSelectorQuery().select(".item").boundingClientRect((res) => {
    
//             this.item = res;
    
//             this.getPosition(this.data.list, false);

//             let obj = list[list.length - 1]
//             let tranX = res.width * ((obj.key + 1) % this.data.columns);
//             let tranY = Math.floor((obj.key + 1) / this.data.columns) * res.height;

//             this.setData({
//                 selSite: {
//                     tranX,
//                     tranY
//                 }
//             })
    
//             this.createSelectorQuery().select(".item-wrap").boundingClientRect((res) => {
//                 this.itemWrap = res;
    
//             }).exec();
//         }).exec();
//     },

//     /**
//  * 清除参数
//  */
// clearData() {
//     this.originKey = -1;

//     this.setData({
//         touch: false,
//         cur: -1,
//         tranX: 0,
//         tranY: 0
//     });

//     // 延迟清空
//     setTimeout(() => {
//         this.setData({
//             curZ: -1,
//         })
//     }, 300)
// },

// touchEnd() {
//     if (!this.data.touch) return;

//     this.clearData();
// },

// /**
//  * 根据排序后 list 数据进行位移计算
//  */
// getPosition(data, vibrate = true) {
//     let list = data.map((item, index) => {
//         item.tranX = this.item.width * (item.key % this.data.columns);
//         item.tranY = Math.floor(item.key / this.data.columns) * this.item.height;
//         return item
//     });

//     this.setData({
//         list: list
//     });

//     if(!vibrate) return;

//     this.setData({
//         itemTransition: true
//     })

//     let listData= [];

//     list.forEach((item) => {
//         listData[item.key] = item.data
//     });

//     this.triggerEvent('change', {listData: listData});
// },

// /**
//  * 根据起始key和目标key去重新计算每一项的新的key
//  */
// insert(origin, end) {
//     let list;

//     if (origin < end) {
//         list = this.data.list.map((item) => {
//             if (item.key > origin && item.key <= end) {
//                 item.key = item.key - 1;
//             } else if (item.key == origin) {
//                 item.key = end;
//             }
//             return item
//         });
//         this.getPosition(list);

//     } else if (origin > end) {
//         list = this.data.list.map((item) => {
//             if (item.key >= end && item.key < origin) {
//                 item.key = item.key + 1;
//             } else if (item.key == origin) {
//                 item.key = end;
//             }
//             return item
//         });
//         this.getPosition(list);
//     }
// },

// /**
//  * 根据当前的手指偏移量计算目标key
//  */
// calculateMoving(tranX, tranY) {
//     let rows = Math.ceil(this.data.list.length / this.data.columns) - 1,
//         i = Math.round(tranX / this.item.width),
//         j = Math.round(tranY / this.item.height);

//     i = i > (this.data.columns - 1) ? (this.data.columns - 1) : i;
//     i = i < 0 ? 0 : i;

//     j = j < 0 ? 0 : j;
//     j = j > rows ? rows : j;

//     let endKey = i + this.data.columns * j;

//     endKey = endKey >= this.data.list.length ? this.data.list.length - 1 : endKey;

//     return endKey
// },

// touchMove(e) {
//     if (!this.data.touch) return;
//     let tranX = e.touches[0].pageX - this.startX + this.tranX,
//         tranY = e.touches[0].pageY - this.startY + this.tranY;

//     this.setData({tranX: tranX, tranY: tranY});

//     let originKey = e.currentTarget.dataset.key;

//     let endKey = this.calculateMoving(tranX, tranY);

//     // 防止拖拽过程中发生乱序问题
//     if (originKey == endKey || this.originKey == originKey) return;

//     this.originKey = originKey;

//     this.insert(originKey, endKey);
// },

// /**
//  * 长按触发移动排序
//  */
// longPress(e) {
//     this.setData({
//         touch: true
//     });

//     this.startX = e.changedTouches[0].pageX
//     this.startY = e.changedTouches[0].pageY

//     let index = e.currentTarget.dataset.index;

//     if(this.data.columns === 1) { // 单列时候X轴初始不做位移
//         this.tranX = 0;
//     } else {  // 多列的时候计算X轴初始位移, 使 item 水平中心移动到点击处
//         this.tranX = this.startX - this.item.width / 2 - this.itemWrap.left;
//     }

//     // 计算Y轴初始位移, 使 item 垂直中心移动到点击处
//     this.tranY = this.startY - this.item.height / 2 - this.itemWrap.top;

//     this.setData({
//         cur: index,
//         curZ: index,
//         tranX: this.tranX,
//         tranY: this.tranY,
//     });

//     wx.vibrateShort();
// },
})