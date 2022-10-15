import { Composer, Context } from 'grammy'

export const cmd = new Composer()
cmd
  .command('chatID')
  .filter((ctx: Context) => ctx.chat?.type === 'group' || ctx.chat?.type === 'supergroup')
  .use((ctx) => {
    ctx.reply(`Chat ID: ${ctx.chat.id}`).catch(console.error)
  })
