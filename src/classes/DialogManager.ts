import { MultilingualDialogues, languages } from '../interfaces/MultilingualDialogues'
import { RawApi } from 'grammy'
import { Other } from 'grammy/out/core/api'
import bot from '../telegramClient'

interface Tags {
  [key: string]: string
}

// Information about who has what language.
export const userLanguages: Map<number, languages> = new Map()

/** This class is responsible for sending messages in different languages. */
export class DialogManager {
  public userId: number
  public chatId: number
  public messageId: number | undefined

  /**
   * @param messageId ID of the message to be answered.
   */
  constructor (userId: number | undefined, chatId: number, messageId?: number | undefined) {
    this.userId = userId ?? 0
    this.chatId = chatId
    this.messageId = messageId
  }

  /**
   * Process `{tags}`
   * @param text Source text with `{tags}`
   * @param tags What to replace tags with
   * @returns Processed text without `{tags}`
   */
  static replaceTags (text: string, tags: Tags): string {
    const keys = Object.keys(tags)
    for (const tag of keys) {
      const regex = new RegExp(`{${tag}}`, 'g')
      text = text.replace(regex, tags[tag])
    }
    return text
  }

  /**
   * Send message.
   * @param contents Array of strings.
   * @param tags Tags in messages.
   */
  public async send (content: MultilingualDialogues, tags = {}, other: Other<RawApi, 'sendMessage', 'chat_id' | 'text'> = {}): Promise<void> {
    try {
      // If a person has a language that is not fully registered in the bot, English will be used.
      const text = DialogManager.replaceTags(content[userLanguages.get(this.userId) ?? 'EN'] ?? content.EN, tags)

      await bot.api.sendMessage(this.chatId, text, Object.assign({
        parse_mode: 'HTML',
        reply_to_message_id: this.messageId,
        allow_sending_without_reply: true
      }, other))
    } catch (err) {
      console.error(`\n[DIALOG_MANAGER] Some mistake has occurred.
>> Chat ID: ${this.chatId}
>> Message ID: ${this.messageId}
Error: ${String(err.stack)}`)
    }
  }
}
