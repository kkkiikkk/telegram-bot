// Core
import TelegramBot, { Message } from 'node-telegram-bot-api'

// Tools
import { Message as MessageModel } from '../mongo/schemas/message.scema'

export async function uploadInfo(message: Message, bot: TelegramBot) {
    if ( message.text.split(' ').length === 1 ) {
        await bot.sendMessage(message.chat.id, 'Please write type of photo')
        return;
    }
    const msg = new MessageModel()
    msg.messageId = message.reply_to_message.message_id
    msg.chatId = message.chat.id
    msg.type = message.text.split(' ')[1]
    await msg.save()

    await bot.sendMessage(message.chat.id, 'Photo uploaded');
}
