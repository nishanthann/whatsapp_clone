  import Conversation from "./models/Conversation.js";
  import Message from "./models/Message.js";

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
socket.on("send-message", async (data) => {
  const { roomId, text } = data;

  if (!roomId || !text) {
    console.error("Missing roomId or text");
    return;
  }

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, roomId] }
    }).populate("participants");

    let isNew = false;

    if (!conversation) {
      isNew = true;
      conversation = new Conversation({
        participants: [userId, roomId],
        unreadCounts: new Map([[roomId.toString(), 0]])
      });
      await conversation.save();
      await conversation.populate("participants");
    }
          if (!conversation.unreadCounts) {
  conversation.unreadCounts = new Map();
}
          // save message
          const message= new Message({
            conversationId:conversation._id,
            senderId:userId,
            text:text
          })
          await message.save()

          // update unread counts
          const currentUnread= conversation.unreadCounts.get(roomId.toString()) || 0
          conversation.unreadCounts.set(roomId.toString(),currentUnread+1)
          // update last activity
          conversation.lastMessage=message;

          await conversation.save();
           socket.to(roomId).emit("receive-message",{text,conversation,isNew}); 
        } catch (error) {
          console.error("Message send error:", error);
        }




       
    });


     // ✅ When user focuses a conversation
        socket.on("focus-conversation", async (conversationId) => {
        try {
            const conversation = await Conversation.findById(conversationId);
            if (!conversation) {
            return
            }
            conversation.unreadCounts.set(userId, 0);
        
            await conversation.save();
        
        } catch (err) {
            console.error(" focus-conversation error:", err.message);
        }
        });


  });
} 
