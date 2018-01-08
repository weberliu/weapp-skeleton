/**
 * @fileOverview 微信小程序的入口文件
 */

import { wx, qcloud } from './vendor/weapp-promise/index'
import config from './config/index'

App({
  /**
   * 小程序初始化时执行，我们初始化客户端的登录地址，以支持所有的会话操作
   */
  onLaunch () {
    qcloud.setLoginUrl(config.service.loginUrl)

    wx.getNetworkType()
      .then(res => {
        if (res.networkType === 'none') {
          return wx.showMessage('提示', '请检查您当前的网络状态')
        }
      })
  },

  globalData: {
    hasLogin: false
  }
})
