import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface CustomButtonProps {
    title: string,
    onPress: () => void,
    style?: object,
    disabled?: boolean | undefined
}

export function CustomButton({title, onPress, style, disabled}: CustomButtonProps) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#f4511e',
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});