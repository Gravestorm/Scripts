const { Client } = require('discord.js-selfbot-v13')
const client = new Client()
const fs = require('fs-extra')
const path = require('path')
const channelId = '1247988990729125950'
const key = ''
const inputFolder = 'C:\\Users\\PC\\Downloads\\BeforeSend'
const outputFolder = 'C:\\Users\\PC\\Downloads\\AfterSend'
fs.ensureDirSync(outputFolder)

client.once('ready', async () => {
  const channel = await client.channels.fetch(channelId)
  const sendVideos = async () => {
    const files = await fs.readdir(inputFolder)
    for (let i = 0; i < files.length; i += 10) {
      const batch = files.slice(i, i + 10)
      const attachments = batch.map((file) => {
        return {
          attachment: path.join(inputFolder, file),
          name: file,
        }
      })
      try {
        await channel.send({ files: attachments })
        console.log(`Batch ${i / 10 + 1} sent successfully`)
        for (const file of batch) {
          const oldPath = path.join(inputFolder, file)
          const newPath = path.join(outputFolder, file)
          await fs.move(oldPath, newPath)
        }
        console.log(`Batch ${i / 10 + 1} moved successfully`)
      } catch (error) {
        console.error(`Failed to send batch ${i / 10 + 1}: `, error)
      }
    }
  }
  await sendVideos()
  console.log('All batches sent and moved')
})

client.on('error', console.error)
client.login(key)
