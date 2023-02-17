// pages/popup/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        visible: false,
        visible2: false
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})