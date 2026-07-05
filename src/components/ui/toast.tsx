export interface ToastMessage {
  title: string;
  description?: string;
  variant?: "default" | "success" | "warning" | "danger";
}

export function toast(message: ToastMessage): ToastMessage {
  return message;
}
