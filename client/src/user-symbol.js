let availableSymbols = new Set([
  "✘",
  "✔",
  "●",
  "❤",
  "▶",
  "✩",
  "✿",
  "✹",
  "✯",
  "☁",
  "☀",
  "★",
  "☆",
  "☺",
  "▲",
  "♟",
  "♞",
  "♝",
  "♜",
  "♛",
  "♚",
  "♘",
  "♗",
  "♖",
  "♕",
  "♔",
  "☜",
  "☯",
  "☮",
  "☠",
  "◀",
]);

let attributedSymbols = new Map();

export const getPlayerSymbol = (username) => {
  const found = attributedSymbols.get(username);
  if (found) return found;
  if (availableSymbols.size === 0) throw new Error("No symbol available");
  const randomSymbol = [...availableSymbols][
    Math.floor(Math.random() * availableSymbols.size)
  ];
  availableSymbols.delete(randomSymbol);
  attributedSymbols.set(username, randomSymbol);
  return randomSymbol;
};
