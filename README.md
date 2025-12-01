# 舆情灭火先锋 - 部署指南

## 项目简介
企业级全场景舆情监测与危机响应 AI 系统，提供实时舆情监控、负面舆情识别、公关话术生成和危机响应预案等功能。

## 功能展示

### 1. 主页面

![img](https://ai.feishu.cn/space/api/box/stream/download/asynccode/?code=MzkwZDM1YjJhZDA1MTllOGUwNzdhNmZmYmM3NTVkNWVfWlJRMTF1RFdnaFp4aW92NmtqalhSakJTVHpkY0xmNkZfVG9rZW46S3pxTmIyb3hSb2dGOHB4ZkNhdWNCWlFrblNHXzE3NjQ1NzU0NzM6MTc2NDU3OTA3M19WNA)

### 2. 实时舆情监控页面

![img](https://ai.feishu.cn/space/api/box/stream/download/asynccode/?code=MzlmNzJlNmNiYzgxYmNlZDZhNjAwNWM0YmE0NjJmZjBfMkpZa2tZZ1FiWnNoeUM5eU5DUXh1SUNwWm5pUkN3SkNfVG9rZW46UU1vZWJsbklNb3FCRUN4WmZlbmNDZnJRbktmXzE3NjQ1NzQ0NDk6MTc2NDU3ODA0OV9WNA)

### 3. 负面舆情识别页面

![img](https://ai.feishu.cn/space/api/box/stream/download/asynccode/?code=NDgzZjgzYTcwNjk0Y2U1MmU2MGUxMWYwYTVmYWI3ZjRfOFEydGdhR05hbGV5QWpSRjB4YkZ0S2o0OXdHME9pWXZfVG9rZW46SmF0RmJhYk5Eb0R4cnh4R3FCd2NmT2RVblVnXzE3NjQ1NzQ0NDk6MTc2NDU3ODA0OV9WNA)

### 4. 公关话术生成页面

![img](https://ai.feishu.cn/space/api/box/stream/download/asynccode/?code=MzQ0MjA4M2FiY2MyYzFjYTIwYTc0OGJjNzVmMTBmYjlfeXcyM3FaM0FNbEREZmx5REhiVEw3dVd5OThZTkdpcFpfVG9rZW46QUN6NWJqV2U2b3I5c1Z4dlg0ZmNLRVd2bk9oXzE3NjQ1NzQ0NDk6MTc2NDU3ODA0OV9WNA)

### 5. 危机响应预案页面

![img](https://ai.feishu.cn/space/api/box/stream/download/asynccode/?code=M2ZiNTBjYWVlNDVjODVkNzAzOTQwOGJhZGQ1YzJlNTJfT2g0TjdGcXd5ZFkyZHMzeFp5NTd0bjgzaTNoczZndHBfVG9rZW46SG9UT2IxMnIybzd3bVV4SnYwZGNDcGFlblVoXzE3NjQ1NzQ0NDk6MTc2NDU3ODA0OV9WNA)

## 部署到 Linux 服务器步骤

### 1. 准备环境
确保您的服务器上已安装以下软件：
- Node.js (v16 或更高版本)
- pnpm (包管理器)
- Git (可选，用于克隆代码)
- Nginx (用于静态文件服务)

### 2. 安装 Node.js 和 pnpm
```bash
# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 pnpm
npm install -g pnpm
```

### 3. 获取代码
有两种方式获取代码：

**方式一：通过 Git 克隆**
```bash
git clone https://github.com/axp007/Public_opinion_extinguishing.git
cd 项目目录
```

**方式二：上传本地代码**
将本地代码压缩后上传到服务器，然后解压：
```bash
tar -xzvf project.tar.gz
cd 项目目录
```

### 4. 安装依赖并构建项目
```bash
# 安装项目依赖
pnpm install

# 构建项目
pnpm build
```

构建成功后，静态文件将生成在 `dist/static` 目录下。

### 5. 配置 Nginx
创建或修改 Nginx 配置文件：
```bash
sudo nano /etc/nginx/sites-available/yuqing
```

添加以下配置（替换 `your_domain` 和 `project_path`）：
```nginx
server {
    listen 80;
    server_name your_domain.com;
    
    root /path/to/project/dist/static;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 可选：添加 Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

启用配置并重启 Nginx：
```bash
sudo ln -s /etc/nginx/sites-available/yuqing /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. 访问应用
现在您可以通过服务器的 IP 地址或域名访问部署好的应用了。

## 开发模式运行
如果您需要在开发模式下运行项目，可以使用以下命令：
```bash
pnpm dev
```

项目将在 `http://localhost:3000` 启动开发服务器。

## 注意事项
1. 确保服务器的防火墙已开放 80 端口
2. 如需使用 HTTPS，请配置 SSL 证书
3. 定期更新项目代码并重新构建以获取最新功能