# feedback-tgbot
Telegram is a bot that accepts feedback from users and forwards them to the desired channel or chat. Supports multiple languages and is easily expandable.

## Commands
- `/start` - Asks the user for his language and shows instructions on how to leave a review. Works only in private messages.
- `/chatID` - Works only in chats, allows you to find out the chat ID.
## Supported languages at the moment:
- 🇷🇺 | Russian
- 🇵🇱 | Polish
- 🇬🇧 | English (by default)
- 🇺🇦 | Ukraina
- 🇴🇲 | Belarusian
## Preparation
1. Install [Node.js LTS](https://nodejs.org/en/).
2. Run the `corepack enable` command. You may need to log in to CMD as an administrator if you are on Windows.
3. Run the `yarn` command in the root of the project.

## Setting up the bot
1. Create a `.env` file in the root of the project
2. Write down the `TELEGRAM_BOT_TOKEN=`
3. After the equal sign, insert the token from the Telegram bot. Example: 
```
TELEGRAM_BOT_TOKEN=3829410421:AIO_dhjlskAJKLDJlkd_S9d879S
```
## Launching the bot
- Enter the command `yarn run start`
---
## Additional documentation:
- [Configuring the main parameters of the bot.](./doc/Configuration.md)
- A tool for checking your settings and instructions for possible errors (Highly recommended)
- Guide for editing the language files of the bot.
- Guide for adding a new language.
- Optimization of the bot startup speed.