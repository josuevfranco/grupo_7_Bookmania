module.exports = (sequelize, dataTypes) => {
    let alias = 'PurchaseOrder';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        purchase_data : {
            type: dataTypes.DATE
        },
        total :{
            type: dataTypes.INTEGER
        },
        customer_id : {
            type: dataTypes.INTEGER,
            foreignKey: true
        }

    };
    let config = {
        tableName : 'purchase_orders',
        timestamps : false
    };

    const PurchaseOrder = sequelize.define(alias, cols, config);

    PurchaseOrder.associate = function(models) {
        PurchaseOrder.hasMany(models.PurchaseOrderBooks, {
            as: "ordenes",
            foreignKey : "purchase_order_id"
        });
        PurchaseOrder.belongsTo(models.customer_id, {
            as: "compra_usuario",
            foreignKey: "user_id",
            timestamps: false
        })
    }
    return PurchaseOrder;
}
