import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  nom: string;
  role_id: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for session on initial load
    const checkSession = async () => {
      try {
        // For demo purposes, we'll simulate a user session
        // In a real app, you would check Supabase session
        const demoUser = localStorage.getItem('wanec-user');
        
        if (demoUser) {
          setUser(JSON.parse(demoUser));
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // This would be a real Supabase auth call in production
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });
      
      // For demo purposes, we'll simulate authentication
      if (email === 'admin@wanec.com' && password === 'password') {
        const mockUser = {
          id: '123456',
          email: 'admin@wanec.com',
          nom: 'Admin',
          role_id: '1',
        };
        
        setUser(mockUser);
        localStorage.setItem('wanec-user', JSON.stringify(mockUser));
        
        return { error: null };
      }
      
      return { error: { message: 'Email ou mot de passe incorrect' } };
    } catch (error) {
      console.error('Error during sign in:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      // In production: await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem('wanec-user');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};