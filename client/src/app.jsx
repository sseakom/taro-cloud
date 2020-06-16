import Taro, { Component } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import Index from './pages/home/index'
import './app.styl'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount () {
    console.log('componentDidMount: ', this)
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
    }
  }

  config = {
    pages: [
      'pages/home/index',
      'pages/mission/index',
      'pages/payload/index',
      'pages/core/index',
      'pages/home/detail',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    cloud: true,
    tabBar: {
      color: '#999999',
      backgroundColor: '#ffffff',
      borderStyle: 'black',
      selectedColor: '#1296db',
      list: [{
        pagePath: 'pages/home/index',
        text: 'launches',
        iconPath: 'img/1.png',
        selectedIconPath: 'img/1_h.png'
      },
      {
        pagePath: 'pages/mission/index',
        text: 'missions',
        iconPath: 'img/2.png',
        selectedIconPath: 'img/2_h.png'
      },
      {
        pagePath: 'pages/payload/index',
        text: 'payloads',
        iconPath: 'img/3.png',
        selectedIconPath: 'img/3_h.png'
      },
      {
        pagePath: 'pages/core/index',
        text: 'cores',
        iconPath: 'img/4.png',
        selectedIconPath: 'img/4_h.png'
      }]
    }

  }



  componentDidShow () {
    console.log('componentDidShow: ', this)
  }

  componentDidHide () {
    console.log('componentDidHide: ', this)
  }

  componentDidCatchError () {
    console.log('componentDidCatchError: ', this)
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
