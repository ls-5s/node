后端不用部署，直接在本地启动即可(其他设备也可以访问)，超简单
## 🔑 ngrok 使用前必须的步骤

### 步骤1：注册账号（免费）
```bash
# 1. 访问 https://ngrok.com/
# 2. 点击 Sign Up 注册免费账号
# 3. 验证邮箱
```

**详细说明：**
- 免费账号可以满足基本开发需求
- 注册后可以获得一个固定的二级域名（需要验证邮箱）
- 免费版每次连接会获得不同的子域名

### 步骤2：获取并配置 authtoken
```bash
# 登录 ngrok 后台后，在左侧菜单找到 "Your Authtoken"
# 复制完整的 authtoken（以 2xxx 开头的长字符串）

# 在命令行配置（只需要配置一次）：
ngrok config add-authtoken YOUR_AUTH_TOKEN_HERE
```

**验证配置是否成功：**
```bash
ngrok config check
```

---

## 🚀 完整使用流程

### 1. 安装 + 配置
```bash
# 方法1：使用 npm 安装（需要 Node.js 环境）
npm install -g ngrok

# 方法2：直接下载（各平台通用）
# 访问 https://ngrok.com/download 下载对应版本
# 解压后将 ngrok 可执行文件放到系统 PATH 中

# 配置认证（只需要做一次）
ngrok config add-authtoken 2abc123...你的token
```

### 2. 启动你的服务器
```bash
# 假设你有一个 Node.js 服务器
node server.js

# 或者 Python 服务器
python app.py

# 或者任何其他本地服务
# 确保服务器在 localhost:3000 正常运行
```

**验证服务是否正常：**
```bash
curl http://localhost:3000
```

### 3. 使用 ngrok 暴露到公网
```bash
# 基本用法
ngrok http 3000

# 如果需要其他端口
ngrok http 8080

# 如果需要 HTTPS
ngrok http https://localhost:3000

# 在后台运行（不占用终端）
ngrok http 3000 --log stdout > ngrok.log &
```
### 重点
```
1.先启动后端服务 比如 node server.js 或者 python app.py
2.再一个新的终端启动 ngrok 暴露到公网：比如：ngrok http 3000
```
### 4. 获得公网地址并配置前端
```text
# ngrok 启动后会显示类似信息：
Forwarding https://abc-123.ngrok.io -> http://localhost:3000
```
### 4.1 配置前端调用 ngrok 地址
**前端连接配置示例：**

```javascript
直接调用 ngrok 提供的 https 地址即可访问本地服务
比如：

const API_BASE_URL = 'https://abc-123.ngrok.io/api';
```
### 5. 测试完整流程

```bash
# 1. 启动本地服务
node server.js

# 2. 新开终端，启动 ngrok
ngrok http 3000

# 3. 复制 ngrok 提供的 https 地址
# 4. 在另一台设备或浏览器中访问该地址测试
# 5. 查看 ngrok 控制台的请求日志确认流量转发正常
```

### 额外功能

**查看请求监控：**
```bash
# 启动后访问 http://localhost:4040 可以查看详细的请求日志和性能数据
```

**自定义子域名（需要付费）：**
```bash
ngrok http 3000 --subdomain=my-custom-name
```

这样你就有了一个完整的从本地开发到公网访问的解决方案！

### 注意
1. ngrok 每次连接会获得不同的子域名，需要每次都更新前端配置
2. 免费版 ngrok 每次连接会获得不同的二级域名，需要每次都更新前端配置
3. 付费版 ngrok 可以自定义子域名，但是需要每次都更新前端配置
4. 免费版一个月只有 1GB 的流量，超过会被自动断开