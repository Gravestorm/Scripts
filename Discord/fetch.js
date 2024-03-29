const fs = require('fs')
const https = require('https')

async function fetchWithRetries(url) {
  let retries = 0
  while (retries < 5) {
    try {
      await delay(6000)
      const response = await fetch(url)
      return response
    } catch (err) {
      if (err.statusCode === 429) {
        const retryAfter = err.response.retry_after || 3
        console.log(`Rate limited. Retrying after ${retryAfter} seconds...`)
        await delay(retryAfter * 2000)
        retries++
      } else {
        throw err
      }
    }
  }
  throw new Error('Failed after 5 retries')
}

async function downloadFiles() {
  try {
    const res = await fetchWithRetries('https://discord.com/api/v9/guilds/746293333218951241/messages/search?channel_id=753685966425686067&author_id=78600305175961600&has=file&include_nsfw=true&offset=100')
    for (const m of JSON.parse(res).messages) {
      if (m[0].attachments.length > 0) {
        for (const a of m[0].attachments) {
          await delay(1500)
          const fileStream = fs.createWriteStream(`dl/${a.filename}`)
          await new Promise((resolve, reject) => {
            https.get(a.url, response => {
              response.pipe(fileStream)
              fileStream.on('finish', () => {
                fileStream.close()
                console.log('File downloaded successfully.')
                resolve()
              })
            }).on('error', err => {
              fs.unlinkSync(`dl/${a.filename}`)
              console.error('Error downloading file:', err)
              reject(err)
            });
          });
        }
      }
    }
    console.log('+')
  } catch (error) {
    console.error('Error fetching messages:', error)
  }
}

downloadFiles()