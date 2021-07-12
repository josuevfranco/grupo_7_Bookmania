const {validationResult} = require('express-validator');

const productsController = {
    carrito: (req, res) => {
        return res.render('products/carrito');
    },
    producto: (req, res) => {
        return res.render('products/producto');
    },
    crearProducto: (req, res) => {
        return res.render('products/crearProducto');
    },
    processProducto:(req, res)=>{
        const resValidation = validationResult(req);
        if(resValidation.errors.length > 0){
            return res.render('products/crearProducto', {
                errors: resValidation.mapped(),
                oldData: req.body,
            });
        }

        return res.send("Validaciones en Producto OK");
    },

    cat_arte: (req, res) => {
        return res.render('products/cat_arte');
    }
}
module.exports = productsController;
