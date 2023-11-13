const fs = require('fs');

const inputFile = 'input.txt';

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) throw err;
  const websites = data.trim().split('\n');
  const uniqueWebsites = [...new Set(websites)].filter(url => url.startsWith('http'));
  fs.writeFile(inputFile, uniqueWebsites.join('\n'), err => {
    if (err) throw err;
    console.log('Done');
  });
});
// Regex to find http if the line doesn't start with it: (?<!^)http