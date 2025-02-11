import { View, Text, StyleSheet } from 'react-native';

interface FormContainerProps {
    children: React.ReactNode;
    title: string;
}

export function FormContainer({ children, title }: FormContainerProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.form}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    form: {
        gap: 15,
    },
});