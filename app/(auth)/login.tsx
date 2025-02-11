import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LoginForm } from '@/components/forms/LoginForm';
import { useLoginMutation } from '@/store/api/authApi';
import { useAppDispatch } from '@/hooks/redux';
import { setCredentials } from '@/store/slices/authSlice';
import * as Updates from 'expo-updates';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyUrl, setCompanyUrl] = useState('');

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();

    const handleLogin = async () => {
        try {
            const userData = await login({
                email,
                password,
                companyUrl: companyUrl.toLowerCase().trim()
            }).unwrap();

            dispatch(setCredentials({
                user: userData,
                token: userData.token,
                companyName: userData.companyUrl
            }));
            router.replace('/(app)/home');
            try {
                await Updates.reloadAsync();
            } catch (err) {
                console.log('Error reloading app:', err);
            }
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    return (
        <View style={styles.container}>
            <LoginForm
                email={email}
                password={password}
                companyUrl={companyUrl}
                setEmail={setEmail}
                setPassword={setPassword}
                setCompanyUrl={setCompanyUrl}
                onSubmit={handleLogin}
                isLoading={isLoading}
            />
            <View style={styles.bottomContainer}>
                <Text style={styles.text}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.replace('/(auth)/register')}>
                    <Text style={styles.link}>Register</Text>
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