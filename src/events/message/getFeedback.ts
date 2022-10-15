import { chatIdWithReviews,
  channelIdWithReviews,
  userCooldown,
  attachedImage,
  minimumNumberOfCharactersInAReview,
  maximumNumberOfCharactersInAReview
} from '../../config/basic.json'

import { DialogManager, userLanguages } from '../../classes/DialogManager'
import generateBasicDialogTags from '../../utils/generateBasicDialogTags'
import { Composer } from 'grammy'

import shortMessage from '../../contents/messageEvent/shortMessage.dialogue'
import reviewPublished from '../../contents/messageEvent/reviewPublished.dialogue'
import noLanguageSelected from '../../contents/messageEvent/noLanguageSelected.dialogue'

/** Stores the UNIX time when the user left a review. */
const usersLeftReview: Map<number, number> = new Map()
export const getFeedback = new Composer()

getFeedback.chatType('private').on('message', (ctx) => {
  // Checking whether the user has not written the news before.
  const user = usersLeftReview.get(ctx.from.id)
  if (userCooldown !== null && (user && (Date.now() - user) < userCooldown)) return

  // We inform you that the user has not chosen a language.
  const tags = generateBasicDialogTags(ctx, {
    min: minimumNumberOfCharactersInAReview.toString(),
    max: maximumNumberOfCharactersInAReview.toString()
  })
  const dManager = new DialogManager(ctx.from.id, ctx.chat.id)
  if (!userLanguages.has(ctx.from.id)) return dManager.send(noLanguageSelected, tags)

  // If the user did not attach a photo or wrote too short a review.
  const msgContent = ctx.message.text ?? ctx.message.caption
  if (!msgContent || msgContent.length < minimumNumberOfCharactersInAReview || msgContent.length > maximumNumberOfCharactersInAReview || (attachedImage && !ctx.message.photo)) return dManager.send(shortMessage, tags)

  // We record the user and forward the user.
  if (userCooldown !== null) usersLeftReview.set(ctx.from.id, Date.now())
  dManager.send(reviewPublished, tags).catch(console.error)
  if (chatIdWithReviews) ctx.forwardMessage(chatIdWithReviews).catch(console.error)
  if (channelIdWithReviews) ctx.forwardMessage(channelIdWithReviews).catch(console.error)
})
