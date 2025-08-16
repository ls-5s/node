// const fs = require('fs')
// fs.readFile('./node.md','utf8',(err,data)=> {
//     // console.log(err)
//     // console.log('--------')
//     // console.log(data)
//     if(err) {
//         console.log( "读取失败"+err)
//     }else {
//         console.log("读取成功")
//     }
// })
// const fs = require('fs')
// fs.writeFile('./1.txt','hello world','utf8',(err)=> {
//     if(err) {
//         console.log("写入失败"+err)
//     }else {
//         console.log("写入成功")
//     }
// })
// const fs = require('fs')
// fs.readFile('./1.txt','utf8',(err,data)=> {
//     if(err) {
//         console.log("读取失败"+err)
//     }else {
//         console.log("读取成功"+data)
//         const arrOld = data.split(' ')
//         // console.log(arrOld)
//         const arrNew = []
//         arrOld.forEach(item => {
//             arrNew.push(item.replace('=', ': '))
//         })
//        const dataNew = arrNew.join('\n')
//        fs.writeFile('./2.txt',dataNew,'utf8',(err)=> {
//         if(err) {
//             console.log("写入失败"+err)
//         }else {
//             console.log("写入成功")
//         }
//        })
//         // console.log(arrNew)
//     }
// })
// console.log(__dirname)

// path
// const path = require('path')
// const fs = require('fs')
// fs.readFile(path.join(__dirname,'./node.md'),'utf8',(err,data)=> {
//     // console.log(err)
//     // console.log('--------')
//     // console.log(data)
//     if(err) {
//         console.log( "读取失败"+err)
//     }else {
//         console.log("读取成功" + data)
//     }
// })
// const path = require('path');

// // 示例 1
// const pathStr = path.join('/a', '/b/c', '../', './d', 'e')
// console.log(pathStr) // 输出 \a\b\d\e

// // 示例 2
// const pathStr2 = path.join(__dirname, '/files/1.txt')
// console.log(pathStr2) // 输出 当前文件所处目录\files\1.txt

// const path = require('path')
// // const fa = path.basename(path.join(__dirname,'./node.md'))
// // console.log(fa)
// // const fa1 = path.basename(path.join(__dirname, './node.md'),'.md')
// // console.log(fa1)

// const fa = path.extname(path.join(__dirname,'./node.md'))
// console.log(fa)
// const fa = __dirname
// console.log(fa)
// const path = require('path')
// const fs = require('fs')
// const regStyle = /<style>[\s\S]*<\/style>/
// const regScript = /<script>[\s\S]*<\/script>/

// const reSelveCss = (html) => {
//     const r1 = regStyle.exec(html)
//     const newCss = r1[0].replace('<style>','').replace('</style>','')
//     // console.log(r1)
//     fs.writeFile(path.join(__dirname,'./clock/index.css'),newCss,'utf8',(err)=> {
//         if(err) {
//             console.log("写入失败CSS"+err)
//         }else {
//             console.log("写入成功CSS")
//         }
//     })

// }
// const reSelveJs = (html) => {
//     const r1 = regScript.exec(html)
//     const newJs = r1[0].replace('<script>','').replace('</script>','')
//     fs.writeFile(path.join(__dirname,'./clock/index.js'),newJs,'utf8',(err)=> {
//         if(err) {
//             console.log("写入失败CSS"+err)
//         }else {
//             console.log("写入成功JS")
//         }
//     })

// }
// const reSelveHtml = (html) => {
//     const r1 = html.replace(regStyle,' <link rel = "stylesheet" href = "./index.css"/>')
//     const r2 = r1.replace(regScript,'<script src = "./index.js"></script>')
//     fs.writeFile(path.join(__dirname,'./clock/index.html'),r2,'utf8',(err)=> {
//         if(err) {
//             console.log("写入失败HTML"+err)
//         }else {
//             console.log("写入成功HTML")
//         }
//     })
// }
// fs.readFile(path.join(__dirname,'./test.html'),'utf8',(err,data)=> {
//     if(err) {
//         console.log("读取失败"+err)
//     }else {
//         // console.log("读取成功"+data)
//         reSelveCss(data)
//         reSelveJs(data)
//         reSelveHtml(data)
//     }
// })


// // http
// const http =require('http')
// const server = http.createServer()
// server.on('request',(req,res)=> {
//     const url = req.url
//     const method = req.method
//     const str = `你的请求地址是 ${url}，且请求方法是 ${method}`; 
//     console.log(str)
//     res.setHeader('Content-Type', 'text/html; charset=utf-8');
//     // 注意这里是分号 ; 而不是冒号 :
//     res.end(str)
//     console.log('someone visit our server')
// })
// server.listen(8080,()=> {
//     console.log('server running at http://127.0.0.1:8080')
// })
// const http = require('http')
// const server = http.createServer()
// server.on('request',(req,res)=> {
//     const url = req.url
//     let content = '<h>404 页面不存在</h>'
//     if(url === '/') {
//         content = '<h>首页</h>'
//     }else if(url === '/index') {
//         content = '<h>index</h>'
//     }
//     const method = req.method
//     const str = `你的请求地址是 ${url}，且请求方法是 ${method}`; 
//     console.log(str)
//   res.setHeader('Content-Type','text/html; charset=utf-8')
//     res.end(content)
// })
// server.listen(8080,()=> {
//     console.log('server running at http://127.0.0.1:8080')
//  })
// // const fs = require('fs')
// // const path = require('path')
// const http = require('http')
// const server = http.createServer()
// server.on('request',(req,res)=> {
//     const url = req.url
//     // const fpath = path.join(__dirname,url)
//     let fpath = ''
   
//         // 如果请求的路径是 / ，则手动指定文件的存放路径为 ./clock/index.html
//         fpath = path.join(__dirname, './clock/index.html')

//     fs.readFile(fpath,'utf8',(err,data)=> {
//         if(err) {
//             console.log("读取失败"+err)
//             console.log(fpath)
//         }else {
//             console.log("读取成功"+data)
//             res.setHeader('Content-Type','text/html; charset=utf-8')
//             res.end(data)
//             console.log(__dirname)
//         }
//     })
    
// })
// server.listen(8080,()=> {
//     console.log('server running at http://127.0.0.1:8080')
// })
   
// 加载模块
// 方法：使用 require() 方法，可加载内置模块、用户自定义模块、第三方模块。
// 示例：
// 加载内置 fs 模块：

// js
// // 1. 加载内置的 fs 模块
// const fs = require('fs')


// 加载用户自定义模块（以./ custom.js 为例 ）：

// js
// // 2. 加载用户的自定义模块
// const custom = require('./custom.js')


// 加载第三方模块（以 moment 为例，实际使用需提前安装 ）：

// js
// // 3. 加载第三方模块（关于第三方模块的下载和使用，会在后面的课程中进行专门的讲解）
// const moment = require('moment')


// 注意事项：使用 require() 方法加载其它模块时，会执行被加载模块中的代码 。
// const fs = require('fs')
// const path = require('path')
// const http = require('http')
// const server = http.createServer()
// server.on('request', (req, res) => {
//     const url = req.url
 
//     // const fpath = path.join(__dirname,'./clock',url)
//     let fpath = ""
//     if (url === '/') {
//         // 如果请求的路径是 / ，则手动指定文件的存放路径为 ./clock/index.html
//         // fpath = path.join(__dirname, './test.html')
//         fpath = path.join(__dirname, './clock/index.html')
//     }
//     else {
//         // 如果请求的路径不为 / ，则动态拼接文件的存放路径，组合成 ./clock + url 的形式
//         fpath = path.join(__dirname, './clock', url)
//     }
//     fs.readFile(fpath, 'utf8', (err, data) => {
//         if (err) {
//             console.log("读取失败" + err)
//         } else {
//             // console.log("读取成功")
//             // res.setHeader('Content-Type', 'text/html; charset=utf-8')
//             res.end(data)
//         }
//     })
// })
// server.listen(8050, () => {
//     console.log('HTTP Server running at http://127.0.0.1:8050')
// })



// 加密算法
// const bcrypt = require('bcrypt')
// const saltRounds = 10
// const password = '123456'
// const hasdpassword =async (password,saltRounds)=> {
//     const hash = await bcrypt.hash(password, saltRounds)
//     console.log(hash)
//     return hash

// }
// hasdpassword(password,saltRounds)
// // 验证密码
// const comparePassword = async (password, hash) => {
//     // password 是用户输入的密码
//     // hash 是数据库中的密码 
//     const result = await bcrypt.compare(password, hash)
//     console.log(result)
//     return result
// }
// comparePassword(password,hash)
