// Core
import TelegramBot, { Message } from 'node-telegram-bot-api'

// Tools
import { Message as MessageModel } from '../mongo/schemas/message.scema'

export async function copyMessageHandler(message: Message, bot: TelegramBot) {
    const chatId = message.chat.id;
    const words = message.text.split(' ')
    const messages = await MessageModel.find({
        chatId,
        type: words[1],
        // ...( words[2] && { createdAt: {
        //         "$gt": new Date(words[2])
        //     } } )
    }).exec()

    for (const msg of messages) {
        await bot.copyMessage(msg.chatId, msg.chatId, msg.messageId)
    }

}
