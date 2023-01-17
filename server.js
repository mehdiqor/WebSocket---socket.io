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
// io.use((socket, next) => {
//     const token = "myToken"
//     if(!token){
//         const error= new Error("unathorize")
//         error.data = {content : "any ERROR"}
//         next(error)
//     }
// })
io.on("connection", (socket) => {
    socket.on("clientMessage", data => {
        socket.emit("serverMessage", data)
    })
    socket.on("ping", data => {
        console.log(data);
    })
    socket.join(["room2", "room3"])
    socket.leave("room3")
    socket.compress(false).emit()
    socket.broadcast.emit("event", "message")
    socket.on("disconnecting", reason => {
        console.log(reason);
    })
    socket.on("disconnect", reason => {
        console.log(reason);
    })
    io.to("room2").emit("hello I'm enter to room")
    console.log(socket.rooms);
});
server.listen(8000, () => console.log("run on port 8000"));