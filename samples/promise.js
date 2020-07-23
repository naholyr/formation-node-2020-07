const getUser = ({ id, company = "plop", bidule = "pouet" }, cb) => {
  const promise = query('SELECT * FROM ...');
  if (cb) {
    promise
      .then(result => cb(null, result))
      .catch(err => cb(err));
    return;
  }
  return promise;
}

getUser({ id: 42 }) // Promise
getUser({ id: 42 }, (err, res) => { }) // undefined

new Promise((resolve, reject) => {
  fs.readFile('1.txt', (err, result) => {
    if (err) {
      reject(err)
    } else {
      resolve(result)
    }
  })
})

work()
  .catch(err => emprunter())
  .then(argent => acheter('xbox', argent)) // 30 jours <--
  .catch(err => vieuxPuzzle())
  .then(jeu => jouer(jeu)) // 5 jours <--
  .then(() => content())
  .catch(err => handleError(err))

const salaireP = work()

const xboxP = salaireP.then((salaire) => {
  return acheter('xbox', salaire)
})

const planBP = xboxP.catch((err) => {
  return vieuxPuzzle()
})

const momentSympaP = planBP.then((xbox) => {
  return jouer(xbox)
})

momentSympaP.then(() => content())

...