// Download media with specific extensions from inputFile

const fs = require('fs')
const https = require('https')
const path = require('path')
const inputFile = 'input.txt'
const urls = fs.readFileSync(inputFile, 'utf-8').split('\n')

urls.forEach((url, index) => {
  if (!url || !url.match(/\.(mp4|webm)$/i)) {
    // /\.(jpeg|jpg|png)$/i)  /\.(mp4|webm)$/i)  /\.(gif)$/i)
    return console.log(`Skipping URL: ${url}`)
  }
  setTimeout(() => {
    https.get(url, (response) => {
      const filename = path.basename(url)
      let outputPath = path.join('C:\\Media\\Downloaded', filename)
      let count = 1
      while (fs.existsSync(outputPath)) {
        const extension = path.extname(filename)
        const nameWithoutExtension = filename.slice(0, -extension.length)
        outputPath = path.join(
          'C:\\Media\\Downloaded',
          `${nameWithoutExtension}_${count}${extension}`
        )
        count++
      }
      const file = fs.createWriteStream(outputPath)
      response.pipe(file)
      file.on('finish', () => {
        const stats = fs.statSync(outputPath)
        if (stats.isFile() && stats.size > 0) {
          console.log(`Downloaded: ${url}`)
          urls.splice(index, 1)
          fs.writeFileSync(inputFile, urls.join('\n'))
        } else {
          console.log(`Error downloading: ${url}`)
          fs.unlinkSync(outputPath)
        }
      })
    })
  }, index * 1000)
})
