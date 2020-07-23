import { getPlayerSymbol } from "./user-symbol";

export const initialState = {
  auth: {
    username: null,
    token: null,
  },
  players: [], // Player: { username: string, score: number, symbol: char }
  grid: [], // Cell: string (username)
  winner: null,
  currentPlayer: null,
};

/*
export const initialState = {
  auth: {
    username: "naholyr",
    token: "TODO",
  },
  players: [
    { username: "naholyr", score: 33, symbol: "X" },
    { username: "John", score: 0, symbol: "O" },
  ], // Player: { username: string, score: number, symbol: char }
  grid: ["", "", "", "X", "", "", "O", "X", ""], // Cell: string (username)
  winner: null,
};
*/

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      return { ...state, auth: action.payload };
    case "SET_PLAYERS":
      return {
        ...state,
        players: action.payload.players.map((p) => ({
          ...p,
          symbol: p.symbol || getPlayerSymbol(p.username),
        })),
        currentPlayer:
          // update from action or…
          action.payload.currentPlayer ||
          // … use already set value or …
          state.currentPlayer ||
          // … initialize from list of players
          action.payload.players[0].username,
      };
    case "SET_GRID":
      return { ...state, grid: action.payload };
    case "SET_WINNER":
      return { ...state, winner: action.payload.username };
    case "SET_CURRENT_PLAYER":
      return { ...state, currentPlayer: action.payload.username };
    default:
      return state;
  }
};
