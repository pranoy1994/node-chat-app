const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
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
    
    //greet the user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to cht app'));
    
    //inform everyone that a new user has arrived..
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    
    //emmit a message
    /*socket.emit("newMessage", {
        from: "Pranoy",
        text:"Hey there, how are you ??",
        createdAt: 123
    });*/
    
    //recieve a message
    socket.on("createMessage", (createdMessage, callback)=>{
        console.log("new Message recieved-> ", createdMessage);
        callback("from server", createdMessage);
        //send to everyone 
        /*io.emit('newMessage', {
            from:createdMessage.from,
            text:createdMessage.text,
            createdAt: new Date().getTime()
            
        });*/
        socket.broadcast.emit('newMessage', generateMessage(createdMessage.from, createdMessage.text));
    })
    
    socket.on('disconnect', () => {
               console.log("User disconnected.."); 
            });
});


server.listen(port, ()=>{
   console.log(`Server is running on port ${port}`); 
});
