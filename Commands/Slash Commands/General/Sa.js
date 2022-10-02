export default {
  name: 'sa',
  permission: 'MANAGE_CHANNELS',
  description: 'sa - as',
  async execute (Client, Interaction, Options) {
    Interaction.reply('as')
  }
}