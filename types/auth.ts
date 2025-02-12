export interface LoginRequest {
    email: string;
    password: string;
    companyUrl: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
    companyName: string;
}

export interface User {
    companyName: string;
    id: string;
    email: string;
    name: string;
    accessToken: string;
    companyUrl: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    companyUrl: string | null;
    isLoading: boolean | null;
}