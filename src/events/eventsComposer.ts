import { Composer } from 'grammy'

import { changeLanguage } from './inlineKeyboard/changeLanguage'
import { getFeedback } from './message/getFeedback'
import { addingBot } from './other/addingBot'

export const eventsComposer = new Composer()
eventsComposer.use(changeLanguage)
eventsComposer.use(getFeedback)
eventsComposer.use(addingBot)
