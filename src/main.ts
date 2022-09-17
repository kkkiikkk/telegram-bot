// Core
import TelegramBot from 'node-telegram-bot-api'

// Config
import config from './config'

// Handlers
import { copyMessageHandler, uploadInfo } from './handlers'

// Db
import { connectDb } from './mongo'

const bot = new TelegramBot( config.TELEGRAM_TOKEN, { polling: true } )
connectDb().catch(err => console.log(err))
bot.onText(/^\/upload/, async (msg) => uploadInfo(msg, bot));
bot.onText(/^\/get/, async (msg) => copyMessageHandler(msg, bot))
