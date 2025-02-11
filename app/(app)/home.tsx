import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { NavigationCard } from '@/components/ui/NavigationCard';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { logout } from '@/store/slices/authSlice';
import { CustomButton } from '@/components/ui/CustomButton';

export default function HomeScreen() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        router.replace('/(auth)/login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <NavigationCard
                    title="All Chats"
                    description="View and manage your conversations"
                    icon="message-circle"
                    onPress={() => router.push("/(app)/chats")}
                />

                <NavigationCard
                    title="All Bots"
                    description="Explore and interact with available bots"
                    icon="cpu"
                    onPress={() => router.push('/(app)/bots')}
                />

                <NavigationCard
                    title="User Profile"
                    description={`Manage your account: ${user?.email}`}
                    icon="user"
                    onPress={() => router.push('/(app)/profile')}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    footer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    logoutButton: {
        backgroundColor: '#ff4444',
    },
});