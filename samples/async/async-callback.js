const fs = require('fs')

var buff = [];

fs.readFile('1.txt', (err, buf1) => {
  if (err) {
    console.log("marche pas...");
  } else {
    buff.push(buf1);
    console.log(buf1);
    process.stdout.write(Buffer.concat(buff));
  }
});

fs.readFile('2.txt', (err, buf2) => {
  if (err) {
    console.log("marche pas...");
  } else {
    buff.push(buf2);
    console.log(buf2);
    process.stdout.write(Buffer.concat(buff));
  }
});

fs.readFile('3.txt', (err, buf3) => {
  if (err) {
    console.log("marche pas...");
  } else {
    buff.push(buf3);
    console.log(buf3);
    process.stdout.write(Buffer.concat(buff));
  }
});