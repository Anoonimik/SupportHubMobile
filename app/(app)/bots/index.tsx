import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    StyleSheet,
    Modal,
    ScrollView,
} from 'react-native';
import { useColorScheme } from 'react-native';

interface Bot {
    id: string;
    email: string;
    smtpHost: string;
    smtpPort: number;
    imapHost: string;
    imapPort: number;
}

const mockBots: Bot[] = [
    {
        id: '1',
        email: 'bot1@example.com',
        smtpHost: 'smtp.example.com',
        smtpPort: 587,
        imapHost: 'imap.example.com',
        imapPort: 993,
    },
    {
        id: '2',
        email: 'bot2@example.com',
        smtpHost: 'smtp.example.com',
        smtpPort: 587,
        imapHost: 'imap.example.com',
        imapPort: 993,
    },
];

export default function BotsScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const colorScheme = useColorScheme();

    const renderBotItem = ({ item }: { item: Bot }) => (
        <View style={styles.botItem}>
            <View style={styles.botInfo}>
                <View style={styles.botHeader}>
                    <Text style={styles.botEmail}>{item.email}</Text>
                </View>
                <View style={styles.botDetails}>
                    <Text style={styles.detailText}>
                        SMTP: {item.smtpHost}:{item.smtpPort}
                    </Text>
                    <Text style={styles.detailText}>
                        IMAP: {item.imapHost}:{item.imapPort}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>+ Добавить бота</Text>
            </TouchableOpacity>

            <FlatList
                data={mockBots}
                renderItem={renderBotItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            <Text style={styles.modalTitle}>Новый бот</Text>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Введите email"
                                    placeholderTextColor="#666"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Пароль</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Введите пароль"
                                    placeholderTextColor="#666"
                                    secureTextEntry
                                />
                            </View>

                            <View style={styles.row}>
                                <View style={[styles.inputContainer, styles.flex1, styles.marginRight]}>
                                    <Text style={styles.inputLabel}>SMTP хост</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="smtp.example.com"
                                        placeholderTextColor="#666"
                                        autoCapitalize="none"
                                    />
                                </View>

                                <View style={[styles.inputContainer, styles.flex1]}>
                                    <Text style={styles.inputLabel}>SMTP порт</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="587"
                                        placeholderTextColor="#666"
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={[styles.inputContainer, styles.flex1, styles.marginRight]}>
                                    <Text style={styles.inputLabel}>IMAP хост</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="imap.example.com"
                                        placeholderTextColor="#666"
                                        autoCapitalize="none"
                                    />
                                </View>

                                <View style={[styles.inputContainer, styles.flex1]}>
                                    <Text style={styles.inputLabel}>IMAP порт</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="993"
                                        placeholderTextColor="#666"
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.cancelButtonText}>Отмена</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, styles.createButton]}
                                >
                                    <Text style={styles.createButtonText}>Создать</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
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
    addButton: {
        backgroundColor: '#f4511e',
        margin: 16,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    botItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    botInfo: {
        flex: 1,
    },
    botHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    botEmail: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    botDetails: {
        marginTop: 4,
    },
    detailText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        maxHeight: '90%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        color: '#000',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    flex1: {
        flex: 1,
    },
    marginRight: {
        marginRight: 8,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        marginTop: 24,
        marginBottom: 16,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#eee',
    },
    createButton: {
        backgroundColor: '#f4511e',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '500',
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});