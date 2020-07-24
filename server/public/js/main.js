/* globals dispatch:readonly, actions:readonly, io:readonly, $:readonly */

// TODO import io from 'socket.io-client'

// CONSOLE CHAT

const socket = io.connect();

window.iam = (username) => {
  socket.emit("user", username);
  localStorage.setItem("chatusername", username);
  // eslint-disable-next-line no-console
  console.log(
    `%c connecté en tant que ${username}`,
    "color: #999; background: #eee"
  );
};

socket.on("new_user", (username) => {
  // eslint-disable-next-line no-console
  console.log(`%c coucou, ${username}`, "color: #999; background: #eee");
});

socket.on("byebye", (stored_username) => {
  // eslint-disable-next-line no-console
  console.log(
    `%c ${stored_username} est parti acheter des frites.`,
    "color: #999; background: #eee"
  );
});

window.tell = (message) => {
  socket.emit("tell", message);
};

socket.on("msg", (message) => {
  // eslint-disable-next-line no-console
  console.log(
    `%c ${message.username} est en train de causer, il dit: ${message.message}.`,
    "color: red; background: yellow"
  );
});

const foundChatUsername = localStorage.getItem("chatusername");
if (foundChatUsername) {
  window.iam(foundChatUsername);
} else {
  console.log("Call `iam(username)` to enable chat");
}

socket.on("toto", (text) => {
  console.log({ text });
});

// TODO MORPION

const initWebSocket = () => {
  // TODO connect websocket
  // TODO listen to game events
};

/**
 *
 * @param {object} data
 */
const login_post = (data) => {
  $.post("/login", data)
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

window.onStart = () => {
  // TODO check if a token is locally stored
  const token = localStorage.getItem("token");
  if (token) {
    // If a token is found, log in immediately
    login_post({ token });
  }
};

window.onSubmitLogin = (username, password) => {
  login_post({ username, password });
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
