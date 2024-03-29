const cheerio = require('cheerio');
const moment = require('moment');
const fetch = require('request-promise');
const fs = require('fs/promises');

async function fetchData(year) {
  const almanax = JSON.parse(await fs.readFile('Almanax.json', 'utf-8'));
  let currentDate
  if (year === 2012) {
    currentDate = moment(`${year}-09-18`)
  } else {
    currentDate = moment(`${year}-01-01`)
  }
  const endDate = moment(`${year}-12-31`);
  const fileName = `AlmanaxYears_${year}.json`;
  let questMap = new Map();
  while (currentDate <= endDate) {
    console.log(currentDate.format('YYYY-MM-DD'));
    try {
      const $ = await fetch({
        url: `https://www.krosmoz.com/en/almanax/${currentDate.format('YYYY-MM-DD')}?game=dofus`,
        headers: {
          Accept: '*/*',
          'Accept-Language': 'en-US,en;q=0.9,lt;q=0.8',
          Connection: 'close',
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.42',
        },
        encoding: 'utf8',
        transform: (body) => cheerio.load(body),
      });
      let questName = $('#achievement_dofus .mid .more .more-infos p').first().text().trim().replace('Quest: Offering for ', '');
      let questData = almanax.find(d => questName === d.N);

      if (questMap.has(questName)) {
        questMap.get(questName).D.push(currentDate.format('YYYY-MM-DD'));
      } else {
        questMap.set(questName, {
          N: questName,
          D: [currentDate.format('YYYY-MM-DD')],
          R: questData.R,
          IFR: questData.IFR,
          IEN: questData.IEN,
          BEN: questData.BEN,
          BFR: questData.BFR,
          I: questData.I,
        });
      }
    } catch (err) {
      console.error(err);
    }
    currentDate.add(1, 'days');
  }
  try {
    const obj = { almanax: Array.from(questMap.values()) };
    await fs.writeFile(fileName, JSON.stringify(obj.almanax), 'utf8');
    console.log(`+ (${year})`);
  } catch (err) {
    console.error(err);
  }
}
async function mergeFiles() {
  const startYear = 2024;
  const endYear = 2025;
  const outputFile = 'AlmanaxYears.json';
  let allYearsData = new Map();
  for (let year = startYear; year <= endYear; year++) {
    const fileName = `AlmanaxYears_${year}.json`;
    try {
      const data = await fs.readFile(fileName, 'utf-8');
      const jsonData = JSON.parse(data);
      jsonData.forEach(entry => {
        const questName = entry.N;
        if (allYearsData.has(questName)) {
          const existingEntry = allYearsData.get(questName);
          existingEntry.D = existingEntry.D.concat(entry.D);
          existingEntry.R = entry.R;
          existingEntry.IFR = entry.IFR;
          existingEntry.IEN = entry.IEN;
          existingEntry.BEN = entry.BEN;
          existingEntry.BFR = entry.BFR;
          existingEntry.I = entry.I;
        } else {
          allYearsData.set(questName, {
            N: questName,
            D: entry.D,
            R: entry.R,
            IFR: entry.IFR,
            IEN: entry.IEN,
            BEN: entry.BEN,
            BFR: entry.BFR,
            I: entry.I,
          });
        }
      });
      console.log(`Merged data from ${fileName}`);
    } catch (err) {
      console.error(`Error reading ${fileName}:`, err);
    }
  }

  try {
    const obj = { almanax: Array.from(allYearsData.values()) };
    await fs.writeFile(outputFile, JSON.stringify(obj.almanax), 'utf8');
    console.log(`Merged data saved to ${outputFile}`);
  } catch (err) {
    console.error('Error writing merged data:', err);
  }
}

async function fetchAllYears() {
  const startYear = 2024;
  const endYear = 2025;
  for (let year = startYear; year <= endYear; year++) {
    await fetchData(year);
  }
  console.log('Data fetching and writing completed.');
  mergeFiles();
}

fetchAllYears();