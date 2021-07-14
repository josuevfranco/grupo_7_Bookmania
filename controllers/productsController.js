const {validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productsController = {
    carrito: (req, res) => {
        return res.render('products/carrito');
    },
    producto: (req, res) => {
        return res.render('products/producto');
    },
    cat_arte: (req, res) => {
        return res.render('products/cat_arte');
    },

    //*CRUD *//
    //formulario de crear producto
    crearProducto: (req, res) => {
        return res.render('products/crearProducto');
    },
    //procesar datos validos de producto
    processProducto:(req, res)=>{
        const resValidation = validationResult(req);
        if(resValidation.errors.length > 0){
            return res.render('products/crearProducto', {
                errors: resValidation.mapped(),
                oldData: req.body,
            });
        }
        return res.redirect('/misproductos');
    },

    //almacenar producto
    store: (req, res) => {
        const productInfo = req.body;
        products.push({
            ...productInfo,
            id: products.length + 1,
            imageLibro: "imagenPrueba.jpg",
        });
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect("/misproductos");
      },

    
    detail: (req, res) => {
        let id = parseInt(req.params.id)
		const product = products.find(product => product.id == id);
		res.render('detail', {product});
	},

    edit: (req, res) => {
        const productToEdit = products.find((product) => {
            return product.id == req.params.id;      
        });
    
        if (productToEdit) {
            res.render("editarProducto", { productToEdit });
        } else {
            res.send("Hay un error al Editar");
        }
    },
 
    update: (req, res) => {
        const productInfo = req.body;
        const productIdex = products.findIndex(producto =>{
             return producto.id == req.params.id;
        });

        products[productIdex]={
		    ...products[productIdex], 
		    ...productInfo
	    };

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
   
        const product = products.find(product => product.id == id);
        res.redirect('detail', {product});
    },
    delete: (req, res) => {
        const productIdex = products.findIndex(producto =>{
          return producto.id == req.params.id;
        });
    
        products.splice(productIdex, 1);
        
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect("/misproductos");
      },

}
module.exports = productsController;

