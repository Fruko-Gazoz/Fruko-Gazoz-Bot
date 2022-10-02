import db from 'quick.db'

export default {
  name: 'uptime',
  description: "Uptime Sistemi",
  options: [
    {
      name: 'ekle',
      description: "Uptime Sistemine Proje Ekleme Komutu",
      type: 1,
      required: false,
      options: [
        {
          name: 'url',
          description: "Uptime Sistemine Eklenecek Projenin Linki",
          type: 3,
          required: true
        }
      ]
    },
    {
      name: 'linkler',
      description: "Uptime Ettiğiniz Projeleri Gösterir",
      type: 1,
      required: false
    },
    {
      name: 'say',
      description: "Uptime Edilen Proje Sayısını Gösterir",
      type: 1,
      required: false
    },
    {
      name: 'sil',
      description: "Uptime Edilen Projelerinizi Siler",
      options: [
        {
          name: 'url',
          description: 'Uptime Sisteminden Silinecek Projenin linki',
          type: 3,
          required: true
        }
      ],
      type: 1,
      required: false
    }
  ],
  async execute (Client, Interaction, Options, Embed) {
    let Seçenek = Options.getSubcommand()
    
    if (Seçenek == 'ekle') {
      let link = Options.getString('url')
      
      if (!link.includes('https://') | !link.includes('.glitch.me')) {
        let embed = new Embed()
        .setTitle('❌ Hata ❌')
        .setDescription('Belirttiğiniz Link Bir Proje Linki Değil')
        .setColor('#ff0000')
        Interaction.reply({ embeds: [embed], ephemeral: true })
      } else if (db.get('Uptime').includes(link)) {
        let embed = new Embed()
        .setTitle('❌ Hata ❌')
        .setDescription('Belirttiğniz Proje Zaten Uptime Sistemimizde Kayılı')
        .setColor('#ff0000')
        Interaction.reply({ embeds: [embed], ephemeral: true })
      } else {
        let embed = new Embed()
        .setTitle('<:tik:938505532355018812> Başarılı <:tik:938505532355018812>')
        .setDescription('[Projeniz](' + link + ') Uptime Sistemimize Eklendi')
        .setColor('#00ff00')
        Interaction.reply({ embeds: [embed], ephemeral: true })
        
        if (!db.has(Interaction.user.id)) {
          db.set(Interaction.user.id, {})
          db.push(Interaction.user.id + '.uptime', link)
          db.push('Uptime', link)
        } else {
          db.push(Interaction.user.id + '.uptime', link)
          db.push('Uptime', link)
        }
      }
    } else if (Seçenek == 'linkler') {
      if (db.get(Interaction.user.id + '.uptime') == null) {
        let embed = new Embed()
        .setTitle('❌ Hata ❌')
        .setDescription("Uptime Sistemine Hiç Proje Eklememişsiniz\n\n`/uptime ekle` Yazarak Projelerinizi Uptime Edebilirsiniz")
        .setColor('#ff0000')
        Interaction.reply({ embeds: [embed], ephemeral: true })
      } else {
        let embed = new Embed()
        .setTitle('🟢 Uptime Linklerin 🟢')
        .setDescription('> ' + db.get(Interaction.user.id + '.uptime').join('\n> '))
        .setColor('#00ff00')
        Interaction.reply({ embeds: [embed], ephemeral: true })
      }
    } else if (Seçenek == 'say') {
      let linkleri
      let bütün_linkler
      
      if (db.get(Interaction.user.id + '.uptime') == null) {
        linkleri = '0'
      } else if (db.get('Uptime') == null) {
        linkleri = '0'
        db.delete(Interaction.user.id + '.uptime')
      } else {
        linkleri = db.get(Interaction.user.id + '.uptime').length
      }
      
      if (db.get('Uptime') == null) {
        bütün_linkler = '0'
      } else {
        bütün_linkler = db.get('Uptime').length
      }
      
      let embed = new Embed()
      .setTitle('🟢 Uptime Edilen Link Sayıları 🟢')
      .addField('Uptime Sistemindeki Proje Sayısı', `> ${bütün_linkler}`)
      .addField('Senin Uptime Ettiğin Proje Sayısı', `> ${linkleri}`)
      .setColor('#00ff00')
      Interaction.reply({ embeds: [embed], ephemeral: true })
    } else if (Seçenek == 'sil') {
      let link = Options.getString('url')
      
      if (!link.includes('https://') | !link.includes('.glitch.me')) {
        let embed = new Embed()
        .setTitle('❌ Hata ❌')
        .setDescription('Belirttiğiniz Link Bir Proje Linki Değil')
        .setColor('#ff0000')
        Interaction.reply({ embeds: [embed], ephemeral: true })
      } else if (!db.get('Uptime').includes(link)) {
        let embed = new Embed()
        .setTitle('❌ Hata ❌')
        .setDescription('Bu Link Uptime Sistemimizde Bulunmuyor')
        .setColor('#ff0000')
        Interaction.reply({ embeds: [embed], ephemeral: true })
      } else if (!db.get(Interaction.user.id + '.uptime').includes(link)) {
        let embed = new Embed()
        .setTitle('❌ Hata ❌')
        .setDescription('Bu Projeyi Uptime Sistemimize Siz Eklememişsiniz')
        .setColor('#ff0000')
        Interaction.reply({ embeds: [embed], ephemeral: true })
      } else {
        let embed = new Embed()
        .setTitle('<:tik:938505532355018812> Başarılı <:tik:938505532355018812>')
        .setDescription('[Projeniz](' + link + ') Uptime Sistemimizden Silindi')
        .setColor('#00ff00')
        Interaction.reply({ embeds: [embed], ephemeral: true })
        
        db.set('Uptime', db.get('Uptime').slice(0, db.get('Uptime').indexOf(link)).concat(db.get('Uptime').slice(db.get('Uptime').indexOf(link) + 1)))
        db.set(Interaction.user.id + '.uptime', db.get(Interaction.user.id + '.uptime').slice(0, db.get(Interaction.user.id + '.uptime').indexOf(link)).concat(db.get(Interaction.user.id + '.uptime').slice(db.get(Interaction.user.id + '.uptime').indexOf(link) + 1)))
      }
    }
  }
}