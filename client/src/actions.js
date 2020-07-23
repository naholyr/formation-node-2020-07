export const logIn = (username, token) => ({
  type: "AUTH",
  payload: { username, token },
});

export const logOut = () => ({
  type: "AUTH",
  payload: { username: null, token: null },
});

export const setPlayers = (players, currentPlayer) => ({
  type: "SET_PLAYERS",
  payload: { players, currentPlayer },
});

export const setGrid = (grid) => ({
  type: "SET_GRID",
  payload: grid,
});

export const showWinner = (username) => ({
  type: "SET_WINNER",
  payload: { username },
});

export const hideWinner = () => ({
  type: "SET_WINNER",
  payload: {},
});

export const setCurrentPlayer = (username) => ({
  type: "SET_CURRENT_PLAYER",
  payload: { username },
});
