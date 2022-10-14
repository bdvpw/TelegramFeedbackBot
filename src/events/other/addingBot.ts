import { Composer } from 'grammy'

export const addingBot = new Composer()
addingBot.on('my_chat_member', (ctx) => {
  console.log(`The bot has joined or left some group or channel.
Channel/Group ID:  ${ctx.chat.id}`)
})
