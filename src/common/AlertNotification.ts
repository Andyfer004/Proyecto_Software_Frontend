import { ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class NotificationService{

    static options:ToastOptions = 
    {
        position:"bottom-center",
        autoClose:7000,
        
    }


    static success(message: string) {
        toast.success(message, this.options);
    }

    static info(message: string) {
        toast.info(message, this.options);
    }

    static warning(message: string) {
        toast.warning(message, this.options);
    }

    static error(message: string) {
        toast.error(message, this.options);
    }
}

export default NotificationService;
