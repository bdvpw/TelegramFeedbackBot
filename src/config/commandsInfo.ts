interface infoScheme {
  [commandName: string]: {
    /** Display the command in the tooltips. */
    show: boolean

    /** A brief description of the command that will be shown in the prompts. */
    shortDescription: string
  }
}

const scheme: infoScheme = {
  start: {
    show: true,
    shortDescription: 'Start over.'
  },
  chatID: {
    show: false,
    shortDescription: 'Find out the group ID.'
  }
}

export default scheme
