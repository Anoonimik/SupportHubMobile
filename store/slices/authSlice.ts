import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '@/types/auth';
import { storage } from '@/utils/storage';

const initialState: AuthState = {
    user: null,
    token: null,
    companyUrl: null,
    isLoading: true,
};

export const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async () => {
        const authData = await storage.getAuthData();
        return authData;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            { payload: { user, token, companyName } }: PayloadAction<{
                user: User;
                token: string;
                companyName: string;
            }>
        ) => {
            state.user = user;
            state.token = token;
            state.companyUrl = companyName;
            storage.setAuthData(token, user, companyName);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.companyUrl = null;
            storage.clearAuthData();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(initializeAuth.fulfilled, (state, { payload }) => {
                state.token = payload.token;
                state.user = payload.userData;
                state.companyUrl = payload.companyName;
                state.isLoading = false;
            })
            .addCase(initializeAuth.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;