import { MultilingualDialogues } from '../interfaces/MultilingualDialogues'

import languageSelection from '../contents/commands/start/languageSelection.dialogue'
import languageSelectionButtons from '../contents/commands/start/languageSelectionButtons.dialogue'
import welcome1 from '../contents/commands/start/welcome_1.dialogue'
import welcome2 from '../contents/commands/start/welcome_2.dialogue'

import languageSwitched from '../contents/keyboards/languageSwitched.dialogue'
import noLanguageSelected from '../contents/messageEvent/noLanguageSelected.dialogue'
import reviewPublished from '../contents/messageEvent/reviewPublished.dialogue'
import shortMessage from '../contents/messageEvent/shortMessage.dialogue'

interface AllDialogues {
  [typeDialogue: string]: Array<[MultilingualDialogues, string]>
}
const allDialogues: AllDialogues = {
  messages: [
    [languageSelection, 'commands/start/languageSelection'],
    [welcome1, 'commands/start/welcome_1'],
    [welcome2, 'commands/start/welcome_2'],
    [noLanguageSelected, 'messageEvent/noLanguageSelected'],
    [shortMessage, 'messageEvent/shortMessage'],
    [reviewPublished, 'messageEvent/reviewPublished']
  ],
  buttons: [
    [languageSelectionButtons, 'commands/start/languageSelectionButtons']
  ],
  responseFromButtons: [
    [languageSwitched, 'keyboards/languageSwitched']
  ]
}

describe('Checking for empty lines', function () {
  for (const typeDialogue in allDialogues) {
    for (const dialogue of allDialogues[typeDialogue]) {
      it(`#src/contents/${dialogue[1]}.dialogue.ts`, function (done) {
        for (const language in dialogue[0]) {
          if (dialogue[0][language as keyof typeof dialogue[0]]?.length === 0) throw Error(`There is an empty string in the "${language}" key!`)
        }
        done()
      })
    }
  }
})

describe('Checking the maximum length of messages', function () {
  for (const dialogue of allDialogues.messages) {
    it(`#src/contents/${dialogue[1]}.dialogue.ts`, function (done) {
      for (const language in dialogue[0]) {
        if (Number(dialogue[0][language as keyof typeof dialogue[0]]?.length) > 4000) throw Error(`The key "${language}" exceeds the length of 4000 characters!`)
      }
      done()
    })
  }
})

describe('Checking the maximum length of buttons name', function () {
  for (const dialogue of allDialogues.buttons) {
    it(`#src/contents/${dialogue[1]}.dialogue.ts`, function (done) {
      for (const language in dialogue[0]) {
        if (Number(dialogue[0][language as keyof typeof dialogue[0]]?.length) > 120) throw Error(`Of course, we understand your love for literature and essays, but it seems to us that for a button with the key "${language}" you do not need to write a name of more than 120 characters.`)
      }
      done()
    })
  }
})

describe('Checking the maximum length of responses when pressing buttons', function () {
  for (const dialogue of allDialogues.responseFromButtons) {
    it(`#src/contents/${dialogue[1]}.dialogue.ts`, function (done) {
      for (const language in dialogue[0]) {
        if (Number(dialogue[0][language as keyof typeof dialogue[0]]?.length) > 60) throw Error(`Do not write too large an answer in the key "${language}". Your answer exceeds 60 characters, we recommend reducing it to 30-40.`)
      }
      done()
    })
  }
})
