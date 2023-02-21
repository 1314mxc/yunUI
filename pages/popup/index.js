// pages/popup/index.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        visible: false,
        visible2: false,
        visible3: false,
    },

    openBottom() {
        this.setData({
            visible: true
        })
    },

    openBottom2() {
        this.setData({
            visible2: true
        })
    },

    openBottom3() {
        this.setData({
            visible3: true
        })
    },

    onCancel() {
        this.setData({
            visible: false
        })
    },

    onCancel2() {
        this.setData({
            visible2: false
        })
    },

    onCancel3() {
        this.setData({
            visible3: false
        })
    },

})