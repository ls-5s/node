## 没学
```js
11-16
```
# 微信小程序项目结构
1. **pages**：用来存放所有小程序的页面
2. **utils**：用来存放工具性质的模块（例如：格式化时间的自定义模块）
3. **app.js**：小程序项目的入口文件
4. **app.json**：小程序项目的全局配置文件
5. **app.wxss**：小程序项目的全局样式文件
6. **project.config.json**：项目的配置文件
7. **sitemap.json**：用来配置小程序及其页面是否允许被微信索引 

这些文件和目录构成了微信小程序项目的基本结构，各自承担不同功能，协同保障小程序的开发与运行 。
## app.json
```json

app.json 是当前小程序的**全局配置**，涵盖小程序的所有页面路径、窗口外观、界面表现、底部 tab 等。
Demo 项目里的 app.json 配置内容如下：
```json
{
  "pages": [
    "pages/index/index",
    "pages/logs/logs"
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "WeChat",
    "navigationBarTextStyle": "black"
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json"
}
```



简单了解下这 4 个配置项的作用：
1. **pages**：用来记录当前小程序所有页面的路径 
2. **window**：全局定义小程序所有页面的背景色、文字颜色等 
3. **style**：全局定义小程序组件所使用的样式版本 
4. **sitemapLocation**：用来指明 sitemap.json 的位置 

```
## project.config.json

```json

project.config.json 是项目配置文件，用来记录我们对小程序开发工具所做的个性化配置，例如：
- setting 中保存了编译相关的配置 
- projectname 中保存的是项目名称 
- appid 中保存的是小程序的账号 ID 
```

## sitemap.json 文件
微信现已开放小程序内搜索，效果类似于 PC 网页的 SEO 。sitemap.json 文件用来配置小程序页面是否允许微信索引。

当开发者允许微信索引时，微信会通过爬虫形式，为小程序页面内容建立索引。若用户搜索关键字与页面索引匹配，小程序页面可能展示在搜索结果中。
```json

示例代码（sitemap.json 内容）：
{
  // 描述信息：关于当前sitemap.json文件的更多配置说明，可参考微信官方文档
  "desc": "关于本文件的更多信息，请参考文档 https://developers.weixin.qq.com/miniprogram/dev",
  // 索引规则配置数组，用于设置小程序页面是否允许微信索引
  "rules": [
    {
      // action属性：设置索引权限，"allow"表示允许微信索引该规则匹配的页面
      "action": "allow",
      // page属性：指定匹配的页面路径，"*"为通配符，表示匹配小程序中所有页面
      "page": "*"
    }
  ]
}
```

## 5. 页面的 .json 配置文件
小程序中的每一个页面，可以使用 .json 文件来对本页面的窗口外观进行配置，**页面中的配置项会覆盖 app.json 的 window 中相同的配置项**。例如： 

## 6. 新建小程序页面
只需要在 `app.json -> pages` 中新增页面的存放路径，小程序开发者工具即可帮我们自动创建对应的页面文件，如图所示： 
```json
{
  "pages": [
    "pages/index/index",
    "pages/logs/logs",
    "pages/info/info"
  ]
}
```
## 7. 修改项目首页
只需要调整 `app.json -> pages` 数组中页面路径的前后顺序，即可修改项目的首页。小程序会把排在第一位的页面，当作项目首页进行渲染，如图所示： 
```json
{
  "pages": [
    "pages/info/info",
    "pages/index/index",
    "pages/logs/logs"
    
  ]
}
```

## WXML 和 HTML 的区别
1. **标签名称不同**
    - HTML：常用标签如 `div`（用于布局）、`span`（用于行内文本）、`img`（用于图片展示）、`a`（用于超链接） 。 
    - WXML：对应使用 `view`（类似 `div` 做布局）、`text`（专门用于文本显示，类似 `span` 但更贴合小程序文本渲染需求 ）、`image`（加载显示图片 ）、`navigator`（实现页面跳转，类似 `a` 标签功能 ） 。 
2. **属性节点不同**
    - HTML 中用 `<a href="#">超链接</a>` ，通过 `href` 属性定义跳转链接 。 
    - WXML 里用 `<navigator url="/pages/home/home"></navigator>` ，以 `url` 属性指定小程序内页面跳转路径 。 
3. **模板语法特性**  
WXML 提供类似 Vue 的模板语法，包含：
    - **数据绑定**：可将小程序的 JavaScript 数据动态渲染到 WXML 结构里，实现数据驱动视图 。 
    - **列表渲染**：能基于数组数据，循环生成列表结构，高效渲染重复的列表内容 。 
    - **条件渲染**：依据条件判断（如 `if` 语句逻辑 ），决定是否渲染某部分 WXML 结构，灵活控制页面展示内容 。 
##  WXSS 和 CSS 的区别
1. **新增了 rpx 尺寸单位**  
    - CSS 中需要手动进行像素单位换算，例如 rem  
    - WXSS 在底层支持新的尺寸单位 rpx，在不同大小的屏幕上小程序会自动进行换算  

2. **提供了全局的样式和局部样式**  
    - 项目根目录中的 app.wxss 会作用于所有小程序页面  
    - 局部页面的.wxss 样式仅对当前页面生效  

3. **WXSS 仅支持部分 CSS 选择器**  
    - .class 和 #id  
    - element  
    - 并集选择器、后代选择器  
    - ::after 和 ::before 等伪类选择器
## 小程序中 .js 文件的分类
小程序中的 JS 文件分为三大类，分别是：  
① **app.js**  
- 是整个小程序项目的入口文件，通过调用 `App()` 函数来启动整个小程序  

② **页面的 .js 文件**  
- 是页面的入口文件，通过调用 `Page()` 函数来创建并运行页面  

③ **普通的 .js 文件**  
- 是普通的功能模块文件，用来封装公共的函数或属性供页面使用
  

## 小程序启动的过程
1. 把小程序的代码包下载到本地  
2. 解析 app.json 全局配置文件  
3. 执行 app.js 小程序入口文件，调用 App() 创建小程序实例  
4. 渲染小程序首页  
5. 小程序启动完成

## 1. 小程序中组件的分类
小程序中的组件由宿主环境提供，开发者可基于组件快速搭建页面结构。官方将小程序组件分为9大类，分别是：  
① 视图容器  
② 基础内容  
③ 表单组件  
④ 导航组件  
⑤ 媒体组件  
⑥ map 地图组件  
⑦ canvas 画布组件  
⑧ 开放能力  
⑨ 无障碍访问   
### 2. 常用的视图容器类组件
1. **view**  
    - 普通视图区域  
    - 类似于 HTML 中的 div，是一个块级元素  
    - 常用来实现页面的布局效果  

2. **scroll-view**  
  
    - 使用scroll-view实现纵向滚动，需设置scroll-y属性开启纵向滚动能力，同时必须为scroll-view设置固定高度（如示例中.box的height: 120px ），这样内容超出容器高度时才会触发滚动 。
  ```html
<scroll-view class = "box" scroll-y>
<view>A</view>
<view>B</view>
<view>C</view>
</scroll-view>
  ```

  ```css
/* pages/list/list.wxss */
.box {
  height: 200px;
  /* width: 200px; */
  display: flex;
  justify-content: space-around;
}
.box view{
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  background-color: antiquewhite;
}

  ```

3. **swiper 和 swiper-item**  
    - 轮播图容器组件 和 轮播图 item 组件
  以下是提取的关于 `swiper` 和 `swiper - item` 组件基本使用的关键内容：
 一、wxml 结构（以微信小程序为例 ，对应左侧代码）
 这是**小程序轮播图（swiper）组件的属性说明表**，关键信息提取如下：

| 属性                   | 类型    | 默认值            | 说明                 |
| ---------------------- | ------- | ----------------- | -------------------- |
| indicator-dots         | boolean | false             | 是否显示面板指示点   |
| indicator-color        | color   | rgba(0, 0, 0, .3) | 指示点颜色           |
| indicator-active-color | color   | #000000           | 当前选中的指示点颜色 |
| autoplay               | boolean | false             | 是否自动切换         |
| interval               | number  | 5000              | 自动切换时间间隔     |
| circular               | boolean | false             | 是否采用衔接滑动     |

这些属性用于配置轮播图的外观（如指示点）、交互（如自动切换、衔接滑动）等行为，开发时可按需设置，调整轮播图效果 。 
```xml
<!-- 轮播图区域 -->
<!-- indicator-dots 属性：显示面板指示点 -->
<swiper class="swiper-container" indicator-dots>
  <!-- 第1项 -->
  <swiper-item>
    <view class="item">A</view>
  </swiper-item>
  <!-- 第2项 -->
  <swiper-item>
    <view class="item">B</view>
  </swiper-item>
  <!-- 第3项 -->
  <swiper-item>
    <view class="item">B</view>
  </swiper-item>
</swiper>
```
解释：
- `swiper` 是轮播图容器组件，`indicator - dots` 属性用于显示面板指示点（即底部的小圆点，用于标识当前轮播项位置 ）。
- `swiper - item` 是轮播图的每一项，内部可嵌套其他组件（这里嵌套了 `view` 组件展示内容 ）。 
 二、wxss 样式（对应右侧代码 ）
```css
.swiper-container {
  height: 150px; /* 轮播图容器的高度 */
}

.item {
  height: 100%;
  line-height: 150px;
  text-align: center;
}

swiper-item:nth-child(1) .item {
  background-color: lightgreen;
}

swiper-item:nth-child(2) .item {
  background-color: lightskyblue;
}

swiper-item:nth-child(3) .item {
  background-color: lightcoral;
}
```
 
这是对小程序中 `text` 和 `rich-text` 组件的说明，提取关键信息如下：

### text 组件
- 性质：文本组件 
- 特点：类似于 HTML 里的 `span` 标签，属于行内元素，主要用于展示基础文本内容 
<!-- 
  <text> 是小程序中用于展示文本内容的基础组件
  selectable 是 <text> 组件的一个布尔类型属性，值为 true 时表示该文本可以被用户选中、复制
  此处通过设置 selectable 让电话号码 "1771124251" 支持用户选中和复制操作，提升用户体验（比如方便用户直接复制号码进行拨号等）
-->
```json
<text selectable>1771124251</text>
```

### rich-text 组件
- 性质：富文本组件 
- 特点：能把 HTML 字符串渲染成 WXML 结构，可用于展示包含复杂排版、标签的富文本内容（如从后端获取的带 HTML 格式的文章等 ） 
```json
  <rich-text nodes=" <h2 style='color: #333; font-size: 18px;'>这是一个标题</h2>"></rich-text>
```
### button
1. **button（按钮组件）**：功能比HTML的button丰富，可通过`open - type`调用微信功能（客服、转发、获取用户授权/信息等 ）。 
```html
<!-- 
  button 组件：小程序基础交互组件，用于触发操作
  
  type 属性：控制按钮的主题样式
    - "primary"：主要按钮，一般为品牌色（如微信默认的蓝色）
    - "warn"：警告类按钮，一般为橙色/红色系（用于强调重要操作或警告场景）
  
  size 属性：控制按钮尺寸
    - "mini"：迷你尺寸，适合空间紧凑的场景（如列表、弹窗内）
  
  plain 属性：镂空样式
    - 按钮背景透明，仅保留边框和文字颜色，视觉更轻盈
-->
<button type="primary" size="mini" plain>确认</button>
<button type="warn" size="mini" plain>确认</button>
``` 

### image

2. **image（图片组件）**：默认宽约300px、高约240px 。 
3. 常用 mode 值及说明：
scaleToFill：默认，不保持纵横比，拉伸填满 image 元素。
aspectFit：保持纵横比，让长边完整显示，可完整展示图片。
aspectFill：保持纵横比，让短边完整显示，长边可能被截取。
widthFix：宽度固定，高度随原图宽高比自动变化。
heightFix：高度固定，宽度随原图宽高比自动变化 。
```html
<image 
  src="/images/pic.jpg" 
  mode="aspectFill"  <!-- 保持宽高比，填满容器，超出部分裁剪 -->
  alt="示例图片"
></image>
```
1. **navigator（页面导航组件）**：类似HTML的`a`链接，后续课程专门讲解 。
### navigator 组件
类似HTML的`a`链接，后续课程专门讲解 。

# api
这是关于**小程序 API 三大分类**的知识提取：

### 核心分类与说明
1. **事件监听 API**  
    - 特征：以 `on` 开头，用于监听系统/应用事件。  
    - 作用：实时响应程序状态变化（如窗口变化、网络状态切换等）。  
    - 示例：`wx.onWindowResize(callback)` 监听窗口尺寸变化，窗口大小改变时触发 `callback`。  

2. **同步 API**  
    - 特征：以 `Sync` 结尾，执行结果直接通过**返回值获取**，执行失败会**抛出异常**。  
    - 作用：适合简单、需立即获取结果的场景（如读写本地存储）。  
    - 示例：`wx.setStorageSync('key', 'value')` 直接向本地存储写入数据，可通过 `try...catch` 捕获异常。  

3. **异步 API**  
    - 特征：类似 jQuery 的 `$.ajax`，通过 `success`（成功）、`fail`（失败）、`complete`（完成）**回调函数**接收结果。  
    - 作用：处理耗时操作（如网络请求、文件读写），避免阻塞程序。  
    - 示例：`wx.request()` 发起网络请求，通过 `success` 回调处理服务器响应数据。  


### 关键区别
| 分类         | 标识特征    | 结果获取方式           | 典型场景           |
| ------------ | ----------- | ---------------------- | ------------------ |
| 事件监听 API | `on` 开头   | 事件触发时执行回调     | 监听窗口、网络变化 |
| 同步 API     | `Sync` 结尾 | 直接返回结果/抛异常    | 本地存储读写       |
| 异步 API     | 无特殊后缀  | 依赖 success/fail 回调 | 网络请求、文件上传 |

理解这三类 API 的设计逻辑，能更清晰地选择合适的方式处理小程序开发中的交互、数据读写、异步任务等需求。
# days 2

## 数据绑定
```js
// pages/list/list.js
Page({

 
  data: {
name:"li",
age:18,
num: parseInt(Math.random() * 10)
  },


})

使用
<view class="box">
  <view>姓名：{{name}}</view>
  <view>年龄：{{age}}</view>
  <view>随机数：{{num}}</view>

动态数据绑定
</view>
image
<image src="{{img}}" mode="aspectFill" alt="示例图片"></image>


三目运算符

<view>
  <view>
    {{num > 5 ? '大于5' : '小于等于5'}}
  </view>
</view>
```