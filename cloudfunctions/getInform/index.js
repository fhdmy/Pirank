// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  const {
    OPENID,
    APPID,
    UNIONID
  } = cloud.getWXContext()
  const nickName = event.nickName
  const promiseInform=db.collection('user').where({
    openId: OPENID
  }).get();
  var inform=await promiseInform
  if (inform.data.length == 0) {
    const promiseAdd=db.collection('user').add({
      data: {
        userName: nickName,
        openId: OPENID,
        finishRate: [],
        punchIn: [],
        today: []
      },
    })
    const uid=(await promiseAdd)._id
    return {
      data: [
        {
          _id: uid,
          openId: OPENID,
          userName: nickName,
          finishRate: [],
          punchIn: [],
          today: []
        }
      ]
    }
  }
  else return inform
}