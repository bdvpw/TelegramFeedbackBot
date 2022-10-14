import { config } from 'dotenv'
import { access } from 'fs'
import { DisableRootVerification } from './config/basic.json'

console.log('[PROJECT] Starting...')
access('package.json', (err) => {
  if (err) {
    if (DisableRootVerification) {
      console.warn('[WARN] It seems that you did not launch the project from the root directory with package.json. I hope you understand what you\'re doing.')
    } else {
      console.error(`Package.json file not found! Perhaps you are launching a project not from the root of the project.
This behavior is highly discouraged, please go to the directory with the package.json file.
      
However, if you understand all the risks, you can set the "DisableRootVerification" option to true`)
      process.exit()
    }
  }
  config()
  require('./telegramClient')
})
