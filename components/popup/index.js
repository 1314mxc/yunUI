// components/popup/index.js
Component({
    externalClasses: ['popup-class', 'poptop-class'],

	options: {
        multipleSlots: true
	},
    /**
     * 组件的属性列表
     */
    properties: {
        showPop: {
            type: Boolean,
            value: false,
            observer(res) {
                if(res) {
                    setTimeout(() => {
                        this.setData({
                            visible: true
                        })
                    }, 200)
                }
            }
        },
        site: {
            type: String,
            value: 'bottom'
        },
        title: {
            type: String,
            value: '底部弹层'
        },
        default_layout: {
            type: Boolean,
            value: true
        },
        bg_closed: {
            type: Boolean,
            value: false
        },
        // popWidth: {
        //     type: String,
        //     value: '200rpx'
        // },
        popHeight: {
            type: String,
            value: '60%'
        },
        maxWidth: {
            type: String,
            value: '100%'
        },
        bg_opacity: {
            type: Number,
            value: 0.1
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        visible: false,
        maxHeight: '0%',
        top_layout: true,
        // popWidth: '0%',
        // popHeight: '0%'
    },

    lifetimes:{
        // 在这个生命周期中只能拿到传参的初始值(就是页面data中的值)
        attached(){
            let height = this.properties.popHeight;
            let _layout = this.properties.default_layout;
            let windowHeight = wx.getSystemInfoSync().windowHeight    // 获取当前窗口的高度
            let _height = this.sizeComputed(height, windowHeight)
            if(this.properties.site == 'right') {
                _layout = false;
            }
            this.setData({
                maxHeight: _height,
                top_layout: _layout
            })
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        sizeComputed(size, windowSize) {
            let _size = 0;
            if(size.indexOf('%') > -1) {
                let num = Number(size.slice(0, -1))
                if(num > 100) {
                    _size = '60%'
                }else {
                    _size = `${num}%`
                }
            }else if(size.indexOf('rpx') > -1) {
                let num = Math.floor(Number(size.slice(0, -3)) / 2)
                if(num >= windowSize) {
                    _size = '603rpx'
                }else {
                    _size = `${num*2}rpx`
                }
            }
            return _size
        },
        onCancel() {
            this.setData({
                visible: false
            })
            setTimeout(() =>{
                this.triggerEvent('onCancel', true)
            }, 200)
        },
        onClose() {
            if(this.properties.bg_closed) {
                this.onCancel()
            }
        }
    }
})
