Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
    multipleSlots: true
  },

  relations: {
    '../cell/index': {
      type: 'descendant',

      linked() {
        this._updateChildren()
      },

      linkChanged() {
        this._updateDataChange();
      },

      unlinked() {
        this._updateChildren()
      }
    }
  },

  properties: {
    title: {
      type: String,
      value: ''
    },

    card: {
      type: Boolean,
      value: false
    },

    border: {
      type: Boolean,
      value: false,
      observer(val) {
        this._updateChildren()
      }
    }
  },

  methods: {
    _updateChildren() {

      // 防抖减少重复触发
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }

      this.timer = setTimeout(() => {

        let cells = this.getRelationNodes('../cell/index')
        const len = cells.length

        if (len > 0) {
          let lastIndex = len - 1

          cells.forEach((cell, index) => {
            cell.updateCellBorder(this.data.border && index !== lastIndex)
          })
        }
      }, 60)
    }
  }
})