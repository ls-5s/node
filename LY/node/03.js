const fs = require('fs');

// 异步写入文件：在当前目录创建 test.txt，内容为 "hello,Node.js"
// 参数说明：文件路径、内容、回调函数(接收错误对象作为参数)
fs.writeFile('./test.txt', 'hello,Node.js', (err) => {
    if (err) {
        // 错误处理：打印错误对象（包含错误类型、路径等信息）
        console.log(err);
    } else {
        // 成功提示：文件写入完成（注意：此时文件可能尚未完全落盘）
        console.log('hhhh');
    }
});

// 异步读取文件：读取刚创建的 test.txt 文件内容
// 参数说明：文件路径、回调函数(接收错误对象和原始数据缓冲区)
fs.readFile('./test.txt', (err, data) => {
    if (err) {
        // 错误处理：可能由于文件不存在、权限不足等原因
        console.log(err);
    } else {
        // 数据处理：将 Buffer 类型转换为 UTF-8 字符串输出
        console.log(data.toString());
    }
});