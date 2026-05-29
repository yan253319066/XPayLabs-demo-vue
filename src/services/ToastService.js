import { createApp } from 'vue';
import Toast from '../components/Toast.vue';

const ToastService = {
  show(options) {
    const { message, type = 'info', duration = 3000 } = options;
    
    // Create a div to mount the toast
    const mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
    
    // Create the toast instance
    const toastApp = createApp(Toast, {
      message,
      type,
      duration,
      onClose: () => {
        // Remove the component when closed
        toastApp.unmount();
        document.body.removeChild(mountPoint);
      }
    });
    
    // Mount the toast
    toastApp.mount(mountPoint);
  },
  
  success(message, duration) {
    this.show({ message, type: 'success', duration });
  },
  
  error(message, duration) {
    this.show({ message, type: 'error', duration });
  },
  
  info(message, duration) {
    this.show({ message, type: 'info', duration });
  }
};

export default ToastService;