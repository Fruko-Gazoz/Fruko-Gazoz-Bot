import Discord from 'discord.js'
import { readdirSync } from 'fs'
import fetch from 'node-fetch'
import Self from 'discord.js-selfbot-v13'
import self from 'discord.js-selfbot'

let Client = new Discord.Client({ intents: 32767, presence: { activities: [{ name: "Fruko Gazoz ile", type: "STREAMING", url: "https://www.twitch.tv/adal" }]}})
Client.self = new Self.Client()
Client.selfbot = new self.Client()

Client.commands = new Discord.Collection()
Client.commands.custom = new Discord.Collection()
Client.commands.slash = new Discord.Collection()

let c = async () => {
  for (let Category of readdirSync(`./Commands/Custom Commands`)) {
    for (let commandFile of readdirSync(`./Commands/Custom Commands/${Category}`)) {
      let File = await import(`./Commands/Custom Commands/${Category}/${commandFile}`).then(m => m.default)
      Client.commands.custom.set(File.name, File)
      
      console.log("${CoderFruko}'s | Yüklenen Custom komut =", File.name[0].toUpperCase() + File.name.slice(1))
    }
  } console.log()
  
  for (let Category of readdirSync(`./Commands/Slash Commands`)) {
    for (let commandFile of readdirSync(`./Commands/Slash Commands/${Category}`)) {
      let File = await import(`./Commands/Slash Commands/${Category}/${commandFile}`).then(m => m.default)
      Client.commands.slash.set(File.name, File)
      
            console.log("${CoderFruko}'s | Yüklenen Slash komut =", File.name[0].toUpperCase() + File.name.slice(1))
    }
  }
}; c()

let e = async () => {
  for (let File of readdirSync('./Events')) {
    let event = await import(`./Events/${File}`).then(m => m.default)
    event(Client)
  }
}; e()





Client.self.login(process.env.HESAP_TOKEN).then(() => console.log(Client.self.user.username.replace('!          ', '') + ' | Aktifleştim\n'))
Client.selfbot.login(process.env.HESAP_TOKEN).then(() => {
  Client.selfbot.user.setActivity("Fruko Gazoz's Bot ile", { type: "STREAMING", url: "https://www.twitch.tv/adal" })
})
Client.login(process.env.TOKEN)