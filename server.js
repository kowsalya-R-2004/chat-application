// server.js (Backend code)

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Create an instance of Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files for frontend (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Handling user connections and chat messages
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Listen for a 'chat message' event and broadcast to all clients
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Listen for user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Serve the main chat interface from the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
