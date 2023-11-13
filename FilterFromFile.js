const fs = require('fs');

const inputFile = 'input.txt';
const outputFile = 'output.txt';

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const regex = /(https?:\/\/[^\s]+(\.jpg|\.jpeg|\.png))/gi;
  const links = data.match(regex);

  fs.writeFile(outputFile, links.join('\n'), err => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Filtered links copied to output');

    const filteredData = data.replace(regex, '');
    fs.writeFile(inputFile, filteredData, err => {
      if (err) {
        console.error(err);
        return;
      }

      console.log('Filtered links removed from input');
    });
  });
});