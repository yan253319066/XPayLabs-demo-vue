<template>
  <div class="cart-page">
    <div class="container">
      <h1>Your Shopping Cart</h1>
      
      <div v-if="cart.length === 0" class="empty-cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p>Your cart is empty</p>
        <router-link to="/products" class="btn-continue">Continue Shopping</router-link>
      </div>
      
      <div v-else class="cart-content">
        <div class="cart-items">
          <div class="cart-header">
            <span class="header-product">Product</span>
            <span class="header-price">Price</span>
            <span class="header-quantity">Quantity</span>
            <span class="header-total">Total</span>
            <span class="header-action"></span>
          </div>
          
          <div v-for="item in cart" :key="item.id" class="cart-item">
            <div class="item-product">
              <img :src="item.image" :alt="item.name">
              <div class="item-details">
                <h3>{{ item.name }}</h3>
                <p class="item-category">{{ item.category }}</p>
              </div>
            </div>
            <div class="item-price">${{ item.price.toFixed(2) }}</div>
            <div class="item-quantity">
              <button @click="decreaseQuantity(item)" class="quantity-btn">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="quantity-btn">+</button>
            </div>
            <div class="item-total">${{ (item.price * item.quantity).toFixed(2) }}</div>
            <div class="item-action">
              <button @click="removeItem(item)" class="remove-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div class="cart-summary">
          <h2>Order Summary</h2>
          
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
          
          <div class="summary-actions">
            <router-link to="/products" class="btn-continue">Continue Shopping</router-link>
            <button @click="proceedToCheckout" class="btn-checkout">Proceed to Checkout</button>
          </div>
          
          <div class="payment-methods">
            <p>Cryptocurrency Payment Options:</p>
            <div class="crypto-options">
              <div class="crypto-option">
                <img src="../assets/eth-logo.svg" alt="ETH">
              </div>
              <div class="crypto-option">
                <img src="../assets/usdt-logo.svg" alt="USDT">
              </div>
              <div class="crypto-option">
                <img src="../assets/tron-logo.png" alt="TRX">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      cart: [],
      shipping: 10.00
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
    loadCart() {
      this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
      // Trigger storage event for App.vue to update cart count
      window.dispatchEvent(new Event('storage'));
    },
    increaseQuantity(item) {
      item.quantity += 1;
      this.saveCart();
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        this.saveCart();
      }
    },
    removeItem(item) {
      this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
      this.saveCart();
    },
    proceedToCheckout() {
      if (this.cart.length > 0) {
        this.$router.push('/checkout');
      }
    }
  },
  mounted() {
    this.loadCart();
  }
};
</script>

<style scoped>
.cart-page {
  padding: 40px 0;
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

.empty-cart {
  text-align: center;
  padding: 60px 0;
}

.empty-cart svg {
  color: #ccc;
  margin-bottom: 20px;
  width: 100px;
  height: 100px;
}

.empty-cart p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
}

.cart-items {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.cart-header {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 50px;
  padding: 15px 20px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #eee;
  font-weight: bold;
  color: #2c3e50;
}

.cart-item {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 50px;
  padding: 20px;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-product {
  display: flex;
  align-items: center;
}

.item-product img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
}

.item-details h3 {
  margin: 0 0 5px 0;
  font-size: 1rem;
}

.item-category {
  color: #666;
  font-size: 0.8rem;
  text-transform: capitalize;
  margin: 0;
}

.item-price, .item-total {
  font-weight: bold;
  color: #2c3e50;
}

.item-quantity {
  display: flex;
  align-items: center;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
}

.item-quantity span {
  margin: 0 10px;
  min-width: 20px;
  text-align: center;
}

.remove-btn {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  padding: 5px;
}

.cart-summary {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  padding: 25px;
  border: 1px solid rgba(0, 0, 0, 0.03);
  background-image: linear-gradient(to bottom, #ffffff, #fafbfd);
}

.cart-summary h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
  font-size: 1.3rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  margin-top: 10px;
  border-top: 2px solid #2c3e50;
  font-weight: bold;
  font-size: 1.2rem;
  color: #2c3e50;
}

.summary-actions {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.btn-continue, .btn-checkout {
  padding: 12px;
  border-radius: 6px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-block;
}

.btn-continue {
  background-color: white;
  color: #2c3e50;
  border: 1px solid #2c3e50;
}

.btn-continue:hover {
  background-color: #f5f5f5;
}

.btn-checkout {
  background-color: #42b983;
  color: white;
  border: none;
}

.btn-checkout:hover {
  background-color: #3aa876;
}

.payment-methods {
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.payment-methods p {
  margin-top: 0;
  color: #666;
  font-size: 0.9rem;
}

.crypto-options {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
}

.crypto-option img {
  width: 30px;
  height: 30px;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-header {
    display: none;
  }
  
  .cart-item {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .item-product {
    grid-column: 1;
    margin-bottom: 10px;
  }
  
  .item-price, .item-quantity, .item-total, .item-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
  }
  
  .item-price::before {
    content: 'Price:';
    font-weight: normal;
  }
  
  .item-quantity::before {
    content: 'Quantity:';
    font-weight: normal;
  }
  
  .item-total::before {
    content: 'Total:';
    font-weight: normal;
  }
  
  .item-action {
    justify-content: flex-end;
  }
}
</style>