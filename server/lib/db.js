"use strict";

const Redis = require("ioredis");
const crypto = require("crypto");
const config = require("config");
const _ = require("lodash");

const client = new Redis(config.redis);

/**
 *
 * @param {string} password
 * @returns Buffer
 */
const hash_pwd = (password) => {
  const hash = crypto.createHash("SHA256");
  const hashed = hash.update(password).digest();
  return hashed;
};

/**
 *
 * @param {string} username
 * @param {string} password
 */
const add_user = async (username, password, _client = client) => {
  const hashed = hash_pwd(password);
  return _client.hset("passwords", username, hashed);
};

/**
 *
 * @param {string} username
 * @param {string} password
 */
const check_user = async (username, password, _client = client) => {
  const hash = hash_pwd(password);
  const user_pwd = await _client.hgetBuffer("passwords", username);
  return hash.equals(user_pwd);
};

/**
 * Creates empty grid
 * @param {number} size
 * @returns {Promise<string[]>}
 */
const init_grid = async (size, _client = client) => {
  await _client.del("grid");
  const grid = Array(size ** 2).fill("");
  await _client.rpush("grid", ...grid);
  return grid;
};

/**
 * Get current game's grid
 * @returns {string[]}
 */
const get_grid = async (_client = client) => {
  // LRANGE grid 0 -1
  return await _client.lrange("grid", 0, -1);
};

const get_current_player = async (_client = client) => {
  // GET current_player
  return _client.get("current_player");
};

const get_scores = async (_client = client) => {
  // HGETALL scores
  const dict = await _client.hgetall("scores");
  return _.mapValues(dict, Number);
};

const get_players = async (_client = client) => {
  const scores = await get_scores(_client);
  return _.map(scores, (score, username) => ({
    username,
    score,
  }));
};

const set_grid_cell = async (i, j, username, _client = client) => {
  // LLEN grid
  // LRANGE grid index index
  // LSET grid index username
  const grid_llen = await _client.llen("grid");
  const size = Math.sqrt(grid_llen);
  const index = i * size + j;
  const verif = await _client.lrange("grid", index, index);
  if (!verif.length) {
    throw new Error("Out of range");
  } else if (verif[0] !== "") {
    throw new Error("Non null");
  } else {
    await _client.lset("grid", index, username);
  }
};

const incr_player_score = async (username, diff = +1, _client = client) => {
  // HEXISTS scores username
  // HINCRBY scores username diff
  const user = _client.hexists("scores", username);
  if (user) {
    await _client.hincrby("scores", username, diff);
  } else {
    throw new Error("Eh non mon gars");
  }
};

const add_player = async (username, _client = client) => {
  return Boolean(await _client.hsetnx("scores", username, 0));
};

const set_current_player = async (username, _client = client) => {
  // SET current_play username
  await _client.set("current_player", username);
};

module.exports = {
  client,
  add_user,
  check_user,
  init_grid,
  get_grid,
  set_grid_cell,
  get_current_player,
  set_current_player,
  get_scores,
  incr_player_score,
  add_player,
  get_players,
};
