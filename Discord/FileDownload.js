const fetch = require('request-promise')
const fs = require('fs')
const https = require('https')
const key = ''
const link = ''

async function fetchWithRetries(url) {
  let retries = 0
  while (retries < 5) {
    try {
      await delay(6000)
      const response = await fetch({ url: url, headers: { Accept: '*/*', 'Accept-Language': 'en-US,en;q=0.9,lt;q=0.8', Authorization: key, Connection: 'close', 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.42' } })
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
    const res = await fetchWithRetries(link)
    for (const m of JSON.parse(res).messages) {
      if (m[0].attachments.length > 0) {
        for (const a of m[0].attachments) {
          await delay(1500)
          const fileStream = fs.createWriteStream(`Downloaded/${a.filename}`)
          await new Promise((resolve, reject) => {
            https.get(a.url, response => {
              response.pipe(fileStream)
              fileStream.on('finish', () => {
                fileStream.close()
                console.log('File downloaded successfully')
                resolve()
              })
            }).on('error', err => {
              fs.unlinkSync(`Downloaded/${a.filename}`)
              console.error('Error downloading file: ', err)
              reject(err)
            });
          });
        }
      }
    }
    console.log('+')
  } catch (error) {
    console.error('Error fetching messages: ', error)
  }
}

downloadFiles()