import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppDispatch } from '@/hooks/redux';
import { logout } from '@/store/slices/authSlice';
import { router } from 'expo-router';

export function LogoutButton() {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        router.replace('/(auth)/login');
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Feather name="log-out" size={24} color="#fff" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginRight: 16,
    },
});