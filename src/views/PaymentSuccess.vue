<template>
  <div class="payment-success-page">
    <div class="container">
      <div class="success-card">
        <div class="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        
        <h1>Payment Successful!</h1>
        <p class="success-message">Thank you for your purchase. Your order has been confirmed.</p>
        
        <div class="order-details">
          <h2>Order Details</h2>
          
          <div class="detail-row">
            <span class="label">Order ID:</span>
            <span class="value">{{ orderId }}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Amount Paid:</span>
            <span class="value">{{ amount }} {{ symbol }}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Date:</span>
            <span class="value">{{ formatDate(new Date()) }}</span>
          </div>
        </div>
        
        <div class="next-steps">
          <p>Your digital receipt has been sent to your email address.</p>
          <p>You can track your order status in your account dashboard.</p>
        </div>
        
        <div class="action-buttons">
          <button @click="goToProducts" class="btn-continue">Continue Shopping</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentSuccess',
  data() {
    return {
      orderId: '',
      amount: '',
      symbol: ''
    };
  },
  methods: {
    goToProducts() {
      this.$router.push('/products');
    },
    formatDate(date) {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return date.toLocaleDateString('en-US', options);
    }
  },
  mounted() {
    // Get order details from query parameters
    const { orderId, amount, symbol } = this.$route.query;
    
    if (orderId) {
      this.orderId = orderId;
    }
    
    if (amount) {
      this.amount = amount;
    }
    
    if (symbol) {
      this.symbol = symbol;
    }
  }
};
</script>

<style scoped>
.payment-success-page {
  padding: 60px 0;
  background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.success-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  padding: 50px;
  text-align: center;
  animation: cardAppear 0.6s ease-out;
}

@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-icon {
  color: #42b983;
  margin-bottom: 25px;
  animation: iconPulse 2s infinite;
}

@keyframes iconPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

h1 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.success-message {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 30px;
}

.order-details {
  background-color: #f0f7fa;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 35px;
  text-align: left;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(178, 235, 242, 0.5);
}

h2 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.3rem;
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
  width: 120px;
  color: #666;
}

.value {
  flex: 1;
}

.next-steps {
  margin-bottom: 30px;
}

.next-steps p {
  margin: 5px 0;
  color: #666;
}

.action-buttons {
  display: flex;
  justify-content: center;
}

.btn-continue {
  background: linear-gradient(135deg, #42b983 0%, #3aa876 100%);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 14px 35px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(66, 185, 131, 0.3);
}

.btn-continue:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(66, 185, 131, 0.4);
}

.btn-continue:active {
  transform: translateY(1px);
}

@media (max-width: 768px) {
  .success-card {
    padding: 30px 20px;
  }
  
  .detail-row {
    flex-direction: column;
  }
  
  .label {
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>