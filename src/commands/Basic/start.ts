import { timezone } from 'strftime'
import { Composer, InlineKeyboard } from 'grammy'
import { userCooldown } from '../../config/basic.json'
import { DialogManager } from '../../classes/DialogManager'
import { usersLeftReview } from '../../events/message/getFeedback'
import generateBasicDialogTags from '../../utils/generateBasicDialogTags'

import languageSelection from '../../contents/commands/start/languageSelection.dialogue'
import languageSelectionButtons from '../../contents/commands/start/languageSelectionButtons.dialogue'
import userCannotWriteReview from '../../contents/commands/start/userCannotWriteReview.dialogue'
import userCannotWriteReviewCooldown from '../../contents/commands/start/userCannotWriteReviewCooldown.dialogue'

const strftime = timezone(180)

// We get all the buttons from the "languageSelectionButtons.dialogue.ts" file.
const inlineButtons = new InlineKeyboard()
Object.keys(languageSelectionButtons).forEach((key, i) => {
  // Every 2 buttons we make a transfer.
  if ((i % 2) === 0) inlineButtons.row()
  inlineButtons.text(languageSelectionButtons[key as keyof typeof languageSelectionButtons] as string,
  `language_set_${key}`)
})

export const cmd = new Composer()
cmd
  .command('start')
  .chatType('private')
  .use((ctx) => {
    const dManager = new DialogManager(ctx.from?.id, ctx.chat.id, ctx.message?.message_id)
    const tags = generateBasicDialogTags(ctx)

    // We inform you when it will be possible to write a review again.
    const user = usersLeftReview.get(ctx.from.id)
    if (user && userCooldown === null) {
      return dManager.send(userCannotWriteReview, tags).catch(console.error)
    } else if (user && userCooldown !== null && (Date.now() - user) < userCooldown) {
      tags.time = strftime('%d.%m.%Y %H:%M', new Date(Date.now() + userCooldown))
      return dManager.send(userCannotWriteReviewCooldown, tags).catch(console.error)
    }

    dManager.send(languageSelection, tags, {
      reply_markup: inlineButtons
    }).catch(console.error)
  })
