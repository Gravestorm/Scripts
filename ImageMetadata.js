const fs = require('fs')
const { exec } = require('child_process')
const path = require('path')
const os = require('os')

// Function to extract date and time from filename
function extractDateTime(filename) {
  const parts = filename.split('_')
  if (parts.length < 3) {
    console.error(`Invalid filename format: ${filename}`)
    return null
  }

  const dateString = parts[1]
  const timeString = parts[2].split('.')[0] // Remove file extension
  const year = dateString.slice(0, 4)
  const month = dateString.slice(4, 6)
  const day = dateString.slice(6, 8)
  const hour = timeString.slice(0, 2)
  const minute = timeString.slice(2, 4)
  const second = timeString.slice(4, 6)

  // Construct Date object with UTC time
  return new Date(Date.UTC(year, month - 1, day, hour, minute, second))
}

// Function to modify metadata of an image file
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

// Function to update file's modification time
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

// Function to update file's creation time by copying the file
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

// Function to process all files in a directory
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

// Usage: Call processFiles with the directory containing the images
const directory = 'C:\\Users\\PC\\Downloads\\ff'
processFiles(directory)
