export interface User {
  id: string;
  email: string;
  role: "seller" | "admin";
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
