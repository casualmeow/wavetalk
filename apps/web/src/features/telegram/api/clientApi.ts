export default class TelegramApiClient {
    private baseUrl: string;
  
    constructor(token: string |undefined) {
      this.baseUrl = `https://api.telegram.org/bot${token}`;
    }
  
    private async request<T>(method: string, params: Record<string, any> = {}): Promise<T> {
      const url = `${this.baseUrl}/${method}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (!response.ok) {
        throw new Error(`Telegram API request failed with status ${response.status}`);
      }
      return response.json() as Promise<T>;
    }
  
    async sendMessage(chatId: number, text: string): Promise<void> {
      await this.request('sendMessage', { chat_id: chatId, text });
    }
  
    async getUpdates(offset?: number): Promise<any> {
      return this.request('getUpdates', { offset });
    }
  }
  