import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

interface Chat {
    id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
}

export default function ChatsScreen() {
    const [chats] = useState<Chat[]>([
        {
            id: '1',
            name: 'Technical Support',
            lastMessage: 'How can I help you today?',
            timestamp: new Date().toISOString(),
            unreadCount: 0,
        },
        {
            id: '2',
            name: 'Sales Department',
            lastMessage: 'Thank you for your inquiry',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            unreadCount: 2,
        },
    ]);

    const handleChatPress = (chatId: string) => {
        router.push({
            pathname: '/(app)/chats/[id]',
            params: { id: chatId }
        });
    };

    const renderChatItem = ({ item }: { item: Chat }) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => handleChatPress(item.id)}
        >
            <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                    <Text style={styles.chatName}>{item.name}</Text>
                    <Text style={styles.timestamp}>
                        {new Date(item.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </Text>
                </View>
                <View style={styles.lastMessageContainer}>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        {item.lastMessage}
                    </Text>
                    {item.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadCount}>
                                {item.unreadCount}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={chats}
                renderItem={renderChatItem}
                keyExtractor={item => item.id}
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