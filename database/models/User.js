module.exports = (sequelize, dataTypes) => {

    let alias = "User";
    let cols = {
     id: {
         type: dataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
        },
        name:{
            type: dataTypes.STRING,
        },
        surnames: {
            type: dataTypes.STRING,
        },
        email: {
            type: dataTypes.STRING,
        },
        password: {
            type: dataTypes.STRING,
        },
        role_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
        },
        src_image: {
            type: dataTypes.STRING,
        }
    };
    let config = {
     tableName: "users",
     timestamps: false
   };

   const User = sequelize.define(alias, cols, config);
   User.associate = function(models) {
    User.hasMany(models.PurchaseOrder, {
        as: "compras",
        foreignKey : "user_id",
        timestamps: false
    });
    User.belongsTo(models.UserRole, {
        as: "rol",
        foreignKey: "role_id",
        timestamps: false
    })
} 
   return User;
 
 }
 