import commandsInfo from '../config/commandsInfo'
import { accessSync, readFileSync } from 'fs'
import { TypeOfTag } from 'typescript'
import { config } from 'dotenv'
import { Bot } from 'grammy'
config()

interface BasicConfig {
  [key: string]: any
}

const BASIC_CONFIG_PATH = 'src/config/basic.json'

describe('Checking .env', function () {
  let envFileExists = false

  it('File availability', function (done) {
    accessSync('.env')
    envFileExists = true
    done()
  })

  it('#TELEGRAM_BOT_TOKEN', function (done) {
    if (!envFileExists) throw Error('The .env file is missing.')

    if (process.env.TELEGRAM_BOT_TOKEN) done()
    else throw Error('The TELEGRAM_BOT_TOKEN parameter required to launch the Telegram bot is missing.')
  })
})

let basicConfig: BasicConfig | null = null
describe(`Type checking in ${BASIC_CONFIG_PATH}`, function () {
  /**
   * Checks the type of the parameter in the config.
   * @param key Parameter
   */
  function checkType (key: string, type: TypeOfTag[], allowNull?: boolean): void {
    it(`#${key}`, function (done) {
      if (!basicConfig) throw Error(`Could not read ${BASIC_CONFIG_PATH} file.`)
      if (!(key in basicConfig)) throw Error(`The ${key} property is missing.`)

      if (allowNull && basicConfig[key] === null) {
        done()
        return
      }

      const typeKey = typeof basicConfig[key]
      if (!type.includes(typeKey)) throw TypeError(`Has the type ${typeKey.toLocaleUpperCase()}, but should be ${type.map(t => t.toUpperCase()).join(' or ')}.`)
      done()
    })
  }

  it('File availability', function (done) {
    basicConfig = JSON.parse(readFileSync(BASIC_CONFIG_PATH).toString())
    done()
  })

  checkType('DisableRootVerification', ['boolean'])
  checkType('chatIdWithReviews', ['string', 'number'], true)
  checkType('channelIdWithReviews', ['string', 'number'], true)
  checkType('userCooldown', ['number'], true)
})

describe('Checking src/config/commandsInfo.ts', function () {
  describe('Checking the shortDescription', function () {
    for (const commandName in commandsInfo) {
      const { shortDescription: desc } = commandsInfo[commandName]
      it(`/${commandName}`, function (done) {
        if (desc.length === 0) throw Error(`In the /${commandName} command, the length of the shortDescription cannot be zero.`)
        if (desc.length > 256) throw Error(`In the /${commandName} command, the length of the shortDescription cannot be more than 256 characters.`)
        done()
      })
    }
  })
})

describe('Checking all data in the Telegram API', function () {
  const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN as string)
  it('Connecting the bot', function (done) {
    this.timeout(0)
    this.slow(500)
    bot.start().catch(() => null)

    bot.api.getMe()
      .then(() => done())
      .catch(() => done(Error('Failed to connect to the bot. You may have incorrectly specified the token in the .env file or you do not have an internet connection.')))
  })

  function checkAvailabilityChat (key: string): void {
    it(`Checking #${key}`, function (done) {
      if (!basicConfig) throw Error('The config file does not exist.')
      if (basicConfig[key] === null) return done()

      this.timeout(0)
      this.slow(100)
      bot.api.getChat(basicConfig[key] as string)
        .then(() => done())
        .catch(() => done(Error('The chat was not found! Make sure you have entered the correct ID.')))
    })
  }

  checkAvailabilityChat('chatIdWithReviews')
  checkAvailabilityChat('channelIdWithReviews')
})
