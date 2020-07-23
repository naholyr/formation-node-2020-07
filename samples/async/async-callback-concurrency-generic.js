const fs = require("fs");

const handleError = err => {
  throw new Error("Error reading buffer");
}


const readFiles = files => {
  let buffers = []
  let pending = files.length

  const read = (current, index) => {
    fs.readFile(current, (e, b) => {
      if (e) {
        handleError(e)
        return // early return
      }

      buffers[index] = b
      pending--

      if (pending === 0) {
        process.stdout.write(Buffer.concat(buffers));
      }
    });
  };

  files.forEach((files, index) => read(file, index))
};

const files = ['1.txt', '2.txt', '3.txt']
readFiles(files);