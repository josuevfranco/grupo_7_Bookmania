const { DataTypes } = require("sequelize/types");
const { sequelize, Sequelize } = require(".");
const models = require("/models")

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
            type: DataTypes.INTEGER
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
        }
    };
    let config = {
        tableName : 'books',
        timestamps : false
    };

    const Book = sequelize.define(alias, cols, config);
    Book.associate = function(models) {
        Book.belongsTo(models.Book, {
            as: "libros",
            foreignKey : "category_id",
            timestamps: false
        });
        Book.belongsToMany(models.PurchaseOrderBooks, {
            as: "ordenes",
            foreignKey: "book_id",
            timestamps: false
        })
    } 

    return Book;
}