# Guide for adding a new language
In this guide, we will look at how easy and simple it is to add a new language, for example Japanese (JP).

## 1. Open file [src/interfaces/MultilingualDialogues.ts](../../src/interfaces/MultilingualDialogues.ts).
After opening, you will see two variables:
`languages` and `MultilingualDialogues`.
In `languages` add a new language "JP", and in `MultilingualDialogues` write `JP?: string` from a new line.

In the end, you should get like this:
```ts
type languages = 'RU' | 'PL' | 'EN' | 'UA' | 'BE' | 'JP'

interface MultilingualDialogues {
  RU?: string
  PL?: string
  EN: string
  UA?: string
  BE?: string
  JP?: string
}

export { MultilingualDialogues, languages }
```
In this way, you can add at least as many languages as you want.

## 2. Add a new button.
- Open file [src/contents/commands/start/languageSelectionButtons.dialogue.ts](../../src/contents/commands/start/languageSelectionButtons.dialogue.ts)
- Write a new button, in our case Japanese:
```ts
import { MultilingualDialogues } from '../../../interfaces/MultilingualDialogues'

/** Buttons for setting the language. */
const buttons: MultilingualDialogues = {
  RU: '🇷🇺 | Russian',
  PL: '🇵🇱 | Polish',
  EN: '🇬🇧 | English',
  UA: '🇺🇦 | Ukraina',
  BE: '🇴🇲 | Belarusian',
  JP: '🇯🇵 | Japanese'
}

export default buttons
```
**IMPORTANT!** Don't forget to put a comma at the end of each paragraph. Here is an object that the bot will not be able to read:
```ts
const buttons: MultilingualDialogues = {
  RU: '🇷🇺 | Russian',
  PL: '🇵🇱 | Polish',
  EN: '🇬🇧 | English',
  UA: '🇺🇦 | Ukraina',
  BE: '🇴🇲 | Belarusian' // There will be an error here.
  JP: '🇯🇵 | Japanese'
}
```

## 3. Add an answer when you click on the button
- Open file [src/contents/keyboards/languageSwitched.dialogue.ts](../../src/contents/keyboards/languageSwitched.dialogue.ts)
- Also, as with the second point, write down the dialog to change the language, not forgetting about the comma:
```ts
import { MultilingualDialogues } from '../../interfaces/MultilingualDialogues'

/** When the user clicks on the button, one of these messages should appear to him. */
const dialogue: MultilingualDialogues = {
  RU: '🇷🇺 | Язык изменён на русский!',
  PL: '🇵🇱 | Język zmieniony na polski!',
  EN: '🇬🇧 | The language has been changed to English!',
  UA: '🇺🇦 | Мову змінено на українську!',
  BE: '🇴🇲 | Мова зменены на беларускую!',
  JP: '🇯🇵 | 言語が日本語に変更されました！'
}

export default dialogue
```
## 4. Change the remaining files.
- View the rest of the files in [src/contents/](../../src/contents/)
- Where necessary, add support for the new language.

----
> Back to [README.md](../../README.md)