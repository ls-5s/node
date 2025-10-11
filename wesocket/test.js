// const express = require('express')
// const expressWs = require('express-ws')
// const app = express()

// const expressWsInstance = expressWs(app)

// // 新增：存储所有在线的WebSocket连接（用于广播）
// const onlineClients = new Set()

// app.ws('/chat', (ws, req) => {
//     // 1. 新客户端连接时，把它加入“在线列表”
//     onlineClients.add(ws)
//     console.log('新用户加入，当前在线人数：', onlineClients.size)

//     // 服务器主动发欢迎消息（统一JSON格式）
//     ws.send(JSON.stringify({
//         type: 'system', // 消息类型：系统通知
//         content: '欢迎加入聊天室！'
//     }))

//     // 2. 接收客户端消息 → 广播给所有在线用户
//     ws.on('message', (msg) => {
//         const msgStr = msg.toString()
//         console.log('收到消息：', msgStr)

//         // 构建统一格式的消息
//         const broadcastMsg = JSON.stringify({
//             type: 'chat', // 消息类型：用户聊天
//             content: msgStr,
//             time: new Date().toLocaleTimeString() // 加上时间戳
//         })

//         // 关键：遍历所有在线客户端，把消息发出去
//         onlineClients.forEach(client => {
//             // 只给“连接正常”的客户端发消息
//             if (client.readyState === 1) {
//                 client.send(broadcastMsg)
//             }
//         })
//     })

//     // 3. 客户端断开连接 → 从“在线列表”中移除
//     ws.on('close', () => {
//         onlineClients.delete(ws)
//         console.log('用户离开，当前在线人数：', onlineClients.size)
//     })

//     ws.on('error', (err) => {
//         console.log('连接错误：', err)
//         // 错误时也移除连接，避免内存泄漏
//         onlineClients.delete(ws)
//     })
// })

// // 启动服务器
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`聊天室服务器运行在 http://localhost:${PORT}`);
//     console.log(`WebSocket连接地址：ws://localhost:${PORT}/chat`);
// });

const ws = new WebSocket('ws://localhost:3000/chat')
ws.onopen = () => {
    console.log('连接成功')
}
ws.onmessage = (msg) => {
    console.log('收到消息：', msg.data)
}
ws.onclose = () => {
    console.log('连接关闭')
}
ws.onerror = (err) => {
    console.log('连接错误：', err)
}
ws.send(JSON.stringify({
    type: 'chat',
    content: '你好，服务器！'
}))
