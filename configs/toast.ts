import { toast } from "react-toastify";

export const FALLBACK_ERROR_MSG = "An error occurred, please try again later";
export const ToastTemplate = {
  unknown: () => toast.error(FALLBACK_ERROR_MSG),
  success: (mess: string) => {
    return toast.success(mess);
  },
  fail: (mess: string) => toast.error(mess),
};
