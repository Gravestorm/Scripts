// Add/modify date metadata of images based on the file name

const fs = require('fs')
const { exec } = require('child_process')
const path = require('path')
const os = require('os')
const directory = 'C:\\Media\\Images\\Camera'

function extractDateTime(filename) {
  const parts = filename.split('_')
  if (parts.length < 3) {
    console.error(`Invalid filename format: ${filename}`)
    return null
  }
  const dateString = parts[1]
  const timeString = parts[2].split('.')[0]
  const year = dateString.slice(0, 4)
  const month = dateString.slice(4, 6)
  const day = dateString.slice(6, 8)
  const hour = timeString.slice(0, 2)
  const minute = timeString.slice(2, 4)
  const second = timeString.slice(4, 6)
  let datetime = new Date(Date.UTC(year, month - 1, day, hour, minute, second))
  if (filename.includes('_1.')) datetime.setSeconds(datetime.getSeconds() + 1)
  return datetime
}

function modifyMetadata(filepath, datetime) {
  return new Promise((resolve, reject) => {
    const command = `exiftool -overwrite_original -DateTimeOriginal="${datetime.toISOString()}" -CreateDate="${datetime.toISOString()}" "${filepath}"`
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

function updateFileModificationTime(filepath, datetime) {
  fs.utimes(filepath, datetime, datetime, (err) => {
    if (err) {
      console.error(
        `Error updating file modification time for ${filepath}:`,
        err
      )
    } else {
      console.log(`File modification time updated for ${filepath}`)
    }
  })
}

function updateFileCreationTime(filepath, tempFilePath, datetime) {
  fs.copyFile(filepath, tempFilePath, (err) => {
    if (err) {
      console.error(`Error copying file for ${tempFilePath}:`, err)
    } else {
      fs.utimes(tempFilePath, datetime, datetime, (err) => {
        if (err) {
          console.error(
            `Error updating file creation time for ${tempFilePath}:`,
            err
          )
        } else {
          fs.rename(tempFilePath, filepath, (err) => {
            if (err) {
              console.error(`Error renaming file for ${filepath}:`, err)
            } else {
              console.log(`File creation time updated for ${filepath}`)
            }
          })
        }
      })
    }
  })
}

async function processFiles(directory) {
  try {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'image-metadata-'))
    const files = fs.readdirSync(directory)
    for (const file of files) {
      const filepath = path.join(directory, file)
      const stat = fs.statSync(filepath)
      if (stat.isFile()) {
        const datetime = extractDateTime(file)
        const tempFilePath = path.join(tempDir, file)
        await modifyMetadata(filepath, datetime)
        updateFileModificationTime(filepath, datetime)
        updateFileCreationTime(filepath, tempFilePath, datetime)
        console.log(`Modified metadata for ${file}`)
      }
    }
    console.log('All files processed successfully.')
    fs.rmdirSync(tempDir, { recursive: true })
  } catch (error) {
    console.error('Error processing files:', error)
  }
}

processFiles(directory)
