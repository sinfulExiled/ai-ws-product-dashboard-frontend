export interface Notification {
  message: string;
  type: "info" | "warning" | "error";
  timestamp: string;
}
