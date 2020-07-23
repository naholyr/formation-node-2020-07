'use strict';

const tryCatch = (fn, fallback = null) => {
  try {
    return fn()
  } catch (err) {
    if (fallback) {
      return fallback(err);
    }
  }
};

module.exports = tryCatch;