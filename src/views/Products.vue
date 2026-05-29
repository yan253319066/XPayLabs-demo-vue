<template>
  <div class="products-page">
    <div class="hero-banner">
      <div class="hero-content">
        <h1>Shop the Latest Tech</h1>
        <p>Premium gadgets with cryptocurrency payment options</p>
      </div>
    </div>
    
    <div class="container">
      <div class="filters-container">
        <div class="filters">
          <div class="search-bar">
            <input type="text" v-model="searchQuery" placeholder="Search products...">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <div class="category-filters">
            <button 
              @click="selectedCategory = ''" 
              :class="{ active: selectedCategory === '' }" 
              class="category-btn"
            >
              All
            </button>
            <button 
              @click="selectedCategory = 'smartphones'" 
              :class="{ active: selectedCategory === 'smartphones' }" 
              class="category-btn"
            >
              Smartphones
            </button>
            <button 
              @click="selectedCategory = 'laptops'" 
              :class="{ active: selectedCategory === 'laptops' }" 
              class="category-btn"
            >
              Laptops
            </button>
            <button 
              @click="selectedCategory = 'accessories'" 
              :class="{ active: selectedCategory === 'accessories' }" 
              class="category-btn"
            >
              Accessories
            </button>
            <button 
              @click="selectedCategory = 'wearables'" 
              :class="{ active: selectedCategory === 'wearables' }" 
              class="category-btn"
            >
              Wearables
            </button>
          </div>
        </div>
      </div>
      
      <div class="products-count">
        <p>Showing <span>{{ filteredProducts.length }}</span> products</p>
      </div>
      
      <div class="product-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
          <div class="product-image">
            <img :src="product.image" :alt="product.name">
            <div class="quick-actions">
              <button @click="addToCart(product)" class="quick-action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </button>
              <button @click="buyNow(product)" class="quick-action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </button>
            </div>
          </div>
          <div class="product-info">
            <p class="product-category">{{ product.category }}</p>
            <h3>{{ product.name }}</h3>
            <div class="rating">
              <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= product.rating }">★</span>
              <span class="review-count">({{ product.reviews }})</span>
            </div>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-price-row">
              <p class="product-price">${{ product.price.toFixed(2) }}</p>
              <p class="product-original-price" v-if="product.originalPrice">${{ product.originalPrice.toFixed(2) }}</p>
            </div>
            <div class="product-actions">
              <button @click="addToCart(product)" class="btn-add-cart">Add to Cart</button>
              <button @click="buyNow(product)" class="btn-buy-now">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="filteredProducts.length === 0" class="no-products">
        <p>No products found matching your criteria.</p>
        <button @click="resetFilters" class="reset-btn">Reset Filters</button>
      </div>
    </div>
    
    <div class="payment-methods-banner">
      <div class="container">
        <h3>Secure Cryptocurrency Payments</h3>
        <div class="crypto-logos">
          <div class="crypto-logo">
            <img src="../assets/eth-logo.svg" alt="Ethereum">
            <span>ETH</span>
          </div>
          <div class="crypto-logo">
            <img src="../assets/usdt-logo.svg" alt="USDT">
            <span>USDT</span>
          </div>
          <div class="crypto-logo">
            <img src="../assets/tron-logo.png" alt="TRON">
            <span>TRX</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      products: [
        {
          id: 1,
          name: 'Smart Watch Pro',
          price: 199.99,
          originalPrice: 249.99,
          category: 'wearables',
          description: 'Advanced smartwatch with health monitoring and notification features.',
          image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
          rating: 4,
          reviews: 128,
          badge: 'Sale'
        },
        {
          id: 2,
          name: 'Wireless Earbuds Pro',
          price: 149.99,
          category: 'accessories',
          description: 'Premium wireless earbuds with noise cancellation and long battery life.',
          image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
          rating: 5,
          reviews: 94
        },
        {
          id: 3,
          name: 'Ultra HD Camera X1',
          price: 499.99,
          category: 'accessories',
          description: '4K Ultra HD camera with professional grade features and image stabilization.',
          image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          rating: 4,
          reviews: 56,
          badge: 'New'
        },
        {
          id: 4,
          name: 'Gaming Laptop RTX',
          price: 1299.99,
          originalPrice: 1499.99,
          category: 'laptops',
          description: 'High-performance gaming laptop with dedicated graphics and fast refresh rate display.',
          image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          rating: 5,
          reviews: 203,
          badge: 'Sale'
        },
        {
          id: 5,
          name: 'Smartphone X Pro',
          price: 899.99,
          category: 'smartphones',
          description: 'Latest flagship smartphone with advanced camera system and all-day battery life.',
          image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          rating: 4,
          reviews: 187,
          badge: 'Best Seller'
        },
        {
          id: 6,
          name: 'Bluetooth Speaker 360',
          price: 79.99,
          category: 'accessories',
          description: 'Portable Bluetooth speaker with 360° sound and waterproof design.',
          image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          rating: 4,
          reviews: 76
        },
        {
          id: 7,
          name: 'Fitness Tracker Plus',
          price: 89.99,
          originalPrice: 119.99,
          category: 'wearables',
          description: 'Lightweight fitness tracker with heart rate monitoring and sleep tracking.',
          image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zml0bmVzcyUyMHRyYWNrZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
          rating: 3,
          reviews: 42,
          badge: 'Sale'
        },
        {
          id: 8,
          name: 'Ultrabook Pro M2',
          price: 1099.99,
          category: 'laptops',
          description: 'Thin and light ultrabook with all-day battery life and premium build quality.',
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          rating: 5,
          reviews: 156
        },
        {
          id: 9,
          name: 'Wireless Charging Pad',
          price: 39.99,
          category: 'accessories',
          description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
          image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2lyZWxlc3MlMjBjaGFyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          rating: 4,
          reviews: 89
        },
        {
          id: 10,
          name: 'VR Headset Elite',
          price: 299.99,
          category: 'accessories',
          description: 'Immersive virtual reality headset with high-resolution display and motion tracking.',
          image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dnIlMjBoZWFkc2V0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          rating: 4,
          reviews: 67,
          badge: 'New'
        },
        {
          id: 11,
          name: 'Smartphone Y Lite',
          price: 399.99,
          category: 'smartphones',
          description: 'Budget-friendly smartphone with great performance and camera quality.',
          image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
          rating: 3,
          reviews: 124
        },
        {
          id: 12,
          name: 'Mechanical Keyboard RGB',
          price: 129.99,
          category: 'accessories',
          description: 'Premium mechanical keyboard with customizable RGB lighting and programmable keys.',
          image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVjaGFuaWNhbCUyMGtleWJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          rating: 5,
          reviews: 78,
          badge: 'Best Seller'
        }
      ]
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                             product.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
        
        return matchesSearch && matchesCategory;
      });
    }
  },
  methods: {
    addToCart(product) {
      // Get current cart from localStorage or initialize empty array
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Check if product already exists in cart
      const existingProductIndex = cart.findIndex(item => item.id === product.id);
      
      if (existingProductIndex >= 0) {
        // Increment quantity if product already in cart
        cart[existingProductIndex].quantity += 1;
      } else {
        // Add new product with quantity 1
        cart.push({
          ...product,
          quantity: 1
        });
      }
      
      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Trigger storage event for App.vue to update cart count
      window.dispatchEvent(new Event('storage'));
      
      // Show notification (could be replaced with a nicer toast notification)
      this.$nextTick(() => {
        alert(`${product.name} added to cart!`);
      });
    },
    buyNow(product) {
      // Clear cart and add only this product
      const cart = [{
        ...product,
        quantity: 1
      }];
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Trigger storage event for App.vue to update cart count
      window.dispatchEvent(new Event('storage'));
      
      // Navigate to checkout
      this.$router.push('/cart');
    },
    resetFilters() {
      this.searchQuery = '';
      this.selectedCategory = '';
    }
  }
};
</script>

<style scoped>
.products-page {
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-banner {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  margin-bottom: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.hero-banner::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
}

.hero-content {
  max-width: 800px;
  padding: 20px;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.filters-container {
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 15px 0;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
  border-radius: 8px;
}

.filters {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.search-bar {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
}

.search-bar input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-bar input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.category-btn:hover {
  background-color: #f5f5f5;
}

.category-btn.active {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
}

.products-count {
  margin-bottom: 20px;
  color: #666;
  font-size: 0.9rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.product-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.product-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #e74c3c;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 2;
}

.product-badge:empty {
  display: none;
}

.product-image {
  height: 220px;
  overflow: hidden;
  position: relative;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.quick-actions {
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  transition: bottom 0.3s;
}

.product-card:hover .quick-actions {
  bottom: 0;
}

.quick-action-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: white;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.quick-action-btn:hover {
  background-color: #42b983;
  color: white;
}

.product-info {
  padding: 20px;
}

.product-category {
  color: #666;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.product-info h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  color: #2c3e50;
  height: 2.4em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.rating {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.star {
  color: #ddd;
  font-size: 1rem;
}

.star.filled {
  color: #f39c12;
}

.review-count {
  margin-left: 5px;
  font-size: 0.8rem;
  color: #666;
}

.product-description {
  color: #666;
  margin-bottom: 15px;
  font-size: 0.9rem;
  height: 3.6em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.product-price-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.product-price {
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0;
}

.product-original-price {
  text-decoration: line-through;
  color: #999;
  margin: 0 0 0 10px;
  font-size: 1rem;
}

.product-actions {
  display: flex;
  gap: 10px;
}

.btn-add-cart, .btn-buy-now {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.btn-add-cart {
  background-color: #2c3e50;
  color: white;
}

.btn-add-cart:hover {
  background-color: #1a2530;
}

.btn-buy-now {
  background-color: #42b983;
  color: white;
}

.btn-buy-now:hover {
  background-color: #3aa876;
}

.no-products {
  text-align: center;
  padding: 40px;
  color: #666;
}

.reset-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 15px;
}

.payment-methods-banner {
  background-color: #eef5fd;
  background-image: linear-gradient(to right, #eef5fd, #e5f0fc);
  padding: 40px 0;
  margin-top: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.payment-methods-banner h3 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.crypto-logos {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.crypto-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.crypto-logo img {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.crypto-logo span {
  font-weight: bold;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-content p {
    font-size: 1rem;
  }
  
  .filters {
    flex-direction: column;
    align-items: center;
  }
  
  .search-bar {
    margin-bottom: 15px;
  }
  
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
  
  .crypto-logos {
    flex-wrap: wrap;
  }
}
</style>