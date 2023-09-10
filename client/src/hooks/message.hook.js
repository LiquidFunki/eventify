import { useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useMessage = () => useCallback((text, type = 'info') => {
  if (type === 'success') {
    toast.success(text);
  } else if (type === 'error') {
    toast.error(text);
  } else if (type === 'warning') {
    toast.warning(text);
  } else {
    toast.info(text);
  }
}, []);
