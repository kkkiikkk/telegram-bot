// Core
import TelegramBot from 'node-telegram-bot-api'
import axios from 'axios';
const cron = require('node-cron')

// Config
import config from './config'

// Handlers
import { copyMessageHandler, uploadInfo } from './handlers'

// Db
import { connectDb } from './mongo'
import { Message } from './mongo/schemas/message.scema'

const bot = new TelegramBot( config.TELEGRAM_TOKEN, { polling: true } )
connectDb().catch(err => console.log(err))
bot.onText(/^\/upload/, async (msg) => uploadInfo(msg, bot));
bot.onText(/^\/get/, async (msg) => copyMessageHandler(msg, bot));
let prevState: boolean = true;
cron.schedule('*/10 * * * * *', async () => {
    try {
        let res = await axios.get(config.ALERT_LINK);
        if (res.data && 'states' in res.data && config.AREA_OF_RESIDENCE in res.data.states) {
            let zpState = res.data.states[config.AREA_OF_RESIDENCE];
            console.log('zpState', zpState.enabled)
            if (zpState.enabled !== prevState) {
                const messages = await Message.find().distinct('chatId')
                console.log('messages', messages)
                for (const message of messages) {
                    if(zpState.enabled) {
                        console.log('Тревога')
                        await bot.sendMessage(message, '‼️‼️‼️‼️‼️‼️ТРЕВОГА‼️‼️‼️‼️‼️‼️')
                    }
                    if (!zpState.enabled){
                        console.log('Отбой')
                        await bot.sendMessage(message, '👍👍👍ОТБОЙ👍👍👍')
                    }
                }
            }
            prevState = zpState.enabled;
        }
    }
    catch (e) {
        console.error('[ERROR]', e)
    }
})
