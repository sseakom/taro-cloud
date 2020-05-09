import Taro, { Component } from "@tarojs/taro"
import { AtInput, AtButton, AtTextarea  } from 'taro-ui'
import { View } from "@tarojs/components";

export default class Login extends Component {
  state = {
    phone: '',
    context: {},
    fingerPrint: {},
    fingerPrintSignature: '',
  }

  componentWillMount () { }

  componentDidMount () {
    // this.getFingerPrint()
    Taro.login().then(res => {
      console.log('login: ', res.code);
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getFingerPrint = () => {
    Taro.checkIsSupportSoterAuthentication().then(res => {
      console.log('checkIsSupportSoterAuthentication: ', res.supportMode);
      Taro.startSoterAuthentication({
        requestAuthModes: res.supportMode,
        challenge: Date.now() + '',
      }).then(r => {
        console.log('fingerPrint: ', r)
        this.setState({
          fingerPrint: r.resultJSON,
          fingerPrintSignature: r.resultJSONSignature
        })
      })
    })
  }

  handleChange (value) {
    this.setState({
      phone: value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }

  getLogin = () => {
    Taro.cloud
      .callFunction({
        name: "login",
        data: {
          fingerPrint: this.state.fingerPrint,
          fingerPrintSignature: this.state.fingerPrintSignature,
        }
      })
      .then(res => {
        console.log('res: ', res);
        this.setState({
          context: res.result
        })
      })
  }

  render () {
    return (
      <View className='index'>
        <View style={{ display: 'none' }}>
          <AtInput title='手机号' type='text' value={this.state.phone} onChange={this.handleChange.bind(this)}></AtInput>
        </View>
        <AtButton onClick={this.getLogin}>获取登录云函数</AtButton>
        <AtTextarea value={JSON.stringify(this.state.context)} disabled></AtTextarea>
      </View>
    )
  }
}
