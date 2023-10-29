const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createConnection({
  host: "database-pekokis.cdpe6uvl8fbx.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "Lizett149",
  database: "bd_pekokis"
});
module.exports = db;

const morgan = require('morgan');
const { result } = require('underscore');

// Configuración
app.set('port', process.env.PORT || 3001);
app.set('json spaces', 2);
app.use(express.json());
app.use(cors()); // Habilitar CORS

app.use(morgan('combined'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración de CORS para todas las rutas

// Rutas
app.use('/', require('./routes/user'));
app.use('/pages/clientes', require('./routes/client'));
app.use('/pages/ventas', require('./routes/ventas'));
app.use('/pages', require('./routes/login'));
app.use('/pages/productos', require('./routes/productos'));

// Iniciar el servidor
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});
