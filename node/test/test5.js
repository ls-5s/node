 // 解释：
// 1. 引入必要的模块：jsonwebtoken 用于生成和验证 JWT，express-jwt 用于在 Express 中验证 JWT，express 用于创建 Express 应用。
// 2. 定义密钥：密钥必须保持一致，用于签名和验证 JWT。
// 3. 配置中间件：
//    - 使用 express.json() 中间件解析 JSON 请求体。
//    - 使用 expressJWT 中间件验证 Token，排除登录接口。
// 4. 登录接口：
//    - 接收用户名和密码，验证成功后生成 JWT 并返回。
// 5. 测试接口：
//    - 验证 Token，成功后返回用户信息。
// 6. 错误处理中间件：
//    - 处理 JWT 验证失败和其他错误。

const jwt = require('jsonwebtoken');
const { expressjwt: expressJWT } = require("express-jwt");
const express = require('express');
const app = express();

const secretKey = "YOUR_SECRET_KEY"; // 密钥必须保持一致
app.use(express.json());

// 配置JWT中间件（验证Token）
app.use(expressJWT({
    secret: secretKey,
    algorithms: ['HS256']
}).unless({ path: ['/login'] })); // 排除登录接口

// 登录接口（生成Token）
app.get('/login', (req, res) => {
    const token = jwt.sign(
        { username: 'admin11', id: '123456' },
        secretKey,
        { expiresIn: '1h' }
    );
    res.status(201).json({
        code: 201,
        message: '登录成功',
        token: token
    });
});

// 测试接口（需要验证Token）
app.get('/test', (req, res) => {
    // 检查是否存在 req.auth
    if (!req.auth) {
        return res.status(401).json({
            code: 401,
            message: '未授权',
        });
    }
    console.log('解析到的用户信息:', req.auth); // 打印用户信息
    res.status(201).json({
        code: 201,
        message: '测试成功',
        user: req.auth
    });
});

// 错误处理中间件（必须放在最后）
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        console.log('JWT验证失败:', err.message);
        return res.status(401).json({
            code: 401,
            message: 'Token验证失败',
            error: err.message
        });
    }
    res.status(500).json({
        code: 500,
        message: '服务器内部错误'
    });
});

app.listen(8080, () => {
    console.log('服务器启动成功: http://localhost:8080');
});
