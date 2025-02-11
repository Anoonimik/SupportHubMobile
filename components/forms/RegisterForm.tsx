import { View } from 'react-native';
import { CustomInput } from '../ui/CustomInput';
import { CustomButton } from '../ui/CustomButton';
import { FormContainer } from './FormContainer';
import { ActivityIndicator } from 'react-native';

interface RegisterFormProps {
    email: string;
    password: string;
    confirmPassword: string;
    companyName: string;
    setEmail: (text: string) => void;
    setPassword: (text: string) => void;
    setConfirmPassword: (text: string) => void;
    setCompanyName: (text: string) => void;
    onSubmit: () => void;
    isLoading?: boolean;
}

export function RegisterForm({
                                 email,
                                 password,
                                 confirmPassword,
                                 companyName,
                                 setEmail,
                                 setPassword,
                                 setConfirmPassword,
                                 setCompanyName,
                                 onSubmit,
                                 isLoading = false,
                             }: RegisterFormProps) {
    return (
        <FormContainer title="Create Account">
            <CustomInput
                value={companyName}
                onChangeText={setCompanyName}
                placeholder="Company Name"
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
            <CustomInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
                editable={!isLoading}
            />
            <CustomButton
                title={isLoading ? "Creating Account..." : "Register"}
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