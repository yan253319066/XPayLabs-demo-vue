import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Products from './views/Products.vue';
import Cart from './views/Cart.vue';
import Checkout from './views/Checkout.vue';
import PaymentSuccess from './views/PaymentSuccess.vue';
import PaymentDemo from './views/PaymentDemo.vue';

const routes = [
  { path: '/', component: Products },
  { path: '/products', component: Products },
  { path: '/cart', component: Cart },
  { path: '/checkout', component: Checkout },
  { path: '/payment-success', component: PaymentSuccess },
  { path: '/payment-demo', component: PaymentDemo }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');