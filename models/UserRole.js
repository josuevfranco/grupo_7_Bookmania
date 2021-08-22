module.exports = (sequelize, dataTypes) => {
    let alias = 'UserRole';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description : {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName : 'user_roles',
        timestamps : false
    };

    const UserRol = sequelize.define(alias, cols, config);
    UserRol.associate = function(models) {
        UserRole.hasMany(models.User, {
            as: "usuarios",
            foreignKey : "role_id"
        });
    }

    return UserRol;
}
