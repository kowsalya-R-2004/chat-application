const socket = io(); // Connect to the server

const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message');
const chatBox = document.getElementById('chat-box');

// Send message when the button is clicked
sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim()) {
        socket.emit('chat message', message); // Emit message to server
        messageInput.value = ''; // Clear the input field
    }
});

// Receive and display messages from the server
socket.on('chat message', (msg) => {
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.textContent = msg;
    chatBox.appendChild(newMessage);

    // Scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
});
