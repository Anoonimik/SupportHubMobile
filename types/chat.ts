export interface Message {
    id: number;
    emailConversationId: number;
    emailRequesterId: number;
    userId: number | null;
    messageId: string;
    subject: string | null;
    body: string;
    messageType: number;
    date: string;
}

export interface Conversation {
    id: number;
    messages: Message[];
    companyId: number;
    emailBotId: number;
    emailRequesterId: number;
    msgId: string;
    subject: string;
    lastUpdateDate: string;
}

export interface SendMessageRequest {
    emailConversationId: number;
    emailRequesterId: number;
    body: string;
}