var socket = io();
            
var locationButton = $('#send-location');

function scrollToBottom(){
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    if((clientHeight + scrollTop + newMessageHeight + lastMessageHeight) >= scrollHeight){
        console.log(" should scroll");
        messages.scrollTop(scrollHeight);
    }
}

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
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        body: message.text,
        from: message.from,
        createdAt: formattedTime
    });
     $('#messages').append(html);
    scrollToBottom();
});


socket.on('newLocation', function(loc){
   console.log("New message arrived...",loc); 
    var formattedTime = moment(loc.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template,{
        from: loc.from,
        createdAt: formattedTime,
        url:loc.url
        
    });
    $('#messages').append(html);
    locationButton.attr("disabled", false);
    scrollToBottom();
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
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        body: message.text,
        from: message.from,
        createdAt: formattedTime
    });
     $('#messages').append(html);
        scrollToBottom();
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

           console.log("jjdjoidjwoidjwoidjwoidj", clbk);
           var formattedTime = moment(loc.createdAt).format('h:mm a');
           var template = $('#location-message-template').html();
           var html = Mustache.render(template,{
               from: loc.from,
               createdAt: formattedTime,
               url: loc.url
           });
           $('#messages').append(html);
           locationButton.attr("disabled", false);
           scrollToBottom();
           
   
});
        //console.log(position);
    },function(){
        alert("Unable to fetch location !!");
        locationButton.attr("disabled", false);
    });
});