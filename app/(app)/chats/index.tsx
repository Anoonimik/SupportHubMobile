import {View, FlatList, TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { router } from 'expo-router';
import {useGetConversationsQuery} from "@/store/api/emailApi";
import {Conversation} from "@/types/chat";

export default function ChatsScreen() {
    const { data: conversations, isLoading } = useGetConversationsQuery('yourCompanyName');

    const handleChatPress = (chatId: number) => {
        router.push({
            pathname: '/(app)/chats/[id]',
            params: { id: chatId.toString() }
        });
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#f4511e" />
            </View>
        );
    }

    const renderChatItem = ({ item }: { item: Conversation }) => {
        const lastMessage = item.messages && item.messages.length > 0
            ? item.messages[item.messages.length - 1]
            : null;

        return (
            <TouchableOpacity
                style={styles.chatItem}
                onPress={() => handleChatPress(item.id)}
            >
                <View style={styles.chatInfo}>
                    <View style={styles.chatHeader}>
                        <Text style={styles.chatName}>{item.subject}</Text>
                        <Text style={styles.timestamp}>
                            {new Date(item.lastUpdateDate).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </Text>
                    </View>
                    <View style={styles.lastMessageContainer}>
                        <Text style={styles.lastMessage} numberOfLines={1}>
                            {lastMessage?.body}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={conversations}
                renderItem={renderChatItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContainer: {
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    chatItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    chatInfo: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    chatName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    timestamp: {
        fontSize: 12,
        color: '#666',
    },
    lastMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        flex: 1,
        fontSize: 14,
        color: '#666',
        marginRight: 8,
    },
    unreadBadge: {
        backgroundColor: '#f4511e',
        borderRadius: 12,
        minWidth: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    unreadCount: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});