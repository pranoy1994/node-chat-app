var socket = io();
            
var locationButton = $('#send-location');

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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    $('#messages').append(li);
});


socket.on('newLocation', function(loc){
   console.log("New message arrived...",loc); 
    var formattedTime = moment(loc.createdAt).format('h:mm a');
    var li = $("<li></li>");
    var a = $("<a target= '_blank' >Shared a location</a>");
    console.log(loc.from);
    li.text(`${loc.from} ${formattedTime}:`);
    a.attr("href", loc.url);
    li.append(a);
    $('#messages').append(li);
    locationButton.attr("disabled", false);
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
  
        $('[name=message]').val('');
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    $('#messages').append(li);
});
    
});


locationButton.on('click', function(){
    locationButton.attr("disabled", true);
    if(!navigator.geolocation){
        return alert("Geolocation Not supported by your browser..");
    }
    navigator.geolocation.getCurrentPosition(function(position){
       socket.emit('createLocationMessage', {
           latitude: position.coords.latitude,
            longitude:position.coords.longitude
        },function(clbk, loc){
var li = $("<li></li>");
           var formattedTime = moment(loc.createdAt).format('h:mm a');
    var a = $("<a target= '_blank' >Shared a location</a>)");
           console.log(loc.from);
           li.text(`${loc.from} ${formattedTime}:`);
    a.attr('href', loc.url);
    li.append(a);
    $('#messages').append(li);
           locationButton.attr("disabled", false);
});
        //console.log(position);
    },function(){
        alert("Unable to fetch location !!");
    });
});