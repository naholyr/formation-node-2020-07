import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { eventEmitter } from "./event-emitter";
import * as actions from "./actions";

// Publicly expose eventEmitter's "action" event
window.actions = actions;
window.dispatch = (action) => eventEmitter.emit("action", action);

// Execute a global "onStart" method if available
if (window.onStart) window.onStart();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
