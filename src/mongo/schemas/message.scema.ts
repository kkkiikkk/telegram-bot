// Core
import { Schema, model, Document } from 'mongoose'

export interface IMessage extends Document {
    chatId: number
    messageId: number
    type: string
}

const messageSchema = new Schema<IMessage>({
    chatId: { type: "Number", required: true, },
    messageId: { type: "Number", required: true, },
    type: { type: "String", required: true }
}, {
    versionKey: false,
    timestamps: true
})

export const Message = model<IMessage>('Message', messageSchema)

