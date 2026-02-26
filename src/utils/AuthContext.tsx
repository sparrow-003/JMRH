import React, { createContext, useState, useContext, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

interface User {
    id: string
    email: string
    name?: string
}

interface AuthContextType {
    user: User | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string, name: string) => Promise<void>
    signOut: () => Promise<void>
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check active sessions
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email!,
                    name: session.user.user_metadata?.name
                })
            }
            setLoading(false)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email!,
                    name: session.user.user_metadata?.name
                })
            } else {
                setUser(null)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const signIn = async (email: string, password: string) => {
        setLoading(true)
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (error) throw error
            if (data.user) {
                setUser({
                    id: data.user.id,
                    email: data.user.email!,
                    name: data.user.user_metadata?.name
                })
            }
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (email: string, password: string, name: string) => {
        setLoading(true)
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name
                    }
                }
            })
            if (error) throw error
            if (data.user) {
                setUser({
                    id: data.user.id,
                    email: data.user.email!,
                    name
                })
            }
        } finally {
            setLoading(false)
        }
    }

    const signOut = async () => {
        setLoading(true)
        try {
            await supabase.auth.signOut()
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signIn,
                signUp,
                signOut,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}
// Updated for git commit
