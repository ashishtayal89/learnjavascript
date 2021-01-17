const socketHandler = (socket) => {
    socket.on("join-room", (id) => {
        console.log(id, "joined the room")
        socket.join(id)
    })
}
module.exports = {
    socketHandler,
}
