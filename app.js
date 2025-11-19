const express = require("express");
const {createServer} = require("http");
const { join } = require("path");
const {Server} = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
})


// socket: single connection representing new connection
// io: server that connects to all clients
io.on("connection", (socket) => {
    console.log("client connected with id: ", socket.id);
    socket.on("disconnect", () => {
        console.log("client diconnected with id: ", socket.id)
    });
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });

    socket.on("typing", () => {
        socket.broadcast.emit("typing");
    })
})

server.listen(3000, () => {
    console.log("listening on port 3000");
})