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

    var param = $.deparam(window.location.search);
   
    socket.emit('join', param, function (err){
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log("no error");
        }
        
    });
});
            
socket.on('disconnect', function(){
console.log("User disconnected.."); 
    
    
});


socket.on('updateUsersList', function(users){
   console.log('User List->',users); 
    
    var ol = $('<ol></ol>');
    users.forEach(function (user){
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
    
    
});
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

socket.on('newMessage', function(message){
   console.log("New message arrived...", message); 
    
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var s2="honeydew";

    var ol = $('#messages');
    var li = ol.children("li:last-child");
    var float = li.css('float');
    var clear = li.css('clear');

    if(float === "right" && clear === "right"){
        float = "left";
        clear = "right";
    }else if(float === "left" && clear === "left"){
        float = "left";
        clear = "left";
    }else if(float === "left" && clear === "right"){
        float = "left";
        clear = "left";
    }else if(float === "right" && clear === "left"){
        float = "left";
        clear = "right";
    }else{
        float = "left";
        clear = "left";
    }


    var html = Mustache.render(template,{
        body: message.text,
        from: message.from,
        createdAt: formattedTime,
        style: s2,
        float,
        clear
    });
     $('#messages').append(html);
    scrollToBottom();
});


socket.on('newLocation', function(loc){
   console.log("New message arrived...",loc); 
    var formattedTime = moment(loc.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
var s2="honeydew";

    var ol = $('#messages');
    var li = ol.children("li:last-child");
    var float = li.css('float');
    var clear = li.css('clear');

    if(float === "right" && clear === "right"){
        float = "left";
        clear = "right";
    }else if(float === "left" && clear === "left"){
        float = "left";
        clear = "left";
    }else if(float === "left" && clear === "right"){
        float = "left";
        clear = "left";
    }else if(float === "right" && clear === "left"){
        float = "left";
        clear = "right";
    }else{
        float = "left";
        clear = "left";
    }
    
    var html = Mustache.render(template,{
        from: loc.from,
        createdAt: formattedTime,
        url:loc.url,
        style:s2,
        float,
        clear
        
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
    //user sends a message-----
    socket.emit('createMessage',{
    text: $('[name=message]').val()
},function(clbk, message, user){
  
        $('[name=message]').val('');
        var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var s1 = "bisque";

    var ol = $('#messages');
    var li = ol.children("li:last-child");
    var float = li.css('float');
    var clear = li.css('clear');
    console.log(float, clear);
    if(float === "right" && clear === "right"){
        float = "right";
        clear = "right";
    }else if(float === "left" && clear === "left"){
        float = "right";
        clear = "left";
    }else if(float === "left" && clear === "right"){
        float = "right";
        clear = "left";
    }else if(float === "right" && clear === "left"){
        float = "right";
        clear = "right";
    }
    var html = Mustache.render(template,{
        body: message,
        from: user,
        createdAt: formattedTime,
        style: s1,
        float,
        clear
        
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

           var s1 = "bisque";

    var ol = $('#messages');
    var li = ol.children("li:last-child");
    var float = li.css('float');
    var clear = li.css('clear');
    console.log(float, clear);
    if(float === "right" && clear === "right"){
        float = "right";
        clear = "right";
    }else if(float === "left" && clear === "left"){
        float = "right";
        clear = "left";
    }else if(float === "left" && clear === "right"){
        float = "right";
        clear = "left";
    }else if(float === "right" && clear === "left"){
        float = "right";
        clear = "right";
    }



           var html = Mustache.render(template,{
               from: loc.from,
               createdAt: formattedTime,
               url: loc.url,
               style: s1,
               float,
               clear

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