const fs = require("fs");

const handleError = err => {
  throw new Error("Error reading buffer");
}


const readFiles = files => {
  let buffers = []

  const readNext = index => {
    fs.readFile(files[index], (err, b) => {
      if (e) {
        handleError(e)
        return // early return
      }

      buffers.push(b)

      if (index === files.length - 1) {
        process.stdout.write(Buffer.concat(buffers))
      } else {
        readNext(index + 1)
      }
    })
  }

  readNext(0)
};

const files = ['1.txt', '2.txt', '3.txt']
readFiles(files);