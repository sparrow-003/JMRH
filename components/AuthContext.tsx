
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: Partial<UserProfile> & { password?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  logVisit: (path: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const mapProfile = (data: any): UserProfile => ({
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    role: data.role as UserRole,
    city: data.city,
    pincode: data.pincode,
    age: data.age,
    phdStatus: data.phd_status,
    department: data.department,
    institutionName: data.institution_name,
    isVerified: data.is_verified,
    status: data.status,
    createdAt: data.created_at
  });

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // Profile missing
        if (error.message.includes('public.profiles')) {
          console.error("DATABASE SCHEMA ERROR: The 'profiles' table has not been created in Supabase SQL Editor.");
        }
        throw error;
      }
      if (data) {
        const profile = mapProfile(data);
        setUser(profile);
        return profile;
      }
    } catch (e) {
      console.error('Profile fetch failed:', e);
    }
    return null;
  };

  const recoverProfile = async (userId: string, email: string) => {
    // If Auth user exists but profile row is missing, create a recovery profile
    try {
      const { data, error } = await supabase.from('profiles').insert({
        id: userId,
        email: email,
        first_name: 'Scholar',
        last_name: userId.slice(0, 4),
        role: 'USER',
        status: 'Active',
        department: 'Multidisciplinary'
      }).select().single();
      
      if (error) {
        console.error("Profile recovery failed. Table might be missing.");
        return null;
      }

      if (data) {
        const profile = mapProfile(data);
        setUser(profile);
        return profile;
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      // Use getSession for persistent "Footprint" session
      const { data: { session } } = await supabase.auth.getSession();
      if (mounted) {
        if (session?.user) {
          const profile = await fetchProfile(session.user.id);
          if (!profile && session.user.email) {
            await recoverProfile(session.user.id, session.user.email);
          }
        }
        setIsLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        if (session?.user) {
          const profile = await fetchProfile(session.user.id);
          if (!profile && session.user.email) {
            await recoverProfile(session.user.id, session.user.email);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password?: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: password || ''
    });

    if (error) return { success: false, error: error.message };
    if (data.user) {
      let profile = await fetchProfile(data.user.id);
      if (!profile) {
        profile = await recoverProfile(data.user.id, email);
      }
      return { success: true };
    }
    return { success: false, error: 'Authentication failed.' };
  };

  const register = async (data: Partial<UserProfile> & { password?: string }) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email!,
      password: data.password!,
    });

    if (authError) return { success: false, error: authError.message };
    if (!authData.user) return { success: false, error: 'Signup failed.' };

    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      role: data.role || 'USER',
      city: data.city,
      pincode: data.pincode,
      age: data.age,
      phd_status: data.phdStatus,
      department: data.department,
      institution_name: data.institutionName,
      is_verified: false,
      status: 'Active'
    });

    if (profileError) {
      if (profileError.message.includes('profiles')) {
        return { success: false, error: "Database table 'profiles' is missing. Please run the SQL setup script provided in the documentation." };
      }
      return { success: false, error: `Profile sync failed: ${profileError.message}` };
    }
    
    await fetchProfile(authData.user.id);
    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const logVisit = async (path: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      await supabase.from('visit_logs').insert({
        user_id: session?.user?.id || null,
        path: path,
        ip: 'Scholar Session',
        timestamp: new Date().toISOString()
      });
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role: user?.role || 'PUBLIC', 
      login, 
      register,
      logout, 
      isAuthenticated: !!user,
      isLoading,
      logVisit
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
