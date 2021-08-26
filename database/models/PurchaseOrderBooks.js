const PurchaseOrder = require("./PurchaseOrder");

module.exports = (sequelize, dataTypes) => {
    let alias = 'PurchaseOrderBooks';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        book_id : {
            type: dataTypes.INTEGER,
            foreignKey: true
        },
        purchase_order_id :{
            type: dataTypes.INTEGER,
	        foreignKey: true
        },
       quantity: {
            type: dataTypes.INTEGER,
         }

    };
    let config = {
        tableName : 'purchase_order_books',
        timestamps : false
    };

    const PurchaseOrderBooks = sequelize.define(alias, cols, config);
    PurchaseOrderBooks.associate = function(models) {
        PurchaseOrderBooks.hasMany(models.Book, {
            as: "libros",
            foreignKey : "id"
        });
        PurchaseOrderBooks.belongsTo(models.PurchaseOrder, {
            as: "ordenes",
            foreignKey: "purchase_order_id",
            timestamps: false
        })
    }
    return PurchaseOrderBooks;
}
