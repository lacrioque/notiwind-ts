export interface NotificationGenerator {
    group: string;
    title: string;
    text: string;
    options: {
        [key: string]: any
    }
}

export interface Notification {
    id: number;
    group: string;
    title: string;
    text: string;
    options: {
        [key: string]: any
    }
}

export interface AddSignature {
    notification: Notification;
    timeout: number;
}

export interface NotificationContext { 
    group: string; 
    position: "top"|"bottom" 
}
