const SwtcLib = require("@swtc/lib");
const Remote = SwtcLib.Remote;
exports.configUtils = {
  nodeList: [
  ],
  //获取最优节点
  getBestNode: function () {
    let list = [
      {
        "ogc_fid": 22,
        "编号": 22,
        "IPAddress": "s.jingtum.com"
      },
      {
        "ogc_fid": 23,
        "编号": 23,
        "IPAddress": "c01.jingtum.com"
      },
      {
        "ogc_fid": 24,
        "编号": 24,
        "IPAddress": "c02.jingtum.com"
      },
      {
        "ogc_fid": 25,
        "编号": 25,
        "IPAddress": "c04.jingtum.com"
      }
    ]
    list.forEach(o => {
      var that = this
      var address = "wss://" + o.IPAddress + ":5020"
      let remote = new Remote({
        server: address
      });
      remote.connectPromise()
        .then(async (server_info) => {
          console.log(server_info)
          if (server_info) {
            that.nodeList.push(address)
            console.log(this.nodeList)
            remote.disconnect()
          }
        })
        .catch((error) => {
          console.log("无法连接" +error)
        })
    })
  },
  getRandomUrl: function () {
    // 获取随机数
    let successNodes = this.nodeList
    if (successNodes) {
      var rand = Math.floor(Math.random() * successNodes.length);
      // 随机从数组中取出某值（不会改变原数组）
      var data = successNodes.slice(rand, rand + 1)[0];
      return data
    } else {
      return this.nodeList[0]
    }
  },
  quickSort: function () {
    if (this.nodeList.length <= 1) {//如果数组长度小于等于1无需判断直接返回即可 
      return this.nodeList;
    }
    var pivotIndex = Math.floor(this.nodeList.length / 2);//取基准点 
    var pivot = this.nodeList.splice(pivotIndex, 1)[0];//取基准点的值,splice(index,1)函数可以返回数组中被删除的那个数
    var left = [];//存放比基准点小的数组
    var right = [];//存放比基准点大的数组 
    for (var i = 0; i < this.nodeList.length; i++) { //遍历数组，进行判断分配 
      if (this.nodeList[i].status == 1) {//状态为零的节点丢弃
        if (this.nodeList[i].priority < pivot.priority && this.nodeList[i].priority > 0) {
          left.push(this.nodeList[i]);//比基准点小的放在左边数组 
        } else {
          right.push(this.nodeList[i]);//比基准点大的放在右边数组 
        }
      }
    }
    //递归执行以上操作,对左右两个数组进行操作，直到数组长度为<=1； 
    return this.quickSort(left).concat([pivot], this.quickSort(right));
  },
}
