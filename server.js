const express = require("express");
var ip = require("ip");
const path = require("path");
const bodyParser = require("body-parser");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var plate = { message: "2222" };
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  io.emit("connected", { msg: "connected" });
  socket.on("sensor", (msg) => {
    socket.broadcast.emit("sensor", msg);
  });
  socket.on("nd_khach", (msg) => {
    console.log(msg)
    io.emit("nd_khach", msg);
  });
  socket.on("nd_ngu", (msg) => {
    console.log(msg)
    io.emit("nd_ngu", msg);
  });
  socket.on("led", (msg) => {
    socket.broadcast.emit("led", msg);
  });
  socket.on("den_khach", (msg) => {
    socket.broadcast.emit("den_khach", msg);
  });
  socket.on("quat_khach", (msg) => {
    socket.broadcast.emit("quat_khach", msg);
  });
  socket.on("hut_mui", (msg) => {
    socket.broadcast.emit("hut_mui", msg);
  });
  socket.on("arduino", function (data) {
    io.sockets.emit('atime', { time: new Date().toJSON() });
  });
});
http.listen(process.env.PORT || 3001, () => {});

