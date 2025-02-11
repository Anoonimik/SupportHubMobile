import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { MessageInput } from '@/components/chat/MessageInput';
import { Message } from '@/types/chat';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';

export default function ChatDetailScreen() {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // В будущем здесь будет загрузка истории сообщений
        loadInitialMessages();
    }, [id]);

    const loadInitialMessages = () => {
        const initialMessage: Message = {
            id: Date.now().toString(),
            text: `Welcome to chat #${id}! How can I help you today?`,
            sender: 'bot',
            timestamp: new Date().toISOString(),
        };
        setMessages([initialMessage]);
    };

    const handleSendMessage = async (text: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date().toISOString(),
        };

        setMessages(prev => [...prev, newMessage]);
        setIsLoading(true);

        // Имитация ответа от бота
        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: `This is a response in chat #${id}`,
                sender: 'bot',
                timestamp: new Date().toISOString(),
            };
            setMessages(prev => [...prev, botMessage]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <FlatList
                data={messages}
                renderItem={({ item }) => <MessageBubble message={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.messagesList}
                inverted={false}
            />
            <MessageInput onSend={handleSendMessage} isLoading={isLoading} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    messagesList: {
        flexGrow: 1,
        padding: 16,
    },
});