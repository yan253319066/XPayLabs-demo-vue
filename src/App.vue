<template>
  <div class="app-container">
    <header>
      <div class="header-content">
        <h1>TechGadget Store</h1>
        <nav>
          <router-link to="/products">Products</router-link>
          <div class="cart-icon" @click="goToCart">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
          </div>
        </nav>
      </div>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>TechGadget Store - Powered by XPay Labs Cryptocurrency Payments &copy; 2023</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItemCount: 0
    };
  },
  methods: {
    goToCart() {
      this.$router.push('/cart');
    },
    updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    }
  },
  mounted() {
    this.updateCartCount();
    
    // Update cart count when storage changes
    window.addEventListener('storage', this.updateCartCount);
    
    // Check cart periodically
    setInterval(this.updateCartCount, 2000);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.updateCartCount);
  }
};
</script>

<style>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  color: #333;
  background-color: #f0f4f8;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  background-color: #2c3e50;
  background-image: linear-gradient(to right, #2c3e50, #4a6785);
  color: white;
  padding: 15px 0;
  margin-bottom: 30px;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  margin: 0;
  font-size: 1.8rem;
}

nav {
  display: flex;
  align-items: center;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-weight: 500;
  transition: color 0.3s;
}

nav a:hover {
  color: #42b983;
}

nav a.router-link-active {
  color: #42b983;
}

.cart-icon {
  position: relative;
  cursor: pointer;
  margin-left: 15px;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #42b983;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
}

main {
  background-color: #f8fafc;
  background-image: linear-gradient(to bottom, #f8fafc, #eef2f7);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  min-height: 400px;
  margin-bottom: 30px;
}

footer {
  margin-top: 30px;
  text-align: center;
  color: #666;
  font-size: 0.9em;
  padding: 20px 0;
  border-top: 1px solid #eee;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  h1 {
    margin-bottom: 15px;
  }
  
  nav {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  nav a {
    margin: 5px 10px;
  }
}
</style>
