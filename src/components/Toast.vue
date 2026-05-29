<template>
  <transition name="toast">
    <div v-if="visible" class="toast" :class="type">
      <div class="toast-icon">
        <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <svg v-else-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        <svg v-else-if="type === 'info'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </div>
      <div class="toast-message">{{ message }}</div>
      <button class="toast-close" @click="close">×</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'error', 'info'].includes(value)
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      visible: true,
      timer: null
    };
  },
  mounted() {
    this.timer = setTimeout(() => {
      this.close();
    }, this.duration);
  },
  beforeUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },
  methods: {
    close() {
      this.visible = false;
      setTimeout(() => {
        this.$emit('close');
      }, 300); // Wait for transition to complete
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  min-width: 250px;
  max-width: 350px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  animation: slideIn 0.3s ease-out forwards;
  background-color: #f8fafc;
  background-image: linear-gradient(to bottom, #f8fafc, #eef2f7);
}

.toast-icon {
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-message {
  flex: 1;
  font-size: 14px;
}

.toast-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
  padding: 0;
  margin-left: 10px;
}

.toast-close:hover {
  opacity: 1;
}

.success {
  border-left: 4px solid #42b983;
}

.success .toast-icon {
  color: #42b983;
}

.error {
  border-left: 4px solid #e74c3c;
}

.error .toast-icon {
  color: #e74c3c;
}

.info {
  border-left: 4px solid #3498db;
}

.info .toast-icon {
  color: #3498db;
}

.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@keyframes slideIn {
  from {
    transform: translateX(30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>