const MAX_IMG_NUM = 9;
let elements = [];

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    yMovable: {
      type: Boolean,
      value: false
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    images: [],
    selectPhoto: true,
    showMenuImg: false,
    flag: false,
    hidden: true,
    x: 0,
    y: 0,
    doubleImg: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShowMenu(e) {
      const detail = e.currentTarget;
      if (!this.data.showMenuImg) {
        // 使手机振动15ms
        wx.vibrateShort();
      }
      this.setData({
        showMenuImg: true
      })
      if (this.properties.yMovable) {
        this.setData({
          x: detail.offsetLeft + 4,
          y: detail.offsetTop,
          hidden: false,
          flag: true,
          doubleImg: this.data.images[detail.dataset.index].img
        })
      }
    },
    //触摸开始
    touchs: function (e) {
      this.setData({
        beginIndex: e.currentTarget.dataset.index
      })
    },
    //触摸结束
    touchend: function (e) {
      if (!this.data.flag) {
        return;
      }
      const x = e.changedTouches[0].pageX
      const y = e.changedTouches[0].pageY
      const list = elements;
      let data = this.data.images
      for (var j = 0; j < list.length; j++) {
        const item = list[j];
        if (x > item.left && x < item.right && y > item.top && y < item.bottom) {
          const endIndex = item.dataset.index;
          const beginIndex = this.data.beginIndex;
          //向后移动
          if (beginIndex < endIndex) {
            let tem = data[beginIndex];
            for (let i = beginIndex; i < endIndex; i++) {
              data[i] = data[i + 1]
            }
            data[endIndex] = tem;
          }
          //向前移动
          if (beginIndex > endIndex) {
            let tem = data[beginIndex];
            for (let i = beginIndex; i > endIndex; i--) {
              data[i] = data[i - 1]
            }
            data[endIndex] = tem;
          }

          this.setData({
            images: data
          })
          this.initImg(this.triggerMsg(data, "sort-img"))
        }
      }
      this.setData({
        hidden: true,
        flag: false
      })
    },
    //滑动
    touchm: function (e) {
      if (this.data.flag) {
        const x = e.touches[0].pageX
        const y = e.touches[0].pageY
        this.setData({
          x: x - 75,
          y: y - 45
        })
      }
    },

    onChooseImage() {
      let images = this.data.images;
      let imageLen = images.length;
      let max = MAX_IMG_NUM - imageLen;
      wx.chooseImage({
        count: max,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          max -= res.tempFilePaths.length;
          let _images = images.map(item => {
            return item.img
          })
          images = _images.concat(res.tempFilePaths)
          for (let i = 0; i < images.length; i++) {
            images[i] = {
              img: images[i],
              index: i + 1
            }
          }
          this.setData({
            selectPhoto: max <= 0 ? false : true,
            images,
            showMenuImg: false
          })
          this.triggerMsg(images, "choose-img")
          if (this.properties.yMovable) {
            this.initImg()
          }
        },
        fail: (res) => {
        }
      })
    },

    initImg(fn=function(){}) {
      let query = wx.createSelectorQuery().in(this);
      let nodesRef = query.selectAll(".image-bg");
      nodesRef.fields({
        dataset: true,
        rect: true
      }, (result) => {
        elements = result;
        fn();
      }).exec()
    },

    onDelImage(event) {
      let images = this.data.images;
      images.splice(event.target.dataset.index, 1)
      this.setData({
        images
      })
      this.initImg(this.triggerMsg(images, "delete-img"))
      if (images.length == MAX_IMG_NUM - 1) {
        this.setData({
          selectPhoto: true
        })
      }
    },

    triggerMsg(images, key) {
      this.triggerEvent('chooseImg', {
        images: images.map(item => {
          return item.img
        }),
        key: key
      })
    },

    onPreviewImage(event) {
      let images = this.data.images;
      let _images = images.map(item => {
        return item.img
      })
      wx.previewImage({
        urls: _images,
        current: event.target.dataset.imgsrc
      })
    },
  }
})
