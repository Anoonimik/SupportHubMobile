import { Stack } from 'expo-router';

export default function BotsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'All Bots',
                    headerShown: false,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#fff'
                    },
                    headerTitleStyle: {
                        fontWeight: '600',
                    },
                }}
            />
        </Stack>
    );
}