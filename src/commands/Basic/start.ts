import { Composer, InlineKeyboard } from 'grammy'
import { DialogManager } from '../../classes/DialogManager'
import generateBasicDialogTags from '../../utils/generateBasicDialogTags'

import languageSelection from '../../contents/commands/start/languageSelection.dialogue'
import languageSelectionButtons from '../../contents/commands/start/languageSelectionButtons.dialogue'

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

    dManager.send(languageSelection, tags, {
      reply_markup: inlineButtons
    }).catch(console.error)
  })
