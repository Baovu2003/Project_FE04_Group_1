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
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

// Set up Socket.io with CORS configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend address
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (cookies)
  }
});
io.on("connection", (socket) => {
  console.log("A user connected with id=" + socket.id);

  // Handle the 'authenticate' event to pass the user data to the socket connection
  socket.on("authenticate", (userData) => {
    console.log("Authenticated user:", userData);
    socket.user = userData; // Attach user data to the socket
    socket.emit("SERVER_SENDING_DATA", "Hello from the server!");
  });
  // Handle incoming messages from the client and save them to the database
  socket.on("CLIENT_SENDING_DATA", async ({message,userId}) => {
    console.log("Message from client:", message,userId);
    // Broadcast the message to other clients
  //   socket.broadcast.emit("SERVER_SENDING_DATA", message);
    io.emit("SERVER_SENDING_DATA", "Server received in controller: " + message +userId);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected with id=" + socket.id);
  });
});

// Set up socket events

global._io = io;

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
