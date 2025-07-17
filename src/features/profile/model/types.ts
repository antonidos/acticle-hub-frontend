import { User } from '@shared/types';

export interface ProfileState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
