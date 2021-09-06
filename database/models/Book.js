const { DataTypes } = require("sequelize");
const { sequelize, Sequelize } = require(".");
//const models = require("database/models")

module.exports = (sequelize, DataTypes) =>{
    let alias = "Book";
    let cols = {
        id: {  
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        author:{
            type: DataTypes.STRING
        },
        editorial:{
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.FLOAT
        },
        category_id:{
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        price: {
            type: DataTypes.FLOAT
        }, 
        language: {
            type: DataTypes.STRING
        },
        year: {
            type: DataTypes.INTEGER
        },
        pages: {
            type: DataTypes.INTEGER

        },
        discount: {
            type: DataTypes.INTEGER

        },
        summary: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        }
    };
    let config = {
        tableName : 'books',
        timestamps : false
    };

    const Book = sequelize.define(alias, cols, config);
    Book.associate = function(models) {
        Book.belongsTo(models.Category, {
            as: "categoria",
            foreignKey : "category_id",
            timestamps: false
        });
        Book.belongsToMany(models.PurchaseOrderBooks, {
            as: "ordenes",
            foreignKey: "book_id",
            through: "purchase_order_books",
            timestamps: false
        })
    } 

    return Book;
}