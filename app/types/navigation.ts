export type RootStackParamList = {
    Home: undefined;
    Chat: { chatId: string };
    Profile: undefined;
    Bots: undefined;
    Login: undefined;
    Register: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}