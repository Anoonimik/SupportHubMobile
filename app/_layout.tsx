import {useEffect} from "react";
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { AuthProvider } from '@/providers/AuthProvider';
import { initializeAuth } from '@/store/slices/authSlice';
import { View, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

function InitializationWrapper({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.auth.isLoading);

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#f4511e" />
            </View>
        );
    }

    return children;
}

export default function RootLayout() {
    return (
        <Provider store={store}>
            <InitializationWrapper>
                <AuthProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                        <Stack.Screen name="(app)" options={{ headerShown: false }} />
                    </Stack>
                </AuthProvider>
            </InitializationWrapper>
        </Provider>
    );
}