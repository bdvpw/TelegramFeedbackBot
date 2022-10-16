import {
  chatIdWithReviews,
  channelIdWithReviews,
  userCooldown,
  attachedImage,
  minimumNumberOfCharactersInAReview,
  maximumNumberOfCharactersInAReview
} from '../../config/basic.json'

import { DialogManager, userLanguages } from '../../classes/DialogManager'
import generateBasicDialogTags from '../../utils/generateBasicDialogTags'
import { timezone } from 'strftime'
import { Composer } from 'grammy'

import shortMessage from '../../contents/messageEvent/shortMessage.dialogue'
import reviewPublished from '../../contents/messageEvent/reviewPublished.dialogue'
import noLanguageSelected from '../../contents/messageEvent/noLanguageSelected.dialogue'
import repeatedReview from '../../contents/messageEvent/repeatedReview.dialogue'
import repeatedReviewCooldown from '../../contents/messageEvent/repeatedReviewCooldown.dialogue'

const strftime = timezone(180)

/** Stores the UNIX time when the user left a review. */
export const usersLeftReview: Map<number, number> = new Map()
export const getFeedback = new Composer()

getFeedback.chatType('private').on('message', (ctx) => {
  // Checking whether the user has not written the news before.
  const user = usersLeftReview.get(ctx.from.id)
  if (user && (Date.now() - user) < (userCooldown ?? Infinity)) return

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
  if (userCooldown !== 0) usersLeftReview.set(ctx.from.id, userCooldown === null ? Infinity : Date.now())
  dManager.send(reviewPublished, tags)
    .then(() => {
      // We inform you when it will be possible to write a review again.
      if (userCooldown === 0) dManager.send(repeatedReview, tags).catch(console.error)
      else if (userCooldown !== null) {
        tags.time = strftime('%d.%m.%Y %H:%M', new Date(Date.now() + userCooldown))
        dManager.send(repeatedReviewCooldown, tags).catch(console.error)
      }
    }).catch(console.error)

  if (chatIdWithReviews) ctx.forwardMessage(chatIdWithReviews).catch(console.error)
  if (channelIdWithReviews) ctx.forwardMessage(channelIdWithReviews).catch(console.error)
})
