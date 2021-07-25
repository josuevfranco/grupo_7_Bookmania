const express = require('express');
const app = express();
const livereload = require("livereload");
const path = require('path');
const session = require("express-session");
const cookies = require('cookie-parser');
const connectLivereload = require("connect-livereload");

const PORT = process.env.PORT || 3000;

const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

var methodOverride = require('method-override')

//reload CRUD con liverealod
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/misproductos");
    }, 100);
  });

//middleware livereloads
app.use(connectLivereload());

app.use(session({
  secret: "secreto",
  resave: false,
  saveUninitialized: false, 
}));

app.use(cookies());
app.use(userLoggedMiddleware);

// override con POST teniendo ?_method=PUT
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended: true}));
app.use(express.static('./public')); //Carpeta de archivos publicos para no usar request para solicitarlos
app.set('view engine', 'ejs');
app.use('/', mainRoutes);
app.use('/', productsRoutes);

app.listen(PORT, () => {
    console.log('Servidor Corriendo en http://localhost:3000');
})
