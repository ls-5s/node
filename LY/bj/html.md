# HTML 学习笔记
## HTML 基础
### HTML 文档结构
HTML是用来创建网页的标记语言。一个完整的HTML文档通常包含以下部分：

```markdown
<!DOCTYPE html>  <!-- 声明文档类型为HTML5 -->
<html lang="zh-CN">  <!-- 根元素，指定语言为中文 -->
<head>  <!-- 头部，包含元数据 -->
    <meta charset="UTF-8">  <!-- 指定字符编码为UTF-8 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  <!-- 设置视口，用于响应式设计 -->
    <title>我的网页</title>  <!-- 网页标题，显示在浏览器标签栏 -->
</head>
<body>  <!-- 主体，包含可见内容 -->
    <!-- 这里是网页内容 -->
</body>
</html>
```
### 标题标签
HTML提供了6级标题标签，从`<h1>`到`<h6>`，用于表示不同级别的标题：

```markdown
<h1>这是一级标题（最大）</h1>
<h2>这是二级标题</h2>
<h3>这是三级标题</h3>
<h4>这是四级标题</h4>
<h5>这是五级标题</h5>
<h6>这是六级标题（最小）</h6>
```

### 图片标签
使用`<img>`标签可以在网页中插入图片：


```markdown
<!-- 基本用法 -->
<img src="图片路径.jpg" alt="图片描述">

<!-- 带标题和尺寸的图片 -->
<img src="图片路径.jpg" alt="图片描述" title="鼠标悬停时显示的文字" width="300" height="200">

<!-- 带边框的图片 -->
<img src="图片路径.jpg" border="1" alt="带边框的图片">
```
<strong>说明</strong>：

- src：图片的路径
- alt：图片无法显示时的替代文字
- title：鼠标悬停在图片上时显示的文字
- width和height：设置图片的宽度和高度
- border：设置图片边框的宽度

### 文本格式化标签
HTML提供了多种文本格式化标签，用于改变文本的显示效果：
```markdown
<strong>加粗文本</strong>
<em>斜体文本</em>
<del>删除线文本</del>
<ins>下划线文本</ins>
```

### 块级元素和行内元素
HTML元素分为块级元素和行内元素两种类型：

**块级元素**：独自占一行，可设置宽高

```markdown
<div>我是块级元素，独占一行</div>
<p>我也块级元素</p>
<h1>我是标题，也是块级元素</h1>
<h2>我是二级标题，也是块级元素</h2>
```
**行内元素**：与其他元素在同一行，不能设置宽高

```markdown
<span>我是行内元素</span>
<a href="https://www.example.com">我是链接，也是行内元素</a>
```

### 路径表示方法
在HTML中，引用文件时需要使用路径，可以是相对路径或绝对路径：

**相对路径**：相对于当前HTML文件的位置

```markdown
<!-- 同一目录下的文件 -->
<img src="图片.jpg">

<!-- 子目录下的文件 -->
<img src="images/图片.jpg">

<!-- 父目录下的文件 -->
<img src="../图片.jpg">
```
**绝对路径**：从根目录开始的完整路径

```markdown
<!-- 本地绝对路径 -->
<img src="D:/images/图片.jpg">

<!-- 网络路径 -->
<img src="https://example.com/images/图片.jpg">
```
### 超链接
<!-- 外部链接 -->
<a href="https://www.baidu.com" target="_blank">百度（在新窗口打开）</a>

<!-- 内部链接 -->
<a href="about.html">关于我们</a>

<!-- 空链接 -->
<a href="#">点击我（无跳转）</a>

<!-- 锚点链接 - 跳转到页面指定位置 -->
<a href="#section1">跳转到第一部分</a>

<!-- 目标位置 -->
<h2 id="section1">第一部分内容</h2>

<!-- 下载链接 -->
<a href="文件.zip">下载文件</a>

<!-- 图片链接 -->
<a href="https://www.baidu.com"><img src="logo.jpg" alt="百度logo"></a>

<strong>说明</strong>：

- href：链接的目标地址
- target：指定链接在哪里打开，_blank表示在新窗口打开
- 锚点链接使用#id的形式，链接到页面中对应id的元素

### 列表
无序列表：列表项前面有项目符号
```markdown
<ul>
    <li>苹果</li>
    <li>香蕉</li>
    <li>橙子</li>
</ul>
```
有序列表：列表项前面有编号
```markdown
<ol>
    <li>第一项</li>
    <li>第二项</li>
    <li>第三项</li>
</ol>
```
定义列表：列表项前面有定义标题
```markdown
<dl>
    <dt>HTML</dt>
    <dd>超文本标记语言</dd>
    <dt>CSS</dt>
    <dd>层叠样式表</dd>
</dl>
```
### 表单
使用表单可以收集用户输入的数据：


```markdown
<form action="处理表单的URL" method="post">
    <!-- 文本输入框 -->
    用户名：<input type="text" name="username" placeholder="请输入用户名" maxlength="20"><br>
    
    <!-- 密码输入框 -->
    密码：<input type="password" name="password"><br>
    
    <!-- 单选按钮 -->
    性别：
    <input type="radio" name="gender" value="male" checked>男
    <input type="radio" name="gender" value="female">女<br>
    
    <!-- 复选框 -->
    爱好：
    <input type="checkbox" name="hobby" value="reading">阅读
    <input type="checkbox" name="hobby" value="sports">运动
    <input type="checkbox" name="hobby" value="music">音乐<br>
    
    <!-- 下拉列表 -->
    学历：
    <select name="education">
        <option value="highschool">高中</option>
        <option value="college" selected>大专</option>
        <option value="bachelor">本科</option>
    </select><br>
    
    <!-- 多行文本框 -->
    自我介绍：<br>
    <textarea name="introduction" rows="4" cols="30"></textarea><br>
    
    <!-- 按钮 -->
    <input type="submit" value="提交">
    <input type="reset" value="重置">
    <input type="button" value="普通按钮">
</form>
```
说明：
- form：定义表单
- action：表单提交的目标URL
- method：表单提交方式，get或post
- input：输入控件，type属性决定其类型
- select：下拉列表
- textarea：多行文本框
## HTML5 新增特性


### 语义化标签
HTML5新增了一些语义化标签，使代码更具可读性：


```markdown
<header>头部</header>
<nav>导航栏</nav>
<main>主要内容</main>
<section>章节</section>
<article>文章</article>
<aside>侧边栏</aside>
<footer>页脚</footer>
```
### 新增表单属性
HTML5为表单元素新增了一些实用属性：


```markdown
<!-- 必填项 -->
<input type="text" required>

<!-- 占位符文本 -->
<input type="text" placeholder="请输入...">

<!-- 自动获得焦点 -->
<input type="text" autofocus>

<!-- 自动完成 -->
<input type="text" autocomplete="on">

<!-- 允许上传多个文件 -->
<input type="file" multiple>
```
### 视频和音频
HTML5提供了内置的视频和音频标签：


```markdown
<!-- 视频 -->
<video src="video.mp4" controls width="500"></video>

<!-- 带属性的视频 -->
<video 
    src="video.mp4" 
    controls 
    autoplay 
    muted 
    loop 
    poster="poster.jpg"
    width="500">
    您的浏览器不支持视频播放。
</video>

<!-- 音频 -->
<audio src="audio.mp3" controls></audio>
```
视频属性说明：
- `controls`：显示播放控件
- `autoplay`：自动播放
- `muted`：静音播放
- `loop`：循环播放
- `poster`：视频加载前显示的图片

## 常用技巧

### 单行文本溢出显示省略号

```markdown
.text-ellipsis {
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 隐藏溢出部分 */
    text-overflow: ellipsis; /* 显示省略号 */
}
```
### 多行文本溢出显示省略号
```markdown
.text-ellipsis-multiline {
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 显示3行 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
```
### 清除默认样式

```markdown
/* 清除所有元素的内外边距 */
* {
    margin: 0;
    padding: 0;
}

/* 清除列表的默认样式 */
ul, ol {
    list-style: none;
}

/* 清除链接的默认样式 */
a {
    text-decoration: none;
    color: #333;
}

/* 清除按钮和输入框的默认样式 */
button, input {
    outline: none;
    border: none;
}
```
### 三角形绘制
```markdown
.triangle {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
}
```
