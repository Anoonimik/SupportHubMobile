export interface EmailBot {
    id: string;
    email: string;
    smtpHost: string;
    smtpPort: number;
    imapHost: string;
    imapPort: number;
}

export interface CreateEmailBotRequest {
    email: string;
    password: string;
    smtpPort: number;
    smtpHost: string;
    imapPort: number;
    imapHost: string;
}