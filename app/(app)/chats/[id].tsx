import {View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator} from 'react-native';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { MessageInput } from '@/components/chat/MessageInput';
import { Message } from '@/types/chat';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import {useGetConversationByIdQuery, useSendMessageMutation} from "@/store/api/emailApi";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChatDetailScreen() {
    const { id } = useLocalSearchParams();
    const [companyName, setCompanyName] = useState<string | null>(null);
    AsyncStorage.getItem('company_name').then(name => {
        if (name) setCompanyName(name);
    });
    const { data: conversation, isLoading } = useGetConversationByIdQuery({
        companyName: companyName,
        id: parseInt(id as string),
    });
    const [sendMessage] = useSendMessageMutation();

    const handleSendMessage = async (text: string) => {
        console.log('1. Начало отправки:', {
            id,
            emailRequesterId: conversation?.emailRequesterId,
            text
        });

        try {
            console.log('2. Перед sendMessage');
            await sendMessage({
                companyName: companyName,
                data: {
                    emailConversationId: parseInt(id as string),
                    emailRequesterId: conversation?.emailRequesterId || 0,
                    body: text,
                }
            }).unwrap();
        } catch (error) {
            console.error('4. Ошибка при отправке:', error);
        }
        console.log('5. Завершение handleSendMessage');
    };
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#f4511e" />
            </View>
        );
    }

    const renderMessage = ({ item }: { item: Message }) => (
        <MessageBubble
            message={{
                id: item.messageId,
                body: item.body,
                userId: item.userId,
                date: item.date,
            }}
        />
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <FlatList
                data={conversation?.messages}
                renderItem={renderMessage}
                keyExtractor={item => item.messageId}
                contentContainerStyle={styles.messagesList}
                inverted={false}
            />
            <MessageInput onSend={handleSendMessage} isLoading={false} />
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});