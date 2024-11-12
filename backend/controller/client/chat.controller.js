const Chat = require("../../models/chat.model"); // Adjust the path based on your file structure
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
  console.log(res.locals.user.id);

  const chats = await Chat.find({ deleted: false }).lean(); // Use .lean() to get plain objects

  for (const chat of chats) {
    const inforUser = await User.findById(chat.user_id).select("fullName");
    chat.inforUser = inforUser; // Directly add inforUser to the plain object
  }

  console.log(chats);
  res.json({ chatControler: "ok", chat: chats });
  // io.on("connection", (socket) => {
  //     console.log("A user connected with id=" + socket.id);

  //     // Emit a message to the client upon connection

  //     // Handle incoming message from the client
  //     socket.on("CLIENT_SENDING_DATA", (message) => {
  //       console.log("Message from client:", message); // Log message from the client

  //       // Respond back to the client (broadcasting it to everyone)
  //       io.emit("SERVER_SENDING_DATA", "Server received: " + message);
  //     });

  //     socket.on("disconnect", () => {
  //       console.log("A user disconnected with id=" + socket.id);
  //     });
  //   });
  // io.on("connection", (socket) => {
  //   console.log("A user connected with id=" + socket.id);

  //   // Handle the 'authenticate' event to pass the user data to the socket connection
  //   socket.on("authenticate", (userData) => {
  //     console.log("Authenticated user:", userData);
  //     socket.user = userData; // Attach user data to the socket
  //     socket.emit("SERVER_SENDING_DATA", "Hello from the server!");
  //   });

  //   // Handle incoming messages from the client and save them to the database
  socket.on("CLIENT_SENDING_DATA", async ({ message, userId }) => {
    console.log("Message from client:", message);
    console.log("Message from client:", userId);
    try {
      // Save the message to the database with user_id attached
      const chatMessage = new Chat({ content: message, user_id: userId });
      await chatMessage.save();
      console.log("Message saved to database.");
    } catch (error) {
      console.error("Error saving message:", error);
    }

    // Broadcast the message to other clients
    //   socket.broadcast.emit("SERVER_SENDING_DATA", message);
    io.emit(
      "SERVER_SENDING_DATA",
      "Server received in controller: " + message + userId
    );
  });

  //   // Handle disconnection
  //   socket.on("disconnect", () => {
  //     console.log("A user disconnected with id=" + socket.id);
  //   });
  // });
};
