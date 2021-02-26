// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  const uid = event.uid
  const punchIn = event.punchIn
  const today=event.today
  const promiseAdd = db.collection('user').doc(uid).update({
    data: {
      punchIn:punchIn,
      today:today
    }
  })
  return (await promiseAdd)
}