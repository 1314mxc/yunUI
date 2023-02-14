Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },

  relations: {
    '../cell-group/index': {
      type: 'ancestor'
    }
  },

  properties: {
    icon: {
      type: String,
      value: ''
    },

    image: {
      type: String,
      value: ''
    },

    title: {
      type: String,
      value: ''
    },

    value: {
      type: String,
      value: ''
    },

    isMultiple: {
      type: Boolean,
      value: false
    },

    border: {
      type: Boolean,
      value: false
    },

    yTColor: {
      type: String,
      value: '#909399'
    },

    iconColor: {
      type: String,
      value: ''
    },

    // 链接类型，可选值为 navigateTo，redirectTo，switchTab
    linkType: {
      type: String,
      value: 'navigateTo'
    },

    url: {
      type: String,
      value: ''
    }
  },


  methods: {
    updateCellBorder(border) {
      this.setData({
        border
      })
    },

    onClick() {
      this.triggerEvent('click')

      const url = this.data.url
      if (!url) return

      wx[this.data.linkType].call(wx, {
        url
      })
    }
  }
});