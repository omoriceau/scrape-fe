import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createAuthStore() {
  const { subscribe, set, update } = writable({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  });

  return {
    subscribe,
    
    async login(email, password) {
      update(s => ({ ...s, loading: true, error: null }));
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (email === 'demo@example.com' && password === 'password') {
          const user = { id: 1, email, name: 'Demo User' };
          const token = 'demo-jwt-token';
          
          if (browser) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
          }
          
          set({ user, token, isAuthenticated: true, loading: false, error: null });
          return { success: true };
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (error) {
        update(s => ({ ...s, loading: false, error: error.message }));
        return { success: false, error: error.message };
      }
    },
    
    async register(userData) {
      update(s => ({ ...s, loading: true, error: null }));
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = { id: Date.now(), ...userData };
        const token = 'demo-jwt-token';
        
        if (browser) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
        }
        
        set({ user, token, isAuthenticated: true, loading: false, error: null });
        return { success: true };
      } catch (error) {
        update(s => ({ ...s, loading: false, error: error.message }));
        return { success: false, error: error.message };
      }
    },
    
    logout() {
      if (browser) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      set({ user: null, token: null, isAuthenticated: false, loading: false, error: null });
    },
    
    checkAuth() {
      if (browser) {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (token && userStr) {
          try {
            const user = JSON.parse(userStr);
            set({ user, token, isAuthenticated: true, loading: false, error: null });
          } catch (error) {
            this.logout();
          }
        }
      }
    }
  };
}

export const auth = createAuthStore();