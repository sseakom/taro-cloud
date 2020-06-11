import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtListItem } from "taro-ui"

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentWillMount () {
    this.getDetail()
  }

  config = {
    navigationBarTitleText: 'spaceX',
    enablePullDownRefresh: true
  }

  async getDetail () {
    const id = Number(this.$router.params.id) || 1
    const { result } = await Taro.cloud.callFunction({
      name: "query",
      data: {
        collect: 'launches',
        limit: 1,
        offset: 0,
        id: id,
      }
    })
    console.log('result: ', result);
    const detail = result[0] || {}
    const list = []
    for (const key in detail) {
      if (detail.hasOwnProperty(key)) {
        list.push({
          title: key,
          value: detail[key]
        })
      }
    }
    this.setState({
      list: list
    })

  }
  async onPullDownRefresh () {
    await this.getDetail()
    Taro.stopPullDownRefresh()
  }
  link (link) {
    if (link.article_link) {
      Taro.navigateTo({
        url: `/pages/webview?url=`+ link.article_link
      })
    }
  }
  render () {
    return (
      <View className='index'>
        {
          this.state.list.map(item => {
            return <AtListItem title={item.title} key={item.title} note={item.value} />
          })
        }
      </View>
    )
  }
}
