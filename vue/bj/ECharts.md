ECharts的使用
## 引入链接

```html
引入 Apache ECharts 数据可视化库 (版本5.4.0) 
 如需更新版本，建议先在测试环境验证兼容性
<script src="https://cdn.jsdelivr.net/npm/echarts@5.4.0/dist/echarts.min.js"></script>
```
## 准备一个有大小的盒子
```html
<style>
.echarts-box {
            width: 600px;
            height: 400px;
            padding: 30px;
            margin: 0 auto;
            border: 1px solid #ccc;
        }
</style>
  <div class="echarts-box" id="main"></div>
```
## 生成图表
```html
通过 echarts.init 方法初始化一个 echarts 实例并通过 setOption 方法生成一个简单的柱状图
基于准备好的dom，初始化echarts实例
<script>
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    </script>

```
## 异步数据的加载与动态更新
```html
<script>
   
// 创建Vue实例并挂载到DOM中id为app的元素
const app = new Vue({
  // 指定Vue实例挂载的DOM元素
  el: '#app',
  // 定义响应式数据
  data: {
    list: [],         // 存储从API获取的账单列表
    name: '',         // 表单中输入的消费名称
    price: ''         // 表单中输入的消费金额（字符串类型）
  },
  // 计算属性：自动计算总消费金额
  computed: {
    totalPrice() {
      // 使用reduce方法累加所有账单的价格
      return this.list.reduce((sum, item) => sum + item.price, 0)
    }
  },
  // 生命周期钩子：实例创建后立即调用
  created() {
    // 注释掉的代码为原始请求示例
    // const res = await axios.get('https://applet-base-api-t.itheima.net/bill', {
    //   params: {
    //     creator: '小黑'
    //   }
    // })
    // this.list = res.data.data
    
    // 调用获取账单列表的方法
    this.getList()
  },
  // 生命周期钩子：DOM挂载完成后调用
  mounted() {
  // 初始化ECharts图表实例，绑定到id为'main'的DOM元素
  this.myChart = echarts.init(document.querySelector('#main'))
  
  // 设置图表配置项
  this.myChart.setOption({
    // 图表标题设置
    title: {
      text: '消费账单列表',  // 标题文本
      left: 'center'        // 标题居中显示
    },
    
    // 鼠标悬停提示框配置
    tooltip: {
      trigger: 'item'       // 触发类型为数据项
    },
    
    // 图例配置
    legend: {
      orient: 'vertical',   // 垂直布局
      left: 'left'         // 位于左侧
    },
    
    // 图表数据系列配置
    series: [
      {
        name: '消费账单',   // 系列名称
        type: 'pie',        // 饼图类型
        radius: '50%',      // 饼图半径
        data: [
          // 数据项（当前为空，实际数据将通过API或其他方式动态填充）
          // { value: 1048, name: '球鞋' },
          // { value: 735, name: '防晒霜' }
        ],
        // 高亮状态下的数据项样式
        emphasis: {
          itemStyle: {
            shadowBlur: 10,         // 阴影模糊度
            shadowOffsetX: 0,       // 阴影水平偏移
            shadowColor: 'rgba(0, 0, 0, 0.5)'  // 阴影颜色
          }
        }
      }
    ]
  })
}
  // 定义实例方法
  methods: {
    // 获取账单列表的异步方法
    async getList() {
      try {
        // 发送GET请求获取账单数据
        const res = await axios.get('https://applet-base-api-t.itheima.net/bill', {
          params: {
            creator: '小黑'  // 请求参数：创建者名称
          }
        })
        // 将API返回的数据赋值给list
        this.list = res.data.data
        // 更新图表数据
        this.myChart.setOption({
          series: [
            {
              // 将账单数据映射为图表所需格式
              //这里自改变要改变的数据就行了
              data: this.list.map(item => {
                return {
                  value: item.price,  // 消费金额作为值
                  name: item.name     // 消费名称作为标签
                }
              })
            }
          ]
        })
      } catch (error) {
        // 错误处理：打印错误并提示用户
        console.error('获取账单数据失败:', error)
        alert('获取账单数据失败，请稍后重试')
      }
    },
    // 添加新账单的异步方法
    async add() {
      // 表单验证：检查消费名称是否为空
      if (!this.name) {
        alert('请输入消费名称')
        return
      }
      // 表单验证：检查价格是否为有效数字
      if (isNaN(parseFloat(this.price)) || !isFinite(this.price)) {
        alert('请输入正确的消费价格')
        return
      }
      
      try {
        // 发送POST请求添加新账单
        const res = await axios.post('https://applet-base-api-t.itheima.net/bill', {
          creator: '小黑',
          name: this.name,
          price: parseFloat(this.price) // 转换价格为数字类型
        })
        // 刷新账单列表和图表
        this.getList()
        // 重置表单
        this.name = ''
        this.price = ''
      } catch (error) {
        // 错误处理
        console.error('添加账单失败:', error)
        alert('添加账单失败，请稍后重试')
      }
    },
    // 删除账单的异步方法
    async del(id) {
      // 确认删除操作
      if (confirm('确定要删除这条账单吗？')) {
        try {
          // 发送DELETE请求删除指定ID的账单
          const res = await axios.delete(`https://applet-base-api-t.itheima.net/bill/${id}`)
          // 刷新账单列表和图表
          this.getList()
        } catch (error) {
          // 错误处理
          console.error('删除账单失败:', error)
          alert('删除账单失败，请稍后重试')
        }
      }
    }
  }
})
动态更新

</script>
```