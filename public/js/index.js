var socket = io();
            
socket.on('connect',function(){
console.log("Connected to server.."); 
    
    socket.emit("createMessasge", {
        from: "Pranoy",
        text: "hey this is Peter.. remember me??"
    });
    
});
            
socket.on('disconnect', function(){
console.log("User disconnected.."); 
});

socket.on('newMessage', function(message){
   console.log("New message arrived...", message); 
});