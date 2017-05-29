class Users {
    constructor (){
        this.users = [];
    }
    
    addUser (id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        
        var removedUser = this.getUser(id);
        var remainingUser = this.users.filter((user) => user.id !== id);
        this.users = remainingUser;
        return removedUser;
        
    }
    getUser(id){
        var userDetails = this.users.filter((user)=> user.id === id);
        return userDetails;
    }
    
    getUserList (room){
        var users = this.users.filter((user)=> user.room === room);
        var namesArray = users.map((user)=> user.name);
        return namesArray;
    }
    getRoomList(){
        
        var rooms = this.users.map((users)=> users.room);
        return rooms;
    }
}
module.exports = {
    Users
};