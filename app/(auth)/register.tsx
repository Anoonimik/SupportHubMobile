import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { RegisterForm } from '@/components/forms/RegisterForm';
import { useRegisterMutation } from '@/store/api/authApi';
import { useAppDispatch } from '@/hooks/redux';
import { setCredentials } from '@/store/slices/authSlice';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [companyName, setCompanyName] = useState('');

    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useAppDispatch();

    const validateForm = () => {
        if (!email || !password || !confirmPassword || !companyName) {
            Alert.alert('Error', 'All fields are required');
            return false;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return false;
        }
        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        try {
            const userData = await register({
                email,
                password,
                confirmPassword,
                companyName: companyName.toLowerCase().trim()
            }).unwrap();

            dispatch(setCredentials({
                user: userData,
                token: userData.token,
                companyUrl: userData.companyName
            }));

            router.replace('/(app)/home');
        } catch (error) {
            console.error('Failed to register:', error);
            Alert.alert(
                'Registration Failed',
                'An error occurred during registration. Please try again.'
            );
        }
    };

    return (
        <View style={styles.container}>
            <RegisterForm
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                companyName={companyName}
                setEmail={setEmail}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                setCompanyName={setCompanyName}
                onSubmit={handleRegister}
                isLoading={isLoading}
            />
            <View style={styles.bottomContainer}>
                <Text style={styles.text}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    link: {
        fontSize: 16,
        color: '#f4511e',
        fontWeight: 'bold',
    },
});