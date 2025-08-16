# 说说你对盒子模型的理解?
## 是什么
当对一个文档进行布局（layout）的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）
一个盒子由四个部分组成：content、padding、border、margin
content，即实际内容，显示文本和图像
boreder，即边框，围绕元素内容的内边距的一条或多条线，由粗细、样式、颜色三部分组成
padding，即内边距，清除内容周围的区域，内边距是透明的，取值不能为负，受盒子的background属性影响
margin，即外边距，在元素外创建额外的空白，空白通常指不能放其他元素的区域
```js
<style>
  .box {
    width: 200px;
    height: 100px;
    padding: 20px;
  }
</style>
<div class="box">
  盒子模型
</div>
```
当我们在浏览器查看元素时，却发现元素的大小变成了240px
这是因为，在CSS中，盒子模型可以分成：
W3C 标准盒子模型
IE 怪异盒子模型
默认情况下，盒子模型为W3C 标准盒子模型
## 标准盒子模型
标准盒子模型，是浏览器默认的盒子模型

下面看看标准盒子模型的模型图：
从上图可以看到：
盒子总宽度 = width + padding + border + margin;
盒子总高度 = height + padding + border + margin
也就是，width/height 只是内容高度，不包含 padding 和 border值
所以上面问题中，设置width为200px，但由于存在padding，但实际上盒子的宽度有240px

## IE 怪异盒子模型
盒子总宽度 = width + margin;
盒子总高度 = height + margin;
也就是，width/height 包含了 padding和 border值

Box-sizing
CSS 中的 box-sizing 属性定义了引擎应该如何计算一个元素的总宽度和总高度

语法：
```css
box-sizing: content-box|border-box|inherit:
```

content-box 默认值，元素的 width/height 不包含padding，border，与标准盒子模型表现一致
border-box 元素的 width/height 包含 padding，border，与怪异盒子模型表现一致
inherit 指定 box-sizing 属性的值，应该从父元素继承
回到上面的例子里，设置盒子为 border-box 模型
```css
<style>
  .box {
    width: 200px;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
<div class="box">
  盒子模型
</div>
```
这时候，就可以发现盒子的所占据的宽度为200px
# css选择器有哪些？优先级？哪些属性可以继承？
## 选择器
它是元素和其他部分组合起来告诉浏览器哪个HTML元素应当是被选为应用规则中的CSS属性值的方式
选择器所选择的元素，叫做“选择器的对象”
关于css属性选择器常用的有：
id选择器（#box），选择id为box的元素

类选择器（.one），选择类名为one的所有元素

标签选择器（div），选择标签为div的所有元素

后代选择器（#box div），选择id为box元素内部所有的div元素

子选择器（.one>one_1），选择父元素为.one的所有.one_1的元素

相邻同胞选择器（.one+.two），选择紧接在.one之后的所有.two元素

群组选择器（div,p），选择div、p的所有元素
还有一些使用频率相对没那么多的选择器：
伪类选择器
```css
:link ：选择未被访问的链接
:visited：选取已被访问的链接
:active：选择活动链接
:hover ：鼠标指针浮动在上面的元素
:focus ：选择具有焦点的
:first-child：父元素的首个子元素
```
伪元素选择器
```css
:first-letter ：用于选取指定选择器的首字母
:first-line ：选取指定选择器的首行
:before : 选择器在被选元素的内容前面插入内容
:after : 选择器在被选元素的内容后面插入内容
```
属性选择器
```css
[attribute] 选择带有attribute属性的元素
[attribute=value] 选择所有使用attribute=value的元素
[attribute~=value] 选择attribute属性包含value的元素
[attribute|=value]：选择attribute属性以value开头的元素
```
在CSS3中新增的选择器有如下：
层次选择器（p~ul），选择前面有p元素的每个ul元素
伪类选择器
```css
:first-of-type 表示一组同级元素中其类型的第一个元素
:last-of-type 表示一组同级元素中其类型的最后一个元素
:only-of-type 表示没有同类型兄弟元素的元素
:only-child 表示没有任何兄弟的元素
:nth-child(n) 根据元素在一组同级中的位置匹配元素
:nth-last-of-type(n) 匹配给定类型的元素，基于它们在一组兄弟元素中的位置，从末尾开始计数
:last-child 表示一组兄弟元素中的最后一个元素
:root 设置HTML文档
:empty 指定空的元素
:enabled 选择可用元素
:disabled 选择被禁用元素
:checked 选择选中的元素
:not(selector) 选择与 <selector> 不匹配的所有元素
```
属性选择器
```css
[attribute*=value]：选择attribute属性值包含value的所有元素
[attribute^=value]：选择attribute属性开头为value的所有元素
[attribute$=value]：选择attribute属性结尾为value的所有元素
```
## 优先级
内联 > ID选择器 > 类选择器 > 标签选择器解释
内联样式
```css
<div style="color: red;">这是内联样式</div>
```
## 继承属性
在css中，继承是指的是给父元素设置一些属性，后代元素会自动拥有这些属性
关于继承属性，可以分成：

字体系列属性
```css
font:组合字体
font-family:规定元素的字体系列
font-weight:设置字体的粗细
font-size:设置字体的尺寸
font-style:定义字体的风格
font-variant:偏大或偏小的字体
```
文本系列属性
```css
text-indent：文本缩进
text-align：文本水平对刘
line-height：行高
word-spacing：增加或减少单词间的空白
letter-spacing：增加或减少字符间的空白
text-transform：控制文本大小写
direction：规定文本的书写方向
color：文本颜色
```
元素可见性
```css
visibility
```
表格布局属性
```css
caption-side：定位表格标题位置
border-collapse：合并表格边框
border-spacing：设置相邻单元格的边框间的距离
empty-cells：单元格的边框的出现与消失
table-layout：表格的宽度由什么决定
```
列表属性
```css
list-style-type：文字前面的小点点样式
list-style-position：小点点位置
list-style：以上的属性可通过这属性集合
```
引用
```css
quotes：设置嵌套引用的引号类型
```
光标属性
```css
cursor：箭头可以变成需要的形状
```
继承中比较特殊的几点：

a 标签的字体颜色不能被继承

h1-h6标签字体的大下也是不能被继承的

## 无继承的属性
display

文本属性：vertical-align、text-decoration

盒子模型的属性：宽度、高度、内外边距、边框等

背景属性：背景图片、颜色、位置等

定位属性：浮动、清除浮动、定位position等

生成内容属性：content、counter-reset、counter-increment

轮廓样式属性：outline-style、outline-width、outline-color、outline

页面样式属性：size、page-break-before、page-break-after

# 说说em/px/rem/vh/vw区别?
px：绝对单位，页面按精确像素展示

em：相对单位，基准点为父节点字体的大小，如果自身定义了font-size按自身来计算，整个页面内1em不是一个固定的值

rem：相对单位，可理解为root em, 相对根节点html的字体大小来计算

vh、vw：主要用于页面视口大小布局，在页面布局上更加方便简单
# css中，有哪些方式可以隐藏页面元素？区别?
## 实现方式
display:none
visibility:hidden
opacity:0
设置height、width模型属性为0
position:absolute
clip-path
### display:none
设置元素的display为none是最常用的隐藏元素的方法
```css
.hide {
    display:none;
}
```
将元素设置为display:none后，元素在页面上将彻底消失
元素本身占有的空间就会被其他元素占有，也就是说它会导致浏览器的重排和重绘
消失后，自身绑定的事件不会触发，也不会有过渡效果
特点：元素不可见，不占据空间，无法响应点击事件
### visibility:hidden
设置元素的visibility为hidden也是一种常用的隐藏元素的方法

从页面上仅仅是隐藏该元素，DOM结果均会存在，只是当时在一个不可见的状态，不会触发重排，但是会触发重绘
```css
.hidden{
    visibility:hidden
}
```
给人的效果是隐藏了，所以他自身的事件不会触发

特点：元素不可见，占据页面空间，无法响应点击事件

### opacity:0
opacity属性表示元素的透明度，将元素的透明度设置为0后，在我们用户眼中，元素也是隐藏的
```css
.transparent {
    opacity:0;
}
```
特点：改变元素透明度，元素不可见，占据页面空间，可以响应点击事件

### 设置height、width属性为0
将元素的margin，border，padding，height和width等影响元素盒模型的属性设置成0，如果元素内有子元素或内容，还应该设置其overflow:hidden来隐藏其子元素
```css
.hiddenBox {
    margin:0;     
    border:0;
    padding:0;
    height:0;
    width:0;
    overflow:hidden;
}
```
特点：元素不可见，不占据页面空间，无法响应点击事件

### position:absolute
将元素移出可视区域
```css
.hide {
   position: absolute;
   top: -9999px;
   left: -9999px;
}
```
特点：元素不可见，不影响页面布局

### clip-path
通过裁剪的形式
```css
.hide {
  clip-path: polygon(0px 0px,0px 0px,0px 0px,0px 0px);
}
```
元素不可见，占据页面空间，无法响应点击事件
## 区别
。。。。。。
# 元素水平垂直居中的方法有哪些？如果元素不定宽高呢？
## 实现方式
利用定位+margin:auto

利用定位+margin:负值

利用定位+transform

table布局

flex布局

grid布局

### 利用定位+margin:auto
```html
<style>
    .father{
        width:500px;
        height:300px;
        border:1px solid #0a3b98;
        position: relative;
    }
    .son{
        width:100px;
        height:40px;
        background: #f0a238;
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```
### 利用定位+margin:负值
```html
<style>
    .father {
        position: relative;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left:-50px;
        margin-top:-50px;
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```
### 利用定位+transform
```html
<style>
    .father {
        position: relative;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```
translate(-50%, -50%)将会将元素位移自己宽度和高度的-50%

这种方法其实和最上面被否定掉的margin负值用法一样，可以说是margin负值的替代方案，并不需要知道自身元素的宽高

### table布局
### flex弹性布局
```html
<style>
    .father {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```
### grid网格布局
```html
<style>
    .father {
            display: grid;
            align-items:center;
            justify-content: center;
            width: 200px;
            height: 200px;
            background: skyblue;

        }
        .son {
            width: 10px;
            height: 10px;
            border: 1px solid red
        }
</style>
<div class="father">
    <div class="son"></div>
</div>
```
上述方法中，不知道元素宽高大小仍能实现水平垂直居中的方法有：

利用定位+margin:auto
利用定位+transform
flex布局
grid布局
## 总结
水平居中

行内元素可设置：text-align: center
flex布局设置父元素：display: flex; justify-content: center
垂直居中

单行文本父元素确认高度：height === line-height
多行文本父元素确认高度：display: table-cell; vertical-align: middle
#块级元素居中布局
水平居中

定宽: margin: 0 auto
绝对定位+left:50%+margin:负自身一半
垂直居中

position: absolute设置left、top、margin-left、margin-top(定高)
display: table-cell
transform: translate(x, y)
flex(不定高，不定宽)
grid(不定高，不定宽)，兼容性相对比较差
