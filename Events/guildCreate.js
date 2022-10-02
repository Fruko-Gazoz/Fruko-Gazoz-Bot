import { readdirSync } from "fs"

export default async (Client) => {
  Client.on('guildCreate', guild => {
    Client.commands.slash.forEach(Command => {
      if (Command.guild == guild.id) {
        if (Command.options) {
          guild.commands.create({
            name: Command.name,
            description: Command.description,
            options: Command.options
          })
        } else {
          guild.commands.create({
            name: Command.name,
            description: Command.description
          })
        }
      } else {
        if (Command.options) {
          guild.commands.create({
            name: Command.name,
            description: Command.description,
            options: Command.options
          })
        } else {
          guild.commands.create({
            name: Command.name,
            description: Command.description
          })
        }
      }
    })
  })
}