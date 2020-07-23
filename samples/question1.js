const fs = require('fs');

const file = '1.txt';

(async (file) => {
  const buffer = await fs.promises.readFile(file);
  process.stdout.write(buffer);
  //console.log(buffer.toString())
})(file);