Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },

  properties: {
    name: {
      type: String,
      observer(val) {
        this.setData({
          isImage: val.indexOf('/') > -1
        })
      }
    },
    
    size: {
      type: Number,
      optionalTypes: [Number, String],
      value: 36,
      observer(val) {
        this.setData({
          fsize: parseInt(val)
        }) 
      }
    },
    color: {
      type: String,
      value: ''
    },
    customStyle: {
      type: String,
      value: ''
    }
  },
  
  data: {
    isImage: false,
    fsize: 36
  }
})