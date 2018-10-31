/**
 * @fileOverview 微信小程序的入口文件
 */

import config from './config'
import promisfy from './lib/promisfy'

App({
  globalData: {
    isIpx: false
  },

  /**
   * 小程序初始化时执行，我们初始化客户端的登录地址，以支持所有的会话操作
   */
  onLaunch () {
    this.checkIsIPhoneX()
  },

  checkIsIPhoneX () {
    const self = this
    wx.getSystemInfo({
      success: function (res) {
        // 根据 model 进行判断
        if (res.model.search('iPhone X') !== -1) {
          self.globalData.isIPX = true
        }
      }
    })
  }
})
