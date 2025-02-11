import { createContext, useContext, useEffect } from 'react';
import { useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { useAppSelector } from '@/hooks/redux';

type AuthContextType = {
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({ isAuthenticated: false });

export function useAuth() {
    return useContext(AuthContext);
}

function useProtectedRoute(isAuthenticated: boolean) {
    const segments = useSegments();
    const router = useRouter();
    const navigationState = useRootNavigationState();

    useEffect(() => {
        if (!navigationState?.key) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (isAuthenticated && inAuthGroup) {
            // Редирект на главную, если пользователь авторизован, но пытается попасть на страницы авторизации
            router.replace('/(app)/home');
        } else if (!isAuthenticated && !inAuthGroup) {
            // Редирект на логин, если пользователь не авторизован и пытается попасть на защищенные страницы
            router.replace('/(auth)/login');
        }
    }, [isAuthenticated, segments, navigationState?.key]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { token } = useAppSelector((state) => state.auth);
    const isAuthenticated = !!token;

    useProtectedRoute(isAuthenticated);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}