import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';
import { api } from '../api/client';

interface AuthResponse {
  user: User;
  token: string;
}

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post<AuthResponse>('/auth/login', { email, password });
          set({ user: res.user, token: res.token, isAuthenticated: true, isLoading: false });
        } catch (err) {
          set({ isLoading: false, error: err instanceof Error ? err.message : 'Login failed' });
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post<AuthResponse>('/auth/register', { name, email, password });
          set({ user: res.user, token: res.token, isAuthenticated: true, isLoading: false });
        } catch (err) {
          set({ isLoading: false, error: err instanceof Error ? err.message : 'Registration failed' });
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      resetPassword: async (email: string) => {
        void email;
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
