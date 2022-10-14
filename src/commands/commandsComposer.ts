import { Composer } from 'grammy'

import { cmd as startCommand } from './Basic/start'
import { cmd as chatId } from './Developers/chatID'

export const commandsComposer = new Composer()

commandsComposer.use(startCommand)
commandsComposer.use(chatId)
