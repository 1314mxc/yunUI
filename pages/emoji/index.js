// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    text : "",
    emoji: '',
    textIndex : 0,
    emojiView : false,
    
  },
  onLoad() {
  },
  
  textInput : function (e) {
    this.setData({ text : e.detail.value });
  },
  /** 用于获取最后输入的光标位置 */
  textSelect : function (e) {
    this.setData({ textIndex : e.detail.cursor });
  },
  /** 打开/关闭表情 */
  openEmoji : function () {
    var that = this;
    this.setData({
      emojiView : true
    });
  },
  onCancel() {
      this.setData({
        emojiView : false
      })
  },

  onBlur(e) {
      this.setData({
          text: e.detail.text,
          textIndex: e.detail.cursorIndex
      })
  },
  /** 表情插入 */
  emojiInput : function (e) {
    var that = this;
    var textIndex = that.data.textIndex;

    var emoji = e.detail;

    this.setData({
      emoji : emoji,
      textIndex : textIndex + emoji.length
    });
  }
});