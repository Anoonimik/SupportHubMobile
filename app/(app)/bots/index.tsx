import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    StyleSheet,
    Modal,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetEmailBotsQuery, useDeleteEmailBotMutation, useCreateEmailBotMutation } from '@/store/api/botsApi';

interface Bot {
    id: string;
    email: string;
    smtpHost: string;
    smtpPort: number;
    imapHost: string;
    imapPort: number;
}

export default function BotsScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [companyName, setCompanyName] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        smtpHost: '',
        smtpPort: '',
        imapHost: '',
        imapPort: '',
    });

    useEffect(() => {
        AsyncStorage.getItem('company_name').then(name => {
            if (name) setCompanyName(name);
        });
    }, []);

    // RTK Query hooks
    const { data: bots, isLoading, error } = useGetEmailBotsQuery(companyName ?? '', {
        skip: !companyName,
    });
    const [deleteBot] = useDeleteEmailBotMutation();
    const [createBot, { isLoading: isCreating }] = useCreateEmailBotMutation();

    const handleDeleteBot = async (botId: string) => {
        if (!companyName) return;

        try {
            await deleteBot({ companyName, id: botId }).unwrap();
            Alert.alert('Success', 'Bot deleted successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to delete bot');
        }
    };

    const handleCreateBot = async () => {
        if (!companyName) return;

        try {
            const botData = {
                email: formData.email,
                password: formData.password,
                smtpHost: formData.smtpHost,
                smtpPort: parseInt(formData.smtpPort),
                imapHost: formData.imapHost,
                imapPort: parseInt(formData.imapPort),
            };

            await createBot({
                companyName,
                botData
            }).unwrap();

            setModalVisible(false);
            setFormData({
                email: '',
                password: '',
                smtpHost: '',
                smtpPort: '',
                imapHost: '',
                imapPort: '',
            });
            Alert.alert('Success', 'Bot created successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to create bot');
        }
    };

    const renderBotItem = ({ item }: { item: Bot }) => (
        <View style={styles.botItem}>
            <View style={styles.botInfo}>
                <View style={styles.botHeader}>
                    <Text style={styles.botEmail}>{item.email}</Text>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteBot(item.id)}
                    >
                        <Ionicons name="trash-outline" size={20} color="#f4511e" />
                    </TouchableOpacity>
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

    if (!companyName) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Company name not found</Text>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#f4511e" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Failed to load bots</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>+ Add Bot</Text>
            </TouchableOpacity>

            <FlatList
                data={bots}
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
                            <Text style={styles.modalTitle}>New Bot</Text>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter email"
                                    placeholderTextColor="#666"
                                    autoCapitalize="none"
                                    value={formData.email}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter password"
                                    placeholderTextColor="#666"
                                    secureTextEntry
                                    value={formData.password}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                                />
                            </View>

                            <View style={styles.row}>
                                <View style={[styles.inputContainer, styles.flex1, styles.marginRight]}>
                                    <Text style={styles.inputLabel}>SMTP Host</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="smtp.example.com"
                                        placeholderTextColor="#666"
                                        autoCapitalize="none"
                                        value={formData.smtpHost}
                                        onChangeText={(text) => setFormData(prev => ({ ...prev, smtpHost: text }))}
                                    />
                                </View>

                                <View style={[styles.inputContainer, styles.flex1]}>
                                    <Text style={styles.inputLabel}>SMTP Port</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="587"
                                        placeholderTextColor="#666"
                                        keyboardType="numeric"
                                        value={formData.smtpPort}
                                        onChangeText={(text) => setFormData(prev => ({ ...prev, smtpPort: text }))}
                                    />
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={[styles.inputContainer, styles.flex1, styles.marginRight]}>
                                    <Text style={styles.inputLabel}>IMAP Host</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="imap.example.com"
                                        placeholderTextColor="#666"
                                        autoCapitalize="none"
                                        value={formData.imapHost}
                                        onChangeText={(text) => setFormData(prev => ({ ...prev, imapHost: text }))}
                                    />
                                </View>

                                <View style={[styles.inputContainer, styles.flex1]}>
                                    <Text style={styles.inputLabel}>IMAP Port</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="993"
                                        placeholderTextColor="#666"
                                        keyboardType="numeric"
                                        value={formData.imapPort}
                                        onChangeText={(text) => setFormData(prev => ({ ...prev, imapPort: text }))}
                                    />
                                </View>
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={() => {
                                        setModalVisible(false);
                                        setFormData({
                                            email: '',
                                            password: '',
                                            smtpHost: '',
                                            smtpPort: '',
                                            imapHost: '',
                                            imapPort: '',
                                        });
                                    }}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, styles.createButton]}
                                    onPress={handleCreateBot}
                                    disabled={isCreating}
                                >
                                    {isCreating ? (
                                        <ActivityIndicator size="small" color="#fff" />
                                    ) : (
                                        <Text style={styles.createButtonText}>Create</Text>
                                    )}
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
    deleteButton: {
        padding: 8,
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
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#f4511e',
        fontSize: 16,
        textAlign: 'center',
    },
});