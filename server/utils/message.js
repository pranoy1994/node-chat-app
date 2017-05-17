var generateMessage = (from, text)=>{
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
};

var location = (from, latitude, longitude)=>{
    return {
        
        from,
        url:`https://google.com/maps?q=${latitude},${longitude}`,  
        createdAt: new Date().getTime()
    }
};
module.exports = {
    generateMessage,
    location
}