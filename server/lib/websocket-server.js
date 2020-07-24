const socketIO = require("socket.io");

module.exports = (httpServer) => {
  const io = socketIO.listen(httpServer);

  io.on("connection", (socket) => {
    // client → server = socket.on('event', handler)
    // server → client = socket.emit('event', ...data)
    // server → everyone = io.emit('event', ...data)
    // server → everyone except client = socket.broadcast.emit('event', ...data)
    // group = socket.join('room'), socket.leave('room')
    // server → everyone in room = io.to('room').emit('event', ...data)
    // server → everyone in room except client = socket.broadcast.to('room').emit

    let stored_username;

    socket.on("user", (username) => {
      socket.join("connected");
      stored_username = username;
      socket.broadcast.to("connected").emit("new_user", stored_username);
    });

    socket.on("tell", (message) => {
      socket.broadcast
        .to("connected")
        .emit("msg", { username: stored_username, message });
    });

    socket.on("disconnect", () => {
      io.to("connected").emit("byebye", stored_username);
    });
  });
};
