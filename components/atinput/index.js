
let textIndex = -1;
let textLen = 0;

let focus_name_map = []
let lastLen = 0; // 上一次输入的长度

Component({
    externalClasses: ['custom-input'],
    
    properties: {
        name: {
            type: String,
            value: '',
            observer(res) {
                if(res) {
                    let text = `${this.data.inputContent}${res} `;
                    textLen = text.length
                    // 缓存，用于删除时位置校验，注意“@”符号
                    focus_name_map.push({
                        before_len: `${this.data.inputContent}`.length - "@".length,
                        name_len: `@${res} `.length,
                        all_len: textLen
                    })
                    this.setData({
                        inputContent: text,
                        focus: true,
                        textNum: textLen
                    })
                }
            }
        },
        placeholder: {
            type: String,
            value: "请输入"
        },
        maxlength: {
            type: Number,
            value: 140
        }
    },

    data: {
        inputContent: '',
        focus: false,
        textNum: 0,
    },

    methods: {
        eventInput(e) {
            let textValue = e.detail.value;
            // 可正可负，差值
            let diffrence = lastLen - textValue.length;
            lastLen = textValue.length
            textIndex = textValue.indexOf('@', textValue.length - 1);
            let _content = this.data.inputContent;
            if (_content.length > textValue.length){
                // 删除操作
                // 首先判断：删除了艾特，则当前项失效，正常字符串
                // 删除了@到‘ ’之间的任意字符，则正常删除，缓存中len也要减
                // 删除位置是@name后的空格，则删除掉当前项整个艾特规则
                // 删除了非艾特规则的其他字符或新输入了，都要对规则缓存中的len做改动
                let cacheMapList = []
                let once = -1;
                for(let i=0; i<focus_name_map.length; i++) {
                    if(focus_name_map[i].before_len != e.detail.cursor) {
                        cacheMapList.push(focus_name_map[i])
                    }else {
                        once = i;
                    }
                }
                if(once > -1) {
                    for(let i=once; i<cacheMapList.length; i++) {
                        cacheMapList[i].before_len -= diffrence;
                        cacheMapList[i].all_len -= diffrence;
                    }
                }
                if(cacheMapList.length != focus_name_map.length) {
                    focus_name_map = cacheMapList
                    this.setData({
                        inputContent: textValue
                    })
                    return
                }
                let cacheMapList2 = []
                let cacheIndex = -1
                let cacheName = {}
                for(let i=0; i<focus_name_map.length; i++) {
                    if((focus_name_map[i].all_len - 1) == e.detail.cursor) {
                        cacheIndex = i
                        cacheName = focus_name_map[i]
                        break;
                    }
                }
                if(cacheIndex > -1) {
                    for(let i=0; i<focus_name_map.length; i++) {
                        if(i < cacheIndex) {
                            cacheMapList2.push(focus_name_map[i])
                        }else if (i > cacheIndex) {
                            cacheMapList2.push({
                                name_len: focus_name_map[i].name_len,
                                before_len: focus_name_map[i].before_len - cacheName.name_len,
                                all_len: focus_name_map[i].all_len - cacheName.name_len
                            })
                        }
                    }
                    if(cacheMapList2.length != focus_name_map.length) {
                        focus_name_map = cacheMapList2
                        // 删除整个规则再赋值
                        this.setData({
                            inputContent: `${_content.slice(0, cacheName.before_len)}${_content.slice(cacheName.all_len)}`
                        })
                        return
                    }
                }
                let key = -1;
                for(let i=0; i<focus_name_map.length; i++) {
                    if(focus_name_map[i].before_len < e.detail.cursor && focus_name_map[i].all_len > e.detail.cursor + diffrence) {
                        key = i + 1;
                        focus_name_map[i].name_len -= diffrence;
                        focus_name_map[i].all_len -= diffrence;
                        break;
                    }
                }
                if(key > -1) {
                    for(let i=key; i<focus_name_map.length; i++) {
                        focus_name_map[i].before_len -= diffrence;
                        focus_name_map[i].all_len -= diffrence;
                    }
                    this.setData({
                        inputContent: textValue
                    })
                    return
                }
                for(let i=0; i<focus_name_map.length; i++) {
                    if((e.detail.cursor + diffrence) < focus_name_map[i].before_len) {
                        focus_name_map[i].before_len -= diffrence;
                        focus_name_map[i].all_len -= diffrence;
                    }
                }
                this.setData({
                    inputContent: textValue
                })
            }else {
                if(textIndex > -1) {
                    this.triggerEvent('at', {
                        text: e.detail.value,
                        cursorIndex: e.detail.cursor
                    })
                    this.setData({
                        focus: false,
                        inputContent: e.detail.value
                    })
                }else {
                    this.setData({
                        inputContent: e.detail.value
                    })
                }
            }
        },
        eventFocus(e) {
            this.triggerEvent('focus', e)
        },
        eventBlur() {
            this.triggerEvent('blur', true)
        }
    }
})
