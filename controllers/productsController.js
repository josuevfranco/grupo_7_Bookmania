const {validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//storage para guardar imagen de libro
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './public/images/productos');
    }, 
    filename: (req, file, cb)=> {
        const fileName = file.fieldname + '_img' + path.extname(file.originalname);
        cb(null, fileName);
    }
})

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

    //almacenar producto
    store: (req, res) => {
        let newId = parseInt(products.length + 1);
		let data = req.body;
        let imagen = "";
        if(req.file){
            imagen = req.file.filename;
            console.log(imagen);
        }
        
		let newProduct = {
			"id": newId,
			"titulo": data.titulo,
			"autor": data.autor,
			"editorial": data.editorial,
			"rating": data.rating,
			"categoria": data.categoria,
			"idioma": data.idioma,
            "precio": data.precio,
            "anio": data.anio,
            "paginas": data.paginas,
            "descuento": data.descuento,
            "resenia": data.resenia,
            "imagenLibro": imagen
		}
        console.log(newProduct);
        
        const resValidation = validationResult(req);

        if(resValidation.errors.length > 0){
            return res.render('products/crearProducto', {
                errors: resValidation.mapped(),
                oldData: req.body,
            });
        }
        else{
            products.push(newProduct);
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, '\t'));
            res.redirect("/misproductos");
        }
      },

    
    detail: (req, res) => {
        let id = parseInt(req.params.id)
		const product = products.find(product => product.id == id);
		res.render('detail', {product});
	},

    update: (req, res) => {
        const productInfo = req.body;
        const productIdex = products.findIndex(producto =>{
          return producto.id == req.params.id;
        });
    
        products[productIdex]={...products[productIdex], ...productInfo};
    
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect("/misproductos");
    },
 
    edit: (req, res) => {    
        const productToEdit = products.find((product) => {
             return product.id == req.params.id;      
         });
    
         if (productToEdit) {
             res.render('products/editarProducto', { productToEdit });
         } else {
             res.send("Hay un error al Editar");
         }
	
    },
    delete: (req, res) => {
        const productIdex = products.findIndex(producto =>{
          return producto.id == req.params.id;
        });
    
        products.splice(productIdex, 1);
        
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect(req.get('referer'));
      },

}
module.exports = productsController;

