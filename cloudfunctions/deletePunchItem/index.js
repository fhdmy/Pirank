// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const uid = event.uid
  const id=event.id
  const punchIn=event.punchIn
  const today=event.today
  var newPunchIn
  var newToday
  var index
  var tIndex
  for(var i=0;i<punchIn.length;i++){
    if(punchIn[i].id==id){
      index=i
      break
    }
  }
  punchIn.splice(index, 1)
  newPunchIn = punchIn
  for (var i = 0; i < today.length; i++) {
    if (today[i].id == id) {
      tIndex = i
      break
    }
  }
  today.splice(tIndex,1)
  newToday=today
  const promiseDelete = db.collection('user').doc(uid).update({
    data: {
      punchIn: newPunchIn,
      today:newToday
    }
  })
  return (await promiseDelete)
}