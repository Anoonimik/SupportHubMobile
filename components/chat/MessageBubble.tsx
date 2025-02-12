import { View, Text, StyleSheet } from 'react-native';
import { Message } from '@/types/chat';

interface MessageBubbleProps {
    message: {
        id: string;
        body: string;
        userId: number | null;
        date: string;
    };
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.userId !== null;

    return (
        <View style={[
            styles.container,
            isUser ? styles.userContainer : styles.botContainer
        ]}>
            <View style={[
                styles.bubble,
                isUser ? styles.userBubble : styles.botBubble
            ]}>
                <Text style={[
                    styles.text,
                    isUser ? styles.userText : styles.botText
                ]}>
                    {message.body}
                </Text>
                <Text style={styles.timestamp}>
                    {new Date(message.date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        marginVertical: 4,
    },
    userContainer: {
        alignItems: 'flex-end',
    },
    botContainer: {
        alignItems: 'flex-start',
    },
    bubble: {
        maxWidth: '80%',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
    },
    userBubble: {
        backgroundColor: '#f4511e',
    },
    botBubble: {
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 16,
        marginBottom: 4,
    },
    userText: {
        color: '#fff',
    },
    botText: {
        color: '#000',
    },
    timestamp: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.5)',
        alignSelf: 'flex-end',
    },
});