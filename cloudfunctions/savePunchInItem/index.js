// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const uid=event.uid
  const id=event.id
  const punchIn=event.punchIn
  const name=event.name
  const start=event.start
  const end=event.end
  const interval=event.interval
  var newPunchIn
  var index
  for (var i = 0; i < punchIn.length; i++) {
    if (punchIn[i].id == id) {
      index = i
      break
    }
  }
  newPunchIn = punchIn
  newPunchIn[index].name=name
  newPunchIn[index].start = start
  newPunchIn[index].end = end
  newPunchIn[index].interval = interval
  const promiseSave = db.collection('user').doc(uid).update({
    data: {
      punchIn: newPunchIn
    }
  })
  return (await promiseSave)
}