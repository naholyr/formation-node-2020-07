const fs = require('fs')

const files = ['1.txt', '2.txt', '3.txt'];


const readFilesAsync_series = async (files) => {
  try {
    let buffers = [];
    for (let i = 0; i < files.length; i++) {
      buffers.push(await fs.promises.readFile(files[i]))
    }
    process.stdout.write(Buffer.concat(buffers))
  } catch {
    console.log("Marche pas (series)");
  }
}

readFilesAsync_series(files)

const readFilesAsync_concurrent = async (files) => {
  try {
    let files = ['1.txt', '2.txt', '3.txt'];

    const buffers = await Promise.all(files.map((file) => {
      return fs.promises.readFile(file)
    }));

    process.stdout.write(Buffer.concat(buffers));
  } catch {
    console.log("Marche pas (concurrent)");
  }
}

readFilesAsync_concurrent(files)