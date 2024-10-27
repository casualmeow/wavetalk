import Bot from './connect';

export default class Dispatcher {
  constructor(private bot: Bot) {}

  commandHandler(command: string, handler: (message: any) => Promise<void>) {
    this.bot.addHandler(command, handler);
  }
}
