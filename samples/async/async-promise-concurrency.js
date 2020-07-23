const fs = require('fs')

const files = ['1.txt', '2.txt', '3.txt'];

Promise.all(
  files.map(f => fs.promises.readFile(f))
)
  .then((buffers) => {
    process.stdout.write(Buffer.concat(buffers));
  })
  .catch((err) => {
    console.log("marche pas")
  })

/*
const buf1P = fs.promises.readFile('1.txt'); // Promise<buf1>   1s
const buf2P = fs.promises.readFile('2.txt'); // Promise<buf2>   3s
const buf3P = fs.promises.readFile('3.txt'); // Promise<buf3>   2s

let buffer = [];

buf1P
    .then((buf1) => {
        // +1s
        buffer.push(buf1);
        return buf2P;
    }) // Promise<buf2>
    .then((buf2) => {
        // +2s
        buffer.push(buf2);
        return buf3P;
    }) // Promise<buf3>
    .then((buf3) => {
        // +0s
        buffer.push(buf3);
        process.stdout.write(Buffer.concat(buffer));
    }) // Promise<void>
    .catch((err) => {
        console.log("Marche pas");
    })
*/