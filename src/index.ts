import { config } from 'dotenv'

console.log('[PROJECT] Start!')
config()

require('./telegramClient')
