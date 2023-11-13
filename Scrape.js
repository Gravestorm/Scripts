const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const base_url = 'https://krosarchive.es/FR/profile/';
const images_dir = './images';

// Helper function to download an image with a delay
function downloadImage(url, filepath, delay) {
  setTimeout(() => {
    if (!fs.existsSync(filepath)) {
      request.get(url)
        .on('error', (err) => console.error(err))
        .pipe(fs.createWriteStream(filepath));
    } else {
      console.log('Skipping file ' + filepath + ' (already exists)');
    }
  }, delay);
}

// Function to scrape a page and download all images with a delay
function scrapePage(url) {
  request(url, (error, response, body) => {
    if (error) {
      console.error(error);
      return;
    }

    const $ = cheerio.load(body);

    // Find all image tags and download the images with a delay
    $('img').each((i, el) => {
      const src = $(el).attr('src');
      if (src) {
        const filename = path.basename(src);
        const filepath = path.join(images_dir, filename);
        const delay = i * 1000; // Delay increases by 500ms for each image
        downloadImage('https://krosarchive.es' + src, filepath, delay);
      }
    });
  });
}

// Function to scrape a website and find all links
function scrapeWebsite(url) {
  request(url, (error, response, body) => {
    if (error) {
      console.error(error);
      return;
    }

    const $ = cheerio.load(body);

    const links = $('a').map((i, el) => $(el).attr('href')).get();

    console.log('Links on ' + url + ':');
    console.log(links);

    // Download images from each linked page
    links.forEach((link) => {
      const absoluteLink = new URL(link, base_url).toString();
      scrapePage(absoluteLink);
    });
  });
}

// Start scraping from the base URL
scrapeWebsite(base_url);
