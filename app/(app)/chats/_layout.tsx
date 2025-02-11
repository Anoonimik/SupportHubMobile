import { Stack } from 'expo-router';

export default function ChatsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'All Chats',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    title: 'Chat',
                    headerShown: false
                }}
            />
        </Stack>
    );
}