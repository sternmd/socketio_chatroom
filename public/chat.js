// Make connection
let socket = io.connect("http://localhost:3000");


// Query DOM
let message   = document.getElementById('message'),
    handle    = document.getElementById('handle'),
    output    = document.getElementById('output'),
    feedback  = document.getElementById('feedback'),
    users     = document.getElementById('users'),
    button    = document.getElementById('send');

// Emit events
button.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

// Listen for events
socket.on('chat', data => {
    feedback.innerHTML = "";
    output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
});

socket.on('typing', data => {
    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});

socket.on('user count', count => {
    users.innerHTML = count;
})
