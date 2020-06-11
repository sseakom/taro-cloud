const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  console.log('event, context: ', event, context);
  const { collect, limit, offset, id } = event
  const wxContext = cloud.getWXContext()
  console.log('wxContext: ', wxContext)
  // 1. 获取数据库引用
  const db = cloud.database()
  const col = db.collection(collect)

  queryObj = {}

  if (id) {
    if (isNaN(Number(id))) {
      queryObj._id = id
    } else {
      queryObj._id = Number(id)
    }
  }

  const arr = await col
    .where(queryObj)
    .limit(limit)
    .skip(offset)
    .orderBy('_id', 'desc')
    .get()
    .then((res) => {
      console.log('res: ', res.data)
      return res.data
    })
  const newArr = [];
  for (let index = 0; index < arr.length; index++) {
    const newObj = {}
    for (const key in arr[index]) {
      if (arr[index].hasOwnProperty(key)) {
        if (['{', '['].includes(arr[index][key][0])) {
          newObj[key] = JSON.parse(arr[index][key])
        } else {
          newObj[key] = arr[index][key]
        }
      }
    }
    newArr.push(newObj)
  }
  console.log('newArr: ', newArr);
  return newArr
}
