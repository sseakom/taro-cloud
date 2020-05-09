const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  console.log('event, context: ', event, context);
  const wxContext = cloud.getWXContext()
  console.log('wxContext: ', wxContext)
  // 1. 获取数据库引用
  const db = cloud.database()
  const user = db.collection('user')
  console.log('user: ', user)
  user
    .where({
      openid: wxContext.OPENID,
    })
    .get()
    .then((res) => {
      console.log('res: ', res.data)
      if (res && res.data && res.data.length) {
        console.log('已注册')
        return
      }
      // 如果没有结果 则添加数据
      user.add({
        data: {
          openid: wxContext.OPENID,
          appid: wxContext.APPID,
          fingerPrint: event.fingerPrint,
          fingerPrintSignature: event.fingerPrintSignature
        }
      }).then(res => {
        console.log('添加成功', res.data)
      })
    })
  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
