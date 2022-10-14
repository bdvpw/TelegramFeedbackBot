import { Composer, Context, InlineKeyboard } from 'grammy'
import { DialogManager } from '../../classes/DialogManager'
import generateBasicDialogTags from '../../utils/generateBasicDialogTags'

import languageSelection from '../../contents/commands/start/languageSelection.dialogue'
import languageSelectionButtons from '../../contents/commands/start/languageSelectionButtons.dialogue'

const inlineButtons = new InlineKeyboard()

Object.keys(languageSelectionButtons).forEach((key, i) => {
  if ((i % 2) === 0) inlineButtons.row()
  inlineButtons.text(languageSelectionButtons[key as keyof typeof languageSelectionButtons] as string,
  `language_set_${key}`)
})

export const cmd = new Composer()
cmd
  .command('start')
  .filter((ctx: Context) => ctx.chat?.type === 'private')
  .use((ctx) => {
    const dManager = new DialogManager(ctx.from?.id, ctx.chat.id, ctx.message?.message_id)
    const tags = generateBasicDialogTags(ctx)
    dManager.send(languageSelection, tags, {
      reply_markup: inlineButtons
    }).catch(console.error)
  })
