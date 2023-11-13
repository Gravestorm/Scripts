const fs = require('fs');

const inputFile = 'reddit.txt';

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const filteredData = data.replace(/(https?:\/\/[^\s]+(\.jpg|\.jpeg|\.png))(\r?\n|$)/gi, '');
  // Empty lines: /^\s*[\r\n]/gm
  // Images: /(https?:\/\/[^\s]+(\.jpg|\.jpeg|\.png))(\r?\n|$)/gi
  fs.writeFile(inputFile, filteredData, err => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Done');
  });
});