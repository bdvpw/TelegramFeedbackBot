import { Composer } from 'grammy'
import { getFeedback } from './message/getFeedback'
import { changeLanguage } from './inlineKeyboard/changeLanguage'
import { addingBot } from './other/addingBot'

export const eventsComposer = new Composer()
eventsComposer.use(getFeedback)
eventsComposer.use(changeLanguage)
eventsComposer.use(addingBot)
