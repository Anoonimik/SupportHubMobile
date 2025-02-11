import {TextInput, StyleSheet} from 'react-native';

interface CustomInputProps {
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    secureTextEntry?: boolean,
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad',
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
    editable?: boolean
}

export function CustomInput({
                                value,
                                onChangeText,
                                placeholder,
                                secureTextEntry = false,
                                keyboardType = 'default',
                                autoCapitalize = 'none',
                                editable
                            }: CustomInputProps) {
    return (
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
});