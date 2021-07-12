const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');

app.use(express.urlencoded({extended: false}));
app.use(express.static('./public')); //Carpeta de archivos publicos para no usar request para solicitarlos
app.set('view engine', 'ejs');
app.use('/', mainRoutes);
app.use('/', productsRoutes);

app.listen(PORT, () => {
    console.log('Servidor Corriendo en http://localhost:3000');
})
