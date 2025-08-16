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
