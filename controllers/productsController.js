const productsController = {
    carrito: (req, res) => {
        return res.render('products/carrito');
    },
    producto: (req, res) => {
        return res.render('products/producto');
    },
    actualizar_producto: (req, res) => {
        return res.render('products/actualizar_producto');
    },
    cat_arte: (req, res) => {
        return res.render('products/cat_arte');
    }
}
module.exports = productsController;