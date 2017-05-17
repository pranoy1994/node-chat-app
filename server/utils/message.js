var moment = require('moment');

var generateMessage = (from, text)=>{
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
};

var location = (from, latitude, longitude)=>{
    return {
        
        from,
        url:`https://google.com/maps?q=${latitude},${longitude}`,  
        createdAt: moment().valueOf()
    }
};
module.exports = {
    generateMessage,
    location
}