# XPay Labs Vue.js Demo

English | [中文](README.zh.md)

A Vue.js-based cryptocurrency payment demo application that integrates the official XPay Labs SDK, demonstrating how to implement cryptocurrency payment functionality in e-commerce websites.

## 🚀 Features

- **Complete E-commerce Experience**: Product showcase, shopping cart, checkout process
- **Cryptocurrency Payments**: Support for mainstream cryptocurrencies like USDT, ETH, TRX
- **Multi-chain Support**: Support for TRON, Ethereum, BSC and other blockchain networks
- **Real-time Payment Status**: QR code payment interface with real-time payment status updates
- **Webhook Handling**: Complete payment callback handling mechanism
- **Responsive Design**: Optimized for both desktop and mobile devices

## 🛠 Tech Stack

- **Frontend Framework**: Vue 3 + Vue Router
- **Build Tool**: Vite
- **Payment SDK**: @xpaylabs/node-sdk
- **QR Code Generation**: qrcode
- **Styling**: Native CSS + Responsive Design

## 📦 Supported Cryptocurrencies

| Currency | Network | Status |
|----------|---------|--------|
| USDT | TRON/ETH/BSC | ✅ |
| ETH | Ethereum | ✅ |
| TRX | TRON | ✅ |

## 🏗 Project Structure

```
xpay-demo-vue/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Image resources
│   │   ├── eth-logo.svg
│   │   ├── tron-logo.png
│   │   ├── trx-logo.svg
│   │   └── usdt-logo.svg
│   ├── components/        # Vue components
│   │   ├── PaymentQRCode.vue    # Payment QR code component
│   │   ├── Toast.vue            # Toast notification component
│   │   └── WebhookHandler.vue   # Webhook handler component
│   ├── services/          # Service layer
│   │   ├── ToastService.js      # Toast service
│   │   └── XPayService.js       # XPay Labs SDK wrapper
│   ├── views/             # Page components
│   │   ├── Cart.vue             # Shopping cart page
│   │   ├── Checkout.vue         # Checkout page
│   │   ├── Home.vue             # Home page
│   │   ├── PaymentDemo.vue      # Payment demo page
│   │   ├── PaymentSuccess.vue   # Payment success page
│   │   └── Products.vue         # Product list page
│   ├── App.vue            # Root component
│   └── main.js            # Entry file
├── .env.example           # Environment variables example
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd xpay-demo-vue
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your XPay Labs API credentials:

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
# XPay Labs SDK Configuration
VITE_XPAY_API_KEY=your-api-key
VITE_XPAY_API_SECRET=your-api-secret
VITE_XPAY_BASE_URL=https://api.xpaylabs.com
```

### 4. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`.

### 5. Build for Production

```bash
npm run build
```

## 📱 Feature Demo

### E-commerce Features
- **Product Browsing**: Support for category filtering and search
- **Shopping Cart Management**: Add, remove, modify product quantities
- **Order Checkout**: Complete checkout process

### Payment Features
- **Collection Orders**: Create cryptocurrency collection orders
- **Payout Orders**: Create merchant-to-user payout orders
- **Order Status Query**: Real-time order payment status queries
- **Supported Symbols Query**: Get list of supported cryptocurrencies

### Payment Demo Page
Visit `/payment-demo` to experience the complete payment functionality:

1. **Create Collection Order**: Generate payment QR code for users to scan and pay
2. **Create Payout Order**: Merchant transfers to user wallet address
3. **Order Status Query**: Query current status of any order
4. **Webhook Testing**: Test payment callback handling

## 🔧 API Integration

### XPayService Wrapper

The project provides a complete XPay Labs SDK wrapper supporting the following features:

```javascript
// Create collection order
const response = await xpay.createCollection({
  amount: 100,
  symbol: 'USDT',
  chain: 'TRON',
  uid: 'user123',
  orderId: 'order-123'
});

// Create payout order
const response = await xpay.createPayout({
  amount: 100,
  symbol: 'USDT',
  chain: 'TRON',
  uid: 'user123',
  receiveAddress: 'Txxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  orderId: 'payout-123'
});

// Query order status
const status = await xpay.getOrderStatus('order-123');

// Get supported symbols
const symbols = await xpay.getSupportedSymbols('TRON', 'USDT');
```

### Webhook Handling

The project includes complete webhook handling examples supporting:
- Signature verification
- Payment status updates
- Error handling

## 🎨 UI Features

- **Modern Design**: Gradient backgrounds and card-based layouts
- **Responsive Layout**: Perfect adaptation to various screen sizes
- **Interactive Animations**: Smooth hover effects and transitions
- **Status Indicators**: Clear payment status display
- **QR Code Payment**: Automatic payment QR code generation

## 🔒 Security Features

- **Environment Variable Protection**: API keys managed through environment variables
- **Webhook Verification**: Complete payment callback signature verification
- **Error Handling**: Comprehensive error catching and handling mechanisms

## 📖 Development Guide

### Adding New Payment Methods

1. Add new currency options in `PaymentDemo.vue`
2. Update QR code generation logic in `PaymentQRCode.vue`
3. Add corresponding currency icons in `Products.vue`

### Custom Styling

The project uses native CSS with all styles in the `<style>` tags of each Vue component. Main design variables:

- Primary color: `#42b983` (Green)
- Secondary color: `#2c3e50` (Dark blue)
- Background gradient: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`

### Environment Configuration

Development and production environments can use different API endpoints:

```env
# Development environment
VITE_XPAY_BASE_URL=https://api-dev.xpaylabs.com

# Production environment
VITE_XPAY_BASE_URL=https://api.xpaylabs.com
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter issues while using this project:

1. Check the [XPay Labs Official Documentation](https://docs.xpaylabs.com)
2. Submit an [Issue](../../issues)
3. Contact technical support

## 🔗 Related Links

- [XPay Labs Official Website](https://www.xpaylabs.com)
- [XPay Labs SDK Documentation](https://docs.xpaylabs.com)
- [Vue.js Official Documentation](https://vuejs.org)
- [Vite Build Tool](https://vitejs.dev)

---

**Note**: This is a demo project intended to showcase XPay Labs SDK integration methods. When using in production environments, please ensure:
- Secure management of API keys
- Implementation of appropriate security measures
- Thorough testing
- Compliance with relevant laws and regulations
