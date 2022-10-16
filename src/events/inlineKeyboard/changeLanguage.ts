import { DialogManager, userLanguages } from '../../classes/DialogManager'
import generateBasicDialogTags from '../../utils/generateBasicDialogTags'
import { Composer, Context } from 'grammy'
import { usersLeftReview } from '../../events/message/getFeedback'
import { userCooldown } from '../../config/basic.json'
import { languages } from '../../interfaces/MultilingualDialogues'

import languageSwitched from '../../contents/keyboards/languageSwitched.dialogue'
import welcome1 from '../../contents/commands/start/welcome_1.dialogue'
import welcome2 from '../../contents/commands/start/welcome_2.dialogue'
import languageSelectionButtons from '../../contents/commands/start/languageSelectionButtons.dialogue'

export const changeLanguage = new Composer()

/**
 * Handles button clicks when changing the language.
 * @param language Which language should I switch to
 */
function callback (ctx: Context, language: languages): void {
  if (!ctx.from?.id || !ctx.chat?.id) {
    ctx.answerCallbackQuery('There\'s been some mistake!').catch(console.error)
    return
  }

  // We set the language and inform you that the operation was successful.
  userLanguages.set(ctx.from.id, language)
  const tags = generateBasicDialogTags(ctx)
  const textAboutSuccess = DialogManager.replaceTags(languageSwitched[language] ?? languageSwitched.EN, tags)
  ctx.answerCallbackQuery(textAboutSuccess).catch(console.error)

  // If the user has already written a review, we will not ask him to do it again.
  const user = usersLeftReview.get(ctx.from.id)
  if (user && ((userCooldown === null) || (Date.now() - user) < userCooldown)) return

  // We tell the user to leave a review.
  const dManager = new DialogManager(ctx.from.id, ctx.chat.id)
  dManager.send(welcome1, tags).then(() => {
    dManager.send(welcome2, tags).catch(console.error)
  }).catch(console.error)
}

// All buttons are extracted from the file ../../contents/commands/start/languageSelectionButtons.dialogue.ts
for (const language in languageSelectionButtons) {
  changeLanguage.callbackQuery(`language_set_${language}`, async (ctx) => callback(ctx, language as keyof typeof languageSelectionButtons))
}
