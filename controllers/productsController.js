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
    cat_arte: (req, res) => {
        return res.render('products/cat_arte');
    }
}
module.exports = productsController;
