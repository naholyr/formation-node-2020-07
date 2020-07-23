"use strict";

const Redis = require("ioredis");
const crypto = require("crypto");

const client = new Redis({
  host: "localhost",
  port: 6379,
});

const hash_pwd = (password) => {
  const hash = crypto.createHash("SHA256");
  const hashed = hash.update(password).digest();
  return hashed;
};

const add_user = async (username, password) => {
  const hash = hash_pwd(password);
  return client.hset("passwords", username, hashed);
};

const check_user = async (username, password) => {
  const hash = hash_pwd(password);

  const user_pwd = await client.hgetBuffer("passwords", username);

  return hash.equals(user_pwd);
};

module.exports = {
  add_user,
  check_user,
};
