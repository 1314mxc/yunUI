function getCtx(selector) {
    const pages = getCurrentPages()
    const ctx = pages[pages.length - 1]
    console.log(ctx)
    const componentCtx = ctx.selectComponent(selector)
    console.log('component',componentCtx)
    if (!componentCtx) {
      console.error('无法找到对应的组件，请按文档说明使用组件')
      return null
    }
    return componentCtx
  }
  
  const Message = options => {
    const {
      selector = '#message'
    } = options
    const ctx = getCtx(selector)
    console.log(ctx)
    if (typeof options === "string") {
      options = {
        content: options
      }
    }
    ctx.open(options)
  
    return ctx
  }
  
  Message.primary = Message
  
  Message.success = options => {
    if (typeof options === "string") {
      options = {
        content: options
      }
    }
    Message(Object.assign({
      type: 'success'
    }, options))
  }
  
  Message.warning = options => {
    if (typeof options === "string") {
      options = {
        content: options
      }
    }
    Message(Object.assign({
      type: 'warning'
    }, options))
  }
  
  Message.error = options => {
    if (typeof options === "string") {
      options = {
        content: options
      }
    }
    Message(Object.assign({
      type: 'error'
    }, options))
  }
  
  export default Message