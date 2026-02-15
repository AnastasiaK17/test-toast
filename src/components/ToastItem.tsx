import React, { useEffect, useState } from "react";
import type { Toast } from "../types/types";

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [remainingTime, setRemainingTime] = useState<number>(
    toast.duration ?? 3000,
  );
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const visibleTimeout = setTimeout(() => {
      setVisible(true);
    }, 0);

    if (remainingTime <= 0) {
      setTimeout(() => {
        setVisible(false);
        onRemove(toast.id);
      }, 500);
      return () => clearTimeout(visibleTimeout);
    }

    const interval = setInterval(() => {
      if (!paused) {
        setRemainingTime((prevTime) => {
          if (prevTime <= 100) {
            setVisible(false);
            setTimeout(() => onRemove(toast.id), 500);
            return 0;
          }

          return prevTime - 100;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [remainingTime, paused, onRemove, toast.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRemainingTime(toast.duration ?? 3000);
    }, 0);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);
  return (
    <div
      className={`toast toast-${toast.type} ${visible ? "toast-enter" : "toast-leave"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>{toast.message}</span>
      <button onClick={() => onRemove(toast.id)}>x</button>
    </div>
  );
};
