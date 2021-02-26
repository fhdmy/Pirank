// pages/setDetail/setDetail.js
Page({
  data: {
    name:'',
    start:'2018-09-01',
    end: '2018-09-01',
    interval: '0',
    loading:false,
    id: -1,
    array:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  },
  onLoad: function (options) {
    var time1 = options.start.split("T")
    var start = time1[0] 
    var time2 = options.end.split("T")
    var end = time2[0] 
    this.setData({
      name:options.name,
      start:start,
      end:end,
      interval:options.interval,
      id:options.id  
    })
  },
  bindStartChange(e){
    this.setData({
      start: e.detail.value
    })
  },
  bindEndChange(e) {
    this.setData({
      end: e.detail.value
    })
  },
  inputname(e){
    this.setData({
      name: e.detail.value
    })
  },
  bindPickerChange(e){
    this.setData({
      interval: e.detail.value
    })
  },
  deleteItem(){
    this.setData({
      loading:true
    })
    wx.cloud.callFunction({
      name:'deletePunchItem',
      data:{
        uid:getApp().globalData.uid,
        id:this.data.id,
        punchIn:getApp().globalData.punchIn,
        today: getApp().globalData.today
      },
      success:(res)=>{
        this.setData({
          loading: false
        })
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  saveItem(){
    this.setData({
      loading: true
    })
    wx.cloud.callFunction({
      name: 'savePunchInItem',
      data: {
        uid: getApp().globalData.uid,
        id: this.data.id,
        punchIn: getApp().globalData.punchIn,
        name:this.data.name,
        start:this.data.start,
        end:this.data.end,
        interval:this.data.interval,
        today:getApp().globalData.today
      },
      success: (res) => {
        this.setData({
          loading: false
        })
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})