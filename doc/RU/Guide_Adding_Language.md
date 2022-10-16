# Гайд по добавлению нового языка
В этом гайде мы рассмотрим как легко и просто добавить новый язык, например Японский (JP).

## 1. Откройте файл [src/interfaces/MultilingualDialogues.ts](../../src/interfaces/MultilingualDialogues.ts)
После открытия вы увидите две переменные: `languages` и `MultilingualDialogues`.
В `languages` добавьте новый язык `JP`, а в `MultilingualDialogues` с новой строки пропишите `JP?: string`

В итоге у вас должно получится так:
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
Таким вот способом вы можете добавлять хоть сколько угодно языков.

## 2. Добавьте новую кнопку.
- Откройте файл [src/contents/commands/start/languageSelectionButtons.dialogue.ts](../../src/contents/commands/start/languageSelectionButtons.dialogue.ts)
- Пропишите новую кнопку, в нашем случае Japanese:
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
**ВАЖНО!** Не забывайте ставить запятую на конце каждого пункта. Вот такой объект бот не сможет прочитать:
```ts
const buttons: MultilingualDialogues = {
  RU: '🇷🇺 | Russian',
  PL: '🇵🇱 | Polish',
  EN: '🇬🇧 | English',
  UA: '🇺🇦 | Ukraina',
  BE: '🇴🇲 | Belarusian' // Здесь будет ошибка.
  JP: '🇯🇵 | Japanese'
}
```

## 3. Добавьте ответ при нажатии на кнопку
- Откройте файл [src/contents/keyboards/languageSwitched.dialogue.ts](../../src/contents/keyboards/languageSwitched.dialogue.ts)
- Также, как и со вторым пунктом, пропишите диалог на смену языка, не забыв про запятую:
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
## 4. Поменяйте остальные файлы.
- Просмотрите остальные файлы в [src/contents/](../../src/contents/)
- Где это надо добавьте поддержку нового языка.

----
> Вернутся к [README.md](./README.md)