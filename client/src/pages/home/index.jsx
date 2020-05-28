import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.styl'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  config = {
    navigationBarTitleText: '首页'
  }


  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
      </View>
    )
  }
}
