// Make connection
var socket = io.connect("http://localhost:3000");


// Query DOM
var message = document.getElementById('message'),
    handle  = document.getElementById('handle'),
    output  = document.getElementById('output'),
    button  = document.getElementById('send');

// Emit events
button.addEventListener('click', function() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
})

// Listen for events
socket.on('chat', function(data){
    output.innerHTML += "<p><strong>" + data.handle + ": </strong> " + data.message+ "</p>";

});
