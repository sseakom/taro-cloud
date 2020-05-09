import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.styl'

import Login from '../../components/login/index'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  config = {
    navigationBarTitleText: '首页'
  }


  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Login />
      </View>
    )
  }
}
