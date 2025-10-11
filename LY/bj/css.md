# CSS 基础
## CSS 选择器
CSS选择器用于选择要设置样式的HTML元素：


```markdown
/* 标签选择器 */
h1 {
    color: red;
}

/* 类选择器 */
.red-text {
    color: red;
}

/* ID选择器 */
#header {
    background-color: blue;
}

/* 通配符选择器 */
* {
    margin: 0;
    padding: 0;
}

/* 后代选择器 */
ul li {
    color: green;
}

/* 子选择器 */
div > p {
    font-size: 16px;
}

/* 并集选择器 */
h1, h2, h3 {
    font-family: "Microsoft YaHei";
}

/* 伪类选择器 */
a:hover {
    color: orange;
}
```
## 字体属性
CSS提供了多种字体相关的属性：


```markdown
/* 设置字体 */
body {
    font-family: "Microsoft YaHei", "Arial", sans-serif;
}

/* 设置字体大小 */
p {
    font-size: 14px;
}

/* 设置字体粗细 */
h1 {
    font-weight: bold;
    /* 也可以用数字：100-900 */
}

/* 设置字体样式 */
em {
    font-style: italic;
}

/* 字体复合属性 */
h2 {
    font: italic bold 20px "Microsoft YaHei";
    /* 顺序：font-style font-weight font-size font-family */
}
```
## 文本属性
CSS提供了多种文本相关的属性：


```markdown
/* 设置文本颜色 */
p {
    color: #333;
    /* 也可以用：color: red; 或 color: rgb(255, 0, 0); */
}

/* 设置文本对齐方式 */
h1 {
    text-align: center;
    /* 可选值：left, right, center, justify */
}

/* 设置文本装饰 */
a {
    text-decoration: none;
    /* 可选值：none, underline, overline, line-through */
}

/* 设置文本缩进 */
p {
    text-indent: 2em;
    /* 2em表示2个汉字宽度 */
}

/* 设置行高 */
line-height: 1.5;
/* 行高为字体大小的1.5倍 */
```
## CSS 样式引入方式
CSS 样式可以通过以下三种方式引入：

**行内样式**：直接写在HTML元素的style属性中

```markdown
<h1 style="color: red; font-size: 20px;">行内样式</h1>
```
**内部样式表**：写在HTML文档的head标签中的style标签中

```markdown
<style>
    h2 {
        color: blue;
    }
</style>
```
**外部样式表**：写在独立的.css文件中，通过link标签引入

```markdown
<link rel="stylesheet" href="style.css">
```
## Emmet 语法
```markdown
/* 生成div标签 */
div + tab

/* 生成10个div标签 */
div*10 + tab

/* 生成带子元素的div */
div>a + tab

/* 生成带兄弟元素的div */
div+p + tab

/* 生成带类的p标签 */
p.classname + tab

/* 生成带ID的p标签 */
p#idname + tab

/* 生成带递增数字的多个div */
.div$*5 + tab

/* 生成带内容的div */
div{内容} + tab
```
## CSS Emmet语法：
```
/* 生成color: #333; */
c#333 + tab

/* 生成margin: 10px; */
mt10 + tab

/* 生成padding: 10px 20px; */
p10-20 + tab

/* 生成font-size: 14px; */
fz14 + tab
```
## CSS 布局

### 盒子模型
CSS盒模型是网页布局的基础，每个HTML元素都可以看作一个盒子：


```markdown
.box {
    /* 内容区域 */
    width: 200px;
    height: 100px;
    
    /* 内边距（内容与边框之间的距离） */
    padding: 10px;
    /* 也可以分开设置：padding-top, padding-right, padding-bottom, padding-left */
    
    /* 边框 */
    border: 1px solid #000;
    /* 也可以分开设置：border-width, border-style, border-color */
    
    /* 外边距（元素与元素之间的距离） */
    margin: 20px;
    /* 也可以分开设置：margin-top, margin-right, margin-bottom, margin-left */
}
```
注意：默认情况下，盒子的实际宽度 = width + padding2 + border2

如果想让width就是盒子的实际宽度，可以使用box-sizing属性：
```
.box {
    box-sizing: border-box;
    width: 200px;
    padding: 10px;
    border: 1px solid #000;
    /* 此时盒子的实际宽度是200px，内容区域宽度 = 200 - 10*2 - 1*2 = 178px */
}
```
### 浮动布局
浮动用于让元素脱离标准流，实现灵活的布局：


```markdown
/* 左浮动 */
.float-left {
    float: left;
}

/* 右浮动 */
.float-right {
    float: right;
}

/* 清除浮动 */
.clearfix::after {
    content: "";
    display: block;
    clear: both;
}
```
 两栏布局
```
<div class="clearfix">
    <div class="left" style="float: left; width: 200px; height: 300px; background: red;">左侧边栏</div>
    <div class="right" style="float: right; width: 400px; height: 300px; background: blue;">右侧内容</div>
</div>
```
### 定位布局
定位用于精确控制元素的位置：


```markdown
/* 静态定位（默认） */
.static {
    position: static;
}

/* 相对定位（相对于自身原来的位置） */
.relative {
    position: relative;
    top: 10px;
    left: 20px;
}

/* 绝对定位（相对于最近的非static定位的祖先元素） */
.absolute {
    position: absolute;
    top: 50px;
    left: 100px;
}

/* 固定定位（相对于浏览器窗口） */
.fixed {
    position: fixed;
    top: 0;
    left: 0;
}

/* 粘性定位（结合相对定位和固定定位的特点） */
.sticky {
    position: sticky;
    top: 10px;
}

/* 控制定位元素的层叠顺序 */
.z-index {
    z-index: 10;
    /* 数值越大，元素越在上面 */
}
```
## Flexbox 布局

Flexbox是一种现代的布局方式，用于更简便地实现各种布局：

### 容器属性（作用于父元素）


```markdown
.container {
    /* 启用Flexbox布局 */
    display: flex;
    
    /* 设置主轴方向 */
    flex-direction: row; /* 默认为横向排列 */
    /* flex-direction: column; 纵向排列 */
    
    /* 设置主轴对齐方式 */
    justify-content: center; /* 居中对齐 */
    /* justify-content: flex-start; 左对齐 */
    /* justify-content: flex-end; 右对齐 */
    /* justify-content: space-between; 两端对齐，中间空白均分 */
    /* justify-content: space-around; 每个项目两侧的空白相等 */
    
    /* 设置是否换行 */
    flex-wrap: wrap; /* 自动换行 */
    /* flex-wrap: nowrap; 不换行（默认） */
    
    /* 设置交叉轴对齐方式（单行） */
    align-items: center; /* 居中对齐 */
    /* align-items: flex-start; 顶部对齐 */
    /* align-items: flex-end; 底部对齐 */
    
    /* 设置交叉轴对齐方式（多行） */
    align-content: center; /* 居中对齐 */
    /* align-content: space-between; 两端对齐 */
}
```
### 项目属性（作用于子元素）

```markdown
.item {
    /* 设置项目的伸缩比例 */
    flex: 1; /* 占1份空间 */
    /* flex: 2; 占2份空间 */
    /* flex: 0 0 200px; 固定宽度200px，不伸缩 */
    
    /* 覆盖父容器的align-items设置 */
    align-self: flex-end; /* 单独设置为底部对齐 */
}
```
示例：水平居中的导航栏
```markdown
<nav style="display: flex; justify-content: center; background: #333; color: white; padding: 10px;">
    <a href="#" style="margin: 0 10px;">首页</a>
    <a href="#" style="margin: 0 10px;">产品</a>
    <a href="#" style="margin: 0 10px;">关于我们</a>
    <a href="#" style="margin: 0 10px;">联系我们</a>
</nav>
```
示例：三栏布局，中间自适应
```markdown
<div style="display: flex;">
    <div style="flex: 0 0 200px; background: red;">左侧边栏</div>
    <div style="flex: 1; background: blue;">中间内容</div>
    <div style="flex: 0 0 200px; background: green;">右侧边栏</div>
</div>
```
## CSS3 高级特性

### 圆角边框

```markdown
/* 设置圆角 */
.border-radius {
    border-radius: 10px;
    /* 可以设置四个角不同的值：border-radius: 10px 20px 30px 40px; */
    
    /* 圆形 */
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
```
### 阴影效果
```markdown
/* 盒子阴影 */
.box-shadow {
    box-shadow: 10px 10px 5px #888;
    /* 语法：box-shadow: 水平偏移 垂直偏移 模糊距离 阴影颜色; */
}

/* 文字阴影 */
.text-shadow {
    text-shadow: 2px 2px 4px #888;
    /* 语法：text-shadow: 水平偏移 垂直偏移 模糊距离 阴影颜色; */
}
```
### 过渡效果
```markdown
/* 过渡效果 */
.transition {
    width: 100px;
    height: 100px;
    background: red;
    /* 语法：transition: 要过渡的属性 过渡时间 过渡函数 延迟时间; */
    transition: width 1s ease 0.5s;
    
    /* 简写，所有属性都过渡 */
    transition: all 0.3s;
}

/* 鼠标悬停时改变宽度 */
.transition:hover {
    width: 300px;
    background: blue;
}
```
### 变换效果
```markdown
/* 2D变换 */
.transform {
    /* 旋转 */
    transform: rotate(45deg);
    
    /* 缩放 */
    transform: scale(1.5);
    
    /* 平移 */
    transform: translate(100px, 50px);
    
    /* 倾斜 */
    transform: skew(30deg, 20deg);
    
    /* 复合变换 */
    transform: rotate(45deg) scale(1.2) translate(50px, 50px);
}
```
### 媒体查询
媒体查询用于实现响应式设计，根据不同的屏幕尺寸应用不同的样式：


```markdown
/* 当屏幕宽度小于600px时应用以下样式 */
@media (max-width: 600px) {
    body {
        font-size: 14px;
    }
    
    .container {
        width: 100%;
    }
}

/* 当屏幕宽度大于900px时应用以下样式 */
@media (min-width: 900px) {
    .container {
        width: 900px;
        margin: 0 auto;
    }
}
```