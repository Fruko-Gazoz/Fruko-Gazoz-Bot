import { readdirSync } from 'fs'
import search from 'yt-search'

export default async (Client) => {
  for (let Category of readdirSync(`././Commands/Slash Commands`)) {
    for (let File of readdirSync(`././Commands/Slash Commands/${Category}`)) {
      let Command = await import(`../Commands/Slash Commands/${Category}/${File}`).then(m => m.default)
      
      Client.on('interactionCreate', async (Interaction) => {
        if (Interaction.isCommand()) {
          const Options = Interaction.options
          
          if (Interaction.commandName == Command.name) {
            try {
              Command.execute(Client, Interaction, Options)
            } catch (e) {
              console.error(e)
            }
          }
        }
      })
    }
  }
}