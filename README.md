# XPay Labs Vue.js Demo — Crypto Payment E-Commerce Demo

English | [中文](README.zh.md)

A full **Vue 3** e-commerce demo application that integrates the [XPay Labs](https://www.xpaylabs.com) self-hosted, non-custodial crypto payment gateway SDK. Demonstrates a complete shopping experience — product catalog, cart, checkout, and USDT/USDC payment on TRON, EVM chains, and SUI.

## Features

- **Complete E-commerce Experience**: Product showcase, shopping cart, checkout process
- **Cryptocurrency Payments**: Support for USDT, USDC, ETH, TRX
- **Multi-chain Support**: TRON (TRC20), Ethereum (ERC20), BNB Chain (BEP20)
- **Real-time Payment Status**: QR code payment with live status updates
- **Webhook Handling**: Complete payment callback verification
- **Responsive Design**: Optimized for desktop and mobile

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Vue 3 + Vue Router | Frontend framework |
| Vite | Build tool |
| @xpaylabs/node-sdk | Payment SDK |
| qrcode | QR generation |

## Quick Start

```bash
npm install
cp .env.example .env
# Edit .env with your XPay Labs API credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Supported Cryptocurrencies

| Currency | Network | Status |
|----------|---------|--------|
| USDT | TRON/ETH/BSC | ✅ |
| ETH | Ethereum | ✅ |
| TRX | TRON | ✅ |

## Project Structure

```
src/
├── views/
│   ├── Home.vue             # Product listing
│   ├── Cart.vue             # Shopping cart
│   ├── Checkout.vue         # Checkout with crypto payment
│   ├── PaymentDemo.vue      # Standalone payment demo
│   └── PaymentSuccess.vue   # Post-payment confirmation
├── components/
│   ├── PaymentQRCode.vue    # QR code payment component
│   ├── WebhookHandler.vue   # Webhook verification
│   └── Toast.vue           # Notifications
└── services/
    └── XPayService.js       # SDK wrapper
```

## Related Resources

- [XPay Labs Website](https://www.xpaylabs.com)
- [Node.js SDK](https://github.com/yan253319066/XPayLabs-node-sdk)
- [Java SDK](https://github.com/yan253319066/XPayLabs-java-sdk)
- [React Example](https://github.com/yan253319066/XPayLabs-example-react)
- [Vue 3 Example](https://github.com/yan253319066/XPayLabs-example-vue)
- [Checkout Page](https://github.com/yan253319066/XPayLabs-checkout)

## License

MIT
