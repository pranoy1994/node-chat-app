const express = require('express');
const socketIO = require('socket.io');

const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log("New User connected");
    
    //emmit a message
    /*socket.emit("newMessage", {
        from: "Pranoy",
        text:"Hey there, how are you ??",
        createdAt: 123
    });*/
    
    //recieve a message
    socket.on("createMessage", (createdMessage)=>{
        console.log("new Message recieved-> ", createdMessage);
        
        //send to everyone 
        io.emit('newMessage', {
            from:createdMessage.from,
            text:createdMessage.text,
            createdAt: new Date().getTime()
            
        });
    })
    
    socket.on('disconnect', () => {
               console.log("User disconnected.."); 
            });
});


server.listen(port, ()=>{
   console.log(`Server is running on port ${port}`); 
});
