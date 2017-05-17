var socket = io();
            
socket.on('connect',function(){
console.log("Connected to server.."); 
    
    /*socket.emit("createMessasge", {
        from: "Pranoy",
        text: "hey this is Peter.. remember me??"
    });*/
    
});
            
socket.on('disconnect', function(){
console.log("User disconnected.."); 
});

socket.on('newMessage', function(message){
   console.log("New message arrived...", message); 
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

/*socket.emit('createMessage',{
    from:"Pranoy Biswas",
    text: "Hey !!"
},function(clbk){
    console.log(clbk);
});*/

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage',{
    from:"User",
    text: $('[name=message]').val()
},function(clbk, message){
    console.log(clbk);
        var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});
    
});