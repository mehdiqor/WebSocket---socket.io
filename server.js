const express = require("express");
const app = express();
app.use(express.static("./"))
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server, {
    cors : {
        origin : '*'
    }
});
io.on("connection", (socket) => {
    socket.on("clientMessage", data => {
        socket.emit("serverMessage", data)
    })
});
server.listen(8000, () => console.log("run on port 8000"));