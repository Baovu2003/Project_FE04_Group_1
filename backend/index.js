const express = require("express");
const cors = require("cors"); // Thêm dòng này để import cors
// Flash
var flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// method-override là một middleware trong Express.js cho phép bạn ghi đè phương thức HTTP
// thông qua một tham số query hoặc một header.
// Điều này rất hữu ích khi bạn muốn gửi các phương thức HTTP
// Vì form html chỉ hỗ trợ phương thức GET và POST.
var methodOverride = require("method-override");

// ------Multer cho phép upload file ảnh-----------
const multer = require("multer");
// ----------------End----------------------------
require("dotenv").config();

const systemConfig = require("./config/system");

// Route cho bên client
const route = require("./routes/client/index.route");

// Router cho bên admin
const routeAdmin = require("./routes/admin/index.route");

const database = require("./config/database");
database.connect();

const app = express();
app.use(express.json());
const port = process.env.PORT;

// Cấu hình CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Remove the trailing slash
    credentials: true, // Allow sending cookies
  })
);

// Set up the HTTP and Socket.IO server
const MessageModel = require("./models/message.model");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

// Set up Socket.io with CORS configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend address
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (cookies)
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    const existingUser = activeUsers.find((user) => user.userId === newUserId);

    if (!existingUser) {
      // Add new user to active users
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    } else {
      // If user already exists, update the socketId and remove lastActiveTime
      existingUser.socketId = socket.id;
      delete existingUser.lastActiveTime; // Remove lastActiveTime when user reconnects
      console.log("User Reconnected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("create-chat", (newChat) => {
    io.emit("new-chat", newChat); // Notify all clients about the new chat
    io.emit("new-chat-for-admin", newChat);
  });

  socket.on("disconnect", () => {
    // Tạo thời gian người dùng disconnect
    const lastActiveTime = new Date().toISOString();

    // Cập nhật người dùng với thời gian lastActiveTime
    activeUsers = activeUsers.map((user) =>
      user.socketId === socket.id ? { ...user, lastActiveTime } : user
    );
    console.log("activeUsers1: ", activeUsers);
    // Lọc người dùng đã rời đi
    activeUsers2 = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("activeUsers2: ", activeUsers);
    console.log("User Disconnected", activeUsers2);

    // Gửi danh sách người dùng trực tuyến với lastActiveTime cho tất cả các client
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", async (data) => {
    console.log("activeUsers: ", activeUsers);
    console.log("data nhận từ clients: ", data);

    const message = new MessageModel({
      chatId: data.chatId,
      senderId: data.senderId,
      text: data.text,
    });
    console.log(message);
    await message.save();
    io.emit("recieve-message", {
      _id: message._id,
      chatId: data.chatId,
      senderId: data.senderId,
      text: data.text,
      createdAt: message.createdAt,
    });
  });
  var timeout;
  socket.on("client-typing", (data) => {
    console.log(data);
    socket.broadcast.emit("server-typing", data, "show");
    // console.log("data", data);
     clearTimeout(timeout);
    timeout = setTimeout(() => {
      socket.broadcast.emit("server-typing", data, "hidden");
    }, 2000);

  });
});


app.use(methodOverride("_method"));

// express đã tích hợp sẵn cái body-parser cho rồi
app.use(express.urlencoded({ extended: true }));

app.set("views", `${__dirname}/views`);
// app.set("views", "./views");
app.set("view engine", "pug");

//Flash
app.use(cookieParser("VLBVYNTTT"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End flash

/* ------New Route to the TinyMCE Node module ---------*/

var path = require("path");
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// ------------End TinyMCE --------------------

// App Locals Variables:
// =>>tạo ra các biến toàn cục để ở file pug nào cũng có thể sử dụng
// Ví dụ: Đã đc thêm vào admin/partials/header.pug và  admin/partials/sider.pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));

// app.use(express.static("public"))
console.log("(__dirname:", __dirname);

route(app);

routeAdmin(app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
