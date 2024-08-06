// Remove text lines from inputFile with specific filteredData extensions

const fs = require('fs')
const inputFile = 'input.txt'

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    throw console.error(err)
  }
  const filteredData = data.replace(
    /(https?:\/\/[^\s]+(\.jpg|\.jpeg|\.png))(\r?\n|$)/gi,
    ''
  )
  // Empty lines: /^\s*[\r\n]/gm
  // Images: /(https?:\/\/[^\s]+(\.jpg|\.jpeg|\.png))(\r?\n|$)/gi
  fs.writeFile(inputFile, filteredData, (err) => {
    if (err) {
      throw console.error(err)
    }
    console.log('Done')
  })
})
