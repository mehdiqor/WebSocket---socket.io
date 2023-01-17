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
    }
});
io.on("connection", (socket) => {
    console.log(socket.handshake.query);
    console.log(socket.handshake.headers['authorization']);
});
server.listen(8000, () => console.log("run on port 8000"));

/*========================CLIENT========================*/
const socket = io("http://localhost:8000", {
    query : {
        field1 : "value1",
        field2 : "value2"
    },
    transportOptions : {
        polling : {
            extraHeaders : {
                Authorization : "Bearer <token>"
            }
        }
    }
});
socket.on("connect", data => {
    console.log(data);
})