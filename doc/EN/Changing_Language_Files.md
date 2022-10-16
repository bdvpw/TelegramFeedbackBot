# Guide to changing language files
All language files are stored in the [src/contents/](../../src/contents/) folder.
## Maximum length of various texts.
- Buttons can contain a maximum of 120 characters, but we recommend making the names as short as possible.
- The maximum length of messages is 4000 characters.
- The maximum length of pop-up responses when you click on the button is 60 characters, but we recommend not to exceed the threshold of 30-40 characters.

## The editing process.
Let's take the [src/contents/commands/start/welcome_1.dialogue.ts](../../src/contents/commands/start/welcome_1.dialogue.ts) file as an example. In each file you can find a comment on what this dialog is responsible for and when it is used.

### HTML style support.
You can apply various HTML tags to your text, this is officially supported by Telegram.
For example, you can make your text **bold** by applying the tag `<b>` to it:
```ts
const dialogue: MultilingualDialogues = {
  EN: 'Dear user, <b>we love you!</b>'
}
```
You can read more information [here](https://core.telegram.org/bots/api#html-style). **Be careful, not a closed tag or incorrectly placed markup symbols can lead to a bot breakdown!**

### Symbol `'`
If you need to put the character `'`, you will encounter such a syntax error:
```ts
const dialogue: = MultilingualDialogues {
  EN: 'Wow, it's beautiful here!'
}
```
You can get around this by simply adding the `\` symbol before `'`:
```ts
const dialogue: = MultilingualDialogues {
  EN: 'Wow, it\'s beautiful here!'
}
```
### Various `{tags}`
When writing dialogues, you may need something more. For example, addressing a user by his name or username. This is where `{tags}` come to the rescue. There are 4 of them in total (in some files there may be a little more):
- `{usernameOrName}` - Displays @username or username.
- `{usernameOrFullName}` - Displays @username or the full name of the user with the last name.
- `{lastName}` - Just displays the username.
- `{fullName}` - Displays the first and last name.

Why is there no `{username}` tag? We cannot guarantee that all Telegram users have @username, so we have to do so.

Examples of using tags:
```ts
const dialogue: MultilingualDialogues = {
  EN: 'Dear {lastName}, <b>we love you!</b>'
}
```
![Example work tags](../screenshots/example_dialogue_EN_tag.png "Example work tags")

## Checking all dialogs.
To check all dialogs, enter the command: `yarn run dialogueTest`. Testing will check that the dialogs do not exceed the maximum length and do not have empty lines.

---
> Back to [README.md](../../README.md)