import express from 'express'
import { readdirSync } from 'fs'
import fetch from 'node-fetch'
import moment from 'moment'
import 'moment-duration-format'
const app = express()

export default Client => {
  Client.on('ready', async () => {
    app.listen(3000, () => {  })
    setInterval(() => {
      console.log(Client.user.username + ' | ' + moment.duration(Client.uptime).format("D [Gün] H [Saat] m [Dakika] s [Saniye]") + 'den Beri Aktifim')
      fetch('https://' + process.env.PROJECT_DOMAIN + '.glitch.me')
    }, 120000)
    
    console.log(`\n${Client.user.username} | Aktifleştim`)
    
    Client.guilds.cache.forEach(async guild => {
      await guild.commands.fetch()
      Client.commands.slash.forEach(Command => {
        guild.commands.create({
          name: Command.name,
          description: Command.description,
          options: Command.options,
          defaultPermission: false
        }).then(command => {
          // TODO: Permission handler
        })
      })
      
      guild.commands.cache.forEach(Command => {
        if (!Array.from(Client.commands.slash.keys()).includes(Command.name)) {
          guild.commands.delete(Command.id)
        }
      })
    })
  })
}