import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

const mockUser: User = {
  id: '1',
  name: 'Acme Inc.',
  email: 'admin@acme.com',
  role: 'admin',
  location: 'New York, USA',
  bio: 'Building the future of SaaS.',
  joinedAt: '2024-01-15',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, _password: string) => {
        set({ isLoading: true, error: null });
        await new Promise((r) => setTimeout(r, 800));

        if (email === 'admin@acme.com' || email.includes('@')) {
          set({
            user: { ...mockUser, email },
            token: 'mock-jwt-token-' + Date.now(),
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({ isLoading: false, error: 'Invalid credentials. Try any email address.' });
        }
      },

      register: async (name: string, email: string, _password: string) => {
        set({ isLoading: true, error: null });
        await new Promise((r) => setTimeout(r, 1000));
        set({
          user: { ...mockUser, name, email },
          token: 'mock-jwt-token-' + Date.now(),
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      resetPassword: async (_email: string) => {
        set({ isLoading: true, error: null });
        await new Promise((r) => setTimeout(r, 1000));
        set({ isLoading: false });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'mosaic-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
