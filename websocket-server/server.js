// server.js

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4000;
const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let words = []; // Store submitted words here

io.on("connection", (socket) => {
  console.log("New client connected");

  // Send all stored words to the new client
  socket.emit("allWords", words);

  // Listen for word submissions from clients
  socket.on("submitWord", (word) => {
    console.log("Word received: ", word);
    words.push(word); // Store the new word
    // Broadcast the word to all connected clients
    io.emit("newWord", word);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
