/**
 * 排序img增强模式
 * author： @mengxiaochen
 */
let MAX_IMG_NUM = 9;

Component({
    externalClasses: ['customImg-del'],

    /**
     * 组件的属性列表
     */
    properties: {
        yTDel: {
            type: Boolean,
            value: false
        },
        scrollOffset: {
            type: Number,
            value: 0
        },
        imgShape: {
            type: Object,
            value: {
                side: 232,
                pd: 13
            }
        },
        maxLen: {
            type: Number,
            value: 9
        },
        defaultImgList: {
            type: Array,
            value: [],
            observer(res) {
                if(res?.length && !this.data.listData.length) {
                    MAX_IMG_NUM -= res.length;
                    this.setData({
                        canSelphoto: MAX_IMG_NUM <= 0 ? false : true,
                        listData: res
                    })
                    this.init()
                }
            }
        },
        default_add: {
            type: Boolean,
            value: false
        }
    },

    itemWrap: {},
    tranX: 0,
    tranY: 0,

    /**
     * 组件的初始数据
     */
    data: {
        list: [],
        columns: 3,
        listData: [],
        touch: false,
        showMenuImg: false,
        itemWrapHeight: 0,
        selSite: {
            tranX: 0,
            tranY: 0
        },
        tranX: 0,
        tranY: 0,
        canSelPhoto: true,
        curZ: -1,
        cur: -1,
        itemTransition: false,
    },

    lifetimes:{
        // 在这个生命周期中只能拿到传参的初始值(就是页面data中的值)
        attached(){
            MAX_IMG_NUM = this.properties.maxLen
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onChooseImage() {
            let images = this.data.listData;
            let imageLen = images.length;
            let max = MAX_IMG_NUM - imageLen;
            wx.chooseImage({
                count: max,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    max -= res.tempFilePaths.length;
                    images = images.concat(res.tempFilePaths)
                    this.setData({
                        canSelPhoto: max <= 0 ? false : true,
                        listData: images
                    })
                    this.triggerMsg(images, "choose-img")
                    this.init()
                },
                fail: (res) => {}
            })
        },

        init() {
            // 遍历数据源增加扩展项, 以用作排序使用
            let list = this.data.listData.map((item, index) => {
                let data = {
                    key: index,
                    tranX: 0,
                    tranY: 0,
                    data: item
                }
                return data
            });

            this.setData({
                list: list,
                itemTransition: false
            });

            // 获取每一项的宽高等属性
            this.createSelectorQuery().select(".item").boundingClientRect((res) => {

                let rows;
                let len = this.data.list.length;
                if(len == MAX_IMG_NUM) {
                    rows = Math.ceil(len / this.data.columns);
                }else {
                    rows = Math.ceil((len + 1) / this.data.columns);
                }

                this.item = res;

                let itemWrapHeight = rows * res.height;

                this.getPosition(this.data.list, false);

                let obj = list[list.length - 1]
                let tranX = res.width * ((obj.key + 1) % this.data.columns);
                let tranY = Math.floor((obj.key + 1) / this.data.columns) * res.height;

                this.setData({
                    itemWrapHeight,
                    selSite: {
                        tranX,
                        tranY
                    }
                })

                let query = wx.createSelectorQuery().in(this);
                query.select('.item-wrap').boundingClientRect((res) => {
                    this.itemWrap = res;

                })
                // 需要的是“距离文档流顶部的距离”。所以咱们需要这片区域已经在页面上滚动了多少了，把这个值加上
                if(this.properties.scrollOffset) {
                    this.itemWrap.top += this.properties.scrollOffset;
                }else {
                    query.selectViewport().scrollOffset((res) => {
                        let _wrap = this.itemWrap.top + res.scrollTop;
                        this.itemWrap.top = _wrap;
                    })
                }
                
                query.exec()
            }).exec();
        },

        /**
         * 清除参数
         */
        clearData() {
            this.originKey = -1;

            this.setData({
                touch: false,
                cur: -1,
                tranX: 0,
                tranY: 0
            });
            this.tranX = 0;
            this.tranY = 0;

            // 延迟清空
            setTimeout(() => {
                this.setData({
                    curZ: -1,
                })
            }, 300)
        },

        touchEnd() {
            if (!this.data.touch) {
                return;
            }else {
                this.setData({
                    showMenuImg: true
                })
            }
            this.triggerMsg(this.data.listData, "sort-img")
            this.clearData();
        },

        /**
         * 根据排序后 list 数据进行位移计算
         */
        getPosition(data, vibrate = true) {
            let list = data.map((item, index) => {
                item.tranX = this.item.width * (item.key % this.data.columns);
                item.tranY = Math.floor(item.key / this.data.columns) * this.item.height;
                return item
            });

            this.setData({
                list: list
            });

            if (!vibrate) return;

            let listData = [];

            list.forEach((item) => {
                listData[item.key] = item.data
            });

            this.setData({
                listData,
                itemTransition: true
            })
        },

        /**
         * 根据起始key和目标key去重新计算每一项的新的key
         */
        insert(origin, end) {
            let list;

            if (origin < end) {
                list = this.data.list.map((item) => {
                    if (item.key > origin && item.key <= end) {
                        item.key = item.key - 1;
                    } else if (item.key == origin) {
                        item.key = end;
                    }
                    return item
                });
                this.getPosition(list);

            } else if (origin > end) {
                list = this.data.list.map((item) => {
                    if (item.key >= end && item.key < origin) {
                        item.key = item.key + 1;
                    } else if (item.key == origin) {
                        item.key = end;
                    }
                    return item
                });
                this.getPosition(list);
            }
        },

        /**
         * 根据当前的手指偏移量计算目标key
         */
        calculateMoving(tranX, tranY) {
            let rows = Math.ceil(this.data.list.length / this.data.columns) - 1,
                i = Math.round(tranX / this.item.width),
                j = Math.round(tranY / this.item.height);

            i = i > (this.data.columns - 1) ? (this.data.columns - 1) : i;
            i = i < 0 ? 0 : i;

            j = j < 0 ? 0 : j;
            j = j > rows ? rows : j;

            let endKey = i + this.data.columns * j;

            endKey = endKey >= this.data.list.length ? this.data.list.length - 1 : endKey;

            return endKey
        },

        touchMove(e) {
            if (!this.data.touch) return;
            let tranX = e.touches[0].pageX - this.startX + this.tranX,
                tranY = e.touches[0].pageY - this.startY + this.tranY;

            this.setData({
                tranX: tranX,
                tranY: tranY,
                showMenuImg: false
            });

            let originKey = e.currentTarget.dataset.key;

            let endKey = this.calculateMoving(tranX, tranY);

            // 防止拖拽过程中发生乱序问题
            if (originKey == endKey || this.originKey == originKey) return;

            this.originKey = originKey;

            this.insert(originKey, endKey);
        },

        /**
         * 长按触发移动排序
         */
        longPress(e) {
            if(this.data.list.length < 2){
                this.setData({
                    showMenuImg: true
                });
                wx.vibrateShort();
                return;
            }

            this.setData({
                touch: true
            });

            this.startX = e.changedTouches[0].pageX
            this.startY = e.changedTouches[0].pageY

            let index = e.currentTarget.dataset.index;

            if (this.data.columns === 1) { // 单列时候X轴初始不做位移
                this.tranX = 0;
            } else { // 多列的时候计算X轴初始位移, 使 item 水平中心移动到点击处
                this.tranX = this.startX - this.item.width / 2 - this.itemWrap.left;
            }

            // 计算Y轴初始位移, 使 item 垂直中心移动到点击处
            this.tranY = this.startY - this.item.height / 2 - this.itemWrap.top;

            this.setData({
                cur: index,
                curZ: index,
                tranX: this.tranX,
                tranY: this.tranY,
                showMenuImg: true
            });

            wx.vibrateShort();
        },
        onDelImage(event) {
            let list = this.data.list;
            if(list.length < 2) {
                this.triggerMsg([], "delete-img")
                this.setData({
                    listData: [],
                    list: [],
                    showMenuImg: false,
                    selSite: {
                        tranX: 0,
                        tranY: 0
                    }
                })
                return;
            }
            let cacheList = JSON.parse(JSON.stringify(list));
            let listData = [];

            this.aniDelItem(cacheList, event, listData, list)
            
        },

        normalDelItem(list, event, listData) {
            list.sort(this.sortBy("key"));

            list.map(item => {
                if(event.currentTarget.dataset.index !== item.key) {
                    listData.push(item.data)
                }
            })

            this.triggerMsg(listData, "delete-img")
            this.setData({
                listData,
            })
            this.init()
        },

        aniDelItem(cacheList, event, listData, sourceList=[]) {
            let cacheNow = -1;

            // 缓存
            let _item = {
                key: -1,
                data: ""
            }
            let cacheMoka = {}

            cacheList.sort(this.sortBy("key"));

            // 正向遍历，获取关键节点
            for(let i = 0; i < cacheList.length; i++) {
                if(cacheList[i].key === event.currentTarget.dataset.index) {
                    cacheNow = cacheList[i].key
                    break;
                }
            }

            // 逆向遍历，到关键节点处停止，梳理被删除节点后面的元素
            for(let i = cacheList.length - 1; i >= 0; i--) {
                if(cacheNow < 0 || cacheList[i].key < cacheNow) break;
                if(_item.key < 0) {
                    _item = {
                        key: cacheList[i].key,
                        data: cacheList[i].data
                    }
                    continue;
                }
                let tempData = {
                    key: cacheList[i].key,
                    data: cacheList[i].data
                }
                cacheList[i].key = _item.key;
                cacheList[i].data = _item.data;
                _item = tempData;
            }

            cacheList.length -= 1;

            cacheList.forEach(item => {
                cacheMoka[item.key] = {
                    tranX: item.tranX,
                    tranY: item.tranY
                }
            })

            let useList = []

            // 重新赋值到原数组
            for(let i=0; i< sourceList.length; i++) {
                if(cacheMoka[sourceList[i].key]) {
                    useList.push({
                        key: sourceList[i].key,
                        tranX: cacheMoka[sourceList[i].key].tranX,
                        tranY: cacheMoka[sourceList[i].key].tranY,
                        data: sourceList[i].data
                    })
                }
            }

            // 拿到更新后的img列表
            useList.map(item => {
                listData.push(item.data)
            })

            // 计算最后的加号位置
            let _selSite = this.data.selSite;
            if(this.data.list.length >= this.data.columns && !(this.data.list.length % this.data.columns)) {
                _selSite.tranX = this.item.width * (this.data.columns - 1);
                _selSite.tranY -= this.item.height;
            }else {
                _selSite.tranX -= this.item.width
            }

            this.triggerMsg(listData, "delete-img")

            this.setData({
                listData,
                list: useList,
                selSite: _selSite
            })
        },

        triggerMsg(images, key) {
            this.triggerEvent('chooseImg', {
                images,
                key: key
            })
        },
        sortBy(props) {
            return function(a,b) {
                return a[props] - b[props];
            }
        },
    }
})