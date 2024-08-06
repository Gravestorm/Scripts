// Scrape and download images from a website

const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const base_url = 'https://krosarchive.es/FR/profile/'
const images_dir = './images'

function downloadImage(url, filepath, delay) {
  setTimeout(() => {
    if (!fs.existsSync(filepath)) {
      request
        .get(url)
        .on('error', (err) => console.error(err))
        .pipe(fs.createWriteStream(filepath))
    } else {
      console.log('Skipping file ' + filepath + ' (already exists)')
    }
  }, delay)
}

function scrapePage(url) {
  request(url, (error, response, body) => {
    if (error) {
      console.error(error)
      return
    }
    const $ = cheerio.load(body)
    $('img').each((i, el) => {
      const src = $(el).attr('src')
      if (src) {
        const filename = path.basename(src)
        const filepath = path.join(images_dir, filename)
        const delay = i * 1000
        downloadImage('https://krosarchive.es' + src, filepath, delay)
      }
    })
  })
}

function scrapeWebsite(url) {
  request(url, (error, response, body) => {
    if (error) {
      console.error(error)
      return
    }
    const $ = cheerio.load(body)
    const links = $('a')
      .map((i, el) => $(el).attr('href'))
      .get()
    console.log('Links on ' + url + ':')
    console.log(links)
    links.forEach((link) => {
      const absoluteLink = new URL(link, base_url).toString()
      scrapePage(absoluteLink)
    })
  })
}

scrapeWebsite(base_url)
