const fs = require("fs");

const handleError = err => {
  throw new Error("Error reading buffer");
}

fs.readFile("1.txt", (e, b) => {
  if (e) {
    handleError(e)
    return // early return
  }
  console.log(b.toString());
  fs.readFile("2.txt", (e, b) => {
    if (e) {
      handleError(e)
      return // early return
    }
    console.log(b.toString());
    fs.readFile("3.txt", (e, b) => {
      if (e) {
        handleError(e)
        return // early return
      }
      console.log(b.toString());
    });
  });
});