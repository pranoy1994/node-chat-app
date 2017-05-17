var expect = require('expect');

var {generateMessage, location} = require('./message');
describe('generateMessage',() =>{
    it('should generate corrent message object', () =>{
        
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
           from,
           text
        });
    });  
});

describe('location', ()=>{
   it('should generate users current location', ()=>{
      
       var from = "kadma";
       var lat = 22.55666;
       var lng = 98.343434;
       var url = `https://google.com/maps?q=${lat},${lng}`;
       var loc = location(from, lat, lng);
       expect(loc.createdAt).toBeA('number');
       expect(loc).toInclude({
           from,url,
           
       });       
   });
});