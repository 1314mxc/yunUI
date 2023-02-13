Component({
    externalClasses: ['custom-class'],
    
    options: {
      addGlobalClass: true,
      multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    
    properties: {
      // 延迟播放时长
      delay: {
        type: Number,
        value: 1
      },
      // 滚动速度 rpx/s
      speed: {
        type: Number,
        value: 150
      },
      // 长度溢出时自动滚动播放
      scrollable: {
        type: Boolean,
        value: true
      },
      multiline: {
        type: Boolean,
        value: false
      }
    },
  
    data: {
      delaySec: 0,
    },
  
    lifetimes: {
      ready() {
        this.getContainerWidth()
      }
    },
  
    methods: {
      getContainerWidth() {
        const query = this.createSelectorQuery()
        query.select('.m-notice-bar').boundingClientRect()
        query.select('.m-notice-bar__content').boundingClientRect()
  
        query.exec(res => {
          const wrapW = wx.getSystemInfoSync().windowWidth  // 容器宽度
          const noticeW = (res[0].width) * (750 / wrapW)
          const containW = (res[1].width) * (750 / wrapW)   // 内容宽度（折合为rpx）
          
          // 内容宽度小于内容区域宽度，则不滚动
          if (containW <= noticeW) {
            this.setData({
              scrollable: false
            })
  
            return;
          }
  
          const delaySec = containW / this.data.speed
  
          this.setData({
            delaySec: parseInt(delaySec)
          })
        })
      }
    }
  });