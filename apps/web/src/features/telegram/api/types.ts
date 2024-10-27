export interface Update {
    update_id: number;
    message?: Message;
  }
  
  export interface Message {
    message_id: number;
    from: User;
    chat: Chat;
    date: number;
    text?: string;
  }
  
  export interface User {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
  }
  
  export interface Chat {
    id: number;
    type: string;
  }
  