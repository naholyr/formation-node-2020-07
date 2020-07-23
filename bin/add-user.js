'use strict';

const { add_user } = require('../lib/db');
const chalk = require('chalk');

// Usage: node add-user <username> <password>
// TODO use https://www.npmjs.com/package/commander

if (process.argv.length !== 4) {
  console.log(chalk.red.bold("Marche pas !"));
} else {
  const [, , username, password] = process.argv;
  add_user(username, password)
    .then(p => {
      console.log(chalk.green("✅ User added!"));
      process.exit(0);
    })
    .catch(e => {
      console.log(e, chalk.red.bold("Failed!"));
      process.exit(1);
    })
}