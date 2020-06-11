import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import Login from '../../components/login/index'

export default class Mine extends Component {

  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  config = {
    navigationBarTitleText: '我的'
  }


  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        {/* <Login /> */}
      </View>
    )
  }
}
