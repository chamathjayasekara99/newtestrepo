require("dotenv").config();
const express = require("express");
import cors from "cors";
import routes from "./routes/index.routes.js";
import connectDB from "./database";
import http from "http";
import { Server } from "socket.io";
import Feed from "./models/feed.model.js";
const app = express();
app.use(cors());

app.use(express.json({ limit: "1mb" }));
app.get("/", (req, res) =>
  res.status(200).json({ message: "Redivivus Server Up and Running" })
);
app.use("/api", routes);
connectDB();

//line 22 to 67 is for notification

// Create an HTTP server instance
const server = http.createServer(app);

// Create a Socket.IO instance and attach it to the HTTP server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected" + socket.id);
  //console.log(socket);

  socket.on("initial_data", async () => {
    const feed = await Feed.find({}).sort({ createdAt: -1 });
    io.sockets.emit("get_data", feed);
  });

  socket.on("post_data", async (dataString) => {
    const data = JSON.parse(dataString);
    const feed = new Feed({
      read: false,
      userID: data.userID,
      message: data.message,
    });
    await feed.save();
    io.sockets.emit("change_data");
  });

  socket.on("check_all_notifications", async () => {
    const feeds = await Feed.find({});

    feeds.forEach((feed) => {
      feed.read = true;
    });

    await Feed.create(feeds);

    io.sockets.emit("change_data");
  });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Redivivus server successfully started on port ${port}`);
});
