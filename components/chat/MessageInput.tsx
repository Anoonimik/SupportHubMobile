import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

interface MessageInputProps {
    onSend: (message: string) => void;
    isLoading?: boolean;
}

export function MessageInput({ onSend, isLoading }: MessageInputProps) {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim() && !isLoading) {
            onSend(message.trim());
            setMessage('');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
                multiline
                maxLength={1000}
                editable={!isLoading}
            />
            <TouchableOpacity
                style={[styles.button, (!message.trim() || isLoading) && styles.buttonDisabled]}
                onPress={handleSend}
                disabled={!message.trim() || isLoading}
            >
                <Feather
                    name={isLoading ? "loader" : "send"}
                    size={24}
                    color={!message.trim() || isLoading ? '#999' : '#f4511e'}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    input: {
        flex: 1,
        minHeight: 40,
        maxHeight: 100,
        backgroundColor: '#f8f8f8',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        fontSize: 16,
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
});