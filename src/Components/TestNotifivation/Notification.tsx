import { toast } from "react-toastify";
import type { ToastOptions } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";


// Initialize toast configuration globally
export const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

// Success Notification
export const showSuccessToast = (message: string): void => {
  toast.success(message, toastConfig);
};

// Error Notification
export const showErrorToast = (message: string): void => {
  toast.error(message, toastConfig);
};

// Info Notification
export const showInfoToast = (message: string): void => {
  toast.info(message, toastConfig);
};

// Warning Notification
export const showWarningToast = (message: string): void => {
  toast.warn(message, toastConfig);
};
