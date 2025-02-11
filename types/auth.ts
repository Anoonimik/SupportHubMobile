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
    token: string;
    companyUrl: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    companyUrl: string | null;
    isLoading: boolean | null;
}