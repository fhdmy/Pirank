Page({
 data:{
   finishRate: [],
   punchIn: [],
   hasLogin: false,
   loading:false,
   today:[]
 },
 onShow:function(){
   const that = this
   var name
   wx.getUserInfo({
     success: function (res) {
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
 watch:{

 },
 finishTask(event){
   this.setData({
     loading:true
   })
   var id = event.target.id
   var finished = "today[" + id + "].hasFinished"
   this.setData({
     [finished]: true
   })
   wx.cloud.callFunction({
     name:'finishTask',
     data:{
       uid:getApp().globalData.uid,
       today:this.data.today
     },
     success:(res)=>{
       this.setData({
         loading: false
       })
     }
   })
 }
})