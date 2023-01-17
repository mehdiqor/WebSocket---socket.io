const socket = io("http://localhost:8000");
socket.on("connect", data => {
    socket.emit("welcome-client", "hello server")
    socket.on("welcome-server", data => {
        console.log(data);
    })
})