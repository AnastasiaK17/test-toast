import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Toast } from "../types/types";
import { ToastItem } from "../components/ToastItem";

const ToastContext = createContext({} as any);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  console.log(toasts);

  const addToast = (toast: Omit<Toast, "id">) => {
    setToasts((prevToasts) => {
      const existingToastIndex = prevToasts.findIndex(
        (t) => t.message === toast.message && t.type === toast.type,
      );

      if (existingToastIndex !== -1) {
        const updatedToast = {
          ...prevToasts[existingToastIndex],
          duration: toast.duration,
        };
        return [
          ...prevToasts.slice(0, existingToastIndex),
          updatedToast,
          ...prevToasts.slice(existingToastIndex + 1),
        ];
      }

      const id = `${Date.now()}`;

      return [...prevToasts, { id, ...toast }];
    });
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-list">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
