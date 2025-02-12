// components/chat/MessageInput.tsx
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState, useCallback } from 'react';

interface MessageInputProps {
    onSend: (message: string) => Promise<void>;
}

export function MessageInput({ onSend }: MessageInputProps) {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSend = useCallback(async () => {
        if (!message.trim() || isSending) return;

        setIsSending(true);

        const messageToSend = message.trim();
        setMessage('');

        try {

            await onSend(messageToSend);

        } catch (error) {

            setMessage(messageToSend);
        } finally {
            console.log('6. Завершение отправки');
            setIsSending(false);
        }
    }, [message, isSending, onSend]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
                multiline={false} // Изменили на false
                maxLength={1000}
                editable={!isSending}
            />
            <TouchableOpacity
                style={[styles.button, (!message.trim() || isSending) && styles.buttonDisabled]}
                onPress={handleSend}
                disabled={!message.trim() || isSending}
            >
                {isSending ? (
                    <ActivityIndicator size="small" color="#f4511e" />
                ) : (
                    <Feather
                        name="send"
                        size={24}
                        color={!message.trim() || isSending ? '#999' : '#f4511e'}
                    />
                )}
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
        height: 40, // Фиксированная высота
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