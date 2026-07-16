import { useState, useCallback, useEffect } from "react";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success";
  duration?: number;
}

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000;

type ToastAction = 
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "REMOVE_TOAST"; id: string }
  | { type: "DISMISS_TOAST"; id: string }
  | { type: "CLEAR_TOASTS" };

const reducer = (state: Toast[], action: ToastAction): Toast[] => {
  switch (action.type) {
    case "ADD_TOAST":
      return [action.toast, ...state].slice(0, TOAST_LIMIT);
    case "REMOVE_TOAST":
      return state.filter((t) => t.id !== action.id);
    case "DISMISS_TOAST":
      return state.map((t) =>
        t.id === action.id ? { ...t, duration: 0 } : t
      );
    case "CLEAR_TOASTS":
      return [];
    default:
      return state;
  }
};

function useToastReducer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dispatch = useCallback((action: ToastAction) => {
    setToasts((prev) => reducer(prev, action));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, "id"> & { id?: string }) => {
      const id = toast.id || Math.random().toString(36).substr(2, 9);
      dispatch({ type: "ADD_TOAST", toast: { ...toast, id } });
      return id;
    },
    [dispatch]
  );

  const removeToast = useCallback(
    (id: string) => dispatch({ type: "REMOVE_TOAST", id }),
    [dispatch]
  );

  const dismissToast = useCallback(
    (id: string) => dispatch({ type: "DISMISS_TOAST", id }),
    [dispatch]
  );

  const clearToasts = useCallback(() => dispatch({ type: "CLEAR_TOASTS" }), [dispatch]);

  return { toasts, addToast, removeToast, dismissToast, clearToasts };
}

export function useToast() {
  const { toasts, addToast, removeToast, dismissToast, clearToasts } = useToastReducer();

  useEffect(() => {
    const timeouts = toasts
      .filter((t) => t.duration !== 0)
      .map((toast) =>
        setTimeout(() => {
          dismissToast(toast.id);
          setTimeout(() => removeToast(toast.id), TOAST_REMOVE_DELAY);
        }, toast.duration || 5000)
      );

    return () => timeouts.forEach(clearTimeout);
  }, [toasts, dismissToast, removeToast]);

  return {
    toasts,
    toast: addToast,
    dismiss: dismissToast,
    remove: removeToast,
    clear: clearToasts,
  };
}

export function toast(toast: Omit<Toast, "id">) {
  return { id: Math.random().toString(36).substr(2, 9), ...toast };
}

