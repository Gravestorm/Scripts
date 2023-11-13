const fs = require('node:fs')
const path = require('node:path')
const cron = require('cron').CronJob
const nconf = require('nconf')
nconf.use('memory')
nconf.argv().env()
if (fs.existsSync(path.join(__dirname, './config.js'))) nconf.defaults(require(path.join(__dirname, './config.js')))

const { Client, GatewayIntentBits } = require('discord.js'), client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})
let { inviteTracker } = require('discord-inviter'), tracker = new inviteTracker(client)

client.on('ready', () => {
  client.guilds.fetch('1108327592924291095').then(async (g) => {
    //await g.members.fetch({ force: true })
    g.members.fetch('710149694403379213').then(m => { m.roles.add('1108330118717378600') })
  })
  //client.guilds.fetch('1108327592924291095').members.fetch('710149694403379213').then(m => { console.log(m) })
  console.log('Bot Ready')
  new cron({
    cronTime: '00 30 19 * * *',
    onTick: async () => {
      client.channels.fetch('1108330414235467868').then(c => { c.permissionOverwrites.edit('1108330087750840340', { ViewChannel: false, SendMessages: false }) })
      client.channels.fetch('1108330026417524759').then(c => { c.permissionOverwrites.edit('1108330110513320019', { ViewChannel: false, SendMessages: false }) })
      client.channels.fetch('1108330048911585280').then(c => { c.permissionOverwrites.edit('1108330116326625320', { ViewChannel: false, SendMessages: false }) })
      client.channels.fetch('1108330059284107294').then(c => { c.permissionOverwrites.edit('1108330118717378600', { ViewChannel: false, SendMessages: false }) })
      client.channels.fetch('1109030901351976970').then(c => { c.permissionOverwrites.edit('1109031568242114591', { ViewChannel: false, SendMessages: false }) })
      client.channels.fetch('1109030967034789898').then(c => { c.permissionOverwrites.edit('1109031577930956840', { ViewChannel: false, SendMessages: false }) })
      client.channels.fetch('1109030972319617064').then(c => { c.permissionOverwrites.edit('1109031580669841490', { ViewChannel: false, SendMessages: false }) })
      client.channels.fetch('1109030977377927238').then(c => { c.permissionOverwrites.edit('1109031582519537748', { ViewChannel: false, SendMessages: false }) })
      client.channels.fetch('1109030982859882506').then(c => { c.permissionOverwrites.edit('1109031585296175174', { ViewChannel: false, SendMessages: false }) })
      client.channels.fetch('1109030989595947079').then(c => { c.permissionOverwrites.edit('1109031587573661786', { ViewChannel: false, SendMessages: false }) })
      client.channels.fetch('1109030995849654393').then(c => { c.permissionOverwrites.edit('1109031589645647973', { ViewChannel: false, SendMessages: false }) })
      client.channels.fetch('1109031001667145799').then(c => { c.permissionOverwrites.edit('1109031591382089791', { ViewChannel: false, SendMessages: false }) })
      client.channels.fetch('1109031007195242537').then(c => { c.permissionOverwrites.edit('1109031593978376192', { ViewChannel: false, SendMessages: false }) })
      client.channels.fetch('1109031018800881675').then(c => { c.permissionOverwrites.edit('1109031642783293521', { ViewChannel: false, SendMessages: false }) })
      client.channels.fetch('1109031013075652628').then(c => { c.permissionOverwrites.edit('1109031645115318342', { ViewChannel: false, SendMessages: false }) })
      //client.channels.fetch('1109034738632626207').then(c => c.send('Viewing channels and sending messages disabled'))
    },
    start: true,
    timeZone: 'Europe/Vilnius'
  })

  new cron({
    cronTime: '00 10 19 * * *',
    onTick: async () => {
      client.channels.fetch('1108330414235467868').then(c => { c.permissionOverwrites.edit('1108330087750840340', { ViewChannel: true, SendMessages: true }) })
      client.channels.fetch('1108330026417524759').then(c => { c.permissionOverwrites.edit('1108330110513320019', { ViewChannel: true, SendMessages: true }) })
      client.channels.fetch('1108330048911585280').then(c => { c.permissionOverwrites.edit('1108330116326625320', { ViewChannel: true, SendMessages: true }) })
      client.channels.fetch('1108330059284107294').then(c => { c.permissionOverwrites.edit('1108330118717378600', { ViewChannel: true, SendMessages: true }) })
      client.channels.fetch('1109030901351976970').then(c => { c.permissionOverwrites.edit('1109031568242114591', { ViewChannel: true, SendMessages: true }) })
      client.channels.fetch('1109030967034789898').then(c => { c.permissionOverwrites.edit('1109031577930956840', { ViewChannel: true, SendMessages: true }) })
      client.channels.fetch('1109030972319617064').then(c => { c.permissionOverwrites.edit('1109031580669841490', { ViewChannel: true, SendMessages: true }) })
      client.channels.fetch('1109030977377927238').then(c => { c.permissionOverwrites.edit('1109031582519537748', { ViewChannel: true, SendMessages: true }) })
      client.channels.fetch('1109030982859882506').then(c => { c.permissionOverwrites.edit('1109031585296175174', { ViewChannel: true, SendMessages: true }) })
      client.channels.fetch('1109030989595947079').then(c => { c.permissionOverwrites.edit('1109031587573661786', { ViewChannel: true, SendMessages: true }) })
      client.channels.fetch('1109030995849654393').then(c => { c.permissionOverwrites.edit('1109031589645647973', { ViewChannel: true, SendMessages: true }) })
      client.channels.fetch('1109031001667145799').then(c => { c.permissionOverwrites.edit('1109031591382089791', { ViewChannel: true, SendMessages: true }) })
      client.channels.fetch('1109031007195242537').then(c => { c.permissionOverwrites.edit('1109031593978376192', { ViewChannel: true, SendMessages: true }) })
      client.channels.fetch('1109031018800881675').then(c => { c.permissionOverwrites.edit('1109031642783293521', { ViewChannel: true, SendMessages: true }) })
      client.channels.fetch('1109031013075652628').then(c => { c.permissionOverwrites.edit('1109031645115318342', { ViewChannel: true, SendMessages: true }) })
      //client.channels.fetch('1109034738632626207').then(c => c.send('Viewing channels and sending messages enabled'))
    },
    start: true,
    timeZone: 'Europe/Vilnius'
  })

  new cron({
    cronTime: '00 00 20 * * *',
    onTick: async () => {
      client.channels.fetch('1108330414235467868').then(c => { c.permissionOverwrites.edit('1108330087750840340', { ViewChannel: true, SendMessages: false }) })
      client.channels.fetch('1108330026417524759').then(c => { c.permissionOverwrites.edit('1108330110513320019', { ViewChannel: true, SendMessages: false }) })
      client.channels.fetch('1108330048911585280').then(c => { c.permissionOverwrites.edit('1108330116326625320', { ViewChannel: true, SendMessages: false }) })
      client.channels.fetch('1108330059284107294').then(c => { c.permissionOverwrites.edit('1108330118717378600', { ViewChannel: true, SendMessages: false }) })
      client.channels.fetch('1109030901351976970').then(c => { c.permissionOverwrites.edit('1109031568242114591', { ViewChannel: true, SendMessages: false }) })
      client.channels.fetch('1109030967034789898').then(c => { c.permissionOverwrites.edit('1109031577930956840', { ViewChannel: true, SendMessages: false }) })
      client.channels.fetch('1109030972319617064').then(c => { c.permissionOverwrites.edit('1109031580669841490', { ViewChannel: true, SendMessages: false }) })
      client.channels.fetch('1109030977377927238').then(c => { c.permissionOverwrites.edit('1109031582519537748', { ViewChannel: true, SendMessages: false }) })
      client.channels.fetch('1109030982859882506').then(c => { c.permissionOverwrites.edit('1109031585296175174', { ViewChannel: true, SendMessages: false }) })
      client.channels.fetch('1109030989595947079').then(c => { c.permissionOverwrites.edit('1109031587573661786', { ViewChannel: true, SendMessages: false }) })
      client.channels.fetch('1109030995849654393').then(c => { c.permissionOverwrites.edit('1109031589645647973', { ViewChannel: true, SendMessages: false }) })
      client.channels.fetch('1109031001667145799').then(c => { c.permissionOverwrites.edit('1109031591382089791', { ViewChannel: true, SendMessages: false }) })
      client.channels.fetch('1109031007195242537').then(c => { c.permissionOverwrites.edit('1109031593978376192', { ViewChannel: true, SendMessages: false }) })
      client.channels.fetch('1109031018800881675').then(c => { c.permissionOverwrites.edit('1109031642783293521', { ViewChannel: true, SendMessages: false }) })
      client.channels.fetch('1109031013075652628').then(c => { c.permissionOverwrites.edit('1109031645115318342', { ViewChannel: true, SendMessages: false }) })
      //client.channels.fetch('1109034738632626207').then(c => c.send('Sending messages disabled'))
    },
    start: true,
    timeZone: 'Europe/Vilnius'
  })
})

tracker.on('guildMemberAdd', async (member, inviter, invite, err) => {
  //if (err) client.channels.fetch('1109034738632626207').then(c => c.send(err))
  let i = 0
  switch (invite.code) {
    case 'NV8HctG2va': member.roles.add('1108330087750840340'); i = 1; break
    case 'F2bhGFazFr': member.roles.add('1108330110513320019'); i = 2; break
    case 'W3KCSBPg2B': member.roles.add('1108330116326625320'); i = 3; break
    case 'kCzGjsCwUK': member.roles.add('1108330118717378600'); i = 4; break
    case 'CBvTQ7D5XJ': member.roles.add('1109031568242114591'); i = 5; break
    case 'VsmYCxzKcY': member.roles.add('1109031577930956840'); i = 6; break
    case 'nWmdvxTxYp': member.roles.add('1109031580669841490'); i = 7; break
    case 'PHBB6ne6rh': member.roles.add('1109031582519537748'); i = 8; break
    case 'wYhDENAHsZ': member.roles.add('1109031585296175174'); i = 9; break
    case 'bsj9kWQ4hq': member.roles.add('1109031587573661786'); i = 10; break
    case 'Yzfdaasgr6': member.roles.add('1109031589645647973'); i = 11; break
    case 'zs2JdnqBnm': member.roles.add('1109031591382089791'); i = 12; break
    case 'PmyjMND4SS': member.roles.add('1109031593978376192'); i = 13; break
    case 'R7zVye5VCB': member.roles.add('1109031642783293521'); i = 14; break
    case 'EjZr67gExK': member.roles.add('1109031645115318342'); i = 15; break
    default: console.log('Unknown Invite Code')
  }
  //client.channels.fetch('1109034738632626207').then(c => c.send(`${member.user} joined via ${invite.code}, group number ${i}`))
})

//tracker.on('error', (err) => { client.channels.fetch('1109034738632626207').then(c => c.send(err)) })

client.on('disconnected', () => { console.log('Disconnected'); setTimeout(() => { client.login(nconf.get('TOKEN')) }, 5000) })

client.login(nconf.get('TOKEN'))
