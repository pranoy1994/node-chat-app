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


socket.on('newLocation', function(loc){
   console.log("New message arrived...",loc); 
    var li = $("<li></li>");
    var a = $("<a target= '_blank' >Shared a location</a>");
    console.log(loc.from);
    li.text(`${loc.from}:`);
    a.attr("href", loc.url);
    li.append(a);
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
  
        var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});
    
});

var locationButton = $('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert("Geolocation Not supported by your browser..");
    }
    navigator.geolocation.getCurrentPosition(function(position){
       socket.emit('createLocationMessage', {
           latitude: position.coords.latitude,
            longitude:position.coords.longitude
        },function(clbk, loc){
var li = $("<li></li>");
    var a = $("<a target= '_blank' >Shared a location</a>)");
           console.log(loc.from);
           li.text(`${loc.from}:`);
    a.attr('href', loc.url);
    li.append(a);
    $('#messages').append(li);
});
        //console.log(position);
    },function(){
        alert("Unable to fetch location !!");
    });
});