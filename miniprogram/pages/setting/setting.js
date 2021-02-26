Page({
  data: {
    punchIn: [],
    hasLogin: true,
    loading:false
  },
  onShow: function() {
    const that = this
    this.setData({
      punchIn: getApp().globalData.punchIn,
      hasLogin: true
    })
    var name
    wx.getUserInfo({
      success: function(res) {
        name = res.userInfo.nickName
        wx.cloud.callFunction({
          name: 'getInform',
          data: {
            nickName: name
          },
          success(res) {
            getApp().globalData.openId = res.result.data[0].openId;
            getApp().globalData.uid = res.result.data[0]._id;
            getApp().globalData.finishRate = res.result.data[0].finishRate;
            getApp().globalData.punchIn = res.result.data[0].punchIn;
            getApp().globalData.userName = res.result.data[0].userName;
            getApp().globalData.today = res.result.data[0].today;
            getApp().globalData.hasLogin = true;
            that.setData({
              finishRate: res.result.data[0].finishRate,
              punchIn: res.result.data[0].punchIn,
              hasLogin: true,
              today: res.result.data[0].today
            })
          }
        })
      }
    })
  },
  navgateToDetail(event) {
    var id = event.target.id
    var index
    for (var i = 0; i < this.data.punchIn.length; i++) {
      if (this.data.punchIn[i].id == id) {
        index = i
        break
      }
    }
    wx.navigateTo({
      url: '../setDetail/setDetail?end=' + this.data.punchIn[index].end + '&id=' + this.data.punchIn[index].id + '&interval=' + this.data.punchIn[index].interval + '&name=' + this.data.punchIn[index].name + '&start=' + this.data.punchIn[index].start
    })
  },
  addPunchIn() {
    this.setData({
      loading:true
    })
    var tmp = this.data.punchIn
    var date = new Date()
    var d = date.getDate();
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var punchLen = this.data.punchIn.length
    var newId
    if (punchLen == 0)
      newId = 0
    else
      newId = this.data.punchIn[punchLen - 1].id + 1
    tmp.push({
      name: '待编辑',
      start: y + '-' + m + '-' + d,
      end: (y + 1) + '-01-01',
      interval: '0',
      id: newId
    })
    var tmpToday = getApp().globalData.today
    tmpToday.push({
      hasFinished: false,
      id: newId,
      name: "待编辑"
    })
    wx.cloud.callFunction({
      name: 'addPunchInItem',
      data: {
        uid: getApp().globalData.uid,
        punchIn: this.data.punchIn,
        today: tmpToday
      },
      success: (res) => {
        this.setData({
          punchIn: tmp,
          today: tmpToday,
          loading:false
        })
        getApp().globalData.punchIn = this.data.punchIn
      }
    })
  }
})