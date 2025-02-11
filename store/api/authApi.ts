import { baseApi } from './baseApi';
import {LoginRequest, RegisterRequest, User} from '@/types/auth';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<User, LoginRequest>({
            query: (credentials) => {
                const { companyUrl, ...loginData } = credentials;
                return {
                    url: `https://supporthub-kpga.onrender.com/${companyUrl}/login`,
                    method: 'POST',
                    body: loginData,
                };
            },
        }),
        register: builder.mutation<User, RegisterRequest>({
            query: (userData) => {
                const { companyName, ...registrationData } = userData;
                return {
                    url: `https://supporthub-kpga.onrender.com/${companyName}/user-registration`,
                    method: 'POST',
                    body: registrationData,
                };
            },
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;