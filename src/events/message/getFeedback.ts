import { Composer } from 'grammy'
import { DialogManager, userLanguages } from '../../classes/DialogManager'
import generateBasicDialogTags from '../../utils/generateBasicDialogTags'
import { chatIdWithReviews, channelIdWithReviews, userCooldown } from '../../config/basic.json'

import shortMessage from '../../contents/messageEvent/shortMessage.dialogue'
import reviewPublished from '../../contents/messageEvent/reviewPublished.dialogue'
import noLanguageSelected from '../../contents/messageEvent/noLanguageSelected.dialogue'

/** Stores the UNIX time when the user left a review. */
const usersLeftReview: Map<number, number> = new Map()
export const getFeedback = new Composer()
getFeedback.chatType('private').on('message', (ctx) => {
  const user = usersLeftReview.get(ctx.from.id)
  if (userCooldown !== null && (user && (Date.now() - user) < userCooldown)) return

  const tags = generateBasicDialogTags(ctx)
  const dManager = new DialogManager(ctx.from.id, ctx.chat.id)
  if (!userLanguages.has(ctx.from.id)) return dManager.send(noLanguageSelected, tags)

  const msgContent = ctx.message.text ?? ctx.message.caption
  if (!msgContent || msgContent.length < 20 || msgContent.length > 2040 || !ctx.message.photo) return dManager.send(shortMessage, tags)
  if (userCooldown !== null) usersLeftReview.set(ctx.from.id, Date.now())

  dManager.send(reviewPublished, tags).catch(console.error)
  ctx.forwardMessage(chatIdWithReviews).catch(console.error)
  ctx.forwardMessage(channelIdWithReviews).catch(console.error)
})
