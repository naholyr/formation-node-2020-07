
async.map(
  files,
  (file, cb) => {
    fs.readFile(file, cb);
  },
  (err, buffers) => {
    if (err) {
      handleError(e)
      return // early return
    }
    process.stdout.write(Buffer.concat(buffers));
  }
)