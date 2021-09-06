const fs = require('fs');
const path = require('path');

const fileName = path.join(__dirname, '../data/usersDataBase.json')

const User = {

    //Crear a un usuario 
    getData: function(){
        return JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    },

    //Todos los usuarios
    findAll: function() {
        return this.getData();
    },

    //Find by Primary Key (ID)
    findByPk: function(id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);

        return userFound;
    },

    //Buscar por campo (En este caso email)
    findByField: function(field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] == text);

        return userFound;
    },  
    

    //Generar último ID
    generateID: function (){
        let allUsers = this.findAll();
        let lastUser  = allUsers.pop();

        if(lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },

    //Crear un usuario
    create: function (userData) {
        
        let allUsers = this.findAll();
        allUsers.push(userData);

        fs.writeFileSync(fileName, JSON.stringify(allUsers, null, '\t'));
        //return newUser;
    },

    //Eliminar Usuario
    delete : function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id != id);

        fs.writeFileSync(fileName, JSON.stringify(finalUsers, null, '\t'));
        return true;
    }

}

module.exports = User;