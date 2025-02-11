import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    USER_DATA: 'user_data',
    COMPANY_NAME: 'company_name',
} as const;

export const storage = {
    setAuthData: async (token: string, userData: any, companyName: string) => {
        try {
            const promises = [
                AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token),
                AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData)),
                AsyncStorage.setItem(STORAGE_KEYS.COMPANY_NAME, companyName),
            ];
            await Promise.all(promises);
            return true;
        } catch (error) {
            console.error('Error saving auth data:', error);
            return false;
        }
    },

    getAuthData: async () => {
        try {
            const [token, userDataString, companyName] = await Promise.all([
                AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
                AsyncStorage.getItem(STORAGE_KEYS.USER_DATA),
                AsyncStorage.getItem(STORAGE_KEYS.COMPANY_NAME),
            ]);

            const userData = userDataString ? JSON.parse(userDataString) : null;

            return {
                token,
                userData,
                companyName,
            };
        } catch (error) {
            console.error('Error getting auth data:', error);
            return { token: null, userData: null, companyName: null };
        }
    },

    clearAuthData: async () => {
        try {
            const promises = [
                AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN),
                AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA),
                AsyncStorage.removeItem(STORAGE_KEYS.COMPANY_NAME),
            ];
            await Promise.all(promises);
            return true;
        } catch (error) {
            console.error('Error clearing auth data:', error);
            return false;
        }
    },
};