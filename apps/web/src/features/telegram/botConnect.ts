import Bot from './api/connect';
import Dispatcher from './api/dispatcher';
import * as dotenv from "dotenv";
import * as path from 'path';

const envPath = path.resolve(__dirname, ".env");
dotenv.config({ path: envPath });
const TOKEN = process.env.TOKEN;

const bot = new Bot(TOKEN);
const dispatcher = new Dispatcher(bot);

dispatcher.commandHandler('/start', async (message) => {
  const chatId = message.chat.id;
  await bot.client.sendMessage(chatId, 'Hello! This is a custom Telegram bot!');
});

bot.pollUpdates().catch(console.error);
