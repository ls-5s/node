# node.js 基础
## fs 用于文件读写操作
### readFile
```js
// 导入Node.js内置的文件系统模块(fs)，用于进行文件操作
const fs = require('fs');

// 使用fs模块的readFile方法异步读取文件
// 第一个参数：要读取的文件路径('./node.md'表示当前目录下的node.md文件)
// 第二个参数：指定文件编码为utf8，这样读取到的内容会直接是字符串形式
// 第三个参数：回调函数，文件读取操作完成后会调用该函数

fs.readFile('./node.md', 'utf8', (err, data) => {
    // 打印错误信息，如果没有错误则输出null
    console.log(err);
    // 打印分隔线，用于区分错误信息和文件内容
    console.log('--------');
    // 打印读取到的文件内容，如果读取失败则输出undefined
    console.log(data);
});
```
### writeFile
<strong> 注意：
</strong>
① fs.writeFile() 方法只能用来创建文件，不能用来创建路径

② 重复调用 fs.writeFile() 写入同一个文件，新写入的内容会覆盖之前的旧内容
```js
// 导入Node.js内置的文件系统模块(fs)，该模块提供了文件操作相关的API
const fs = require('fs');

// 使用fs模块的writeFile方法异步写入文件
// 第一个参数：目标文件路径('./1.txt'表示当前目录下的1.txt文件)
//   - 如果文件不存在，会自动创建该文件
//   - 如果文件已存在，会覆盖原文件内容
// 第二个参数：要写入的内容('hello world'字符串)
// 第三个参数：指定编码格式为utf8(文本文件常用编码，确保内容正确解析)
// 第四个参数：回调函数，写入操作完成后触发
//   参数err：如果写入过程出错，err会包含错误信息；如果成功，err为null
fs.writeFile('./1.txt', 'hello world', 'utf8', (err) => {
    // 打印错误信息：成功时输出null，失败时输出具体错误对象
    console.log(err);
    // 打印分隔线，用于区分不同输出内容
    console.log('--------');
    // 注意：这里存在问题！writeFile的回调函数没有data参数，此处会打印undefined
    // 因为writeFile的核心是写入操作，不需要返回文件内容，所以回调仅包含err
    console.log(data);
});
```
### 判断文件是否读取/写入成功
```js
const fs = require('fs')
fs.writeFile('./1.txt','hello world','utf8',(err)=> {
    //   err：如果写入过程中发生错误，err会包含错误信息；如果成功，err为null
//   data：如果写入成功，data会包含文件的内容；如果失败，data为undefined
// 直接判断err是否为null，即可
    if(err) {
        console.log("写入失败"+err)
    }else {
        console.log("写入成功")
    }
})
```
### 案例
```js
 练习 - 考试成绩整理

使用 fs 文件系统模块，将素材目录下成绩.txt 文件中的考试数据，整理到成绩 - ok.txt 文件中。

整理前，成绩.txt 文件中的数据格式如下：

1 小红 = 99 小白 = 100 小黄 = 70 小黑 = 66 小绿 = 88

整理完成之后，希望得到的成绩 - ok.txt 文件中的数据格式如下：

1 小红：99
2 小白：100
3 小黄：70
4 小黑：66
5 小绿：88

```
```js
const fs = require('fs')
fs.readFile('./1.txt','utf8',(err,data)=> {
    if(err) {
        console.log("读取失败"+err)
    }else {
        console.log("读取成功"+data)
        const arrOld = data.split(' ')
        // console.log(arrOld)
        const arrNew = []
        arrOld.forEach(item => {
            arrNew.push(item.replace('=', ': '))
        })
       const dataNew = arrNew.join('\n')
       fs.writeFile('./ok.txt',dataNew,'utf8',(err)=> {
        if(err) {
            console.log("写入失败"+err)
        }else {
            console.log("写入成功")
        }
       })
        // console.log(arrNew)
    }
})
```
## path
### __dirname
```js
// __dirname 是 Node.js 中的一个全局变量
// 它表示当前执行的 JavaScript 模块（文件）所在的目录的绝对路径
// 无论从哪个位置运行该脚本，__dirname 始终指向当前模块所在的目录

// 示例：假设当前文件（script.js）位于 /home/user/projects 目录下
console.log(__dirname); 
// 输出：/home/user/projects（绝对路径）

```
### path.join()
```js
// path.join() 方法用于将多个路径片段连接成一个完整的路径字符串
// 它会根据操作系统的路径分隔符（如 Unix 系统中的 '/' 或 Windows 系统中的 '\'）
// 自动处理路径分隔符，确保路径格式的正确性
// 示例：
const path = require('path');
const dir = '/home/user';
const file = 'script.js';
const fullPath = path.join(dir, file);
// 在Windows系统中会输出: /home/user\script.js（自动转换为反斜杠）
console.log(fullPath);

```
### path.basename()
```js
// path.basename() 方法用于获取路径中的文件名（包含文件扩展名）
// 示例：
const path = require('path');
const fullPath = '/home/user/script.js';
const fileName = path.basename(fullPath);
// 输出: script.js
console.log(fileName);
-----------------------------
const fileName = path.basename(fullPath,'.js');
// 输出: script
console.log(fileName);
```
### path.extname()
```js
// path.extname() 方法用于获取路径中的文件扩展名
// 示例：
const path = require('path');
const fullPath = '/home/user/script.js';
const fileExtension = path.extname(fullPath);
// 输出: .js
console.log(fileExtension);
```
### 案例
```js
将素材目录下的 index.html 页面，拆分成三个文件，分别是：

index.css
index.js
index.html

并且将拆分出来的 3 个文件，存放到 clock 目录中。
```
```js
步骤
① 创建两个正则表达式，分别用来匹配 <style> 和 <script> 标签
② 使用 fs 模块，读取需要被处理的 HTML 文件
③ 自定义 resolveCSS 方法，来写入 index.css 样式文件
④ 自定义 resolveJS 方法，来写入 index.js 脚本文件
⑤ 自定义 resolveHTML 方法，来写入 index.html 文件
```
```js
const path = require('path')
const fs = require('fs')
// 定义一个正则表达式，用于匹配HTML中的<style>标签及其内容
// <style>：匹配开始的<style>标签
// [\s\S]*：匹配<style>和</style>之间的所有内容，包括换行符
//   \s 匹配空白字符（空格、制表符、换行符等）
//   \S 匹配非空白字符
//   * 表示匹配前面的元素零次或多次
// <\/style>：匹配结束的</style>标签（注意/需要转义为\/）
const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;

// 定义处理JavaScript脚本的函数，参数为原始HTML内容
const reSelveJs = (html) => {
    // 使用之前定义的regScript正则表达式从HTML中匹配<script>标签及内容
    // exec()方法返回匹配结果数组，r1[0]是完整的匹配内容（包括<script>标签）
    const r1 = regScript.exec(html);
    
    // 处理匹配到的内容：移除开头的<script>标签和结尾的</script>标签
    // 得到纯JavaScript代码内容
    const newJs = r1[0].replace('<script>', '').replace('</script>', '');
    
    // 将处理后的JavaScript代码写入到clock目录下的index.js文件
    // 使用path.join构建路径，确保跨平台兼容性
    fs.writeFile(path.join(__dirname, './clock/index.js'), newJs, 'utf8', (err) => {
        // 写入操作的回调函数，处理可能的错误
        if (err) {
            // 如果写入失败，打印错误信息（注意：这里注释写的是CSS，实际是JS的错误）
            console.log("写入失败CSS" + err);
        } else {
            // 如果写入成功，打印成功提示
            console.log("写入成功JS");
        }
    });
};


const reSelveCss = (html) => {
    const r1 = regStyle.exec(html)
    const newCss = r1[0].replace('<style>','').replace('</style>','')
    // console.log(r1)
    fs.writeFile(path.join(__dirname,'./clock/index.css'),newCss,'utf8',(err)=> {
        if(err) {
            console.log("写入失败CSS"+err)
        }else {
            console.log("写入成功CSS")
        }
    })

}
}
const reSelveHtml = (html) => {
    const r1 = html.replace(regStyle,' <link rel = "stylesheet" href = "./index.css"/>')
    const r2 = r1.replace(regScript,'<script src = "./index.js"></script>')
    fs.writeFile(path.join(__dirname,'./clock/index.html'),r2,'utf8',(err)=> {
        if(err) {
            console.log("写入失败HTML"+err)
        }else {
            console.log("写入成功HTML")
        }
    })
}

fs.readFile(path.join(__dirname,'./test.html'),'utf8',(err,data)=> {
    if(err) {
        console.log("读取失败"+err)
    }else {
        // console.log("读取成功"+data)
        reSelveCss(data)
        reSelveJs(data)
        reSelveHtml(data)
    }
})
```
## http
### 创建最基本的web 服务器
```js
// 导入Node.js内置的http模块，用于创建HTTP服务器
const http = require('http');

// 创建HTTP服务器实例
const server = http.createServer();

// 为服务器注册request事件监听器，当有客户端请求时触发回调函数
// req: 请求对象，包含客户端请求的信息（如URL、方法等）
// res: 响应对象，用于向客户端发送响应
server.on('request', (req, res) => {
    // 获取客户端请求的URL路径（如：/、/index.html、/about.html等）
    const url = req.url;
    // 获取客户端请求的HTTP方法（如：GET、POST等）
    const method = req.method;

    // 设置默认响应内容，当请求的路径不存在时返回404
    let content = '<h1>404 Not found!</h1>';

    // 判断请求路径，返回对应的页面内容
    if (url === '/' || url === '/index.html') {
        // 当请求根路径（/）或/index.html时，返回首页内容
        content = '<h1>首页</h1>';
    } else if (url === '/about.html') {
        // 当请求/about.html时，返回关于页面内容
        content = '<h1>关于页面</h1>';
    }

    // 设置响应头Content-Type，告知客户端：
    // 1. 响应内容是HTML格式（text/html）
    // 2. 内容编码为UTF-8，确保中文正常显示
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // 向客户端发送响应内容并结束响应
    res.end(content);
});

// 让服务器监听8050端口，启动服务器
// 回调函数在服务器成功启动后执行
server.listen(8050, () => {
    console.log('HTTP Server running at http://127.0.0.1:8050');
});

```
### 案例:实现 clock 时钟的 web 服务器
```js
[实现 clock 时钟的 web 服务器](https://www.bilibili.com/video/BV1a34y167AZ?spm_id_from=333.788.videopod.episodes&vd_source=f32bb7c44a88910892ec0ef08c814d42&p=18)
```
```js
const fs = require('fs')
const path = require('path')
const http = require('http')
const server = http.createServer()
server.on('request',(req,res)=> {
    const url = req.url
    // const fpath = path.join(__dirname,'./clock',url)
    let fpath = ""
     if (url === '/') {
        // 如果请求的路径是 / ，则手动指定文件的存放路径为 ./clock/index.html
        // fpath = path.join(__dirname, './test.html')
         fpath = path.join(__dirname, './clock/index.html')
     } 
    else {
        // 如果请求的路径不为 / ，则动态拼接文件的存放路径，组合成 ./clock + url 的形式
        fpath = path.join(__dirname, './clock', url)
    }
    fs.readFile(fpath,'utf8',(err,data)=> {
        if(err) {
            console.log("读取失败"+err)
        }else {
            // console.log("读取成功")
            // res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(data)
        }
    })
})
server.listen(8050,()=> {
    console.log('HTTP Server running at http://127.0.0.1:8050')
})

```
### server
```js
const http  = require('http')
const fs = require('fs')
const path = require('path')
const server = http.createServer()
const PORT = 3000;
const HOST = 'localhost';
const dataPath = path.join(__dirname,'./data.json')
const dataHtmlPath = path.join(__dirname, './data.json')
const readDataJson = async() => {
    const data =await readFile(dataPath,'utf-8')
    return JSON.parse(data)
}
const writeDataJosn = async (data) => {
  await writeFile(dataPath,JSON.stringify(data))
}
const readHtml = async () => {
    const data = await readFile(dataHtmlPath,'utf-8')
    return data
}
// 定义 parseBody 函数，接收 req（请求对象）作为参数
const parseBody = (req) => {
    // 返回一个 Promise 对象，用于处理异步解析过程
    return new Promise((resolve, reject) => {
        // 用于存储拼接后的请求体数据
        let body = '';

        // 监听 'data' 事件：当请求体数据片段传输过来时触发
        // chunk 是二进制数据片段，转换为字符串后拼接到 body 中
        req.on('data', (chunk) => (body += chunk));

        // 监听 'end' 事件：当所有请求体数据传输完成后触发
        req.on('end', () => {
            try {
                // 如果 body 不为空，则解析为 JSON 对象；否则返回空对象
                resolve(body ? JSON.parse(body) : {});
            } catch (err) {
                // 如果 JSON 解析失败（格式错误），则 reject 错误
                reject(new Error('Invalid JSON'));
            }
        });

        // 监听 'error' 事件：如果请求过程中发生错误（如网络问题），则 reject 错误
        req.on('error', reject);
    });
};
server.on('request',async (req,res)=> {
    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理 OPTIONS 请求
    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const parseUrl = url.parse(req.url,true)
    const {pathname,query} = parseUrl
    const method = req.method
    if(method === 'GET'&& pathname === "/app"){
       try {
        res.writeHead(200)
        const data = await readDataJson()
        res.end(JSON.stringify(data))
       }catch(err){
        res.end(JSON.stringify({
            code:1,
            msg:'读取失败'
        }))
       }
    }
    else if (method === 'POST' && pathname === '/app') {
      try {
        const body = await parseBody(req);
        console.log(body);
        res.end(JSON.stringify({
            code:0,
            msg:'提交成功'
        }))
      }catch (err) {
        res.end(JSON.stringify({
            code:1,
            msg:'提交失败'
        }))
      }
    }
    else {
        // 引入html
        // const html = await readFileHtml(clientPtah);
        // res.setHeader('content-type', 'text/html');
        // res.end(html);
        try {
            const html = await readFileHtml(clientPath);
            res.setHeader('content-type', 'text/html');
            res.end(html);
        } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: 'Failed to load HTML' }));
        }
    }
})

server.listen(PORT, HOST, () => {
    console.log(`服务器已启动，地址：http://${HOST}:${PORT}`);
});

```
## nvm 版本管理

```js

Node.js 21.2.0
Node.js 20.10.0
Node.js 19.9.0
Node.js 18.20.8

```
<strong> 注:使用前3个指令即可 </strong>
```js
nvm ls                   // 查看目前已经安装的版本
nvm install 10.5.0       // 安装指定的版本的 nodejs
nvm use 10.5.0           // 使用指定版本的 nodejs
nvm list available       // 显示可下载版本的部分列表
nvm uninstall 10.5.0     // 删除已安装的指定版本，语法与 install 类似
nvm alias                // 给不同的版本号添加别名
nvm unalias              // 删除已定义的别名
nvm reinstall-packages <version>  // 在当前版本 node 环境下，重新全局安装指定版本号的 npm 包
nvm current              // 显示当前的版本
```

## 模块化 module.exports
```js
// 导出模块
module.exports = {
    name: 'test2',
    age: 18,
    sum: (a,v) => {
        return a+v
    }
}
// 导入模块
const test2 = require('./test2')
console.log(test2.sum(1,7))
```
# express
## 安装
```js
npm i express
```

## 创建服务器
```js
const express = require('express')
const app = express()
// 监听 3000 端口
app.get('/', (req, res) => {
    res.send('Hello World!')// 响应体
});
app.get('/user/:id',(req,res)=>{
    // req.params 获取路径参数
    const userId = req.params.id;
    res.send(`用户 ID: ${userId}`);

})
app.get('/', (req, res) => {
  // req.query 默认是空对象，存储查询参数键值对
  // 若客户端请求带 ?name=zs&age=20，可直接用 req.query 访问
  console.log(req.query)       // 输出 { name: 'zs', age: '20' } 
  console.log(req.query.name)  // 输出 'zs'
  console.log(req.query.age)   // 输出 '20'
})
app.listen(3000, () => {
    console.log('服务器已启动，地址：http://localhost:3000');
});
```
## 静态文件
```js
以下是提取的关键内容：

### 1. 核心函数及功能
express 提供 `express.static()` 函数，可方便创建静态资源服务器，用于对外开放指定目录（如 `public` 目录 ）下的图片、CSS 文件、JavaScript 文件等静态资源访问。 

### 2. 代码示例

app.use(express.static('public'))

通过上述代码，将 `public` 目录设为可对外访问的静态资源目录 。

### 3. 访问示例
设置后，可通过类似以下 URL 访问对应静态文件：
- `http://localhost:3000/images/bg.jpg` 
- `http://localhost:3000/css/style.css` 
- `http://localhost:3000/js/login.js` 

### 4. 注意要点
Express 在指定静态目录查找文件并提供访问路径，存放静态文件的目录名不会出现在 URL 中 。

### 标题
2. 托管多个静态资源目录

### 内容
- **功能说明**：若要托管多个静态资源目录，需多次调用 `express.static()` 函数。
- **代码示例**：

app.use(express.static('public'))
app.use(express.static('files'))
- **查找规则**：访问静态资源文件时，`express.static()` 函数会依据目录的添加顺序查找所需文件 。 
```
## 安装nodemon
```js
npm install -g nodemon
调用
nodemon app.js
```
## 路由的封装
```js
const express = require('express')
const router = express.Router()
// 定义路由处理函数
router.get('/', (req, res) => {
    res.send('首页')
});
router.get('/about', (req, res) => {
    res.send('关于页面')
});
// 导出路由对象
module.exports = router;
在主文件上引入
const router = require('./test3')
// app.use(router)
// 使用 Express 应用程序实例（app）的 use 方法来注册路由中间件
// 第一个参数 '/user' 是路由的挂载路径，表示所有以 '/user' 开头的请求都会由这个路由处理
// 第二个参数 router 是一个 Express 路由器实例，包含了针对 '/user' 路径的各种请求处理逻辑
// 当客户端访问类似 '/user'、'/user/profile'、'/user/login' 等路径时，会由 router 中定义的路由规则来处理
app.use('/user', router);

```
## 中间件
### 全局注册
```js
const express = require('express')
const app = express()
const m = (req, res, next) => {
    console.log('这是路由中间件');
    next()
}
app.use(m)
```
### 局部注册
```js
const express = require('express')
const app = express()
const mw1 = (req, res, next) => {
    console.log('这是路由中间件');
    next()
}
const mw2 = (req, res, next) => {
    console.log('这是路由中间件2');
    next()
}
// 写法 1：中间件依次罗列在路由回调前
app.get('/', mw1, mw2, (req, res) => { 
  res.send('Home page.') 
})

// 写法 2：用数组包裹中间件，数组内依次是中间件
app.get('/', [mw1, mw2], (req, res) => { 
  res.send('Home page.') 
})
```




# JWT
## JWT  认证机制

JWT（JSON Web Token）认证机制工作原理可总结为 **“生成 - 存储 - 携带 - 验证 - 响应”** 五步，核心是用 Token 传递信任，实现无状态身份验证：  

 1. 客户端登录，触发 Token 生成
用户在浏览器提交账号密码 → 服务端校验（账号密码是否正确）→ 校验通过后，** 把用户信息加密生成 JWT Token **（包含用户标识、过期时间等，用密钥签名防篡改）→ 把 Token 返回给客户端  

 2. 客户端存储 Token
客户端（浏览器）收到 Token 后，存到`LocalStorage` / `SessionStorage` 里，后续请求带着它  

3. 客户端携带 Token 发请求
下次请求时，客户端在 ** 请求头的`Authorization` 字段 ** 里带上 Token → 服务端通过这个 Token 识别用户  

 4. 服务端验证 Token
服务端收到请求后，** 用密钥验证 Token 签名 **，并解析出用户信息 → 确认 Token 没过期、没被篡改后，还原出用户身份  
 5. 服务端响应请求
验证通过后，服务端根据用户身份返回对应内容（如页面数据、接口权限）→ 完成一次“无状态”的身份验证流程


    ** 核心特点 **：
- ✅ ** 无状态 **：服务端不用存会话，靠 Token 自包含信息验证身份，适合分布式、跨服务场景
    - ✅ ** 轻量化 **：Token 是加密字符串，传输 / 存储成本低
        - ✅ ** 跨域友好 **：客户端统一在请求头带 Token，解决传统 Cookie 跨域限制

简单说，JWT 就是 **“用加密 Token 代替会话存储，让服务端‘认 Token 不认人’”**，实现高效、灵活的身份验证～

## 组成部分
JWT（JSON Web Token）由 **三部分** 组成，通过 `.` 连接，格式为 `Header.Payload.Signature`，各部分分工明确：  

 1. Header（头部）  
- **作用**：声明 Token 的类型（固定为 JWT）和使用的加密算法（如 HMAC、RSA 等）  
- **内容**：是 JSON 格式，示例（加密前）：  
  ```json
  {
    "alg": "HS256", // 加密算法
    "typ": "JWT"    // Token 类型
  }
  ```  
- **处理**：会被 Base64Url 编码，成为 JWT 的第一部分  


 2. Payload（有效荷载）  
- **作用**：存放 **用户核心信息**（如用户 ID、用户名、过期时间等），也叫“声明”（claims）  
- **内容**：JSON 格式，分三种声明（注册声明、公共声明、私有声明），示例：  
  ```json
  {
    "sub": "123456",  // 用户唯一标识（注册声明）
    "name": "John",   // 自定义信息（私有声明）
    "exp": 1735689600 // 过期时间（时间戳）
  }
  ```  
- **注意**：默认未加密，**不能存敏感数据（如密码）**；会被 Base64Url 编码，成为 JWT 第二部分  


 3. Signature（签名）  
- **作用**：**保证 Token 不被篡改**，是 JWT 安全性的核心  
- **生成方式**：用 Header 里指定的算法，结合 **服务端密钥（secret）**，对 `Header.Base64Url + "." + Payload.Base64Url` 进行加密，公式：  
  ```
  Signature = HMACSHA256(
    base64UrlEncode(Header) + "." + base64UrlEncode(Payload),
    secretKey // 服务端私钥，绝不能泄露
  )
  ```  
- **处理**：加密后的结果作为 JWT 第三部分  


 整体逻辑  
1. 三部分通过 `.` 拼接，形成完整 JWT（如 `Header编码.Payload编码.Signature`）  
2. 服务端用 **相同算法 + 密钥** 验证 Signature，确保 Token 未被篡改  
3. 解码 Header 和 Payload 就能获取算法、用户信息，但因为是 Base64Url 编码（不是加密），**不能存敏感数据**  


简单说：JWT 是 **“编码头信息 + 编码用户数据 + 加密签名”** 的组合，用签名防篡改，实现安全、轻量化的身份传递～

## 使用方式
JWT使用方式可总结为 **“存储-携带-验证”** 三步，核心是让客户端安全传递Token，实现身份认证：  

1. 客户端存储 JWT  
服务端返回 JWT 后，客户端把它存到 **`localStorage` 或 `sessionStorage`**（前端常用方式，也可存在Cookie，但需注意跨域和安全配置）  

 2. 客户端携带 JWT 发请求  
每次和服务端通信时，**在 HTTP 请求头的 `Authorization` 字段里带 JWT**，格式固定为：  
```
Authorization: Bearer <token> 
```  
（`<token>` 替换成实际的 JWT 字符串）  

3. 服务端验证 JWT  
服务端收到请求后，从 `Authorization` 头里提取 JWT → 用密钥验证签名、解析用户信息 → 确认身份后返回对应内容  

**关键点**：  
- ✅ **标准化传递**：用 `Authorization: Bearer` 格式，是行业通用规范，服务端好解析  
- ✅ **存储选择**：`localStorage` 持久化、`sessionStorage` 会话级，按需选（注意 XSS 攻击风险）  
- ✅ **无状态认证**：服务端不用存会话，靠 JWT 自包含信息验证，适合分布式系统  

简单说，JWT 使用就是 **“存起来 → 每次请求头带 `Bearer token` → 服务端验 token 认身份”**，实现无状态的身份认证流程～
## 在express中使用jwt
安装
```js
npm install jsonwebtoken express-jwt
jsonwebtoken 用于生成和验证 JWT
express-jwt 用于在 Express 应用中验证 JWT
```
引入
```js
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
```
定义密钥
```js
const secretKey = "YOUR_SECRET_KEY"
// 定义一个密钥（secret key），用于签名和验证 JWT
```
生成 Token
```js
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const express = require('express')
const app = express()
const secretKey = "YOUR_SECRET_KEY"

app.get('/login', (req, res) => {
  //jwt.sign() 方法用于生成 JWT

    const token = jwt.sign(
        {
            username: 'admin',
            id: '123456'

        },
        secretKey,
        {
            expiresIn: '1h' // 设置 token 过期时间为 1 小时
        }
      
    )
    res.status(201).json({
        code: 201,
        message: '登录成功',
        token: token

    });

})

app.listen(8080, () => {
    console.log('服务器启动成功:http://localhost:8080')

})
```

## 密码加密方式(bcrypt)
安装
```js
npm install bcrypt
```
引入
```js
const bcrypt = require('bcrypt');
```
使用
```js
// 定义盐的计算强度（盐轮数）
// 数值范围通常是4-16，数值越大，哈希计算越耗时，但密码安全性越高
// 10是平衡安全性和性能的常用值
const saltRounds = 10;

// 定义异步函数，用于将明文密码转换为哈希密码
// 参数password：用户输入的明文密码（如注册时输入的密码）
const hashPassword = async (password) => {
    // 使用bcrypt的hash方法对密码进行哈希处理
    // 第一个参数：需要加密的明文密码
    // 第二个参数：盐轮数（决定了哈希计算的复杂度）
    // await等待异步操作完成，hash方法会自动生成随机盐并应用哈希算法
    const hash = await bcrypt.hash(password, saltRounds);
    
    // 返回生成的哈希密码（包含自动生成的盐，格式通常为 $2b$10$...）
    // 该哈希可以直接存储到数据库中，无需单独存储盐
    return hash;
}

```
验证
```js
// 定义异步函数，用于验证明文密码与哈希密码是否匹配
// 参数password：用户输入的明文密码（如登录时输入的密码）
// 参数hash：数据库中存储的哈希密码（包含盐）
const comparePassword = async (password, hash) => {
    // 使用bcrypt的compare方法对比明文密码和哈希密码
    // 第一个参数：用户输入的明文密码
    // 第二个参数：数据库中存储的哈希密码（包含盐）
    // await等待异步操作完成，compare方法会自动提取盐并进行密码验证
    const result = await bcrypt.compare(password, hash);
    
    // 返回验证结果（true或false）
    // 如果密码匹配，result为true；如果不匹配，result为false
    return result;
}
```
完整的过程
```js
const bcrypt = require('bcryptjs');
const config = require('../config/jwt.config');
const jwt = require('jsonwebtoken');
const userStage = require("../stage/user.stage");
const { v4: uuidv4 } = require('uuid');
const { Post } = require("../entity/Post.js"); 
const { AppDataSource } = require("../data.source.js");

// 注册用户 接收信息 → 加密密码 → 检查用户名唯一性 → 保存数据 → 生成令牌
async function registerUser(userData) {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 8);
        const user = {
            ...userData,
            id: uuidv4(),
            password: hashedPassword,
            createdAt: new Date().toISOString(),
        }
        // const users = await userStage.readFileJSON(userStage.userFilePath);
        // // 检测用户名是否已存在
        // let isExist = users.find(user => user.username === userData.username);
        // if (!isExist)
        //     users.push(user);
        // // console.log(users)
        // await userStage.writeFileJSON(userStage.userFilePath, users);


        const postRepository = AppDataSource.getRepository(Post);
        const postExist = await postRepository.findOne({
            where: { username: userData.username }
        })
        // console.log("查询用户结果:", userExist ? "已存在" : "不存在");
        if (!postExist) {
            // 5. 构建用户实体
            const post = postRepository.create({
                username: user.username,
                password: user.password,
                createdAt: user.createdAt,


            }); 
            console.log("保存用户成功:", post);
            // 6. 保存用户日志
            const result = await postRepository.save(post);
            console.log("保存用户成功:", result);
            //  res.status(201).json({ message: "注册成功" });
        }
        const token = jwt.sign(
            { username: user.username, id: user.id }, config.secretKey, {
            expiresIn: config.expiresIn,
        });

        return {
            token,
            user,
            postExist
        };
    } catch (err) {
        throw new Error(err.message);
    }
}
// 登录验证 读取数据 → 查找用户 → 验证密码 → 生成令牌 → 返回结果
async function validateUser(username, password) {
    try {
        const postRepository = AppDataSource.getRepository(Post);
        const user = await postRepository.findOne({
            where: { username: username }
        })
        // console.log("查询用户结果:", userExist ? "已存在" : "不存在");

        // const users = await userStage.readFileJSON(userStage.userFilePath);
        // //   console.log(users)
        // const user = users.find(user => user.username === username) || null;
        // //  console.log(user,'1111')
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { username: user.username, id: user.id }, config.secretKey, {
                expiresIn: config.expiresIn,
            });
            return {
                token,
                user: user,
            };
        }
        // return null;
    } catch (err) {
        throw new Error(err.message);
    }
}
module.exports = {
    registerUser,
    validateUser,
}
```
## .env 环境变量
### 安装
```
npm install dotenv 
```
### 配置(.env)


```
# 服务器配置
PORT=3000
NODE_ENV=development

# 数据库配置
DB_HOST=localhost
DB_USER=root
DB_PASS=secretpassword
DB_NAME=myappdb

# API 密钥（敏感信息）
API_KEY=abc123def456
```
### .gitignore
```
# 忽略 node_modules 依赖目录
node_modules/

# 忽略环境变量文件（关键！）
.env

# 忽略日志和临时文件
logs/
*.log
```
### 使用
```js
require('dotenv').config(); 
const port = process.env.PORT;
```
# axios
## get 请求(格式)
```js
// 注意需要在 async 函数中使用 await
async function fetchUsers() {
  try {
    // 使用 await 等待请求完成
    const res = await axios.get('/users', {
      params: { page: 1, limit: 10, status: 'active' }
    });
    // 成功时执行（相当于 .then() 里的逻辑）
    console.log(res.data);
  } catch (err) {
    // 失败时执行（相当于 .catch() 里的逻辑）
    console.log(err);
  }
}

// 调用函数
fetchUsers();
```
## post 请求(格式)
```js
// 定义函数
async function fetchUsers() {
  try {
    const data = { name: 'John', age: 30 };
    const res = await axios.post('/users', data);
    <!-- (data)就是要传的对象 -->
    console.log('请求成功:', res.data);
  } catch (err) {
    console.log('请求失败:', err);
  }
}

// 直接调用函数（会立即执行）
fetchUsers();
```
## delete 请求(格式)
```js
// 定义函数
export const artDelService = (id) => {
  // 用模板字符串将 id 拼接到 URL 路径中
  return request.delete(`/my/article/info/${id}`);
};

const express = require('express');
const app = express();
app.use(express.json()); // 解析 JSON 请求体

// 处理 DELETE 请求：路径参数 + 请求体
app.delete('/api/todos/:id', (req, res) => {
  try {
    // 1. 获取 URL 路径中的 id（来自 /api/todos/123 中的 123）
    const pathId = req.params.id;
    
    // 2. 获取请求体中的 id（来自前端 data: { id: 123 }）
    const bodyId = req.body.id;
    
    // 3. 可选：校验两个 id 是否一致（防止错误）
    if (pathId !== String(bodyId)) { // 注意类型转换（路径参数是字符串）
      return res.status(400).json({
        error: '路径 ID 与请求体 ID 不一致'
      });
    }
    
    // 4. 执行删除逻辑（示例：操作数据库）
    console.log(`删除 ID 为 ${pathId} 的任务`);
    // 假设 db 是数据库连接，执行删除操作...
    
    // 5. 返回成功响应
    res.json({ message: '任务删除成功' });
  } catch (err) {
    res.status(500).json({ error: '服务器错误' });
  }
});

app.listen(3000, () => {
  console.log('服务器运行在 3000 端口');
});
```
## put 请求(格式)
```js
// 定义函数
// 前端更新任务的函数
async updateTask(id, updatedData) {
  try {
    // 发送 PUT 请求：URL 包含 ID，请求体包含更新的数据
    const res = await axios.put(`/api/todos/${id}`, updatedData);
    
    console.log('更新成功:', res.data.message);
    alert(res.data.message);
    this.GetAllTasks(); // 刷新列表
  } catch (error) {
    console.error('更新失败:', error.response?.data?.error || error.message);
    alert(error.response?.data?.error || '更新失败，请重试');
  }
}

// 调用示例：更新 ID 为 123 的任务
this.updateTask(123, {
  title: '新标题',
  completed: true // 其他需要更新的字段
});

// 直接调用函数（会立即执行）
fetchUsers();

const express = require('express');
const app = express();
app.use(express.json()); // 解析 JSON 请求体

// 处理 PUT 请求：更新指定 ID 的资源
app.put('/api/todos/:id', (req, res) => {
  try {
    // 1. 获取 URL 中的资源 ID
    const taskId = req.params.id;
    
    // 2. 获取请求体中的更新数据（如 title、completed 等）
    const updatedData = req.body; // { title: '新标题', completed: true }
    
    // 3. 校验必要字段（可选）
    if (!updatedData.title) {
      return res.status(400).json({ error: '标题不能为空' });
    }
    
    // 4. 执行更新逻辑（示例：操作数据库）
    console.log(`更新 ID 为 ${taskId} 的任务:`, updatedData);
    // 实际开发中：UPDATE todos SET ... WHERE id = taskId
    
    // 5. 返回成功响应
    res.json({ message: '任务更新成功', data: { id: taskId, ...updatedData } });
  } catch (err) {
    res.status(500).json({ error: '服务器错误' });
  }
});

app.listen(3000, () => {
  console.log('服务器运行在 3000 端口');
});
```

# npm 包管理 & 工具使用 核心笔记  

## 一、核心文件作用  
| 文件                | 作用                   | 关键说明                                                                   |
| ------------------- | ---------------------- | -------------------------------------------------------------------------- |
| `node_modules`      | 存放项目安装的第三方包 | `require()` 导入包时，从这里查找加载                                       |
| `package.json`      | 项目包管理配置文件     | 记录依赖包（名称、版本）、脚本等，`npm init -y` 快速创建                   |
| `package-lock.json` | 锁定依赖版本           | 记录 `node_modules` 包的精确版本、下载地址，**禁止手动修改**，npm 自动维护 |


## 二、版本号规则  
包版本号格式：`大版本.功能版本.Bug修复版本`（如 `2.24.0` ）  
- 第 1 位：大版本（不兼容重大更新，如 `1.0.0` → `2.0.0` ）  
- 第 2 位：功能版本（新增功能，兼容旧版，如 `1.2.0` → `1.3.0` ）  
- 第 3 位：Bug 修复版本（修复问题，兼容旧版，如 `1.2.3` → `1.2.4` ）  
- 版本提升规则：前面位增长，后面位归零（如 `1.2.3` → `2.0.0` 或 `1.3.0` ）  


## 三、npm 核心命令  
### 1. 初始化与依赖管理  
- `npm init -y`：快速创建 `package.json`（用默认配置，需英文目录 ）  
- `npm install`（或 `npm i` ）：  
  - 无参数：根据 `package.json` 安装**全部依赖**（读取 `dependencies`、`devDependencies` ）  
  - 带包名：`npm i 包名` 装最新版；`npm i 包名@版本号` 装指定版（如 `npm i moment@2.22.2` ）  
- `npm uninstall 包名`：卸载指定包，同时从 `package.json` 移除依赖  


### 2. 依赖分类  
- **`dependencies`**：核心依赖（开发、上线都要用，如业务功能包 ）  
- **`devDependencies`**：开发依赖（仅开发阶段用，如测试、构建工具 ）  
  - 安装命令：`npm i 包名 -D`（或 `npm i 包名 --save-dev` ），会写入 `devDependencies`  


## 四、镜像源与工具  
### 1. 镜像源切换（解决 npm 下载慢）  
- 查看当前镜像：`npm config get registry`  
- 切换淘宝镜像：`npm config set registry=https://registry.npm.taobao.org/`  

### 2. `nrm` 工具（更便捷切换镜像）  
- 安装：`npm i nrm -g`（全局安装 ）  
- 查看镜像列表：`nrm ls`  
- 切换镜像：`nrm use 镜像名`（如 `nrm use taobao` ）  


## 五、包的分类与安装范围  
### 1. 项目包  
- 安装到项目 `node_modules`，分 `dependencies`（核心 ）、`devDependencies`（开发 ）  

### 2. 全局包  
- 安装命令：`npm i 包名 -g`（如 `npm install -g i5ting_toc` ）  
- 路径：系统全局目录（Windows 一般在 `C:\Users\用户名\AppData\Roaming\npm\node_modules` ）  
- 作用：全局工具（如 `i5ting_toc` 转 md 为 html ），命令行直接调用  


## 六、实用工具：i5ting_toc（md 转 html ）  
1. 全局安装：`npm install -g i5ting_toc`  
2. 使用：`i5ting_toc -f 要转换的md文件路径 -o`（自动生成 html 页面 ）  


**核心逻辑**：用 `package.json` 管理项目依赖，通过 npm 命令装包/卸包，利用镜像源加速下载，`nrm` 简化镜像切换；区分依赖分类、包安装范围，让项目结构更清晰 。