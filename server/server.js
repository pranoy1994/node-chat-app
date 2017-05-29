const express = require('express');
const socketIO = require('socket.io');

const {isRealString} = require('./utils/validators');
const {generateMessage, location} = require('./utils/message');
const {Users} = require('./utils/users');
const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

app.get('/updateRoomList',(req, res)=>{
    var rooms = users.getRoomList();
    res.send(rooms);
});


io.on('connection', (socket)=>{
    console.log("New User connected");
    
   /* //greet the user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to cht app'));
    
    //inform everyone that a new user has arrived..
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));*/
    
    
    socket.on('join', (params, callback) =>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback(`Name or room name is invalid,${params.name}, ${params.room}`);
        }
        
        //io.emit  -> io.to('The Office fans').emit
        //socket.emit 
        //socket.broadcast.emit -> socket.broadcast.to("The office fans").emit
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        
        io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
        
        //greet the user
    socket.emit('newMessage', generateMessage("Admin", `Welcome to the Chat app ${params.name}`));
    
    //inform everyone that a new user has arrived..
    socket.broadcast.to(params.room).emit('newMessage', generateMessage(params.name, 'Joined the room'));
         
        callback();
    });
    
    //recieve a message
    socket.on("createMessage", (createdMessage, callback)=>{
        
        var user = users.getUser(socket.id);
        if(user[0] && isRealString(createdMessage.text)){
            socket.to(user[0].room).broadcast.emit('newMessage', generateMessage(user[0].name, createdMessage.text));
        
        callback("from server", createdMessage.text, user[0].name);
        }
        //send to everyone 
       
        
    });
   
    
    //share the geolocation to everyone
    socket.on("createLocationMessage", (loc, callback)=>{
        console.log(loc.latitude, loc.longitude); 
        var user = users.getUser(socket.id); 
        if(user[0]){
        socket.to(user[0].room).broadcast.emit('newLocation', location(user[0].name, loc.latitude, loc.longitude));
        
        callback("from server location", location(user[0].name, loc.latitude, loc.longitude));
        }
    });
    
    socket.on('disconnect', () => {
        console.log("User disconnected.."); 
        var user = users.removeUser(socket.id);
        if(user.length > 0){
        socket.broadcast.to(user[0].room).emit('updateUsersList',users.getUserList(user[0].room));
        socket.broadcast.to(user[0].room).emit('newMessage', generateMessage('Admin', `${user[0].name} has left the room`));
        }
    });
});

server.listen(port, ()=>{
   console.log(`Server is running on port ${port}`); 
});
