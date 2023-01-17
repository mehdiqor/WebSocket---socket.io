const http = require("http");
const server = http.createServer();
const socketIO = require("socket.io");
const io = socketIO(server, {
    cors : {
        origin : '*'
    }
})
io.on("connection", (socket) => {
    socket.on("welcome-client", (data) => {
        console.log(data.toString());
    })
    socket.emit("welcome-server", "hello client")
});
server.listen(8000, () => console.log("run on port 8000"));