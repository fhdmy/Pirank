Component({
  data: {
    arr: [],
    sysW: null,
    lastDay: null,
    firstDay: null,
    weekArr: ['日', '一', '二', '三', '四', '五', '六'],
    year: null,
    isToday:true
  },
  properties:{
    finishRate:{
      type:Array
    }
  },
  lifetimes: {
    attached: function() {
      this.dataTime();
      this.draw();
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    dataTime: function() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      var months = date.getMonth() + 1;

      //获取现今年份
      this.data.year = year;

      //获取现今月份
      this.data.month = months;

      //获取今日日期
      this.data.getDate = date.getDate();

      //最后一天是几号
      var d = new Date(year, months, 0);
      this.data.lastDay = d.getDate();

      //第一天星期几
      let firstDay = new Date(year, month, 1);
      this.data.firstDay = firstDay.getDay();
    },
    draw() {
      //根据得到今月的最后一天日期遍历 得到所有日期
      for (var i = 1; i < this.data.lastDay + 1; i++) {
        this.data.arr.push(i);
      }
      var res = wx.getSystemInfoSync();
      this.setData({
        sysW: res.windowHeight / 12, //更具屏幕宽度变化自动设置宽度
        marLet: this.data.firstDay,
        arr: this.data.arr,
        year: this.data.year,
        getDate: this.data.getDate,
        month: this.data.month
      });
    },
    leftChange() {
      this.setData({
        arr:[]
      })
      this.data.month--;
      if (this.data.month == 0) {
        this.data.month = 12;
        this.data.year--;
      }
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var d = new Date(this.data.year, this.data.month, 0);
      this.data.lastDay = d.getDate();
      let firstDay = new Date(this.data.year, this.data.month - 1, 1);
      this.data.firstDay = firstDay.getDay();
      if (this.data.month != month || this.data.year != year) {
        this.setData({
          isToday: false
        })
      } else {
        this.setData({
          isToday: true
        })
      }
      this.draw();
    },
    rightChange() {
      this.setData({
        arr: []
      })
      this.data.month++;
      if (this.data.month == 13) {
        this.data.month = 1;
        this.data.year++;
      }
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var d = new Date(this.data.year, this.data.month, 0);
      this.data.lastDay = d.getDate();
      let firstDay = new Date(this.data.year, this.data.month - 1, 1);
      this.data.firstDay = firstDay.getDay();
      if(this.data.month!=month || this.data.year!=year){
        this.setData({
          isToday:false
        })
      }else{
        this.setData({
          isToday: true
        })
      }
      this.draw();
    }
  }
})