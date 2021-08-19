const express = require('express');
const app = express();
const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const session = require("express-session");
const cookies = require('cookie-parser');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const methodOverride = require('method-override');

const PORT = process.env.PORT || 3001;

app.use(session({
  secret: "secreto",
  resave: false,
  saveUninitialized: false, 
}));

app.use(cookies());
app.use(userLoggedMiddleware);

app.use(methodOverride('_method'))

app.use(express.urlencoded({extended: true}));
app.use(express.static('./public')); //Carpeta de archivos publicos para no usar request para solicitarlos
app.set('view engine', 'ejs');
app.use('/', mainRoutes);
app.use('/', productsRoutes);

app.listen(PORT, () => {
    console.log('Servidor Corriendo en http://localhost:3000');
})
