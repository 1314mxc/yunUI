// pages/atinput/index.js
Page({

    data: {
        visible4: false,
        list: [
            {key: 1, name: '张三'},
            {key: 2, name: '李四'},
            {key: 3, name: '王五'},
            {key: 4, name: '赵六'}
        ],
        member: "",
    },

    onSelectItem() {
        this.setData({
            visible4: true
        })
    },

    onChooseItem(e) {
        let name = this.data.list[e.target.dataset.index].name;
        this.setData({
            visible4: false,
            member: name
        })
    },

    onCancel4() {
        this.setData({
            visible4: false
        })
    },
})