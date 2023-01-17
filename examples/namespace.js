/*========================SERVER========================*/
const express = require("express");
const app = express();
app.use(express.static("./"))
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server, {
    cors : {
        origin : '*'
    },
    serverClient : true
})
io.on("connection", () => {
    io.emit("broadCast", "Hello EveryOne")
})
io.of("/teacher").on("connection", (socket) => {
    socket.on("teacherClient", (data) => {
        console.log(data.toString());
    })
    socket.emit("teacherServer", "Hello Teachers! I'm your Server")
});
io.of("/student").on("connection", (socket) => {
    socket.on("studentClient", (data) => {
        console.log(data.toString());
    })
    socket.emit("studentServer", "Hello Student! I'm your Server")
});
server.listen(8000, () => console.log("run on port 8000"));

/*========================CLIENT========================*/
const socket = io("http://localhost:8000");
socket.on("broadCast", data => {
    console.log(data);
})
const teacherSocket = io("http://localhost:8000/teacher");
teacherSocket.on("connect", data => {
    teacherSocket.emit("teacherClient", "message from teacher namespace")
    teacherSocket.on("teacherServer", data => {
        console.log(data);
    })
})
const studentSocket = io("http://localhost:8000/student");
studentSocket.on("connect", data => {
    studentSocket.emit("studentClient", "message from student namespace")
    studentSocket.on("studentServer", data => {
        console.log(data);
    })
})