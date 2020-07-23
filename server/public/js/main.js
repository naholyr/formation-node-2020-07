/* globals dispatch:readonly, actions:readonly, io:readonly, $:readonly */

let socket;

const initWebSocket = () => {
  // TODO connect websocket
  // TODO listen to game events
};

window.onStart = () => {
  // TODO check if a token is locally stored
  // If a token is found, log in immediately
};

const nbAlign = 4;
const initialGrid = Array(25).fill("");
let fakeGrid = [...initialGrid];
let fakePlayers = [
  { username: "John", score: 0 },
  { username: "Bob", score: 0 },
];
let fakeCurrentPlayer = "Bob";

window.onSubmitLogin = (username, password) => {
  $.post("/login", { username, password })
    .then(({ username, token, grid, players }) => {
      // Login OK: Update UI and connect websocket
      dispatch(actions.logIn(username, token));
      dispatch(actions.setGrid(fakeGrid)); // TODO from server
      dispatch(actions.setPlayers(fakePlayers, fakeCurrentPlayer)); // TODO from server
      initWebSocket();
      // Side-effect: store token locally for next time
      localStorage.setItem("token", token);
    })
    .catch(() => {
      alert("Login failed");
    });
};

window.onClickCell = (i, j) => {
  // TODO emit websocket event
  const index = i * Math.sqrt(fakeGrid.length) + j;
  fakeGrid[index] = fakeCurrentPlayer;
  dispatch(actions.setGrid([...fakeGrid]));
  const fakeCurrentPlayerIndex = fakePlayers.findIndex(
    (p) => p.username === fakeCurrentPlayer
  );
  const nextFakeCurrentPlayerIndex = 1 - fakeCurrentPlayerIndex;
  fakeCurrentPlayer = fakePlayers[nextFakeCurrentPlayerIndex].username;
  dispatch(actions.setPlayers(fakePlayers, fakeCurrentPlayer));

  const [finished, winner] = checkGrid(fakeGrid);
  if (finished) {
    const user = winner && fakePlayers.find((p) => p.username === winner);

    if (user) {
      dispatch(actions.showWinner(user.username));
      fakePlayers = fakePlayers.map((p) =>
        p.username === user.username ? { ...p, score: p.score + 1 } : p
      );
      dispatch(actions.setPlayers(fakePlayers, fakeCurrentPlayer));
    }

    setTimeout(() => {
      fakeGrid = [...initialGrid];
      dispatch(actions.setGrid(fakeGrid));
      dispatch(actions.hideWinner());
    }, 10000);
  }
};

const HORIZONTAL = 1;
const VERTICAL = 2;
const DIAGONAL_DESC = 3;
const DIAGONAL_ASC = 4;

/**
 *
 * @param {Grid} grid
 * @param {number} size grid's size
 * @param {number} nbAlign number of aligned
 * @returns function
 */
const checkAlign = (grid, size, nbAlign) =>
  /**
   * @param {number} startIndex
   * @param {Direction} direction
   * @returns boolean | string
   */
  (startI, startJ, direction) => {
    const startIndex = startI * size + startJ;
    const value = grid[startIndex];
    if (!value) return false;
    switch (direction) {
      case HORIZONTAL:
        for (let j = 1; j < nbAlign; j++) {
          if (grid[startI * size + (startJ + j)] !== value) return false;
        }
        return value;
      case VERTICAL:
        for (let i = 1; i < nbAlign; i++) {
          if (grid[(startI + i) * size + startJ] !== value) return false;
        }
        return value;
      case DIAGONAL_DESC:
        for (let x = 1; x < nbAlign; x++) {
          if (grid[(startI + x) * size + (startJ + x)] !== value) return false;
        }
        return value;
      case DIAGONAL_ASC:
        for (let x = 1; x < nbAlign; x++) {
          if (grid[(startI - x) * size + (startJ + x)] !== value) return false;
        }
        return value;
      default:
        return false;
    }
  };

const checkGrid = (grid) => {
  const size = Math.sqrt(grid.length);
  const nbTest = Math.max(0, size - nbAlign + 1);
  const _checkAlign = checkAlign(grid, size, nbAlign);
  // as X = size - 1, to align X you need to have a cell at row 1 or 2
  // Test top-left square for diagonals
  for (let i = 0; i < nbTest; i++) {
    for (let j = 0; j < nbTest; j++) {
      const winnerD = _checkAlign(i, j, DIAGONAL_DESC);
      if (winnerD) return [true, winnerD];
    }
  }
  // Test bottom-left square for diagonals
  for (let i = 0; i < nbTest; i++) {
    for (let j = 0; j < nbTest; j++) {
      const winnerD = _checkAlign(size - i - 1, j, DIAGONAL_ASC);
      if (winnerD) return [true, winnerD];
    }
  }
  // Test top rows for verticals
  for (let i = 0; i < nbTest; i++) {
    for (let j = 0; j < size; j++) {
      const winnerV = _checkAlign(i, j, VERTICAL);
      if (winnerV) return [true, winnerV];
    }
  }
  // Test left columns for horizontals
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < nbTest; j++) {
      const winnerH = _checkAlign(i, j, HORIZONTAL);
      if (winnerH) return [true, winnerH];
    }
  }
  // Is the grid full?
  const full = grid.every((c) => !!c);
  return [full, null];
};
