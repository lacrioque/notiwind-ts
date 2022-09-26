namespace Notiwind{
    
    export interface NotificationGenerator {
        group: string;
        title: string;
        text: string;
    }
   
    export interface Notification {
        id: number;
        group: string;
        title: string;
        text: string;
    }

    export interface AddSignature {
      notification: Notiwind.Notification;
      timeout: number;
    }

    export interface NotificationContext { 
        group: string; 
        position: "top"|"bottom" 
    }

}