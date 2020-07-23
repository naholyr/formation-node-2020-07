import React, { useReducer, useEffect, useCallback, useMemo } from "react";
import "./App.css";
import { reducer, initialState } from "./reducer";
import { eventEmitter } from "./event-emitter";
import cx from "classnames";

const Players = ({ players, currentPlayer, myself }) => (
  <ul className="Players">
    {players.map((p) => (
      <li
        key={p.username}
        className={cx("Player", {
          current: currentPlayer === p.username,
          myself: myself === p.username,
        })}
      >
        <strong>{p.username}</strong>
        <em>{p.score}</em>
        <code>{p.symbol}</code>
      </li>
    ))}
  </ul>
);

const Grid = ({ grid, players, disabled }) => {
  const size = useMemo(() => Math.sqrt(grid.length), [grid.length]);
  const rows = useMemo(
    () =>
      Array(size)
        .fill()
        .map((_, i) => grid.slice(i * size, (i + 1) * size)),
    [grid, size]
  );

  const symbols = useMemo(
    () =>
      players.reduce(
        (dict, p) => Object.assign(dict, { [p.username]: p.symbol }),
        {}
      ),
    [players]
  );

  const handleClick = useCallback(
    (i, j) => (e) => {
      e.preventDefault();
      if (disabled) return;
      const empty = !grid[i * size + j];
      if (empty && window.onClickCell) window.onClickCell(i, j);
    },
    [disabled, grid, size]
  );

  return (
    <div className="Grid">
      {rows.map((cells, i) => (
        <div key={i} className="GridRow">
          {cells.map((cell, j) => (
            <span
              key={j}
              className={cx("GridCell", { empty: !cell })}
              onClick={handleClick(i, j)}
            >
              {cell && (symbols[cell] || "ERROR")}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

const Game = ({ grid, players, currentPlayer, myself, disabled }) => (
  <div className="Game">
    <Players players={players} currentPlayer={currentPlayer} myself={myself} />
    <Grid players={players} grid={grid} disabled={disabled} />
  </div>
);

const Login = () => {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (window.onSubmitLogin)
      window.onSubmitLogin(
        e.target.elements.username.value,
        e.target.elements.password.value
      );
  }, []);

  return (
    <form className="Login" onSubmit={handleSubmit}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Log In</button>
    </form>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("state", state);

  // React to outside dispatch
  useEffect(() => {
    const off = eventEmitter.on("action", dispatch);
    return off;
  }, [dispatch]);

  const { auth, grid, players, winner, currentPlayer } = state;

  return (
    <div className="App">
      <p className={cx("Winner", { visible: !!winner })}>{winner} wins!</p>
      {auth.token ? (
        <Game
          grid={grid}
          players={players}
          currentPlayer={currentPlayer}
          myself={auth.username}
          disabled={!!winner}
        />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
