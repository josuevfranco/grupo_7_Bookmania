const {validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


//storage para guardar imagen de libro
const multer = require('multer');
const { promiseImpl } = require('ejs');
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './public/images/productos');
    }, 
    filename: (req, file, cb)=> {
        //let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        const newFileName = path.extname(file.originalname);
        cb(null, newFileName);
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
    //productos totales
    misproductos: (req,res) => {
        //return res.render('products/misproductos', {'products': products});
        db.Book.findAll()
            .then(function(products){
                return res.render('products/misproductos', {'products': products});   
            })
    },

    //*CRUD *//
    //formulario de crear producto
    crearProducto: (req, res) => {
        return res.render('products/crearProducto');
    },

    //almacenar producto JSON
    store: (req, res) => {
        console.log(req.body)
        let category=[ 'Arte' , 'Ciencia' , 'Deportes'
                                            , 'Derecho' , 'Economía' , 'Enseñanza Inglés'
                                            , 'Ficción' , 'Ingeniería' , 'Infantil'
                                            , 'Informática' , 'Literatura' , 'Medicina'
                                            , 'Psicología' , 'Religión', 'Romance' ];

        let seleccionada = req.body.categoria;
        let pos = 0;

        for(let i=0; i<category.length; i++){
            if(category[i] == seleccionada){
                pos = i+1;
            }
        }

        db.Book.create({
            title : req.body.titulo,
            author: req.body.autor,
            editorial: req.body.editorial,
            rating: req.body.rating,
            category_id: pos,
            price: req.body.precioLib,
            language: req.body.idioma,
            year: req.body.anio,
            pages: req.body.paginas,
            discount: req.body.descuento,
            summary: req.body.resenia,
            image: req.file.filename
        })
        res.redirect("/misproductos");
        // let newId = 1;
        // const resValidation = validationResult(req);
        // let data = req.body;
        // let imagen = "";

        // let lastProduct  = products.pop();
        // if(lastProduct){
        //     newId = lastProduct.id + 1;
        // }

        // if(req.file){
        //     imagen = req.file.filename;
        //     console.log(imagen);
        // }
        
		// let newProduct = {
		// 	"id": newId,
		// 	"titulo": data.titulo,
		// 	"autor": data.autor,
		// 	"editorial": data.editorial,
		// 	"rating": data.rating,
		// 	"categoria": data.categoria,
		// 	"idioma": data.idioma,
        //     "precio": data.precio,
        //     "anio": data.anio,
        //     "paginas": data.paginas,
        //     "descuento": data.descuento,
        //     "resenia": data.resenia,
        //     "imagenLibro": imagen
		// }
        // console.log(newProduct);
        

        // if(resValidation.errors.length > 0){
        //     return res.render('products/crearProducto', {
        //         errors: resValidation.mapped(),
        //         oldData: req.body,
        //     });
        // }
        // else{
        //     products.push(newProduct);
        //     fs.writeFileSync(productsFilePath, JSON.stringify(products, null, '\t'));
        //     res.redirect("/misproductos");
        // }
    },

    
    detail: (req, res) => { 
        db.Book.findByPk(req.params.id)
        .then(function(product){
            res.render('products/detail', {product});
        })
        // let id = parseInt(req.params.id)
		// const product = products.find(product => product.id == id);
	},
    

    update: (req, res) => {
        let data = req.body;
        let category=[ 'Arte' , 'Ciencia' , 'Deportes'
        , 'Derecho' , 'Economía' , 'Enseñanza Inglés'
        , 'Ficción' , 'Ingeniería' , 'Infantil'
        , 'Informática' , 'Literatura' , 'Medicina'
        , 'Psicología' , 'Religión', 'Romance' ];
        
        let seleccionada = data.categoria;
        let pos = 0;
        for(let i=0; i<category.length; i++){
            if(category[i] == seleccionada){
                pos = i+1;
            }
        }

        db.Book.update({
            title : data.titulo,
            author: data.autor,
            editorial: data.editorial,
            rating: data.rating,
            category_id: pos,
            price: data.precio,
            language: data.idioma,
            year: data.anio,
            pages: data.paginas,
            discount: data.descuento,
            summary: data.resenia,
            image: data.image
        },{
            where: {
                id: req.params.id
            }
        }
        )

        res.redirect("/misproductos");
        
        // const productIndex = products.findIndex(producto =>{
        //   return producto.id == req.params.id;
        // });
        // let imagen = "";
        // if(req.file){
        //     imagen = req.file.filename;
        //     console.log(imagen);
        // } 
        // let productInfo = {
		// 	"id": req.params.id,
		// 	"titulo": data.titulo,
		// 	"autor": data.autor,
		// 	"editorial": data.editorial,
		// 	"rating": data.rating,
		// 	"categoria": data.categoria,
		// 	"idioma": data.idioma,
        //     "precio": data.precio,
        //     "anio": data.anio,
        //     "paginas": data.paginas,
        //     "descuento": data.descuento,
        //     "resenia": data.resenia,
        //     "imagenLibro": imagen
		// }
    
        // products[productIndex]={...products[productIndex], ...productInfo};
        // fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        
    },
 
    edit: (req, res) => {  
        let libroEditar = db.Book.findByPk(req.params.id);
        let categoriaEditar = db.Category.findAll();
        Promise.all([libroEditar,categoriaEditar])
        .then(function([productToEdit,categorias]){
            res.render('products/editarProducto', {productToEdit:productToEdit, categorias:categorias})
        })

        // const productToEdit = products.find((product) => {
        //      return product.id == req.params.id;      
        //  });
    
        //  if (productToEdit) {
        //      res.render('products/editarProducto', { productToEdit });
        //  } else {
        //      res.send("Hay un error al Editar");
        //  }
	
    },

    eliminar: (req, res) => {
         console.log(req.params.id)
          db.Book.destroy({
              where : {
                  id: req.params.id
              }
          })
         res.redirect("/misproductos"); 
        // const productIdex = products.findIndex(producto =>{
        //   return producto.id == req.params.id;
        // });
    
        // products.splice(productIdex, 1);
        
        // fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        // res.redirect("/misproductos"); 
    }

}
module.exports = productsController;

