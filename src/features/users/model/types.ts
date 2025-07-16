export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}
