const fetch = require('request-promise')
const fs = require('fs')
const https = require('https')
const promise = require('bluebird')
const key = ''
const serverID = ''
const userID = ''
const pages = 0
const directory = 'C:\\Downloaded'
fs.ensureDirSync(directory)

async function fetchWithRetries(url) {
  let retries = 0
  while (retries < 5) {
    try {
      await new promise((resolve) => setTimeout(resolve, 6000))
      const response = await fetch({ url: url, headers: { Accept: '*/*', 'Accept-Language': 'en-US,en;q=0.9,lt;q=0.8', Authorization: key, Connection: 'close', 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.42' }})
      return response
    } catch (err) {
      if (err.statusCode === 429) {
        const retryAfter = err.response.retry_after || 3
        console.log(`Rate limited. Retrying after ${retryAfter} seconds...`)
        await new promise((resolve) => setTimeout(resolve, retryAfter * 2000))
        retries++
      } else {
        console.error(err)
      }
    }
  }
  throw new Error('Failed after 5 retries')
}

async function downloadFiles() {
  try {
    for (let i = 0; i < pages; i++) {
      let link = `https://discord.com/api/v9/channels/${serverID}/messages/search?author_id=${userID}&has=file&offset=${i*25}`
      const res = await fetchWithRetries(link)
      for (const m of JSON.parse(res).messages) {
        if (m[0].attachments.length > 0) {
          for (const a of m[0].attachments) {
            const filePath = `${directory}\\${a.filename}`
            if (fs.existsSync(filePath)) {
              console.log(`Skipping ${a.filename}`)
              continue
            }
            await new promise((resolve) => setTimeout(resolve, 1500))
            const fileStream = fs.createWriteStream(`${directory}\\${a.filename}`)
            await new Promise((resolve, reject) => {
              https.get(a.url, (response) => {
                  response.pipe(fileStream)
                  fileStream.on('finish', () => {
                    fileStream.close()
                    console.log(`Downloaded ${a.filename}`)
                    resolve()
                  })
                }).on('error', (err) => {
                  fs.unlinkSync(`${directory}\\${a.filename}`)
                  console.error(`Error downloading ${a.filename}: ${err}`)
                  reject(err)
                })
            })
          }
        }
      }
      console.log(`Page ${i+1}/${pages} downloaded successfully`)
    }
    console.log('Channel downloaded successfully')
  } catch (err) {
    console.error(`Error fetching messages: ${err}`)
  }
}

downloadFiles()
