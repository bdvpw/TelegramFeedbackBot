import { languages } from '../../interfaces/MultilingualDialogues'
import { Composer, Context } from 'grammy'
import generateBasicDialogTags from '../../utils/generateBasicDialogTags'
import { DialogManager, userLanguages } from '../../classes/DialogManager'

import languageSwitched from '../../contents/keyboards/languageSwitched.dialogue'
import welcome1 from '../../contents/commands/start/welcome_1.dialogue'
import welcome2 from '../../contents/commands/start/welcome_2.dialogue'
import languageSelectionButtons from '../../contents/commands/start/languageSelectionButtons.dialogue'

export const changeLanguage = new Composer()

function callback (ctx: Context, language: languages): void {
  if (!ctx.from?.id || !ctx.chat?.id) {
    ctx.answerCallbackQuery('There\'s been some mistake!').catch(console.error)
    return
  }

  userLanguages.set(ctx.from.id, language)
  const tags = generateBasicDialogTags(ctx)
  const textAboutSuccess = DialogManager.replaceTags(languageSwitched[language] ?? languageSwitched.EN, tags)
  ctx.answerCallbackQuery(textAboutSuccess).catch(console.error)

  const dManager = new DialogManager(ctx.from.id, ctx.chat.id)
  dManager.send(welcome1, tags).then(() => {
    dManager.send(welcome2, tags).catch(console.error)
  }).catch(console.error)
}

for (const language in languageSelectionButtons) {
  changeLanguage.callbackQuery(`language_set_${language}`, async (ctx) => callback(ctx, language as keyof typeof languageSelectionButtons))
}
