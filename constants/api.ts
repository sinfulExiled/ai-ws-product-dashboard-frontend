export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";
export const AI_BASE =
  process.env.NEXT_PUBLIC_AI_URL || "http://localhost:4003";
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4002";
export const LOW_STOCK_THRESHOLD = Number(
  process.env.NEXT_PUBLIC_LOW_STOCK_THRESHOLD || 5
);
