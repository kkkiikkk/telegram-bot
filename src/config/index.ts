import * as dotenv from 'dotenv'

dotenv.config()

export default {
    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
    DB_URL: process.env.DB_URL,
    ALERT_LINK: process.env.ALERT_LINK,
    AREA_OF_RESIDENCE: process.env.AREA_OF_RESIDENCE
}
