const fs = req uire('fs')

const buf1 = fs.readFileSync('1.txt')
const buf2 = fs.readFileSync('2.txt')
const buf3 = fs.readFileSync('3.txt')

const buffer = Buffer.concat([buf1, buf2, buf3])

process.stdout.write(buffer)