import TelegramApiClient from './clientApi';

type Update = { /* Определите тип для обновления */ };
type HandlerFunction = (message: any) => Promise<void>;

export default class Bot {
  private client: TelegramApiClient;
  private handlers: Record<string, HandlerFunction> = {};

  constructor(token: string | undefined) {
    this.client = new TelegramApiClient(token);
  }

  addHandler(command: string, handler: HandlerFunction) {
    this.handlers[command] = handler;
  }

  async handleUpdate(update: Update): Promise<void> {
    const message = update.message;
    if (message?.text) {
      const command = message.text.split(' ')[0];
      const handler = this.handlers[command];
      if (handler) {
        await handler(message);
      }
    }
  }

  async pollUpdates(): Promise<void> {
    let offset = 0;
    while (true) {
      const updates = await this.client.getUpdates(offset);
      if (updates.result) {
        for (const update of updates.result) {
          await this.handleUpdate(update);
          offset = update.update_id + 1;
        }
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}
