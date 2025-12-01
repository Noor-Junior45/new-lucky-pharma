export interface ChatMessage {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: number;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    delay?: string;
}

export interface ServiceItem {
    id: number;
    icon: string;
    title: string;
    description: string;
    delay?: string;
}