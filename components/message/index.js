const defaults_data = {
	visible: false,
	content: '',
	duration: 2000,
	zIndex: -1,
	top: '0px'
}

let timer = null

Component({
	externalClasses: ['custom-class'],

	options: {
		addGlobalClass: true,
	},

	data: defaults_data,

	ready() {
		if (wx.canIUse('getWindowInfo')) {
			const windowInfo = wx.getWindowInfo()
			this.computedBarH(windowInfo)
		} else {
			// 该方法为同步
			wx.getSystemInfo({
				success: (windowInfo) => {
					this.computedBarH(windowInfo)
				}
			})
		}
	},

	methods: {
		computedBarH(windowInfo) {
			const {
				screenHeight,
				windowHeight,
				statusBarHeight
			} = windowInfo;

			// 自定义导航栏
			if (screenHeight === windowHeight) {
				let customBarH = 44;
				let capsule = wx.getMenuButtonBoundingClientRect();
				if (capsule) {
					customBarH = capsule.bottom - statusBarHeight + 4;
				}

				defaults_data.top = customBarH + statusBarHeight + 'px'
				this.setData({
					top: customBarH + statusBarHeight + 'px'
				})
			}
		},


		open(options) {
			const {
				type = 'primary',
					duration = 2000,
					zIndex = 2000,
					showClose = false
			} = options

			this.setData({
				...options,
				type,
				duration,
				zIndex,
				showClose,
				visible: true
			})

			if (timer) clearTimeout(timer)

			if (duration) {
				timer = setTimeout(() => {
					this.close()
					timer = null
				}, duration)
			}
		},

		close() {
			this.setData({
				...defaults_data
			})
		}
	}
})