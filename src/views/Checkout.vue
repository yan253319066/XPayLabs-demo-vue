<template>
  <div class="checkout-page">
    <div class="container">
      <h1>Checkout</h1>
      
      <div class="checkout-content">
        <div class="order-details">
          <h2>Order Details</h2>
          
          <div class="order-items">
            <div v-for="item in cart" :key="item.id" class="order-item">
              <img :src="item.image" :alt="item.name">
              <div class="item-info">
                <h3>{{ item.name }}</h3>
                <p class="item-price">${{ item.price.toFixed(2) }} × {{ item.quantity }}</p>
              </div>
              <div class="item-total">${{ (item.price * item.quantity).toFixed(2) }}</div>
            </div>
          </div>
          
          <div class="order-summary">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>${{ shipping.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>Tax (10%)</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>
            <div class="summary-total">
              <span>Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
        
        <div class="payment-section">
          <h2>Payment Method</h2>
          
          <div class="payment-options">
            <div class="payment-option-header">
              <h3>Cryptocurrency Payment</h3>
              <p>Pay with your preferred cryptocurrency</p>
            </div>
            
            <div class="crypto-options">
              <div 
                v-for="option in cryptoOptions" 
                :key="option.id"
                :class="['crypto-option', { active: selectedCryptoId === option.id }]"
                @click="selectCrypto(option.id, option.symbol, option.chain)"
              >
                <img :src="option.logo" :alt="option.name">
                <div class="crypto-info">
                  <span class="crypto-name">{{ option.chain }}</span>
                  <span class="crypto-symbol">{{ option.symbol }} <span class="crypto-chain">({{ option.name }})</span></span>
                </div>
                <div class="crypto-check">
                  <svg v-if="selectedCryptoId === option.id" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="payment-actions">
              <button @click="goBack" class="btn-back">Back to Cart</button>
              <button @click="initiatePayment" class="btn-pay" :disabled="!selectedCryptoId">
                Pay with {{ selectedCrypto || 'Cryptocurrency' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Payment Modal -->
      <div class="payment-modal" v-if="showPaymentModal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Complete Your Payment</h2>
            <button @click="closeModal" class="close-btn">×</button>
          </div>
          
          <div class="modal-body">
            <div class="qr-container">
              <PaymentQRCode 
                :payment-data="paymentData"
                @expired="handleExpired"
              />
            </div>
            
            <div class="payment-status" :class="paymentStatus">
              <div v-if="paymentStatus === 'pending'" class="status-pending">
                <svg class="spinner" viewBox="0 0 50 50">
                  <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                </svg>
                <span>Waiting for payment...</span>
              </div>
              <div v-else-if="paymentStatus === 'success'" class="status-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Payment successful!</span>
              </div>
              <div v-else-if="paymentStatus === 'failed'" class="status-failed">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <span>Payment failed. Please try again.</span>
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button v-if="paymentStatus === 'success'" @click="completeOrder" class="btn-complete">
              Complete Order
            </button>
            <button v-else-if="paymentStatus === 'failed'" @click="retryPayment" class="btn-retry">
              Retry Payment
            </button>
            <button v-else @click="closeModal" class="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
      
      <!-- Confirmation Modal -->
      <div class="confirmation-modal" v-if="showConfirmModal">
        <div class="confirm-content">
          <div class="confirm-header">
            <h3>Confirm Cancellation</h3>
          </div>
          <div class="confirm-body">
            <p>Are you sure you want to cancel this payment?</p>
          </div>
          <div class="confirm-footer">
            <button @click="cancelConfirmation" class="btn-back">No, Continue</button>
            <button @click="confirmCancelPayment" class="btn-cancel-payment">Yes, Cancel Payment</button>
          </div>
        </div>
      </div>
      
      <div class="modal-overlay" v-if="showPaymentModal || showConfirmModal" @click="closeModal"></div>
    </div>
  </div>
</template>

<script>
import PaymentQRCode from '../components/PaymentQRCode.vue';
import XPayService from '../services/XPayService';
import ToastService from '../services/ToastService';

export default {
  name: 'Checkout',
  components: {
    PaymentQRCode
  },
  data() {
    return {
      xpay: null,
      cart: [],
      shipping: 10.00,
      selectedCryptoId: '',
      selectedCrypto: '',
      selectedChain: '',
      showPaymentModal: false,
      showConfirmModal: false,
      paymentAddress: '',
      cryptoAmount: 0,
      orderId: '',
      paymentStatus: 'pending',
      statusCheckInterval: null,
      transactionId: '',
      paymentData: null,
      error: null,
      cryptoOptions: [
        {
          id: 'usdt-tron',
          name: 'Tether',
          symbol: 'USDT',
          chain: 'TRON',
          logo: new URL('../assets/usdt-logo.svg', import.meta.url).href
        },
        {
          id: 'usdt-eth',
          name: 'Tether',
          symbol: 'USDT',
          chain: 'ETH',
          logo: new URL('../assets/usdt-logo.svg', import.meta.url).href
        },
        {
          id: 'eth',
          name: 'Ethereum',
          symbol: 'ETH',
          chain: 'ETH',
          logo: new URL('../assets/eth-logo.svg', import.meta.url).href
        },
        {
          id: 'trx',
          name: 'TRON',
          symbol: 'TRX',
          chain: 'TRON',
          logo: new URL('../assets/tron-logo.png', import.meta.url).href
        }
      ]
    };
  },
  computed: {
    subtotal() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    tax() {
      return this.subtotal * 0.1;
    },
    total() {
      return this.subtotal + this.shipping + this.tax;
    }
  },
  methods: {
    initializeSDK() {
      try {
        const apiKey = import.meta.env.VITE_XPAY_API_KEY;
        const apiSecret = import.meta.env.VITE_XPAY_API_SECRET;
        const baseUrl = import.meta.env.VITE_XPAY_BASE_URL || 'https://api.xpaylabs.com';
        
        this.xpay = new XPayService({
          apiKey,
          apiSecret,
          baseUrl
        });
        
        console.log('SDK initialized successfully');
        this.error = null;
      } catch (err) {
        this.error = `Failed to initialize SDK: ${err.message}`;
        console.error(this.error);
      }
    },
    
    loadCart() {
      this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (this.cart.length === 0) {
        this.$router.push('/products');
      }
    },
    
    selectCrypto(id, symbol, chain) {
      this.selectedCryptoId = id;
      this.selectedCrypto = symbol;
      this.selectedChain = chain;
    },
    
    goBack() {
      this.$router.push('/cart');
    },
    
    async initiatePayment() {
      if (!this.selectedCryptoId) return;
      
      try {
        // Generate a unique order ID
        this.orderId = 'ORD-' + Date.now();
        
        // Convert USD to selected crypto (simplified conversion for demo)
        // In a real app, you would use an exchange rate API
        let rate = 1;
        switch(this.selectedCrypto) {
          case 'ETH':
            rate = 0.0005; // Example: 1 USD = 0.0005 ETH
            break;
          case 'USDT':
            rate = 1; // 1:1 for stablecoin
            break;
          case 'TRX':
            rate = 10; // Example: 1 USD = 10 TRX
            break;
        }
        
        // For USDT, show exact amount, for others show with fewer decimal places
        if (this.selectedCrypto === 'USDT') {
          this.cryptoAmount = this.total.toFixed(2);
        } else if (this.selectedCrypto === 'ETH') {
          this.cryptoAmount = (this.total * rate).toFixed(4);
        } else {
          this.cryptoAmount = Math.round(this.total * rate);
        }
        
        // Use the selected chain from when the user clicked the option
        const chain = this.selectedChain || 'TRON';
        
        // Reset previous payment data
        this.paymentData = null;
        this.stopStatusCheck();
        
        // Create a collection order using XPay Labs service
        const response = await this.xpay.createCollection({
          amount: this.cryptoAmount,
          symbol: this.selectedCrypto,
          chain: chain,
          uid: '94',
          orderId: this.orderId
        });
        
        if (response && response.code === 200 && response.data) {
          this.paymentAddress = response.data.address;
          this.showPaymentModal = true;
          this.paymentStatus = 'pending';
          
          // Create payment data object for QR code component
          this.paymentData = {
            amount: response.data.amount || this.cryptoAmount,
            symbol: response.data.symbol || this.selectedCrypto,
            chain: response.data.chain || chain,
            address: response.data.address,
            status: 'PENDING', // Use uppercase status to match the API format
            expiryTime: response.data.expiredTime ? new Date(response.data.expiredTime * 1000) : null,
            orderId: response.data.orderId || this.orderId,
            orderType: response.data.orderType || 'COLLECTION',
            isPayout: false
          };
          
          console.log('Payment data created:', this.paymentData);
          
          // Start checking payment status
          this.startStatusCheck();
        } else {
          throw new Error('Invalid response from payment service');
        }
      } catch (error) {
        console.error('Failed to initiate payment:', error);
        this.error = `Failed to initiate payment: ${error.message}`;
        ToastService.error('Failed to initiate payment. Please try again.');
      }
    },
    
    startStatusCheck() {
      // Check payment status every 10 seconds
      this.statusCheckInterval = setInterval(async () => {
        if (this.orderId) {
          try {
            const status = await this.xpay.getOrderStatus(this.orderId);
            
            // Update payment data with new status
            if (this.paymentData && status && status.code === 200 && status.data) {
              // Order status is in data.status
              const orderStatus = status.data.status;
              this.paymentData.status = orderStatus || this.paymentData.status;
              
              // Update payment status for UI
              if (orderStatus === 'SUCCESS') {
                this.paymentStatus = 'success';
                this.stopStatusCheck();
              } else if (['EXPIRED', 'FAILED'].includes(orderStatus)) {
                this.paymentStatus = 'failed';
                this.stopStatusCheck();
              }
              
              // Update order type if available
              if (status.data.orderType) {
                this.paymentData.orderType = status.data.orderType;
              }
              
              // Transaction status is in data.transaction.status if available
              if (status.data.transaction) {
                this.paymentData.txStatus = status.data.transaction.status;
                this.paymentData.txid = status.data.transaction.txid;
                this.transactionId = status.data.transaction.txid;
              }
            }
          } catch (err) {
            console.error('Error checking status:', err);
          }
        }
      }, 10000);
    },
    
    stopStatusCheck() {
      if (this.statusCheckInterval) {
        clearInterval(this.statusCheckInterval);
        this.statusCheckInterval = null;
      }
    },
    
    closeModal() {
      if (this.paymentStatus !== 'pending') {
        this.showPaymentModal = false;
      } else {
        // Show custom confirmation modal instead of using confirm
        this.showConfirmModal = true;
      }
    },
    
    confirmCancelPayment() {
      this.showConfirmModal = false;
      this.showPaymentModal = false;
      ToastService.info('Payment cancelled');
    },
    
    cancelConfirmation() {
      this.showConfirmModal = false;
    },
    
    handleExpired() {
      this.paymentStatus = 'failed';
      if (this.paymentData) {
        this.paymentData.status = 'EXPIRED';
      }
      this.stopStatusCheck();
    },
    
    completeOrder() {
      // Clear the cart
      localStorage.setItem('cart', '[]');
      
      // Trigger storage event for App.vue to update cart count
      window.dispatchEvent(new Event('storage'));
      
      // Navigate to success page with order details
      this.$router.push({
        path: '/payment-success',
        query: {
          orderId: this.orderId,
          amount: this.cryptoAmount,
          symbol: this.selectedCrypto,
          txid: this.transactionId
        }
      });
    },
    
    retryPayment() {
      // Reset payment status and try again
      this.initiatePayment();
    }
  },
  
  mounted() {
    this.loadCart();
    this.initializeSDK();
  },
  
  beforeUnmount() {
    this.stopStatusCheck();
  }
};
</script>

<style scoped>
.checkout-page {
  padding: 40px 0;
  background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
  min-height: calc(100vh - 60px); /* Adjust based on your header height */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  margin-bottom: 30px;
  color: #2c3e50;
  text-align: center;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
}

.order-details, .payment-section {
  background-color: #f8fafc;
  background-image: linear-gradient(to bottom, #f8fafc, #eef2f7);
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  padding: 25px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.order-details:hover, .payment-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.order-items {
  margin-bottom: 20px;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.order-item:last-child {
  border-bottom: none;
}

.order-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
}

.item-info {
  flex: 1;
}

.item-info h3 {
  margin: 0 0 5px 0;
  font-size: 1rem;
}

.item-price {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

.item-total {
  font-weight: bold;
  color: #2c3e50;
}

.order-summary {
  background-color: #f0f4f8;
  border-radius: 10px;
  padding: 18px;
  margin-top: 20px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  padding: 15px 0 5px;
  margin-top: 10px;
  border-top: 2px solid #2c3e50;
  font-weight: bold;
  font-size: 1.1rem;
  color: #2c3e50;
}

.payment-option-header {
  margin-bottom: 20px;
}

.payment-option-header h3 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.payment-option-header p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.crypto-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
}

.crypto-option {
  display: flex;
  align-items: center;
  padding: 18px;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #f0f7ff;
}

.crypto-option:hover {
  border-color: #42b983;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(66, 185, 131, 0.1);
}

.crypto-option.active {
  border-color: #42b983;
  background-color: rgba(66, 185, 131, 0.08);
  box-shadow: 0 5px 15px rgba(66, 185, 131, 0.15);
}

.crypto-option img {
  width: 30px;
  height: 30px;
  margin-right: 15px;
}

.crypto-info {
  flex: 1;
}

.crypto-name {
  display: block;
  font-weight: bold;
  color: #2c3e50;
}

.crypto-symbol {
  display: block;
  font-size: 0.8rem;
  color: #666;
}

.crypto-chain {
  color: #42b983;
  font-size: 0.75rem;
  margin-left: 4px;
}

.crypto-check {
  color: #42b983;
}

.payment-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.btn-back, .btn-pay {
  padding: 12px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-back {
  background-color: white;
  color: #2c3e50;
  border: 1px solid #2c3e50;
}

.btn-back:hover {
  background-color: #f5f5f5;
}

.btn-pay {
  background-color: #42b983;
  color: white;
  border: none;
}

.btn-pay:hover {
  background-color: #3aa876;
}

.btn-pay:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.payment-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  width: 90%;
  max-width: 500px;
}

.modal-content {
  background-color: #f8fafc;
  background-image: linear-gradient(to bottom, #f8fafc, #eef2f7);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.3rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 20px;
}

.payment-info {
  text-align: center;
  margin-bottom: 20px;
}

.payment-amount {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
}

.payment-fiat {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0;
  margin-bottom: 10px;
}

.payment-instruction {
  color: #666;
  margin: 0;
}

.qr-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.payment-details {
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.detail-row {
  display: flex;
  margin-bottom: 10px;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.label {
  font-weight: bold;
  width: 80px;
  color: #666;
}

.value {
  flex: 1;
  word-break: break-all;
}

.payment-status {
  text-align: center;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

.status-pending, .status-success, .status-failed {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.status-pending {
  color: #f39c12;
}

.status-success {
  color: #42b983;
}

.status-failed {
  color: #e74c3c;
}

.spinner {
  animation: rotate 2s linear infinite;
  width: 24px;
  height: 24px;
}

.path {
  stroke: #f39c12;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

.modal-footer {
  padding: 15px 20px;
  background-color: #f8f8f8;
  border-top: 1px solid #eee;
  text-align: right;
}

.btn-complete, .btn-retry, .btn-cancel {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-complete {
  background-color: #42b983;
  color: white;
  border: none;
}

.btn-retry {
  background-color: #f39c12;
  color: white;
  border: none;
}

.btn-cancel {
  background-color: white;
  color: #2c3e50;
  border: 1px solid #ddd;
}

/* Confirmation Modal Styles */
.confirmation-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 102;
  width: 90%;
  max-width: 400px;
}

.confirm-content {
  background-color: #f8fafc;
  background-image: linear-gradient(to bottom, #f8fafc, #eef2f7);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  animation: modalFadeIn 0.3s ease-out;
}

.confirm-header {
  padding: 15px 20px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #eee;
}

.confirm-header h3 {
  margin: 0;
  color: #e74c3c;
  font-size: 1.2rem;
}

.confirm-body {
  padding: 20px;
  text-align: center;
}

.confirm-body p {
  margin: 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.confirm-footer {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #f8f8f8;
  border-top: 1px solid #eee;
}

.btn-cancel-payment {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #e74c3c;
  color: white;
  border: none;
}

.btn-cancel-payment:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }
  
  .payment-actions {
    grid-template-columns: 1fr;
  }
}
</style>