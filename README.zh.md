# XPay Labs Vue.js Demo

[English](README.md) | 中文

一个基于Vue.js的加密货币支付演示应用，集成了XPay Labs官方SDK，展示了如何在电商网站中实现加密货币支付功能。

## 🚀 项目特性

- **完整的电商体验**: 产品展示、购物车、结账流程
- **加密货币支付**: 支持USDT、ETH、TRX等主流加密货币
- **多链支持**: 支持TRON、Ethereum、BSC等区块链网络
- **实时支付状态**: 二维码支付界面，实时更新支付状态
- **Webhook处理**: 完整的支付回调处理机制
- **响应式设计**: 适配桌面端和移动端设备

## 🛠 技术栈

- **前端框架**: Vue 3 + Vue Router
- **构建工具**: Vite
- **支付SDK**: @xpaylabs/node-sdk
- **二维码生成**: qrcode
- **样式**: 原生CSS + 响应式设计

## 📦 支持的加密货币

| 货币 | 网络 | 状态 |
|------|------|------|
| USDT | TRON/ETH/BSC | ✅ |
| ETH | Ethereum | ✅ |
| TRX | TRON | ✅ |

## 🏗 项目结构

```
xpay-demo-vue/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 图片资源
│   │   ├── eth-logo.svg
│   │   ├── tron-logo.png
│   │   ├── trx-logo.svg
│   │   └── usdt-logo.svg
│   ├── components/        # Vue组件
│   │   ├── PaymentQRCode.vue    # 支付二维码组件
│   │   ├── Toast.vue            # 消息提示组件
│   │   └── WebhookHandler.vue   # Webhook处理组件
│   ├── services/          # 服务层
│   │   ├── ToastService.js      # 消息服务
│   │   └── XPayService.js       # XPay Labs SDK封装
│   ├── views/             # 页面组件
│   │   ├── Cart.vue             # 购物车页面
│   │   ├── Checkout.vue         # 结账页面
│   │   ├── Home.vue             # 首页
│   │   ├── PaymentDemo.vue      # 支付演示页面
│   │   ├── PaymentSuccess.vue   # 支付成功页面
│   │   └── Products.vue         # 产品列表页面
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── .env.example           # 环境变量示例
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd xpay-demo-vue
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 文件为 `.env` 并填入你的XPay Labs API凭证：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
# XPay Labs SDK Configuration
VITE_XPAY_API_KEY=your-api-key
VITE_XPAY_API_SECRET=your-api-secret
VITE_XPAY_BASE_URL=https://api.xpaylabs.com
```

### 4. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 5. 构建生产版本

```bash
npm run build
```

## 📱 功能演示

### 电商功能
- **产品浏览**: 支持分类筛选和搜索
- **购物车管理**: 添加、删除、修改商品数量
- **订单结账**: 完整的结账流程

### 支付功能
- **收款订单**: 创建加密货币收款订单
- **付款订单**: 创建商户到用户的付款订单
- **订单状态查询**: 实时查询订单支付状态
- **支持的币种查询**: 获取平台支持的加密货币列表

### 支付演示页面
访问 `/payment-demo` 可以体验完整的支付功能：

1. **创建收款订单**: 生成支付二维码供用户扫码支付
2. **创建付款订单**: 商户向用户钱包地址转账
3. **订单状态查询**: 查询任意订单的当前状态
4. **Webhook测试**: 测试支付回调处理

## 🔧 API集成

### XPayService 封装

项目提供了完整的XPay Labs SDK封装，支持以下功能：

```javascript
// 创建收款订单
const response = await xpay.createCollection({
  amount: 100,
  symbol: 'USDT',
  chain: 'TRON',
  uid: 'user123',
  orderId: 'order-123'
});

// 创建付款订单
const response = await xpay.createPayout({
  amount: 100,
  symbol: 'USDT',
  chain: 'TRON',
  uid: 'user123',
  receiveAddress: 'Txxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  orderId: 'payout-123'
});

// 查询订单状态
const status = await xpay.getOrderStatus('order-123');

// 获取支持的币种
const symbols = await xpay.getSupportedSymbols('TRON', 'USDT');
```

### Webhook处理

项目包含完整的Webhook处理示例，支持：
- 签名验证
- 支付状态更新
- 错误处理

## 🎨 界面特性

- **现代化设计**: 采用渐变背景和卡片式布局
- **响应式布局**: 完美适配各种屏幕尺寸
- **交互动画**: 流畅的悬停效果和过渡动画
- **状态指示**: 清晰的支付状态显示
- **二维码支付**: 自动生成支付二维码

## 🔒 安全特性

- **环境变量保护**: API密钥通过环境变量管理
- **Webhook验证**: 完整的支付回调签名验证
- **错误处理**: 完善的错误捕获和处理机制

## 📖 开发指南

### 添加新的支付方式

1. 在 `PaymentDemo.vue` 中添加新的币种选项
2. 更新 `PaymentQRCode.vue` 中的二维码生成逻辑
3. 在 `Products.vue` 中添加对应的币种图标

### 自定义样式

项目使用原生CSS，所有样式文件都在各个Vue组件的 `<style>` 标签中。主要的设计变量：

- 主色调: `#42b983` (绿色)
- 次要色: `#2c3e50` (深蓝)
- 背景渐变: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`

### 环境配置

开发环境和生产环境可以使用不同的API端点：

```env
# 开发环境
VITE_XPAY_BASE_URL=https://api-dev.xpaylabs.com

# 生产环境
VITE_XPAY_BASE_URL=https://api.xpaylabs.com
```

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 支持

如果你在使用过程中遇到问题：

1. 查看 [XPay Labs官方文档](https://docs.xpaylabs.com)
2. 提交 [Issue](../../issues)
3. 联系技术支持

## 🔗 相关链接

- [XPay Labs官网](https://www.xpaylabs.com)
- [XPay Labs SDK文档](https://docs.xpaylabs.com)
- [Vue.js官方文档](https://vuejs.org)
- [Vite构建工具](https://vitejs.dev)

---

**注意**: 这是一个演示项目，仅用于展示XPay Labs SDK的集成方式。在生产环境中使用时，请确保：
- 妥善保管API密钥
- 实施适当的安全措施
- 进行充分的测试
- 遵循相关法律法规
