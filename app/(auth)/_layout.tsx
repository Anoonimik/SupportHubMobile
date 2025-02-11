import {Redirect, Stack} from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import {useAuth} from "@/providers/AuthProvider";

export default function AuthLayout() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        return <Redirect href="/(app)/home" />;
    }
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerRight: () => null,
            }}
        >
            <Stack.Screen
                name="login"
                options={{
                    title: 'Login',
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => router.replace('/(auth)/register')}
                            style={{ marginRight: 15 }}
                        >
                            <Text style={{ color: '#fff', fontSize: 16 }}>Register</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="register"
                options={{
                    title: 'Register',
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => router.replace('/(auth)/login')}
                            style={{ marginRight: 15 }}
                        >
                            <Text style={{ color: '#fff', fontSize: 16 }}>Login</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    );
}