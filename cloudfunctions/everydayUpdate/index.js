// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var userArr=[]
  // 获得每个用户的_id
  const promiseUser=db.collection('user').get()
  const user=(await promiseUser)
  var now = new Date()
  for(var i=0;i<user.data.length;i++){
    userArr.push(user.data[i]._id)
  }
  // 分别对每个用户进行操作
  for(var k=0;k<userArr.length;k++){
    var promiseFinish=db.collection('user').doc(userArr[k]).get()
    var Finish=(await promiseFinish)
    var todayArr=Finish.data.today
    var finishR=Finish.data.finishRate
    var punchIn = Finish.data.punchIn
    var flag=true
    var index
    if(todayArr.length==0)
      flag=false
    for(var j=0;j<todayArr.length;j++){
      if(todayArr[j].hasFinished==true)
        continue
      else{
        var id=todayArr[j].id
        for(var m=0;m<punchIn.length;m++){
          if(punchIn[m].id==id)
            index=m
        }
        var start=punchIn[index].start
        var end=punchIn[index].end
        var interval=punchIn[index].interval
        var st = new Date(start.replace(/-/, "/"))
        var en = new Date(end.replace(/-/, "/"))
        var diff=Math.floor((now - st) / (24 * 3600 * 1000))
        if (en > now && diff % (interval + 1) == 0 && todayArr[j].hasFinished == false || (diff == 0 && todayArr[j].hasFinished == false && en > now)){
          flag=false
          break
        }
      }
    }
    if(flag==true){
      finishR.push(now.toISOString())
      const promiseFinishRate = db.collection('user').doc(userArr[k]).update({
        data: {
          finishRate: finishR
        }
      })
      var x=(await promiseFinishRate)
    }
    //将所有hasfinish重置
    for(var n=0;n<todayArr.length;n++){
      todayArr[n].hasFinished=false
    }
    const promiseTodayUpdate = db.collection('user').doc(userArr[k]).update({
      data: {
        today: todayArr
      }
    })
    var y=(await promiseTodayUpdate)
  }
}