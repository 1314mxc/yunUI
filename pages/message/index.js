import Message from '../../components/message/message'

Page({
  data: {
    isOpen: false,
    message: null
  },

  handleDefault() {
      console.log('默认提示')
    Message('这是一条默认提示')
  },

  handleSuccess() {
    Message.success('这是一条成功提示')
  },

  handleWarning() {
    Message.warning('这是一条警告提示')
  },

  handleError() {
    Message({
      content: '这是一条错误提醒',
      type: 'error'
    })
  },

  handleDuration() {
    Message({
      content: '我将在 5 秒后消失',
      duration: 5000
    })
  },

  handleShowClose() {
    Message({
      content: '显示关闭按钮',
      duration: 5000,
      showClose: true
    })
  },

  handleOpen() {
    this.data.message = Message({
      content: '主动调用关闭',
      duration: 0
    })
    
    this.setData({
      isOpen: true
    })
  },

  handleClose() {
    this.setData({
      isOpen: false
    })
    this.data.message.close()
  }
})