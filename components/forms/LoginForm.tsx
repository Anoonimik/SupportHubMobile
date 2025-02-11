import { View } from 'react-native';
import { CustomInput } from '../ui/CustomInput';
import { CustomButton } from '../ui/CustomButton';
import { FormContainer } from './FormContainer';
import { ActivityIndicator } from 'react-native';

interface LoginFormProps {
    email: string;
    password: string;
    companyUrl: string;
    setEmail: (text: string) => void;
    setPassword: (text: string) => void;
    setCompanyUrl: (text: string) => void;
    onSubmit: () => void;
    isLoading?: boolean;
}

export function LoginForm({
                              email,
                              password,
                              companyUrl,
                              setEmail,
                              setPassword,
                              setCompanyUrl,
                              onSubmit,
                              isLoading = false,
                          }: LoginFormProps) {
    return (
        <FormContainer title="Welcome Back!">
            <CustomInput
                value={companyUrl}
                onChangeText={setCompanyUrl}
                placeholder="Company URL"
                autoCapitalize="none"
                editable={!isLoading}
            />
            <CustomInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
            />
            <CustomInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                editable={!isLoading}
            />
            <CustomButton
                title={isLoading ? "Loading..." : "Login"}
                onPress={onSubmit}
                disabled={isLoading}
            />
            {isLoading && (
                <ActivityIndicator
                    size="small"
                    color="#f4511e"
                    style={{ marginTop: 10 }}
                />
            )}
        </FormContainer>
    );
}