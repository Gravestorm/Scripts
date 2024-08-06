// Filter and move text lines from inputFile into outputFile with specific regex extensions

const fs = require('fs')
const inputFile = 'input.txt'
const outputFile = 'output.txt'

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    throw console.error(err)
  }
  const regex = /(https?:\/\/[^\s]+(\.jpg|\.jpeg|\.png))/gi
  const links = data.match(regex)
  fs.writeFile(outputFile, links.join('\n'), (err) => {
    if (err) {
      throw console.error(err)
    }
    console.log('Filtered links copied to output')
    const filteredData = data.replace(regex, '')
    fs.writeFile(inputFile, filteredData, (err) => {
      if (err) {
        throw console.error(err)
      }
      console.log('Filtered links removed from input')
    })
  })
})
