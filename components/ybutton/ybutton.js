Component({
  properties: {
    t_title:{
      type: String,
      value:'阅读倒计时'
    },
    inline: {
      type: Boolean,
      value: false
    },
    shape: {
      type: String,
      value: 'normal'
    },
    type: {
      type: String,
      value: 'default'
    },
    long: {
      type: Boolean,
      value: false
    },
    bottom: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: '点击'
    },
    icon: {
      type: String,
      value: ''
    },
    loading: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    zeroTime: {
      type: Boolean,
      value: false
    },
    times: {
      type: String,
      value: ''
    },
    openType: String,
    appParameter: String,
    hoverStopPropagation: Boolean,
    hoverStartTime: {
      type: Number,
      value: 20
    },
    hoverStayTime: {
      type: Number,
      value: 70
    },
    lang: {
      type: String,
      value: 'en'
    },
    sessionFrom: {
      type: String,
      value: ''
    },
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean
  },
  data: {
    time: 0,
    originTitle: '',
    zero_text: true
  },
  lifetimes: {
    attached: function () {
      let _this = this
      let _times = _this.data.times
      let _time = 0
      if (_times) {
        _time = parseInt(_times)
        _this.setData({
          time: _time,
          disabled: true,
          originTitle: _this.data.title,
          title: this.properties.t_title
        })
      }else if(this.properties.zeroTime) {
        _this.setData({
          zero_text: false
        })
      }
    },
    ready: function () {
      // 如果传时间的话在刚触发组件时就开始倒计时
      let _this = this
      if (_this.data.times) {
        let down = function (done) {
          let time = _this.data.time
          if (time <= 0) {
            clearInterval(timer)
            return done()
          }
          time = time - 1
          _this.setData({
            time: time
          })
        }
        let done = function () {
          if(_this.properties.zeroTime) {
            _this.setData({
              disabled: false,
              zero_text: false,
              title: _this.data.originTitle
            })
          } else {
            _this.setData({
              disabled: false,
              title: _this.data.originTitle
            })
          }
        }
        let timer = null
        clearInterval(timer)
        timer = setInterval(down, 1000, done)
      }
      if(_this.data._login){
        _this.userAuthorized()
      }
    }
  },
  methods: {
    // 普通点击按钮触发事件，页面响应此事件后可以进行下一步操作了
    handleTap: function () {
      if (this.data.disabled) return false;
      this.triggerEvent('click')
    },
    // 用户授权
    bindgetuserinfo({
      detail = {}
    } = {}) {
      this.triggerEvent('getuserinfo', detail);
    },
    bindcontact({
      detail = {}
    } = {}) {
      this.triggerEvent('contact', detail);
    },
    bindgetphonenumber({
      detail = {}
    } = {}) {
      this.triggerEvent('getphonenumber', detail);
    },
    binderror({
      detail = {}
    } = {}) {
      this.triggerEvent('error', detail);
    }
  }
})