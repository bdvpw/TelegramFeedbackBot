# feedback-tgbot
[![Powered by bdv.pw](https://img.shields.io/badge/powered%20by-bdv.pw-blueviolet)](https://bdv.pw/)
![node-current](https://img.shields.io/node/v/latest)
![version](https://img.shields.io/badge/version-1.2.0-success)
### Russian documentation is [here](./doc/RU/README.md)
Telegram bot that accepts feedback from users and forwards them to the desired channel or chat. Supports multiple languages and is easily expandable.

## Commands
- `/start` - Asks the user for his language and shows instructions on how to leave a review. Works only in private messages.
- `/chatID` - Works only in chats, allows you to find out the chat ID.
## Supported languages at the moment:
- 🇷🇺 | Russian
- 🇵🇱 | Polish
- 🇬🇧 | English (by default)
- 🇺🇦 | Ukrainian
- 🇧🇾 | Belarusian

## Bot preparation
1. Create a `.env` file in the root of the project
2. Write down the `TELEGRAM_BOT_TOKEN=`
3. After the equal sign, insert the token from the Telegram bot. Example: 
```fix
TELEGRAM_BOT_TOKEN=3829410421:AIO_dhjlskAJKLDJlkd_S9d879S
```

## Quick start with Docker.
1. Create an image: `docker build -t feedback-tgbot .`
2. Run it: `docker run -d --env-file=.env feedback-tgbot`

## Preparation
1. Install [Node.js LTS](https://nodejs.org/en/).
2. Run the `corepack enable` command. You may need to log in to CMD as an administrator if you are on Windows.
3. Write the `yarn` command in the project folder.


## Launching the bot
- Enter the command `yarn run start`
---
## Additional documentation:
- [Configuring the main parameters of the bot.](./doc/EN/Configuration.md)
- [A tool for checking your settings and instructions for possible errors (Highly recommended)](./doc/EN/Testing_and_Errors.md)
- [Guide for editing the language files of the bot.](./doc/EN/Changing_Language_Files.md)
- [Guide for adding a new language.](./doc/EN/Guide_Adding_Language.md)
- [Optimization of the bot startup speed.](./doc/EN/Launch_Optimization.md)
