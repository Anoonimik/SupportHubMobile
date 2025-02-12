import { Stack } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { Redirect } from 'expo-router';
import { LogoutButton } from '@/components/ui/LogoutButton';

export default function AppLayout() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Redirect href="/(auth)/login" />;
    }

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerRight: () => <LogoutButton />,
            }}
        >
            <Stack.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerBackVisible: false,
                }}
            />
            <Stack.Screen
                name="chats/index"
                options={{
                    title: 'Chats',
                    headerBackVisible: true,
                }}
            />
            <Stack.Screen
                name="chats/[id]"
                options={{
                    title: 'Chat',
                    headerBackVisible: true,
                }}
            />
            <Stack.Screen
                name="bots"
                options={{
                    title: 'All Bots',
                    headerBackVisible: true,
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    title: 'Profile',
                }}
            />
        </Stack>
    );
}