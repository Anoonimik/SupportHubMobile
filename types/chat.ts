export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: string;
}

export interface Chat {
    id: string;
    title: string;
    lastMessage?: string;
    unreadCount: number;
    avatar?: string;
    lastMessageTime: string;
}