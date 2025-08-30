# day1
## 组件
###  view
- 普通视图区域
- 类似于 HTML 中的 div，是一个块级元素
- 常用来实现页面的布局效果
### scroll-view
- 可滚动视图区域
- 类似于 HTML 中的 div，是一个块级元素
- 常用来实现页面的布局效果
scroll-view 支持横向和纵向滚动，通过属性控制滚动方向，必须设置固定尺寸（宽 / 高）才能生效。
1. 纵向滚动（最常用）
需添加 scroll-y 属性，并设置固定高度：

```html
<scroll-view 
  class="scroll-y-container" 
  scroll-y  <!-- 允许纵向滚动 -->
>
  <!-- 内部内容（高度超出容器时可滚动） -->
  <view class="item">项目 1</view>
  <view class="item">项目 2</view>
  <view class="item">项目 3</view>
  <view class="item">项目 4</view>
  <view class="item">项目 5</view>
</scroll-view>
```

2. 横向滚动
需添加 scroll-x 属性，并设置固定宽度，同时注意内部元素需设置为 inline-block 或使用弹性布局：

### swiper 和swiper-item
swiper 和 swiper-item 是小程序中用于实现轮播图效果的组件，swiper 是轮播容器，swiper-item 是轮播的每一项。下面详细介绍它们的基本使用方法：
```html
<swiper>
  <swiper-item>
    <view>1</view>
  </swiper-item>
  <swiper-item>
    <view>2</view>
  </swiper-item>
  <swiper-item>
    <view>3</view>
  </swiper-item>
</swiper>

```
一些常用属性挂载在swiper上
| 属性                   | 类型    | 默认值            | 说明                 |
| ---------------------- | ------- | ----------------- | -------------------- |
| indicator-dots         | boolean | false             | 是否显示面板指示点   |
| indicator-color        | color   | rgba(0, 0, 0, .3) | 指示点颜色           |
| indicator-active-color | color   | #000000           | 当前选中的指示点颜色 |
| autoplay               | boolean | false             | 是否自动切换         |
| interval               | number  | 5000              | 自动切换时间间隔     |
| circular               | boolean | false             | 是否采用衔接滑动     |

### text
text 组件是小程序中用于显示文本内容的基础组件，类似于 HTML 中的 <span> 标签，主要用于展示文字信息，支持一些文本相关的特殊处理。以下是其详细使用方法：
selectable - 文本是否可选中
设置为 true 时，文本支持长按选中和复制（默认 false）：
```html
<text selectable="{{true}}">这段文本可以被选中复制</text>
```
### button
主色调按钮：
```html
<button type="primary">主色调按钮</button>
```
警告按钮：
```html
<button type="warn">警告按钮</button>
```
小尺寸镂空默认按钮：
```html
<button size="mini" plain>默认按钮</button>
```
### image
```html
<image src="/images/example.jpg"></image>
```
# day2
## 数据绑定
### 绑定内容
```js
page({
  data: {
    msg: 'hello world'
  }
})
```
```html
<view>
  <text>{{msg}}</text>
</view>

```
### 绑定属性
```js
page({
  data: {
    src: 'https://img1.baidu.com/it/u=3422225222,2529222928&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
  }
})
```
```html
<view>
    // 注意和vue 不一样
  <image src="{{src}}" mode="aspectFill"></image>
</view>
```
### 运算(三目运算符)
```js
page({
  data: {
    a: 1,
    b: 2
  }
})
```
```html
<view>
  <text>{{a + b}}</text>

  <text>{{a> b ? 'a大于b' : 'a小于等于b'}}</text>
</view>
```
## 事件绑定
### 绑定事件
```js
Page({
  data: {
    msg: 'hello world'
  },
  // 方法直接定义在 Page 对象中，无需包裹在 methods 里
  handleClick(e) {
    console.log(e);
  }
})
```
```html
<view>
  <text>{{msg}}</text>
  <button bindtap="handleClick">点击我</button>
</view>
```


### 小程序中常用的事件
| 类型   | 绑定方式                  | 事件描述                                    |
| ------ | ------------------------- | ------------------------------------------- |
| tap    | bindtap 或 bind:tap       | 手指触摸后马上离开，类似 HTML 中 click 事件 |
| input  | bindinput 或 bind:input   | 文本框的输入事件                            |
| change | bindchange 或 bind:change | 状态改变时触发                              |


当事件回调触发时，会收到事件对象 `event`，其属性如下：
target 是触发该事件的源头组件，currentTarget 是当前事件所绑定的组件。
| 属性           | 类型    | 说明                                         |
| -------------- | ------- | -------------------------------------------- |
| type           | String  | 事件类型                                     |
| timeStamp      | Integer | 页面打开到触发事件所经过的毫秒数             |
| target         | Object  | 触发事件的组件的一些属性值集合               |
| currentTarget  | Object  | 当前组件的一些属性值集合                     |
| detail         | Object  | 额外的信息                                   |
| touches        | Array   | 触摸事件，当前停留在屏幕中的触摸点信息的数组 |
| changedTouches | Array   | 触摸事件，当前变化的触摸点信息的数组         |

## 事件传参和数据同步
### 事件绑定(data的数据重新赋值)
this.setData({}) 可以用来更新数据

```js
Page({
  data: {
    msg: 'hello world'
  },
  handleClick(e) {
    console.log(e);
    this.setData({
      msg: 'hello world 2'
    })
  }
})
```
```html
<view>
  <text>{{msg}}</text>
  <button bindtap="handleClick">点击我</button>
</view>
```
### 事件传参
事件绑定可以传参，参数会被传递给事件处理函数
data-* 自定义属性
* 自定义属性可以在事件绑定中传递参数
data-msg = 'hello world'
msg 会被解析为参数的名字
数值hello world 会被解析为参数的值

event.target.dataset.msg
// event：事件对象，包含事件相关的所有信息
// target：触发事件的源头组件（事件最初发生的组件）
// dataset：组件上通过 data-* 属性设置的自定义数据集合
// msg：是 data-msg 属性中定义的具体数据字段
// 整体表示：获取触发事件的源头组件上 data-msg 属性的值

```js
Page({
  data: {
    msg: 'hello world'
  },
  handleClick(e) {
    console.log(e);
    this.setData({
      msg: 'hello world 2'
    })
  }
})
```
```html
<view>
  <text>{{msg}}</text>
  <button bindtap="handleClick() data-msg='hello world'">点击我</button>

</view>
```
### bindinput 事件
```js
page({
  data: {
    msg: 'hello world'
  },
  handleInput(e) {
   // 整体表示：打印输出输入框当前的输入值
console.log(e.detail.value);
  }
})
```
```html
<view>
  <input bindinput="handleInput" />
</view>
```
### 实现文本框和data之间的数据同步
```js
page({
  data: {
    msg: 'hello world'
  },
  handleInput(e) {
   // 整体表示：打印输出输入框当前的输入值
console.log(e.detail.value);
// 整体表示：将输入框当前的输入值赋值给 msg 数据
this.setData({
  msg: e.detail.value
})
  }
})
```
```html
<view>
  <input bindinput="handleInput" value="{{msg}}" />
</view>
```
## 条件渲染
### wx:if(else + elif)
```js
page({
  data: {
    msg: true
  }
})
```
```html
<view>
  <text wx:if="{{msg}}">hello world</text>
  <text wx:elif="{{msg == 2}}">hello world 2</text>
  <text wx:else>hello world 3</text>

</view>
```
### 结合<block>标签使用
需一次性控制多个组件的显示 / 隐藏时，用 <block> 包裹组件，通过 wx:if 统一控制。
语法示例
```html
预览
<block wx:if="{{true}}">
  <view> view1 </view>
  <view> view2 </view>
</block>
```
### if 和hidden 区别
① 运行方式不同
wx:if 以动态创建和移除元素的方式，控制元素的展示与隐藏
hidden 以切换样式（display: none/block; 等 ）的方式，控制元素的显示与隐藏

## 循环渲染
### wx:for 
```js
page({
  data: {
    list: [1, 2, 3, 4, 5]
  }
})
```
```html
<view>
  <view wx:for="{{list}}">
    {{item}}
  </view>
</view>
```
### 手动指定循环索引和变量名
使用 wx:for-index 可以指定当前循环项的索引的变量名
使用 wx:for-item 可以指定当前项的变量名
```js
page({
  data: {
    list: [1, 2, 3, 4, 5]
  }
})
```
```html
<view>
  <view wx:for="{{list}}" wx:for-index="index" wx:for-item="item">
    {{index}} {{item}}
  </view>
</view>
```

### 循环渲染时，key 属性的作用
```js
Page({
  data: {
    list: [1, 2, 3, 4, 5]
  }
})
```
```html
<view>
  <view wx:for="{{list}}" wx:key="index">
    {{item}}
  </view>
</view>
```
## wxss 样式
### rpx
```html
rpx 的实现原理
rpx 的实现原理为：因不同设备屏幕大小有差异，为实现屏幕自动适配，rpx 将所有设备屏幕的宽度等分为 750 份（即当前屏幕总宽度为 750rpx ）。
在较小设备上，1rpx 代表的宽度较小；
在较大设备上，1rpx 代表的宽度较大 。
小程序运行时，会自动把 rpx 换算成对应像素单位渲染，以此实现屏幕适配。
```
### 样式导入
这是微信小程序 WXSS（小程序样式表） 里 @import 的用法，核心是用 @import 导入外联样式表，快速复用样
```css
@import './common.wxss';
.container {
  height: 100%;
  background-color: #f5f5f5;
}
```
### wxss 全局样式和局部样式
全局样式：定义在 app.wxss 中的样式为全局样式，作用于每一个页面。
局部样式：定义在当前页面的 wxss 文件中的样式为局部样式，只作用于当前页面。
就近原则：局部样式会覆盖全局样式（因为局部更 “近” 当前页面）
权重前提：局部样式的权重（优先级）≥ 全局样式，才会触发覆盖

## 全局配置
###  全局配置文件
配置项	作用
pages	记录所有页面的存放路径，小程序启动首屏等逻辑依赖它
window	全局设置小程序窗口外观（如导航栏颜色、标题等）
tabBar	设置底部 tabBar 效果（切换菜单、图标等）
style	控制是否启用新版组件样式（影响小程序基础组件外观）
### 设置导航栏标题/背景/内容
设置步骤: app.json -> window -> navigationBarTitleText(内容)
设置步骤: app.json -> window -> navigationBarBackgroundColor(颜色)
设置步骤: app.json -> window -> navigationBarTextStyle(样式)
```app.json
{
  "window": {
    "navigationBarTitleText": "我是导航栏标题",
    "navigationBarBackgroundColor": "#f5f5f5",
    "navigationBarTextStyle": "black"
  }
}
```
| 属性名                  | 类型   | 默认值 | 作用说明                  |
| ----------------------- | ------ | ------ | ------------------------- |
| `navigationBarTitleText` | String   | `""`      | 导航栏标题文字内容                                   |
| `navigationBarBackgroundColor` | HexColor | `#000000` | 导航栏背景颜色，如 #000000                          |
| `navigationBarTextStyle` | String   | `white`   | 导航栏标题颜色，仅支持 black / white                |



### window 下拉刷新
 
| 属性名                | 类型     | 默认值    | 作用说明                                             |
| --------------------- | -------- | --------- | ---------------------------------------------------- |
| `backgroundColor`     | HexColor | `#ffffff` | 设置**窗口的背景色**                                 |
| `backgroundTextStyle` | String   | `dark`    | 控制**下拉 loading 的样式**，仅支持 `dark` / `light` |
### 上拉触底的距离
| 属性名                | 类型     | 默认值    | 作用说明                                             |
| --------------------- | -------- | --------- | ---------------------------------------------------- |
| `onReachBottomDistance` | Number   | `50`      | 上拉触底的距离，单位为 px                            |
### tabBar 配置
#### 什么是 tabBar
tabBar 是**移动端应用常见页面效果**，用于**多页面快速切换**  
- 底部 tabBar（页面底部，可带图标+文字）  
- 顶部 tabBar（页面顶部，仅显示文字，无图标）  
- 数量限制：最少 **2 个**、最多 **5 个** tab 页签  
- 顶部 tabBar 特点：渲染时**不显示 icon**，只显示文本  
简单说，tabBar 是小程序实现多页切换的组件，分顶部/底部，且有数量、显示样式的限制 。
#### 6个组成部分
这是小程序 `tabBar` 的 6 个组成配置项，按图提取核心：  

| 序号 | 配置项名           | 作用说明                   |
| ---- | ------------------ | -------------------------- |
| ①    | `backgroundColor`  | tabBar 的背景色            |
| ②    | `selectedIconPath` | tab 选中时的图标路径       |
| ③    | `borderStyle`      | tabBar 上边框的颜色        |
| ④    | `iconPath`         | tab 未选中时的图标路径     |
| ⑤    | `selectedColor`    | tab 文字**选中时**的颜色   |
| ⑥    | `color`            | tab 文字**未选中时**的颜色 |

简单说，这 6 个配置控制 `tabBar` 的外观（背景、边框、图标、文字颜色），用来定制底部/顶部切换栏的样式 。
#### tabBar 配置项
这是小程序 `tabBar` 节点的配置项说明，提取成清晰表格，方便查阅：  

| 属性名            | 类型     | 必填 | 默认值 | 描述                                                       |
| ----------------- | -------- | ---- | ------ | ---------------------------------------------------------- |
| `position`        | String   | 否   | bottom | tabBar 位置，仅支持 `bottom`（底部）/ `top`（顶部）        |
| `borderStyle`     | String   | 否   | black  | tabBar 上边框颜色，仅支持 `black`（黑色）/ `white`（白色） |
| `color`           | HexColor | 否   | -      | tab 文字**未选中时**的颜色                                 |
| `selectedColor`   | HexColor | 否   | -      | tab 文字**选中时**的颜色                                   |
| `backgroundColor` | HexColor | 否   | -      | tabBar 的背景色                                            |
| `list`            | Array    | 是   | -      | 
#### 每个 tab 页签的配置项
这是小程序 `tabBar` 中**单个 tab 项的配置规则**，整理成清晰表格：  

| 属性               | 类型   | 必填 | 描述                                                          |
| ------------------ | ------ | ---- | ------------------------------------------------------------- |
| `pagePath`         | String | 是   | 页面路径，必须在 `pages` 数组中预先定义（保证能找到页面）     |
| `text`             | String | 是   | tab 上显示的文字内容                                          |
| `iconPath`         | String | 否   | 未选中时的图标路径；若 `tabBar position` 为 `top`，不显示图标 |
| `selectedIconPath` | String | 否   | 选中时的图标路径；若 `tabBar position` 为 `top`，不显示图标   |

关键注意：  
- `pagePath` 和 `text` 是**必填项**，否则 tab 无法正常工作；  
- 图标配置（`iconPath`/`selectedIconPath`）仅在 `tabBar position="bottom"` 时生效，顶部 tabBar 不显示图标。
#### 一个完整的 tabBar 配置示例
```.json
{
  "pages": [
    "pages/home/home",
    "pages/message/message",
    "pages/content/content",
    "pages/days/list",
    "pages/list/list",
    "pages/index/index",
    "pages/logs/logs",
    "pages/test/test"
  ],
  "window": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "黑马程序员",
    "navigationBarBackgroundColor": "#ffffff",
    "enablePullDownRefresh": true
    
  },
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/home/home",
        "text": "首页",
        "iconPath": "/images/home.png",
        "selectedIconPath": "/images/home-active.png"
      },
      {
        "pagePath": "pages/message/message",
        "text": "消息",
        "iconPath": "/images/message.png",
        "selectedIconPath": "/images/message-active.png"
      },
      {
        "pagePath": "pages/content/content",
        "text": "联系我们",
        "iconPath": "/images/contact.png",
        "selectedIconPath": "/images/contact-active.png"
      }
     
    ]
  },
  "style": "v2",
  "componentFramework": "glass-easel",
  "sitemapLocation": "sitemap.json",
  "lazyCodeLoading": "requiredComponents"
}

```
### 页面配置
这是关于**小程序页面配置与全局配置关系**的核心说明，提取关键信息：  

#### 配置的作用范围  
- **全局配置**（`app.json -> window`）：作用于**所有页面**，统一设置窗口默认表现（如全局导航栏颜色）。  
- **页面配置**（页面级 `.json`）：作用于**单个页面**，实现特殊窗口表现（覆盖全局配置）。  


#### 冲突处理原则  
当**页面配置与全局配置的同属性冲突**时，遵循 **就近原则** → 最终效果以**页面配置**为准。  


#### 核心逻辑总结  
- 全局配置是“通用规则”，页面配置是“特殊规则”；  
- 特殊页面用自身 `.json` 覆盖全局，实现差异化设计。  

简单说：**全局管通用，页面管特殊，冲突时页面优先** 。
这是小程序**页面级配置项**（单个页面的 `.json` 文件可用）的说明，提取成清晰表格，包含属性、类型、默认值、作用：  

| 属性名                         | 类型     | 默认值  | 描述                                       |
| ------------------------------ | -------- | ------- | ------------------------------------------ |
| `navigationBarBackgroundColor` | HexColor | #000000 | 当前页面导航栏背景颜色（如 #FF0000 红色）  |
| `navigationBarTextStyle`       | String   | white   | 导航栏标题文字颜色，仅支持 `black`/`white` |
| `navigationBarTitleText`       | String   | -       | 导航栏标题文字内容（如“我的页面”）         |
| `backgroundColor`              | HexColor | #ffffff | 当前页面窗口的背景色（页面整体背景）       |
| `backgroundTextStyle`          | String   | dark    | 下拉 loading 样式，仅支持 `dark`/`light`   |
| `enablePullDownRefresh`        | Boolean  | false   | 是否开启当前页面的下拉刷新功能             |
| `onReachBottomDistance`        | Number   | 50      | 上拉触底时，距离页面底部的距离（单位 px）  |

这些配置**仅对当前页面生效**，可覆盖 `app.json` 里的全局 `window` 配置，实现单页面特殊样式/功能 。
```json
{
  "navigationBarTitleText": "首页",
  "backgroundColor": "#f5f5f5"

}
```
### 数据请求(GET POST)

#### 小程序中网络数据请求的限制
出于安全性方面的考虑，小程序官方对数据接口的请求做出了如下两个限制：
- ① 只能请求 HTTPS 类型的接口 
- ② 必须将接口的域名添加到信任列表中 
操作流程（对应右侧截图）：
1. 点击“详情”按钮 
2. 进入“项目配置” 
3. 在“域名信息”里的“request 合法域名”中添加接口域名（如示例里的 `https://api.baiudux.com`  ，图中域名信息显示“未配置”等状态 ，实际需按需求添加 ），还涉及 `socket 合法域名`、`uploadFile 合法域名`、`downloadFile 合法域名` 等配置项 ，用于对应类型网络请求的域名合法性校验 。 

#### 配置 request 合法域名
- **需求描述**：在微信小程序中，希望请求 `https://www.escook.cn/` 域名下的接口 
- **配置步骤**：登录微信小程序管理后台 -> 开发 -> 开发设置 -> 服务器域名 -> 修改 request 合法域名 
  
#### get请求
```js
wx.request({
  url: 'https://www.escook.cn/api/get', 
  method: 'GET', 
  data: {
    name: 'zs',
    age: 22
  },
  success: (res) => { 
    console.log(res)
  },
  fail: (err) => {
    console.log('请求失败：', err);
    // 可以根据err中的信息，如err.errMsg判断具体错误原因
  }
})
```
#### post请求
```js
startGet () {
  wx.request({
    url: 'https://www.escook.cn/api/post', 
    method:'POST',
    data: {
      name:"zs",
      age:22
    },
    success:(res)=> {
      console.log(res)
    },
    fail:(err) =>{
      console.log(err)
    }
  })
},
```

#### 跳过 request 合法域名校验
如果后端程序员仅仅提供了 http 协议的接口、暂时没有提供 https 协议的接口。
此时为了不耽误开发的进度，我们可以在微信开发者工具中，临时开启「开发环境不校验请求域名、TLS 版本及 HTTPS 证书」选项，跳过 request 合法域名的校验。
注意：
跳过 request 合法域名校验的选项，仅限在开发与调试阶段使用！

# Day3
## 页面导航
### 声明式导航

#### 导航到 tabBar 页面
tabBar 页面指的是被配置为 tabBar 的页面。

在使用 `<navigator>` 组件跳转到指定的 tabBar 页面时，需要指定 url 属性和 open-type 属性，其中：
- url 表示要跳转的页面的地址，必须以 / 开头
- open-type 表示跳转的方式，必须为 switchTab  

示例代码如下：  
```html
<navigator url="/pages/message/message" open-type="switchTab">导航到消息页面</navigator>
```
#### 导航到非 tabBar 页面
非 tabBar 页面指的是没有被配置为 tabBar 的页面。

在使用 `<navigator>` 组件跳转到普通的非 tabBar 页面时，则需要指定 url 属性和 open-type 属性，其中：
- url 表示要跳转的页面的地址，必须以 / 开头 
- open-type 表示跳转的方式，必须为 navigate 

示例代码如下：  
```html
<navigator url="/pages/info/info" open-type="navigate">导航到info页面</navigator>
```
#### 后退导航

如果要后退到上一页面或多级页面，则需要指定 open-type 属性和 delta 属性，其中：
- open-type 的值必须是 navigateBack，表示要进行后退导航  
- delta 的值必须是数字，表示要后退的层级  

示例代码如下：  
```html
<navigator open-type='navigateBack' delta='1'>返回上一页</navigator>
```
### 编程式导航
#### 跳转到 tabBar 页面

```js
 jumpToHome() {
    wx.switchTab({
      url: '/pages/home/home',
      success(res) {
        console.log('成功跳转到首页', res);
      },
      fail(res) {
        console.log('跳转首页失败', res);
      },
      complete(res) {
        console.log('跳转首页操作结束', res);
      }
    });
  ```
#### 跳转到非 tabBar 页面

  ```js
  jumpToInfo() {
    wx.navigateTo({
      url: '/pages/info/info',
      success(res) {
        console.log('成功跳转到info页面', res);
      },
      fail(res) {
        console.log('跳转info页面失败', res);
      },
      complete(res) {
        console.log('跳转info页面操作结束', res);
      }
    });
  }
  ```
#### 后退导航

  ```js
// 定义后退导航的方法
back() {
  // 调用微信小程序的页面后退API
  wx.navigateBack({
    delta: 1,  // 后退的层级为1，表示后退到上一页
    // 接口调用成功的回调函数
    success(res) {
      console.log('成功后退到上一页', res);  // 打印成功信息及返回结果
    },
    // 接口调用失败的回调函数
    fail(res) {
      console.log('后退失败', res);  // 打印失败信息及错误详情
    },
    // 接口调用结束的回调函数（无论成功或失败都会执行）
    complete(res) {
      console.log('后退操作结束', res);  // 打印操作结束的信息
    }
  });
}
  ```
###  导航传参
#### 声明式导航传参


navigator 组件的 url 属性用来指定将要跳转到的页面的路径。同时，路径的后面还可以携带参数：
- 参数与路径之间使用 `?` 分隔  
- 参数键与参数值用 `=` 相连  
- 不同参数用 `&` 分隔  

代码示例如下：  
```html
<navigator url="/pages/info/info?name=zs&age=20">跳转到info页面</navigator>
```
#### 编程式导航传参

调用 `wx.navigateTo(Object object)` 方法跳转页面时，也可以携带参数，代码示例如下：  

```js
// 页面结构
<button bindtap="gotoInfo2">跳转到info页面</button>

// 通过编程式导航，跳转到 info 页面，并携带参数
gotoInfo2() {
  wx.navigateTo({
    url: '/pages/info/info?name=ls&gender=男' 
  })
}
```

#### 在 onLoad 中接收导航参数

通过声明式导航传参或编程式导航传参所携带的参数，可以直接在 `onLoad` 事件中直接获取到，示例代码如下：  

```js
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {
  // options 就是导航传递过来的参数对象
  console.log(options)
}
```
## 页面事件
### 下拉刷新
#### 启用下拉刷新
启用下拉刷新有两种方式：
① **全局开启下拉刷新**：在 app.json 的 window 节点中，将 enablePullDownRefresh 设置为 true  
② **局部开启下拉刷新**：在页面的 .json 配置文件中，将 enablePullDownRefresh 设置为 true  

在实际开发中，推荐使用第 2 种方式，为需要的页面单独开启下拉刷新的效果。

#### 配置下拉刷新窗口的样式
在全局或页面的 .json 配置文件中，通过 `backgroundColor` 和 `backgroundTextStyle` 来配置下拉刷新窗口的样式，其中：  
- `backgroundColor` 用来配置下拉刷新窗口的背景颜色，仅支持16进制的颜色值  
- `backgroundTextStyle` 用来配置下拉刷新 loading 的样式，仅支持 dark 和 light
  
#### 监听页面的下拉刷新事件
在页面的 .js 文件中，通过 `onPullDownRefresh()` 函数即可监听当前页面的下拉刷新事件。
#### 下拉刷新的回调函数
当处理完下拉刷新后，下拉刷新的 loading 效果会一直显示，不会主动消失，所以需要手动隐 loading 效果。此时，调用 `wx.stopPullDownRefresh()` 可以停止当前页面的下拉刷新。示例
### 上拉触底
#### 监听页面的上拉触底事件  
在页面的 .js 文件中，通过 `onReachBottom()` 函数即可监听当前页面的上拉触底事件。示例代码如下：  

```js
/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function () {
  console.log('触发了上拉触底的事件')
}
```
####  配置上拉触底距离  
上拉触底距离指的是触发上拉触底事件时，滚动条距离页面底部的距离。  

可以在全局或页面的 .json 配置文件中，通过 `onReachBottomDistance` 属性来配置上拉触底的距离。  

小程序默认的触底距离是 50px，在实际开发中，可以根据自己的需求修改这个默认值。

#### 步骤6 - 对上拉触底进行节流处理
① **在 data 中定义 isloading 节流阀**  
- false 表示当前没有进行任何数据请求  
- true 表示当前正在进行数据请求  

② **在 getColors() 方法中修改 isloading 节流阀的值**  
- 在刚调用 getColors 时将节流阀设置 true  
- 在网络请求的 complete 回调函数中，将节流阀重置为 false  

③ **在 onReachBottom 中判断节流阀的值，从而对数据请求进行节流控制**  
- 如果节流阀的值为 true，则阻止当前请求  
- 如果节流阀的值为 false，则发起数据请求
  
## 生命周期
### 应用的生命周期函数  
小程序的**应用生命周期函数**需在 `app.js` 声明，示例代码：  

```js
// app.js 文件
App({
  // 小程序初始化完成时执行，全局仅触发一次，可做初始化工作
  onLaunch: function(options) { },
  // 小程序启动或从后台进入前台显示时触发 
  onShow : function(options) { },
  // 小程序从前台进入后台时触发 
  onHide : function() { }
})
```
### 页面的生命周期函数  
小程序的**页面生命周期函数**需要在页面的 `.js` 文件中进行声明，示例代码如下：  

```js
// 页面的 .js 文件
Page({
  onLoad : function(options) { }, // 监听页面加载，一个页面只调用1次
  onShow : function() { },        // 监听页面显示
  onReady : function() { },       // 监听页面初次渲染完成，一个页面只调用1次
  onHide : function() { },        // 监听页面隐藏
  onUnload: function() { }        // 监听页面卸载，一个页面只调用1次
})
```
## wxs 基本使用(还没学)
### wxs 和 JavaScript 的关系*  
虽然 wxs 的语法类似于 JavaScript，但是 wxs 和 JavaScript 是完全不同的两种语言：  

① **wxs 有自己的数据类型**  
- number 数值类型、string 字符串类型、boolean 布尔类型、object 对象类型、  
- function 函数类型、array 数组类型、date 日期类型、regexp 正则  

② **wxs 不支持类似于 ES6 及以上的语法形式**  
- 不支持：let、const、解构赋值、展开运算符、箭头函数、对象属性简写、etc...  
- 支持：var 定义变量、普通 function 函数等类似于 ES5 的语法  

③ **wxs 遵循 CommonJS 规范**  
- module 对象  
- require() 函数  
- module.exports 对象
  
# day4
## 创建自定义组件
### 创建组件
1. 在项目的根目录中，鼠标右键，创建 components -> test 文件夹 
2. 在新建的 components -> test 文件夹上，鼠标右键，点击“新建 Component” 
3. 键入组件的名称之后回车，会自动生成组件对应的 4 个文件，后缀名分别为.js，.json，.wxml 和.wxss

### 局部引入组件

在页面的.json配置文件中引用组件的方式，叫做“局部引用”。示例代码如下：

```
// 在页面的 .json 文件中，引入组件
{
  "usingComponents": {
    "my-test1": "/components/test1/test1"
  }
}

// 在页面的 .wxml 文件中，使用组件
<my-test1></my-test1>
```  

### 全局引入组件

在 `app.json` 全局配置文件中引用组件的方式，叫做“全局引用”。示例代码如下：

```
// 在 app.json 文件中，引入组件
{
  "pages": [ /* 省略不必要的代码 */ ],
  "window": { /* 省略不必要的代码 */ },
  "usingComponents": {
    "my-test2": "/components/test2/test2"
  }
}

// 在页面的 .wxml 文件中，使用组件
<my-test2></my-test2>
```
### 组件和页面的区别

从表面来看，组件和页面都是由.js、.json、.wxml和.wxss这四个文件组成的。但是，组件和页面的.js与.json文件有明显的不同：
- 组件的.json文件中需要声明`"component": true`属性 
- 组件的.js文件中调用的是`Component()`函数 
- 组件的事件处理函数需要定义到`methods`节点中 
## 自定义组件样式

### 组件样式隔离
默认情况下，自定义组件的样式只对当前组件生效，不会影响到组件之外的 UI 结构，规则如下：  
- 组件 A 的样式**不会影响**组件 C 的样式  
- 组件 A 的样式**不会影响**小程序页面的样式  
- 小程序页面的样式**不会影响**组件 A 和 C 的样式  

**好处**：  
① 防止外界的样式影响组件内部的样式  
② 防止组件的样式破坏外界的样式  

（右侧为示意结构：小程序页面包含自定义组件 A、自定义组件 C  ）

### 组件样式隔离的注意点
- `app.wxss` 中的全局样式对组件无效  
- 只有 `class` 选择器会有样式隔离效果，`id` 选择器、属性选择器、标签选择器不受样式隔离的影响  

**建议**：在组件和引用组件的页面中建议使用 `class` 选择器，**不要使用 id、属性、标签选择器** ！

### 修改组件的样式隔离选项
默认情况下，自定义组件的**样式隔离特性**能够防止组件内外样式互相干扰的问题。但有时，我们希望在外界能够控制组件内部的样式，此时，可以通过 `styleIsolation` 修改组件的样式隔离选项，用法如下：  

```js
// 在组件的 .js 文件中新增如下配置
Component({
  options: {
    styleIsolation: 'isolated'
  }
})
```  

```json
// 或在组件的 .json 文件中新增如下配置
{
  "styleIsolation": "isolated"
}
```

### styleIsolation 的可选值
| 可选值       | 默认值 | 描述                                                                                                                           |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| isolated     | 是     | 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将**不会相互影响**                                                    |
| apply-shared | 否     | 表示页面 wxss 样式将**影响到**自定义组件，但自定义组件 wxss 中指定的样式不会影响页面                                           |
| shared       | 否     | 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件 |

## 自定义data 和methods
###  data 数据
在小程序组件中，用于组件模板渲染的私有数据，需要定义到 `data` 节点中，示例如下：  

```js
Component({

  /**
   * 组件的初始数据
   */
  data: {
    count: 0
  }

})
```

### methods 方法
在小程序组件中，**事件处理函数和自定义方法**需要定义到 `methods` 节点中，示例代码如下：  

```js
Component({
  // 组件的方法列表【包含事件处理函数和自定义方法】
  methods: {
    // 事件处理函数
    addCount() { 
      this.setData({ count: this.data.count + 1 })
      this.__showCount() // 通过 this 直接调用自定义方法
    },

    // 自定义方法建议以 _ 开头
    __showCount() { 
      wx.showToast({
        title: 'count值为：' + this.data.count,
        icon: 'none'
      })
    }
  }
})
```
## properties 属性
在小程序组件中，`properties` 是组件的对外属性，用来接收外界传递到组件中的数据，示例代码如下：  

```js
Component({
  // 属性定义
  properties: {
    max: { 
      // 完整定义属性的方式【当需要指定属性默认值时，建议使用此方式】
      type: Number, // 属性值的数据类型
      value: 10     // 属性默认值
    },
    max: Number     // 简化定义属性的方式【不需指定属性默认值时，可以使用简化方式】
  }
})
```  

在页面中使用组件并传递属性：  
```xml
<my-test1 max="10"></my-test1>
```
## 数据监听 observers
### 概念

数据监听器用于**监听和响应任何属性和数据字段的变化**，从而执行特定的操作。它的作用类似于 Vue 中的 watch 侦听器。在小程序组件中，数据监听器的基本语法格式如下：  

```js
Component({
  observers: {
    '字段A, 字段B': function(字段A的新值, 字段B的新值) {
      // do something
    }
  }
})
```
### 数据监听器的基本用法
组件的.js文件代码如下：

```js
Component({
  // 数据节点
  data: { n1: 0, n2: 0, sum: 0 }, 
  // 方法列表
  methods: { 
    addN1() { this.setData({ n1: this.data.n1 + 1 }) },
    addN2() { this.setData({ n2: this.data.n2 + 1 }) }
  },
  // 数据监听节点
  observers: { 
    // 监听 n1 和 n2 数据的变化
    'n1, n2': function(n1, n2) {  
      // 通过监听器，自动计算 sum 的值
      this.setData({ sum: n1 + n2 }) 
    }
  }
})
```
### 数据监听器监听对象属性变化
数据监听器支持监听对象中**单个或多个属性**的变化，示例语法如下：  

```js
Component({
  observers: {
    '对象.属性A, 对象.属性B': function(属性A的新值, 属性B的新值) {
      // 触发此监听器的 3 种情况：
      // 【为属性A赋值】使用 setData 设置 this.data.对象.属性A 时触发
      // 【为属性B赋值】使用 setData 设置 this.data.对象.属性B 时触发
      // 【直接为对象赋值】使用 setData 设置 this.data.对象 时触发
      // do something...
    }
  }
})
```
## 自定义组件 - 纯数据字段
### 什么是纯数据字段
- **概念**：纯数据字段指的是那些不用于界面渲染的 data 字段。
- **应用场景**：例如有些情况下，某些 data 中的字段既不会展示在界面上，也不会传递给其他组件，仅仅在当前组件内部使用。带有这种特性的 data 字段适合被设置为纯数据字段。 

### 使用规则
在 Component 构造器的 options 节点中，指定 `pureDataPattern` 为一个正则表达式，字段名符合这个正则表达式的字段将成为纯数据字段，示例代码如下：
```js
Component({
  options: {
    // 指定所有 _ 开头的数据字段为纯数据字段
    pureDataPattern: /^_/
  },
  data: {
    a: true, // 普通数据字段
    _b: true, // 纯数据字段
  }
})
```

## 自定义组件 - 组件的生命周期
### 组件全部的生命周期函数
小程序组件可用的全部生命周期如下表所示：

| 生命周期函数 | 参数         | 描述说明                                 |
| ------------ | ------------ | ---------------------------------------- |
| created      | 无           | 在组件实例刚刚被创建时执行               |
| attached     | 无           | 在组件实例进入页面节点树时执行           |
| ready        | 无           | 在组件在视图层布局完成后执行             |
| moved        | 无           | 在组件实例被移动到节点树另一个位置时执行 |
| detached     | 无           | 在组件实例被从页面节点树移除时执行       |
| error        | Object Error | 每当组件方法抛出错误时执行               |

### 组件主要的生命周期函数
在小程序组件中，最重要的生命周期函数有 3 个，分别是 `created`、`attached`、`detached`。它们各自的特点如下：

 ① created 生命周期函数 
- **触发时机**：组件实例刚被创建好的时候  
- **限制与操作**：  
  - 此时还不能调用 `setData`  
  - 通常用于给组件的 `this` 添加一些自定义的属性字段  

 ② attached 生命周期函数  
- **触发时机**：在组件完全初始化完毕、进入页面节点树后  
- **特点与应用**：  
  - 此时，`this.data` 已被初始化完毕  
  - 绝大多数初始化工作可在此进行（例如发请求获取初始数据 ）  
  - 
 ③ detached 生命周期函数  
- **触发时机**：在组件离开页面节点树后  
- **场景与操作**：  
  - 退出一个页面时，会触发页面内每个自定义组件的 `detached` 生命周期函数  
  - 适合做一些清理性质的工作（如清除定时器、取消订阅事件等 ）
  
###  lifetimes 节点
在小程序组件中，生命周期函数可以直接定义在 Component 构造器的第一级参数中，也可在 `lifetimes` 字段内声明（**推荐方式，优先级最高**）。示例代码如下：
```js
Component({
  // 推荐用法
  lifetimes: {
    attached() {}, // 在组件实例进入页面节点树时执行
    detached() {}, // 在组件实例被从页面节点树移除时执行
  },
  // 以下是旧式的定义方式
  attached() {}, // 在组件实例进入页面节点树时执行
  detached() {}, // 在组件实例被从页面节点树移除时执行
})
```
## 自定义组件 - 组件所在页面的生命周期
### 什么是组件所在页面的生命周期
有时，自定义组件的行为依赖于页面状态的变化，此时就需要用到组件所在页面的生命周期。  
例如：每当触发页面的 `show` 生命周期函数的时候，我们希望能够重新生成一个随机的 RGB 颜色值。  

在自定义组件中，组件所在页面的生命周期函数有如下 3 个，说明如下：  

| 生命周期函数 | 参数        | 描述                         |
| ------------ | ----------- | ---------------------------- |
| `show`       | 无          | 组件所在的页面被展示时执行   |
| `hide`       | 无          | 组件所在的页面被隐藏时执行   |
| `resize`     | Object Size | 组件所在的页面尺寸变化时执行 |

### pageLifetimes 节点
组件所在页面的生命周期函数，需要定义在 `pageLifetimes` 节点中，示例代码如下：
```js
Component({
  pageLifetimes: {
    show: function() {}, // 页面被展示
    hide: function() {}, // 页面被隐藏
    resize: function(size) {} // 页面尺寸变化
  }
})
```
## 自定义组件 - 插槽
### 单个插槽
在小程序中，默认每个自定义组件中只允许使用一个 `<slot>` 进行占位，这种个数上的限制叫做单个插槽。  

```html
<!-- 组件的封装者 -->
<view class="wrapper">
  <view>这里是组件的内部节点</view>
  <!-- 对于不确定的内容，可以使用 <slot> 进行占位，具体的内容由组件的使用者决定 -->
  <slot></slot>
</view>

<!-- 组件的使用者 -->
<component-tag-name>
  <!-- 这部分内容将被放置在组件 <slot> 的位置上 -->
  <view>这里是插入到组件slot中的内容</view>
</component-tag-name>
```

### 使用多个插槽
在使用带有多个插槽的自定义组件时，需要用 `slot` 属性来将节点插入到不同的 `<slot>` 中。示例代码如下：  

```js
// 组件的封装者
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  data: {
    // 组件的初始数据
  },
  methods: {
    // 组件的方法
  }
})
```

```html
<!-- 引用组件的页面模板 -->
<component-tag-name>
  <!-- 这部分内容将被放置在组件 <slot name="before"> 的位置上 -->
  <view slot="before">这里是插入到组件slot name="before"中的内容</view>
  <!-- 这部分内容将被放置在组件 <slot name="after"> 的位置上 -->
  <view slot="after">这里是插入到组件slot name="after"中的内容</view>
</component-tag-name>
```
## 自定义组件 - 通信

###  属性绑定

属性绑定用于实现父向子传值，而且只能传递普通类型的数据，无法将方法传递给子组件。

- **父组件的 data 节点**：
```js
data: {
  count: 0
}
```
- **父组件的 wxml 结构**：
```html
<my-test3 count="{{count}}"></my-test3>
<view>-----</view>
<view>父组件中，count值为：{{count}}</view>
``` 

子组件在 `properties` 节点中声明对应的属性并使用  

- **子组件的 properties 节点**：  
```js
properties: {
  count: Number
}
```  
- **子组件的 wxml 结构**：  
```html
<text>子组件中，count值为：{{count}}</text>
```
### 子组件向父组件通信
步骤1：
在父组件的 js 中，定义一个函数（如 `syncCount` ），用于通过自定义事件传递给子组件：
```js
// 在父组件中定义 syncCount 方法
// 将来，这个方法会被传递给子组件，供子组件进行调用
syncCount() {
  console.log('syncCount')
},
``` 
核心是**在父组件里声明函数，为后续传给子组件做准备**，子组件可通过自定义事件触发该函数，实现父子组件间的交互 。

 步骤2：父组件 wxml 传递函数给子组件
在父组件的 `wxml` 中，通过自定义事件形式，把步骤1定义的函数引用传给子组件，有两种写法：
```xml
<!-- 写法1：用 bind:自定义事件名，结构清晰（推荐） -->
<my-test3 count="{{count}}" bind:sync="syncCount"></my-test3>

<!-- 写法2：简化写法，bind 后直接跟自定义事件名 -->
<my-test3 count="{{count}}" bindsync="syncCount"></my-test3>
``` 
作用是**建立父子组件的事件关联**，让子组件能触发父组件里定义的函数，实现跨组件的交互逻辑 。


 步骤3：子组件触发自定义事件
在子组件的 `js` 中，通过 `this.triggerEvent('自定义事件名称', { /* 参数对象 */ })` ，将数据发送到父组件，实现父子组件通信，代码示例：
```js
// 子组件的 wxml 结构
<text>子组件中，count值为：{{count}}</text>
<button type="primary" bindtap="addCount">+1</button>

// 子组件的 js 代码
methods: {
  addCount() {
    this.setData({
      count: this.properties.count + 1
    })
    // 触发自定义事件 sync，传递参数 {value: this.properties.count}
    this.triggerEvent('sync', {value: this.properties.count})
  }
}
``` 
关键逻辑：点击按钮时，先更新子组件内部数据 `count` ，再通过 `triggerEvent` 触发自定义事件（这里是 `sync` ）并传参，让父组件能响应子组件的操作 。


步骤4：父组件接收子组件数据
在父组件的 `js` 中，通过 `e.detail` 获取子组件传递的数据，示例代码：
```js
syncCount(e) {
  // e.detail 可拿到子组件传的数据，这里将数据更新到父组件的 count 中
  this.setData({
    count: e.detail.value
  })
},
``` 
作用是**完成父子组件通信的最后一步**，父组件在绑定的事件处理函数里，通过事件对象 `e` 的 `detail` 属性，接收子组件触发事件时传递的参数，进而更新自身数据或执行后续逻辑 。

# day5
## 引入Vant Weapp
https://vant-ui.github.io/vant-weapp/#/theme

### 使用
 
在小程序中使用 Vant 组件库，需先安装，再通过 `app.json` 全局注册组件，步骤如下：  


#### 全局注册组件（`app.json`）  
在 `app.json` 的 `usingComponents` 中，配置需要的 Vant 组件路径，示例注册 `van-button`：  

```json
// app.json
{
  "usingComponents": {
    "van-button": "@vant/weapp/button/index"
  }
}
```  


#### 页面中使用组件（`.wxml`）  
在任意页面的 `.wxml` 中，直接用已注册的组件标签（如 `<van-button>` ）渲染 UI：  

```html
// 页面的 .wxml 结构
<van-button type="primary">按钮</van-button>
```  


**核心逻辑**：  
- `usingComponents` 是小程序全局注册自定义组件的配置项，通过它引入 Vant 组件后，所有页面可直接使用。  
- `type="primary"` 是 Vant 按钮的预设样式，让按钮显示为主要风格（可根据需求替换为其他样式）。  

简单说，这是**小程序集成 Vant 组件库的标准流程** ：全局注册 + 页面直接调用，快速实现 UI 组件化开发。
## 定制全局主题样式  
在 `app.wxss` 中定义 **CSS 变量** ，可实现全局样式定制（以修改警告按钮样式为例）：  

```css
/* app.wxss */
page {
  /* 定制警告按钮的背景颜色和边框颜色 */
  --button-danger-background-color: #C00000;
  --button-danger-border-color: #D60000;
}
```  

**核心逻辑**：  
- `app.wxss` 是小程序全局样式文件，作用于所有页面。  
- 通过 `--变量名` 定义 CSS 自定义属性（变量），可被组件全局复用（如按钮组件通过 `var(--变量名)` 引用）。  
- 这里通过覆盖默认的警告按钮颜色变量，统一修改所有警告按钮的背景和边框样式，实现主题化定制。

## 小程序API的Promise化

在小程序里，借助第三方 `npm` 包 `miniprogram-api-promise` 实现 API Promise 化，步骤：  

### 安装命令  
执行以下语句安装指定版本（`1.0.4`）的包：  
```bash
npm install --save miniprogram-api-promise@1.0.4
```  

### 核心逻辑  
- 依赖包：`miniprogram-api-promise` 专门用于将小程序回调式 API 转换为 Promise 风格。  
- 作用：让异步操作可通过 `async/await` 编写，解决回调地狱问题，提升代码可读性与可维护性。  

简单说，这一步是**为小程序项目装工具包，为后续更简洁写异步代码做准备** 。

### 安装后
删除miniprogram-api-promise 后，需执行 “构建 npm” 操作（小程序开发工具 -> 工具 -> 构建 npm ），工具会把 node_modules 里的包，编译成小程序能识别的代码，输出到 miniprogram_npm 目录。
### 实现 API Promise 化  
 入口文件初始化（`app.js`）  
在小程序入口文件（`app.js`）中，调用 `promisifyAll` 方法，一次性完成所有 API 的 Promise 化：  

```js
// 1. 从依赖包导入 promisifyAll 方法
import { promisifyAll } from 'miniprogram-api-promise'

// 2. 创建空对象，用于挂载 Promise 化后的 API
const wxp = wx.p = {}

// 3. 执行 Promise 化：遍历 wx 的 API，转为 Promise 风格并挂载到 wxp
promisifyAll(wx, wxp)
```  

**核心逻辑**：  
- `promisifyAll` 会自动处理 `wx` 对象的所有异步 API（如 `wx.request` ），生成返回 Promise 的版本，存到 `wxp` 。  
- 后续开发可通过 `wxp.request()` 替代 `wx.request` ，结合 `async/await` 写异步代码，避免回调地狱。  


简单说，这是**让小程序 API 支持 Promise 语法的完整方案** ，装包 + 一行初始化，就能让异步代码更简洁。

### 事件处理（.js）
在页面的 .js 文件中，定义 async 异步函数，通过 wx.p.request（Promise 化后的 API）发起 GET 请求：

js
// 在页面的 .js 文件中，定义对应的 tap 事件处理函数
```js
async getInfo() {
  // 发起 GET 请求，await 等待 Promise 结果
  const { data: res } = await wx.p.request({
    method: 'GET',
    url: 'https://www.escook.cn/api/get',
    data: { name: 'zs', age: 20 }
  })

  // 打印接口返回的数据
  console.log(res)
},
```
## 全局数据共享
###  安装 MobX 相关的包  
在小程序项目中，通过 npm 安装 MobX 依赖包，实现全局数据共享，步骤如下：  

在项目目录运行以下命令，安装指定版本的 `mobx-miniprogram` 和 `mobx-miniprogram-bindings`：  
```bash
npm install --save mobx-miniprogram@4.13.2 mobx-miniprogram-bindings@1.2.1
```  
安装完成后，需手动删除 `miniprogram_npm` 目录，再**重新构建 npm**（小程序开发工具 -> 工具 -> 构建 npm ），确保依赖正确生效。  

**核心逻辑**：  
- `mobx-miniprogram` 是 MobX 在小程序环境的核心库，提供响应式数据管理能力。  
- `mobx-miniprogram-bindings` 用于连接 MobX 与小程序组件，实现数据绑定。  
- 删除并重建 `miniprogram_npm` 是为了避免旧编译文件干扰，确保新安装的包被正确处理。  

简单说，这是**小程序集成 MobX 实现全局数据共享的第一步** ：装依赖 + 清理重建，为后续数据管理做准备。

### 创建MobX Store
创建一个Store文件夹，在里面创建一个
store.js 文件
// 导入MobX核心API
```js
import { observable, action } from 'mobx-miniprogram'

// 创建并导出响应式Store实例
export const store = observable({
  // 定义响应式数据（状态）
  numA: 1,
  numB: 2,

  // 计算属性（依赖numA和numB，自动响应数据变化）
  get sum() {
    return this.numA + this.numB
  },

  // 定义修改数据的action方法（确保数据更新能触发响应）
  updateNum1: action(function (step) {
    this.numA += step
  }),
  updateNum2: action(function (step) {
    this.numB += step
  })
})
```
### 将Store绑定到页面中
```js
// 导入必要的依赖
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'

Page({
  
  // 页面加载时建立与Store的绑定
  onLoad: function() {
    // 创建绑定关系，将Store中的成员映射到当前页面
    this.storeBindings = createStoreBindings(this, {
      store, // 关联的Store实例
      fields: ['numA', 'numB', 'sum'], // 绑定的Store数据字段
      actions: ['updateNum1'] // 绑定的Store方法
    })
  },

  // 按钮点击事件处理函数
  btnHandler1(e) {
    // 获取data-step传递的参数，调用Store中的方法更新数据
    this.updateNum1(e.target.dataset.step)
  },

  // 页面卸载时解除绑定，防止内存泄漏
  onUnload: function() {
    this.storeBindings.destroyStoreBindings()
  }
})

```
### 在页面上使用Store 中的成员
```html
<!-- 页面的 .wxml 结构 -->
<view>{{numA}} + {{numB}} = {{sum}}</view>

<van-button type="primary" bindtap="btnHandler1" data-step="{{1}}">
  numA + 1
</van-button>

<van-button type="danger" bindtap="btnHandler1" data-step="{{-1}}">
  numA - 1
</van-button>
```
## 分包


# uniapp