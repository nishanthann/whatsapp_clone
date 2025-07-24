

export default function registerSocketHandler(io) {
  console.log("socket handlers called");

  io.on("connection", (socket) => {
    const userId =
      socket.handshake.auth.userId || socket.handshake.query.userId;

    console.log("socket connected", socket.id);

    if (userId) {
      socket.join(userId); // joined their personal room
      console.log(`User ${userId} joined their personal room`);
    }

    // 🟡 Allow joining a dynamic room ID sent by client
    socket.on("join", (roomId) => {
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);
    });
    socket.on("send-message", (data) => {
        const {roomId,message}=data;
        socket.to(roomId).emit("receive-message",message); 
    });
  });
} 

