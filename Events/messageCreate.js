import { readdirSync } from 'fs'
export default async Client => {
  Client.on('messageCreate', async (Message) => {
    let prefix = process.env.PREFIX
    let Args = Message.content.slice(prefix.length).trim().split(/ +/)
    let Command = Client.commands.custom.get(Args[0].toLowerCase())
    
    if (Message.content.startsWith(prefix)) {
      if (!Command) {
        return
      } try {
        Command.execute(Client, Message, Args)
        Message.delete()
      } catch (e) {
        console.error(Client.user.username + ' | Komutlarda Bir Hata Var')
      }
    }
  })
}