const expect = require('expect');

const {Users} = require('./users');

describe('Users', ()=>{
    
    var users;
    
    beforeEach(() => {
        users = new Users();
        users.users = [{
            
        id: '1',
        name: 'Pranoy',
        room: 'My Computer'
            
        },{
            
        id: '2',
        name: 'Ashu',
        room: 'My Laptop'
            
         },{
             
        id: '3',
        name: 'Piyush',
        room: 'My Computer'
             
        }];
    });
    
    //-------------------------------------
    it('should add new user', ()=>{
    var users = new Users();
    var user = {
        id: '123',
        name: 'Pranoy',
        room: 'My Computer'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    
    expect(users.users).toEqual([user]);
    
        });
    //---------------------------------------
    it('should return list of users',()=>{
        
        var usersArray = users.getUserList('My Computer');
        expect(usersArray).toEqual(['Pranoy','Piyush']);
    });
    //---------------------------------------
    it('should get the name of the user', ()=>{
       
        var userName = users.getUser('1');
        expect(userName).toEqual([{ id: '1',
        name: 'Pranoy',
        room: 'My Computer'}]);
    });
    
    it('should return the list of users except the removed user',()=>{
       var userList = users.removeUser('9');
        console.log(userList);
        
    });
    
    
})