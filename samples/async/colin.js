const fs = require("fs");

// fs.readFile("1.txt", (e, b) => {
//   if (e) {
//     throw new Error("Error reading buffer");
//   }
//   console.log(b.toString());
//   fs.readFile("2.txt", (e, b) => {
//     if (e) {
//       throw new Error("Error reading buffer");
//     }
//     console.log(b.toString());
//     fs.readFile("3.txt", (e, b) => {
//       if (e) {
//         throw new Error("Error reading buffer");
//       }
//       console.log(b.toString());
//     });
//   });
// });

// ["1.txt", "2.txt", "3.txt"].map((x) => fs.readFile(x, (e, b) => console.log(b.toString())))

// const buff = []

// fs.promises.readFile('1.txt')
//   .then(
//     (res) => {
//       buff.push(res)
//       return fs.promises.readFile('2.txt')
//     }
//   )
//   .then(
//     (res) => {
//       buff.push(res)
//       return fs.promises.readFile('3.txt')
//     }
//   )
//   .then(
//     (res) => {
//       buff.push(res)
//       process.stdout.write(Buffer.concat(buff))
//     }
//   )
//   .catch(
//     (e) => {
//       process.stderr.write("coup dur")
//     }
//   );

// Promise.all([
//   fs.promises.readFile('1.txt'),
//   fs.promises.readFile('2.txt'),
//   fs.promises.readFile('3.txt')
// ]).then(
//   (res) => {
//     const output = Buffer.concat(res).toString();
//     process.stdout.write(output)
//   }
// ).catch(
//   (err) => {
//     process.stderr.write("Nop")
//   }
// )

const read_them_all = async (files) => {
  try {
    const proms = files.map(x => fs.promises.readFile(x))
    const res = await Promise.all(proms)
    process.stdout.write(Buffer.concat(res).toString())
  } catch (e) {
    process.stderr.write("Error")
  }

}

read_them_all(['1.txt', '2.txt', '3.txt'])