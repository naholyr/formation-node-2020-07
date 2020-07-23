const fs = require('fs')

let buffer = [];

const buf1P = fs.promises.readFile('1.txt') // Promise<buf1>
  .then((buf1) => {
    buffer.push(buf1);
    return fs.promises.readFile('2.txt')
  }) // Promise<buf2>
  .then((buf2) => {
    buffer.push(buf2);
    return fs.promises.readFile('3.txt');
  }) // Promise<buf3>
  .then((buf3) => {
    buffer.push(buf3);
    process.stdout.write(Buffer.concat(buffer));
  }) // Promise<void>
  .catch((err) => {
    console.log("Marche pas");
  })

/*
const buf1 = fs.readFileSync('1.txt')
const buf2 = fs.readFileSync('2.txt')
const buf3 = fs.readFileSync('3.txt')

const buffer = Buffer.concat([buf1, buf2, buf3])

process.stdout.write(buffer)
*/