import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtLoadMore } from "taro-ui"
import './index.styl'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      status: 'more'
    };
  }
  componentWillMount () {
    this.getList()
  }

  config = {
    navigationBarTitleText: 'spaceX',
    enablePullDownRefresh: true
  }

  async getList () {
    this.setState({
      status: 'loading'
    })

    const { result } = await Taro.cloud.callFunction({
      name: "query",
      data: {
        collect: 'launches',
        limit: 10,
        offset: this.state.list.length,
      }
    })
    console.log('res: ', result);

    this.setState({
      list: this.state.list.concat(result) || []
    })

    if (result.length === 10) {
      this.setState({
        status: 'more'
      })
      return
    }
    // 没有更多了
    this.setState({
      status: 'noMore'
    })
  }
  async onPullDownRefresh () {
    this.state = {
      list: []
    };
    await this.getList()
    Taro.stopPullDownRefresh()
  }
  onReachBottom () {
    this.getList()
  }

  enter (item) {
    Taro.navigateTo({
      url: `/pages/home/detail?id=${item._id}`
    })
  }

  render () {
    return (
      <View className='index'>
        <AtList>
          {
            this.state.list.map(item => {
              return <AtListItem
                title={item.mission_name}
                note={item.details || ''}
                key={item._id}
                thumb={item.links.mission_patch_small || ''}
                onClick={() => this.enter(item)}
              />
            })
          }
        </AtList>
        <AtLoadMore
          status={this.state.status}
        />
      </View>
    )
  }
}
