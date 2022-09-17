// Core
import { connect } from 'mongoose'

// Config
import config from '../config'

export async function connectDb() {
    await connect(config.DB_URL)
}
