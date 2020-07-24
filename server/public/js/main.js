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

window.onSubmitLogin = (username, password) => {
  $.post("/login", { username, password })
    .then(({ username, token, grid, players, currentPlayer }) => {
      // Login OK: Update UI and connect websocket
      dispatch(actions.logIn(username, token));
      dispatch(actions.setGrid(grid)); // TODO from server
      dispatch(actions.setPlayers(players, currentPlayer)); // TODO from server
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
  // TODO then update UI with following available actions:
  // dispatch(actions.setGrid(newGrid))
  // dispatch(actions.setPlayers(newPlayers, newCurrentPlayer))
  // dispatch(actions.setCurrentPlayer(newCurrentPlayer))
  // dispatch(actions.showWinner(winner))
  // dispatch(actions.hideWinner())
};
